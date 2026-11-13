/* Keep hero badges aligned as fonts, viewport and hydrated elements change. */
(() => {
  if (new URLSearchParams(location.search).get('view') === 'particle-core') return;
  let title;
  const textContext = document.createElement('canvas').getContext('2d');
  const measure = () => {
    if (!title?.isConnected) return;
    const hero = title.closest('.fc.fch');
    hero.style.setProperty('--hero-first-title-width', `${title.getBoundingClientRect().width}px`);
    if (textContext) {
      const style = getComputedStyle(title);
      textContext.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      const metrics = textContext.measureText('AI');
      const lineHeight = parseFloat(style.lineHeight);
      if (Number.isFinite(metrics.fontBoundingBoxAscent) && Number.isFinite(metrics.fontBoundingBoxDescent)) {
        const bottomInset = (lineHeight - metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent) / 2 - metrics.actualBoundingBoxDescent;
        hero.style.setProperty('--hero-ai-bottom-inset', `${Math.max(0, bottomInset)}px`);
      }
    }
  };
  const size = new ResizeObserver(measure);
  let serviceRow;
  const serviceSize = new ResizeObserver(() => updateKnowledgeCard());
  const serviceState = new MutationObserver(() => updateKnowledgeCard());
  const userSelectedServices = new WeakSet();
  const serviceAnimations = new WeakMap();
  const addFlowComets = (demo, gradientId) => {
    const svg = demo.querySelector('.zk-flow-links');
    if (!svg || svg.querySelector('.zk-flow-beams')) return;
    const ns = 'http://www.w3.org/2000/svg';
    const defs = svg.querySelector('defs') || svg.insertBefore(document.createElementNS(ns, 'defs'), svg.firstChild);
    const group = document.createElementNS(ns, 'g');
    group.setAttribute('class', 'zk-flow-beams');
    const routedSources = [...svg.querySelectorAll('.zk-flow-comet-routes path')];
    const motionSources = routedSources.length ? routedSources : [...svg.querySelectorAll('.zk-flow-links-base path')];
    const beams = motionSources.map((source, index) => {
      const id = `${gradientId}-beam-${index}`;
      const gradient = document.createElementNS(ns, 'linearGradient');
      gradient.setAttribute('id', id);
      gradient.setAttribute('gradientUnits', 'userSpaceOnUse');
      [['0%', '#ff8063', '0'], ['45%', '#ff9c86', '.28'], ['76%', '#ffd8ce', '.76'], ['100%', '#fffaf7', '1']]
        .forEach(([offset, color, opacity]) => {
          const stop = document.createElementNS(ns, 'stop');
          stop.setAttribute('offset', offset);
          stop.setAttribute('stop-color', color);
          stop.setAttribute('stop-opacity', opacity);
          gradient.appendChild(stop);
        });
      defs.appendChild(gradient);
      const beam = document.createElementNS(ns, 'path');
      beam.setAttribute('class', 'zk-flow-beam');
      beam.setAttribute('fill', `url(#${id})`);
      group.appendChild(beam);
      return { source, beam, gradient, length: 0, samples: null, phase: index * 1100 };
    });
    svg.appendChild(group);

    const prepare = beam => {
      if (beam.samples) return;
      beam.length = beam.source.getTotalLength();
      const segments = Math.max(1, Math.ceil(beam.length / 2));
      beam.samples = new Float32Array((segments + 1) * 2);
      for (let index = 0; index <= segments; index++) {
        const point = beam.source.getPointAtLength(index / segments * beam.length);
        beam.samples[index * 2] = point.x;
        beam.samples[index * 2 + 1] = point.y;
      }
    };
    const pointAt = (beam, distance) => {
      const segments = beam.samples.length / 2 - 1;
      const position = Math.max(0, Math.min(1, distance / beam.length)) * segments;
      const index = Math.min(segments - 1, Math.floor(position));
      const fraction = position - index;
      const offset = index * 2;
      return { x: beam.samples[offset] + (beam.samples[offset + 2] - beam.samples[offset]) * fraction,
        y: beam.samples[offset + 1] + (beam.samples[offset + 3] - beam.samples[offset + 1]) * fraction };
    };
    let visible = false;
    let frame = 0;
    const draw = (time) => {
      frame = 0;
      if (!svg.isConnected || !visible || document.hidden) return;
      beams.forEach(entry => {
        prepare(entry);
        const { beam, gradient, length, phase } = entry;
        const headDistance = ((time + phase) % 9500) / 9500 * length;
        const tailDistance = Math.max(0, headDistance - length * .105);
        if (headDistance - tailDistance < 1) {
          beam.setAttribute('d', '');
          return;
        }
        const left = [];
        const right = [];
        const points = [];
        const sampleCount = 28;
        for (let i = 0; i <= sampleCount; i += 1) {
          const progress = i / sampleCount;
          const eased = progress * progress * (3 - 2 * progress);
          const distance = tailDistance + (headDistance - tailDistance) * progress;
          const point = pointAt(entry, distance);
          const before = pointAt(entry, distance - .7);
          const after = pointAt(entry, distance + .7);
          const angle = Math.atan2(after.y - before.y, after.x - before.x);
          const halfWidth = .04 + 1.46 * eased;
          const nx = -Math.sin(angle) * halfWidth;
          const ny = Math.cos(angle) * halfWidth;
          points.push({ point, angle, halfWidth });
          left.push(`${(point.x + nx).toFixed(2)} ${(point.y + ny).toFixed(2)}`);
          right.push(`${(point.x - nx).toFixed(2)} ${(point.y - ny).toFixed(2)}`);
        }
        const head = points[points.length - 1];
        const cap = [];
        for (let i = 1; i < 7; i += 1) {
          const angle = head.angle + Math.PI / 2 - Math.PI * i / 7;
          cap.push(`${(head.point.x + Math.cos(angle) * head.halfWidth).toFixed(2)} ${(head.point.y + Math.sin(angle) * head.halfWidth).toFixed(2)}`);
        }
        beam.setAttribute('d', `M${left[0]} L${left.slice(1).join(' L')} L${cap.join(' L')} L${right.reverse().join(' L')} Z`);
        const tail = points[0].point;
        gradient.setAttribute('x1', tail.x);
        gradient.setAttribute('y1', tail.y);
        gradient.setAttribute('x2', head.point.x);
        gradient.setAttribute('y2', head.point.y);
      });
      frame = requestAnimationFrame(draw);
    };
    const syncPlayback = () => {
      if (!svg.isConnected) {
        cancelAnimationFrame(frame);
        observer.disconnect();
        document.removeEventListener('visibilitychange', syncPlayback);
        return;
      }
      if (visible && !document.hidden && !frame) frame = requestAnimationFrame(draw);
      if (!visible || document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    }, { rootMargin: '120px' });
    document.addEventListener('visibilitychange', syncPlayback);
    observer.observe(svg);
  };
  const renderKnowledgeFlow = (card) => {
    const demo = card?.querySelector('.fcs-demo');
    if (!demo || demo.dataset.knowledgeFlow === 'true') return;
    demo.dataset.knowledgeFlow = 'true';
    demo.innerHTML = `
      <section class="zk-flow" role="img" aria-label="企业知识库整理原始资料，回答附上来源，由人工补充、审核并验证">
        <div class="zk-flow-grid">
          <article class="zk-flow-node zk-flow-node--source">
            <strong>文档与原图</strong><small>上传资料 · 保留原件</small>
          </article>
          <article class="zk-flow-node zk-flow-node--index">
            <strong>资料与条目</strong><small>解析 · 索引 · 维护</small>
          </article>
          <article class="zk-flow-node zk-flow-node--answer">
            <strong>回答附来源</strong><small>原文片段 · 配图 · 来源</small>
          </article>
          <article class="zk-flow-node zk-flow-node--discussion">
            <strong>授权讨论</strong><small>选择消息 · 整理草稿</small>
          </article>
          <article class="zk-flow-node zk-flow-node--review">
            <strong>草稿与审核</strong><small>编辑内容与适用范围</small>
          </article>
          <article class="zk-flow-node zk-flow-node--verify">
            <strong>新会话验证</strong><small>核对答案与实际依据</small>
          </article>
          <article class="zk-flow-node zk-flow-node--human">
            <strong>人工补充</strong><small>围绕具体问题收集经验</small>
          </article>
          <svg class="zk-flow-links" viewBox="0 0 1000 640" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="zk-flow-line-gradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1000" y2="640">
                <stop offset="0" stop-color="#dce8e2" stop-opacity=".24" />
                <stop offset=".52" stop-color="#f2dfd8" stop-opacity=".42" />
                <stop offset="1" stop-color="#ff9c86" stop-opacity=".32" />
              </linearGradient>
              <linearGradient id="zk-flow-comet-gradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stop-color="#ff9c86" stop-opacity="0" />
                <stop offset=".2" stop-color="#ffad98" stop-opacity=".12" />
                <stop offset=".58" stop-color="#ffd8cf" stop-opacity=".48" />
                <stop offset=".86" stop-color="#fff4ef" stop-opacity=".9" />
                <stop offset="1" stop-color="#ffffff" stop-opacity="1" />
              </linearGradient>
            </defs>
            <g class="zk-flow-links-base">
              <path d="M250 90H400" />
              <path d="M600 90H675Q700 90 700 115V174Q700 199 725 199H750" />
              <path d="M500 129V352" />
              <path d="M250 314H325Q350 314 350 339V366Q350 391 375 391H400" />
              <path d="M250 525H325Q350 525 350 500V416Q350 391 375 391H400" />
              <path d="M850 238V448" />
              <path d="M850 526V564Q850 594 820 594H180Q150 594 150 564" />
            </g>
            <g class="zk-flow-links-glow">
              <path d="M250 90H400" />
              <path d="M600 90H675Q700 90 700 115V174Q700 199 725 199H750" />
              <path d="M500 129V352" />
              <path d="M250 314H325Q350 314 350 339V366Q350 391 375 391H400" />
              <path d="M250 525H325Q350 525 350 500V416Q350 391 375 391H400" />
              <path d="M850 238V448" />
              <path d="M850 526V564Q850 594 820 594H180Q150 594 150 564" />
            </g>
            <g class="zk-flow-links-mid">
              <path d="M250 90H400" />
              <path d="M600 90H675Q700 90 700 115V174Q700 199 725 199H750" />
              <path d="M500 129V352" />
              <path d="M250 314H325Q350 314 350 339V366Q350 391 375 391H400" />
              <path d="M250 525H325Q350 525 350 500V416Q350 391 375 391H400" />
              <path d="M850 238V448" />
              <path d="M850 526V564Q850 594 820 594H180Q150 594 150 564" />
            </g>
            <g class="zk-flow-links-head">
              <path d="M250 90H400" />
              <path d="M600 90H675Q700 90 700 115V174Q700 199 725 199H750" />
              <path d="M500 129V352" />
              <path d="M250 314H325Q350 314 350 339V366Q350 391 375 391H400" />
              <path d="M250 525H325Q350 525 350 500V416Q350 391 375 391H400" />
              <path d="M850 238V448" />
              <path d="M850 526V564Q850 594 820 594H180Q150 594 150 564" />
            </g>
          </svg>
        </div>
      </section>`;
    addFlowComets(demo, 'zk-flow-comet-gradient');
  };
  const renderFinanceFlow = (card) => {
    const demo = card?.querySelector('.fcs-demo');
    if (!demo || demo.dataset.financeFlow === 'true') return;
    demo.dataset.financeFlow = 'true';
    demo.innerHTML = `
      <section class="zk-flow zk-flow--finance" role="img" aria-label="财务专员连接票据原件与银行流水，在统一账套、期间和权限的财务工作台处理业务，结果交由人工复核与回查">
        <div class="zk-flow-grid">
          <article class="zk-flow-node zk-flow-node--review zk-finance-agent"><strong>财务专员</strong><small>查账 · 读票 · 起草</small></article>
          <article class="zk-flow-node zk-finance-input zk-finance-docs"><strong>票据与原件</strong><small>读取 · 来源核对</small></article>
          <article class="zk-flow-node zk-finance-input zk-finance-bank"><strong>银行流水</strong><small>导入 · 检索 · 核对</small></article>
          <div class="zk-finance-workbench">
            <div class="zk-finance-functions">
              <span class="is-accent">报销审核</span><span class="is-accent">凭证与总账</span><span>银行对账</span>
              <span>报表预览</span><span>税务底稿</span><span>账套设置</span>
            </div>
          </div>
          <article class="zk-flow-node zk-flow-node--review zk-finance-review"><strong>人工复核与回查</strong><small>申请 · 草稿 · 正式记录</small></article>
          <svg class="zk-flow-links" viewBox="0 0 1000 640" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="zk-finance-line-gradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1000" y2="640">
                <stop offset="0" stop-color="#dce8e2" stop-opacity=".24" />
                <stop offset=".52" stop-color="#f2dfd8" stop-opacity=".42" />
                <stop offset="1" stop-color="#ff9c86" stop-opacity=".32" />
              </linearGradient>
            </defs>
            <g class="zk-flow-links-base">
              <path d="M640 108.8V224" />
              <path d="M250 256C315 256 315 272 380 272" />
              <path d="M250 409.6C315 409.6 315 368 380 368" />
              <path d="M640 416V537.6" />
            </g>
          </svg>
        </div>
      </section>`;
    addFlowComets(demo, 'zk-finance-comet-gradient');
  };
  const renderReportingFlow = (card) => {
    const demo = card?.querySelector('.fcs-demo');
    if (!demo || demo.dataset.reportingFlow === 'true') return;
    demo.dataset.reportingFlow = 'true';
    demo.innerHTML = `
      <section class="zk-flow zk-flow--reporting" role="img" aria-label="出货与退货、业务台账、历史累计资料经过规则计算与对账，形成业务类型月报、销售团队月报和年度销售曲线">
        <div class="zk-flow-grid">
          <article class="zk-flow-node zk-report-source zk-report-top"><strong>出货与退货</strong><small>原始 Excel</small></article>
          <article class="zk-flow-node zk-report-source zk-report-middle"><strong>业务台账</strong><small>本月业务明细</small></article>
          <article class="zk-flow-node zk-report-source zk-report-bottom"><strong>历史累计资料</strong><small>本次统计范围</small></article>
          <article class="zk-flow-node zk-flow-node--review zk-report-core"><strong>规则计算与对账</strong><small>分类 · 金额 · 行数 · 异常</small></article>
          <article class="zk-flow-node zk-report-output zk-report-top"><strong>业务类型月报</strong><small>可复核的 Excel 工作簿</small></article>
          <article class="zk-flow-node zk-report-output zk-report-middle"><strong>销售团队月报</strong><small>可复核的 Excel 工作簿</small></article>
          <article class="zk-flow-node zk-report-output zk-report-bottom"><strong>年度销售曲线</strong><small>可复核的 Excel 工作簿</small></article>
          <svg class="zk-flow-links" viewBox="0 0 1000 640" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="zk-report-line-gradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1000" y2="640">
                <stop offset="0" stop-color="#dce8e2" stop-opacity=".24" />
                <stop offset=".52" stop-color="#f2dfd8" stop-opacity=".42" />
                <stop offset="1" stop-color="#ff9c86" stop-opacity=".32" />
              </linearGradient>
            </defs>
            <g class="zk-flow-links-base">
              <path d="M260 115.2C345 115.2 285 320 370 320" />
              <path d="M260 320H370" />
              <path d="M260 524.8C345 524.8 285 320 370 320" />
              <path d="M630 320C715 320 655 115.2 740 115.2" />
              <path d="M630 320H740" />
              <path d="M630 320C715 320 655 524.8 740 524.8" />
            </g>
          </svg>
        </div>
      </section>`;
    addFlowComets(demo, 'zk-report-comet-gradient');
  };
  const renderProcurementFlow = (card) => {
    const demo = card?.querySelector('.fcs-demo');
    if (!demo || demo.dataset.procurementFlow === 'true') return;
    demo.dataset.procurementFlow = 'true';
    demo.innerHTML = `
      <section class="zk-flow zk-flow--sourcing" role="img" aria-label="采购寻源从采购需求、资格与规格核对到合格候选、证据比较、规则预演与采购人工选择的流程">
        <div class="zk-flow-grid">
          <article class="zk-flow-node zk-flow-node--request">
            <strong>采购需求</strong><small>物料 · 数量 · 日期</small>
          </article>
          <article class="zk-flow-node zk-flow-node--qualification">
            <strong>资格与规格</strong><small>硬条件先于评分</small>
          </article>
          <article class="zk-flow-node zk-flow-node--eligible">
            <strong>合格候选</strong><small>缺项与排除保留原因</small>
          </article>
          <article class="zk-flow-node zk-flow-node--rehearsal">
            <strong>规则预演</strong><small>比较变化 · 保留缺口</small>
          </article>
          <article class="zk-flow-node zk-flow-node--human-choice">
            <strong>采购人工选择</strong><small>最终名单由人确认</small>
          </article>
          <article class="zk-flow-node zk-flow-node--evidence">
            <strong>证据比较</strong><small>历史依据 · 规则权重</small>
          </article>
          <svg class="zk-flow-links" viewBox="0 0 1000 640" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="zk-sourcing-line-gradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1000" y2="640">
                <stop offset="0" stop-color="#dce8e2" stop-opacity=".24" />
                <stop offset=".52" stop-color="#f2dfd8" stop-opacity=".42" />
                <stop offset="1" stop-color="#ff9c86" stop-opacity=".32" />
              </linearGradient>
              <linearGradient id="zk-sourcing-comet-gradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stop-color="#ff9c86" stop-opacity="0" />
                <stop offset=".2" stop-color="#ffad98" stop-opacity=".12" />
                <stop offset=".58" stop-color="#ffd8cf" stop-opacity=".48" />
                <stop offset=".86" stop-color="#fff4ef" stop-opacity=".9" />
                <stop offset="1" stop-color="#ffffff" stop-opacity="1" />
              </linearGradient>
            </defs>
            <g class="zk-flow-links-base">
              <path d="M300 160H400" />
              <path d="M600 160H700" />
              <path d="M800 160V430" />
              <path d="M700 430H600" />
              <path d="M400 430H300" />
            </g>
            <g class="zk-flow-links-glow">
              <path d="M300 160H400" />
              <path d="M600 160H700" />
              <path d="M800 160V430" />
              <path d="M700 430H600" />
              <path d="M400 430H300" />
            </g>
            <g class="zk-flow-links-mid">
              <path d="M300 160H400" />
              <path d="M600 160H700" />
              <path d="M800 160V430" />
              <path d="M700 430H600" />
              <path d="M400 430H300" />
            </g>
            <g class="zk-flow-links-head">
              <path d="M300 160H400" />
              <path d="M600 160H700" />
              <path d="M800 160V430" />
              <path d="M700 430H600" />
              <path d="M400 430H300" />
            </g>
            <g class="zk-flow-comet-routes" aria-hidden="true">
              <path d="M300 160H770Q800 160 800 190V400Q800 430 770 430H300" />
            </g>
          </svg>
        </div>
      </section>`;
    addFlowComets(demo, 'zk-sourcing-comet-gradient');
  };
  const applyServiceLayout = (services, cards, requestedOpenIndex, animate = false) => {
    const row = services?.querySelector('.fcs-row');
    if (!row || services.classList.contains('is-ph') || cards.length !== 4) return;
    const closedWidth = 116;
    const gap = 10;
    const step = closedWidth + gap;
    const currentOpenIndex = [...cards].findIndex(item => item.classList.contains('is-open'));
    const storedOpenIndex = Number.parseInt(services.dataset.layoutOpenIndex ?? '', 10);
    const hasStoredOpenIndex = Number.isInteger(storedOpenIndex) && storedOpenIndex >= 0 && storedOpenIndex < cards.length;
    const openIndex = requestedOpenIndex ?? (currentOpenIndex >= 0 ? currentOpenIndex : (hasStoredOpenIndex ? storedOpenIndex : 0));
    services.dataset.layoutOpenIndex = `${openIndex}`;
    const rowRect = row.getBoundingClientRect();
    const openWidth = rowRect.width - (cards.length - 1) * step;
    const starts = animate ? [...cards].map(item => {
      const rect = item.getBoundingClientRect();
      const style = getComputedStyle(item);
      return {
        width: `${rect.width}px`,
        x: rect.left - rowRect.left,
        transform: style.transform,
      };
    }) : [];
    [...cards].forEach((item, index) => {
      const x = index <= openIndex
        ? index * step
        : openIndex * step + openWidth + gap + (index - openIndex - 1) * step;
      const transform = `translateX(${x}px)`;
      const width = index === openIndex ? openWidth : closedWidth;
      const targetKey = `${width.toFixed(2)}:${x.toFixed(2)}`;
      const runningAnimation = serviceAnimations.get(item);
      const targetUnchanged = item.dataset.layoutTarget === targetKey;
      if (!animate && runningAnimation && targetUnchanged) {
        item.style.setProperty('--cw', `${closedWidth}px`);
        return;
      }
      runningAnimation?.cancel();
      serviceAnimations.delete(item);
      item.style.width = `${width}px`;
      item.style.transform = transform;
      item.style.removeProperty('clip-path');
      item.style.setProperty('--cw', `${closedWidth}px`);
      item.dataset.layoutTarget = targetKey;
      if (animate && (Math.abs(starts[index].x - x) > .5 || Math.abs(parseFloat(starts[index].width) - width) > .5)) {
        const animation = item.animate([
          { width: starts[index].width, transform: starts[index].transform },
          { width: `${width}px`, transform },
        ], {
          duration: 650,
          easing: 'cubic-bezier(.32,.58,.25,1)',
        });
        animation.startTime = document.timeline.currentTime;
        serviceAnimations.set(item, animation);
        animation.addEventListener('finish', () => {
          if (serviceAnimations.get(item) === animation) serviceAnimations.delete(item);
        }, { once: true });
      }
    });
  };
  const handleServiceCardClick = (event) => {
    const targetCard = event.target.closest('.fcs-strip')?.closest('.fcs-p');
    const services = targetCard?.closest('.fc.fcs');
    if (!services) return;
    const currentCards = services.querySelectorAll('.fcs-p');
    const nextIndex = [...currentCards].indexOf(targetCard);
    if (nextIndex < 0 || currentCards.length !== 4) return;
    if (!services.classList.contains('is-ph')) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
    userSelectedServices.add(services);
    [...currentCards].forEach((item, index) => {
      const isOpen = index === nextIndex;
      item.classList.toggle('is-open', isOpen);
      item.querySelector('.fcs-strip')?.setAttribute('aria-expanded', `${isOpen}`);
      item.querySelector('.fcs-body')?.setAttribute('aria-hidden', `${!isOpen}`);
    });
    const progressLabel = services.querySelector('.fcs-prog > span');
    if (progressLabel) progressLabel.textContent = `${String(nextIndex + 1).padStart(2, '0')} / 04`;
    services.style.setProperty('--pp', `${(nextIndex + 1) / currentCards.length}`);
    applyServiceLayout(services, currentCards, nextIndex, true);
  };
  const updateKnowledgeCard = () => {
    const services = document.querySelector('.fc.fcs');
    const sectionLabel = services?.querySelector('.fcs-head .fc-eb');
    if (sectionLabel && sectionLabel.textContent !== '业务应用') sectionLabel.textContent = '业务应用';
    let cards = services?.querySelectorAll('.fcs-p') || [];
    if (cards[4]) cards[4].remove();
    cards = services?.querySelectorAll('.fcs-p') || [];
    if (cards[0] && !userSelectedServices.has(services)) {
      [...cards].forEach((item, index) => {
        const isOpen = index === 0;
        item.classList.toggle('is-open', isOpen);
        item.querySelector('.fcs-strip')?.setAttribute('aria-expanded', `${isOpen}`);
      });
      services.dataset.layoutOpenIndex = '0';
      services.style.setProperty('--pp', `${1 / cards.length}`);
    }
    if (cards.length === 4 && ![...cards].some(item => item.classList.contains('is-open'))) {
      const storedIndex = Number.parseInt(services.dataset.layoutOpenIndex ?? '0', 10);
      const fallbackIndex = Number.isInteger(storedIndex) && storedIndex >= 0 && storedIndex < cards.length ? storedIndex : 0;
      [...cards].forEach((item, index) => {
        const isOpen = index === fallbackIndex;
        item.classList.toggle('is-open', isOpen);
        item.querySelector('.fcs-strip')?.setAttribute('aria-expanded', `${isOpen}`);
      });
    }
    const activeIndex = Math.max(0, [...cards].findIndex(item => item.classList.contains('is-open')));
    const count = [...(services?.querySelectorAll('p,span') || [])].find(node => /^\d{2}\s*\/\s*(04|05)$/.test(node.textContent.trim()));
    if (count) {
      const progressText = `${String(activeIndex + 1).padStart(2, '0')} / 04`;
      if (count.textContent.trim() !== progressText) count.textContent = progressText;
    }
    services?.style.setProperty('--pp', `${(activeIndex + 1) / cards.length}`);
    const row = services?.querySelector('.fcs-row');
    if (row && row !== serviceRow) {
      serviceSize.disconnect();
      serviceState.disconnect();
      serviceRow = row;
      serviceSize.observe(row);
      serviceState.observe(row, { subtree: true, attributes: true, attributeFilter: ['class'] });
    }
    applyServiceLayout(services, cards);
    const card = cards[0];
    if (!card) return;
    renderKnowledgeFlow(card);
    renderFinanceFlow(cards[1]);
    renderReportingFlow(cards[2]);
    renderProcurementFlow(cards[3]);
    const stripCopy = [
      [cards[0], '企业知识库'],
      [cards[1], '财务专员'],
      [cards[2], '商务报表'],
      [cards[3], '采购寻源'],
    ];
    stripCopy.forEach(([item, value]) => {
      const node = item?.querySelector('.fcs-strip .fcs-vt');
      if (node && node.textContent !== value) node.textContent = value;
    });
    const copy = [
      ['.fcs-body h3', '企业知识库'],
      ['.fcs-body .fcs-short', '回答附上原文和原图'],
      ['.fcs-body .fcs-det', '把分散的文档、图片和经验整理到一起。查到答案后，可以查看原文和配图，判断能否用于手头的工作'],
    ];
    copy.forEach(([selector, value]) => {
      const node = card.querySelector(selector);
      if (node && node.textContent !== value) node.textContent = value;
    });
    const knowledgeTools = card.querySelectorAll('.fcs-tools > span');
    ['智能问答', '查看原文原图', '整理业务经验'].forEach((value, index) => {
      if (knowledgeTools[index] && knowledgeTools[index].textContent !== value) knowledgeTools[index].textContent = value;
    });
    [...knowledgeTools].slice(3).forEach(node => node.remove());
    const reportCard = cards[2];
    const reportCopy = [
      ['.fcs-body h3', '商务报表'],
      ['.fcs-body .fcs-short', '把业务台账整理成报表'],
      ['.fcs-body .fcs-det', '按约定口径整理台账、计算并对账，生成业务类型、销售团队和年度趋势三类工作簿。汇总数字都能查到明细'],
    ];
    reportCopy.forEach(([selector, value]) => {
      const node = reportCard?.querySelector(selector);
      if (node && node.textContent !== value) node.textContent = value;
    });
    const reportTools = reportCard?.querySelectorAll('.fcs-tools > span') || [];
    ['台账汇总', '经营分析', '查看明细'].forEach((value, index) => {
      if (reportTools[index] && reportTools[index].textContent !== value) reportTools[index].textContent = value;
    });
    [...reportTools].slice(3).forEach(node => node.remove());
    const financeCard = cards[1];
    const financeCopy = [
      ['.fcs-body h3', '财务专员'],
      ['.fcs-body .fcs-short', '从票据原件核对到账务记录'],
      ['.fcs-body .fcs-det', '数字员工和财务工作台使用同一账套、期间和业务规则，读取原件，整理待审申请和凭证草稿。每一步都能回查，由人复核'],
    ];
    financeCopy.forEach(([selector, value]) => {
      const node = financeCard?.querySelector(selector);
      if (node && node.textContent !== value) node.textContent = value;
    });
    const financeTools = financeCard?.querySelectorAll('.fcs-tools > span') || [];
    ['票据识别', '账务核对', '凭证草稿'].forEach((value, index) => {
      if (financeTools[index] && financeTools[index].textContent !== value) financeTools[index].textContent = value;
    });
    [...financeTools].slice(3).forEach(node => node.remove());
    const procurementCard = cards[3];
    const procurementCopy = [
      ['.fcs-body h3', '采购寻源'],
      ['.fcs-body .fcs-short', '推荐供应商，也说明理由'],
      ['.fcs-body .fcs-det', '先核对供应商资格和物料规格，再比较合格候选的历史记录。采购规则可以调整，也能预演权重变化的影响；最终名单由采购确认'],
    ];
    procurementCopy.forEach(([selector, value]) => {
      const node = procurementCard?.querySelector(selector);
      if (node && node.textContent !== value) node.textContent = value;
    });
    const procurementTools = procurementCard?.querySelectorAll('.fcs-tools > span') || [];
    ['资格筛选', '供应商比选', '推荐依据'].forEach((value, index) => {
      if (procurementTools[index] && procurementTools[index].textContent !== value) procurementTools[index].textContent = value;
    });
    [...procurementTools].slice(3).forEach(node => node.remove());
  };
  const connect = () => {
    updateKnowledgeCard();
    const nextTitle = document.querySelector('.fc.fch .fch-h1');
    if (title === nextTitle && title?.isConnected) return;
    size.disconnect();
    title = nextTitle;
    if (!title) return;
    measure();
    size.observe(title);
  };
  const start = () => {
    window.addEventListener('click', handleServiceCardClick, true);
    new MutationObserver(connect).observe(document.body, { childList: true, subtree: true });
    connect();
    document.fonts?.ready.then(measure);
    document.fonts?.addEventListener('loadingdone', measure);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
