// Reuse one vertex buffer and one GPU draw per layer, instead of thousands of
// Canvas fillStyle/fillRect calls. Coordinates and sizes remain in CSS pixels.
export function createParticleSurface(canvas, {capacity, additive = false}) {
  const gl = canvas.getContext('webgl', {alpha: true, antialias: false, depth: false,
    stencil: false, premultipliedAlpha: true, preserveDrawingBuffer: false});
  const context = gl ? null : canvas.getContext('2d');
  const points = new Float32Array(capacity * 8);
  let count = 0, width = 1, height = 1, ratio = 1, program, buffer, view, scale;
  let lost = false;

  const initialize = () => {
    const shader = (type, source) => {
      const result = gl.createShader(type);
      gl.shaderSource(result, source);
      gl.compileShader(result);
      if (!gl.getShaderParameter(result, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(result));
      return result;
    };
    const vertex = shader(gl.VERTEX_SHADER, `
      attribute vec2 position;
      attribute float size;
      attribute vec4 color;
      attribute float glow;
      uniform vec2 viewport;
      uniform float pixelRatio;
      varying vec4 tint;
      varying float diameter;
      varying float extent;
      varying float radial;
      void main() {
        gl_Position = vec4(position / viewport * vec2(2., -2.) + vec2(-1., 1.), 0., 1.);
        diameter = size * pixelRatio;
        extent = ceil(diameter) + 2.;
        gl_PointSize = extent;
        tint = color;
        radial = glow;
      }
    `);
    const fragment = shader(gl.FRAGMENT_SHADER, `
      precision mediump float;
      varying vec4 tint;
      varying float diameter;
      varying float extent;
      varying float radial;
      void main() {
        vec2 distance = abs(gl_PointCoord - .5) * extent;
        vec2 edge = clamp(vec2(diameter * .5 + .5) - distance, 0., 1.);
        float coverage = radial > .5 ? max(0., 1. - length(distance) / (diameter * .5)) : edge.x * edge.y;
        float alpha = clamp(tint.a, 0., 1.) * coverage;
        gl_FragColor = vec4(tint.rgb * alpha, alpha);
      }
    `);
    program = gl.createProgram();
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
    gl.useProgram(program);
    buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, points.byteLength, gl.DYNAMIC_DRAW);
    for (const [name, size, offset] of [['position', 2, 0], ['size', 1, 2], ['color', 4, 3], ['glow', 1, 7]]) {
      const index = gl.getAttribLocation(program, name);
      gl.enableVertexAttribArray(index);
      gl.vertexAttribPointer(index, size, gl.FLOAT, false, 32, offset * 4);
    }
    view = gl.getUniformLocation(program, 'viewport');
    scale = gl.getUniformLocation(program, 'pixelRatio');
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, additive ? gl.ONE : gl.ONE_MINUS_SRC_ALPHA);
    gl.disable(gl.DEPTH_TEST);
    gl.clearColor(0, 0, 0, 0);
    lost = false;
  };
  if (gl) initialize();
  canvas.dataset.particleRenderer = gl ? 'webgl' : 'canvas';
  const onLost = event => { event.preventDefault(); lost = true; };
  const onRestore = () => initialize();
  canvas.addEventListener('webglcontextlost', onLost);
  canvas.addEventListener('webglcontextrestored', onRestore);

  return {
    begin(nextWidth, nextHeight, nextRatio) {
      width = nextWidth; height = nextHeight; ratio = nextRatio; count = 0;
    },
    point(x, y, size, red, green, blue, alpha, glow = 0) {
      const offset = count++ * 8;
      points[offset] = x; points[offset + 1] = y; points[offset + 2] = size;
      points[offset + 3] = red; points[offset + 4] = green; points[offset + 5] = blue;
      points[offset + 6] = alpha; points[offset + 7] = glow;
    },
    draw() {
      if (lost) return;
      if (gl) {
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(view, width, height);
        gl.uniform1f(scale, ratio);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, points.subarray(0, count * 8));
        gl.drawArrays(gl.POINTS, 0, count);
      } else if (context) {
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
        context.clearRect(0, 0, width, height);
        context.globalCompositeOperation = additive ? 'lighter' : 'source-over';
        for (let i = 0; i < count * 8; i += 8) {
          const [x, y, size, r, g, b, alpha, glow] = points.subarray(i, i + 8);
          if (glow) {
            const gradient = context.createRadialGradient(x, y, 0, x, y, size / 2);
            gradient.addColorStop(0, `rgba(${r * 255},${g * 255},${b * 255},${alpha})`);
            gradient.addColorStop(1, `rgba(${r * 255},${g * 255},${b * 255},0)`);
            context.fillStyle = gradient;
          } else context.fillStyle = `rgba(${r * 255},${g * 255},${b * 255},${alpha})`;
          context.fillRect(x - size / 2, y - size / 2, size, size);
        }
      }
    },
    dispose() {
      canvas.removeEventListener('webglcontextlost', onLost);
      canvas.removeEventListener('webglcontextrestored', onRestore);
      if (gl && !lost) { gl.deleteBuffer(buffer); gl.deleteProgram(program); }
    },
  };
}
