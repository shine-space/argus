// Preloading must not consume the intro before the badge can actually be seen.
export const ENTRANCE_RATIO = 0.55;

export function measureVisibility(rect, width, height) {
  const area = rect.width * rect.height;
  const visibleWidth = Math.max(0, Math.min(width, rect.left + rect.width) - Math.max(0, rect.left));
  const visibleHeight = Math.max(0, Math.min(height, rect.top + rect.height) - Math.max(0, rect.top));
  const visibleArea = visibleWidth * visibleHeight;
  return {
    isIntersecting: area > 0 && visibleArea > 0,
    intersectionRatio: area > 0 ? visibleArea / area : 0,
  };
}

export function createEntranceGate({onEnter, onPause, initialPageVisible = true}) {
  let ready = false;
  let pageVisible = initialPageVisible;
  let intersecting = false;
  let ratio = 0;
  let armed = true;
  let running = false;

  function sync() {
    const eligible = ready && pageVisible && intersecting &&
      (!armed || ratio >= ENTRANCE_RATIO);
    if (eligible && !running) {
      const replay = armed;
      armed = false;
      running = true;
      onEnter(replay);
    } else if (!eligible && running) {
      running = false;
      onPause();
    }
  }

  return {
    setReady(value) {
      ready = value;
      sync();
    },
    setIntersection(entry) {
      ratio = entry.intersectionRatio;
      intersecting = entry.isIntersecting && ratio > 0;
      if (!intersecting) armed = true;
      sync();
    },
    setPageVisible(value) {
      pageVisible = value;
      sync();
    },
    isRunning: () => running,
  };
}
