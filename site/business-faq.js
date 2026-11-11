(() => {
  const questions = [
  [
    "企业可以先从哪些工作开始？",
    "先找目标明确、经常重复的工作，例如整理订单信息、跟进缺料、分析成本。看清需要哪些数据、有哪些规则和异常、结果怎么验收，再确定第一期做什么。"
  ],
  [
    "是否需要替换现有 ERP、MES 等系统？",
    "不必先替换现有系统。我们通过授权接口和项目适配，连接所需的数据和工具，保留各系统原有的业务职责与数据边界。能接哪些系统、需要什么条件，在项目中逐项确认。"
  ],
  [
    "可以部署在企业指定的环境吗？",
    "可以根据企业的网络、数据安全和运维要求确定部署方式。目前提供商业授权的本地部署：后端以镜像交付，前端按授权范围提供二次开发包。云端服务即将上线。具体还需一起评估模型服务、资源条件、系统接口和运维分工。"
  ],
  [
    "哪些操作需要由人确认？",
    "设计时先明确 AI 能访问什么、能读取或写入哪些内容。异常和关键操作要经过人工复核或审批。运行记录、引用来源和版本会保留下来，方便核对结果、查找问题。"
  ],
  [
    "应用上线后，怎样扩展到其他场景？",
    "先复用已有项目中验证过的知识、流程、连接器、配置和评测用例。新场景的数据、业务规则和系统有差异，再分别适配，并重新验证和验收。"
  ]
];
  function install() {
    const anchor = document.querySelector('.fc.fcx')?.closest('[data-framer-name="Cta"]');
    if (!anchor || document.querySelector('.zx-business-faq')) return;
    const section = document.createElement('section');
    section.className = 'fc zx-business-faq';
    section.setAttribute('aria-labelledby', 'zx-faq-title');
    section.innerHTML = `<div class="fc-wrap">
      <div class="zx-faq-head"><div>
        <h2 id="zx-faq-title">关于 AI 应用，<br>你可能想了解这些。</h2>
        </div>

      </div>
      <div class="zx-faq-list">${questions.map(([question, answer], index) => `
        <details class="zx-faq-item" data-expanded="${index === 0}"${index === 0 ? ' open' : ''}>
          <summary>${question}<span class="zx-faq-toggle" aria-hidden="true"></span></summary>
          <div class="zx-faq-answer"><p>${answer}</p></div>
        </details>`).join('')}</div>
    </div>`;
    anchor.before(section);
    const items = [...section.querySelectorAll('.zx-faq-item')];
    const transitions = new WeakMap();
    const resizeItem = (item, expanded) => {
      const startHeight = item.getBoundingClientRect().height;
      const answer = item.querySelector('.zx-faq-answer');
      const startOpacity = getComputedStyle(answer).opacity;
      const wasOpen = item.open;
      transitions.get(item)?.cancel();
      answer.getAnimations().forEach(animation => animation.cancel());
      item.dataset.expanded = String(expanded);
      item.open = true;
      item.style.height = 'auto';
      const endHeight = expanded ? item.getBoundingClientRect().height : item.querySelector('summary').getBoundingClientRect().height;
      const duration = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 360;
      const timing = { duration, easing: 'cubic-bezier(.22,.7,.2,1)' };
      const animation = item.animate([{ height: `${startHeight}px` }, { height: `${endHeight}px` }], timing);
      transitions.set(item, animation);
      answer.animate([{ opacity: wasOpen ? startOpacity : 0 }, { opacity: expanded ? 1 : 0 }], timing);
      animation.onfinish = () => {
        if (transitions.get(item) !== animation) return;
        item.open = expanded;
        item.style.removeProperty('height');
        transitions.delete(item);
      };
    };
    items.forEach(item => item.querySelector('summary').addEventListener('click', event => {
      event.preventDefault();
      const expand = item.dataset.expanded !== 'true';
      items.forEach(other => {
        const next = other === item && expand;
        if ((other.dataset.expanded === 'true') !== next) resizeItem(other, next);
      });
    }));
  }
  const start = () => {
    install();
    new MutationObserver(install).observe(document.body, { childList: true, subtree: true });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
