(() => {
  const sectionSelector = '[data-framer-name="S1 FcServiceList"]';
  const pageContent = document.body;

  const services = [
    {
      id: 'svc-voice-agents',
      heading: '能承担工作的数字员工',
      title: '数字员工',
      keyword: '企业智能体',
      description: '把任务交给数字员工，减少反复跟进，让工作持续推进，按计划交付成果',
      bullets: ['按岗定制能力专业执行', '积累工作记忆，越用越懂你', '成果入库，随时复用', '内置技能与工具，越装越强'],
      illustration: 'employee-wall',
    },
    {
      id: 'svc-workflow-automation',
      title: '多智能体协作',
      keyword: '协同执行',
      description: '一个项目同事与数字员工协作，主 Agent 拆解任务、协调分工，共享团队知识，跟进进度与交付',
      bullets: ['专业岗位智能体协同分工', '主 Agent 拆分委派任务', '无需指挥，主动开工', '懂群聊讨论，@交办即做'],
      illustration: 'digital-employee-conversation[message-flow]',
    },
    {
      id: 'svc-support-agents',
      title: '业务工作台',
      illustration: '.service-workbench-preview',
      keyword: '业务复核',
      description: '对话里交办，工作台里核对。业务记录、处理状态和交付文件放在一起，财务人员可以对照票据原件，复核数字员工生成的待审草稿',
      bullets: ['从对话进入工作台', '业务进度，一眼看清', '原件、成果放在一起', '对照票据，复核草稿'],
    },
    {
      id: 'svc-knowledge-base',
      title: '企业知识库',
      keyword: '知识检索',
      description: '资料集中存，回答带出处。把文档、图片和工作经验整理进知识库，按权限检索，随时回看答案引用的原文和原图',
      bullets: ['文档、图片集中维护', '业务经验留给团队', '按权限查找企业资料', '回答可回看原文原图'],
    },
    {
      id: 'svc-custom-ai-apps',
      title: 'Skill、工作流与工具',
      keyword: '能力编排',
      description: '好用的方法，留给下一次任务。把常用做法做成 Skill，把固定步骤编成工作流，再按需接入业务工具、模型和运行环境',
      bullets: ['常用做法存为 Skill', '固定步骤编成工作流', '接入已有业务系统', '按任务选模型和环境'],
      illustration: '.service-models-frame',
    },
  ];

  function setText(element, value) {
    if (element && element.textContent !== value) element.textContent = value;
  }

  function mountIllustration(container, selector) {
    if (!container || !selector || container.querySelector(selector)) return;
    if (selector === '.service-workbench-preview') {
      const figure = document.createElement('figure');
      figure.className = 'service-workbench-preview';
      figure.setAttribute('aria-label', '财务工作台局部示例');
      figure.innerHTML = `
        <figcaption>财务工作台 · 期间概览</figcaption>
          <span class="workbench-toolbar" role="group" aria-label="用户端工作区工具">
            <span class="workbench-finance-tool" role="img" aria-label="财务">
              <span aria-hidden="true">财务</span>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 3 2 1 2-1 2 1 2-1 2 1 2-1 2 1 2-1v18l-2-1-2 1-2-1-2 1-2-1-2 1-2-1-2 1zM9 8l3 3 3-3m-6 4h6m-6 3h6m-3-4v6"/></svg>
            </span>
            <span role="img" aria-label="设置" title="设置"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 3-1 3-3 1v4l-2 1 2 2v3l3 1 1 3h5l1-3 3-1v-3l2-2-2-1V7l-3-1-1-3Z"/><circle cx="11.5" cy="12" r="3"/></svg></span>
            <span role="img" aria-label="文件" title="文件"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12l4-7h10l4 7v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1zm0 0h18m-14 4h1m3 0h1"/></svg></span>
            <span role="img" aria-label="Skill 技能" title="Skill 技能"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 10 9-7 9 7v10H3zM8 11h8v6H8zm4-3v3m-2 6v3m4-3v3"/></svg></span>
            <span role="img" aria-label="定时任务" title="定时任务"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6M12 2v3"/></svg></span>
            <span role="img" aria-label="记忆" title="记忆"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4a3 3 0 0 0-6-1 4 4 0 0 0-3 6 4 4 0 0 0 0 6 4 4 0 0 0 4 6 3 3 0 0 0 5-2V4Zm0 0a3 3 0 0 1 6-1 4 4 0 0 1 3 6 4 4 0 0 1 0 6 4 4 0 0 1-4 6 3 3 0 0 1-5-2M6 9l2 1M6 16l2-1M18 9l-2 1M18 16l-2-1"/></svg></span>
            <span role="img" aria-label="运行记录" title="运行记录"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="15" height="12" rx="2"/><path d="M8 15v5M5 20h8"/><rect x="16" y="11" width="5" height="10" rx="1"/></svg></span>
          </span>
        <div class="workbench-overview">
          <header><strong>示例企业</strong><span>2026-10 · 进行中</span></header>
          <dl>
            <div><dt>待审报销</dt><dd>3 笔</dd></div>
            <div><dt>未匹配银行流水</dt><dd>0 条</dd></div>
            <div><dt>关账检查</dt><dd>待处理</dd></div>
          </dl>
          <div class="workbench-tasks">
            <strong>本期工作</strong>
            <ul><li>报销审核 · 3 笔待审</li><li>凭证与总账</li><li>银行对账</li></ul>
          </div>
          <div class="workbench-tasks workbench-close-check"><strong>关账前核对</strong><p>凭证、报销和银行流水完成复核后，即可关账</p></div>
        </div>
      `;
      container.append(figure);
    } else if (selector === '.service-models-frame') {
      const frame = document.createElement('iframe');
      frame.className = 'service-models-frame';
      frame.title = 'Leading AI Models';
      frame.loading = 'lazy';
      frame.dataset.lazySrc = '/agentops-study/?view=models';
      container.append(frame);
    } else if (selector === 'employee-wall') {
      container.append(document.createElement('employee-wall'));
    } else {
      const conversation = document.createElement('digital-employee-conversation');
      conversation.setAttribute('message-flow', '');
      container.append(conversation);
    }
  }

  function sync() {
    observer.disconnect();
    try {
      services.forEach((service, index) => {
        pageContent.querySelectorAll(sectionSelector + ' [id="' + service.id + '"]').forEach(card => {
          setText(card.querySelector('.fcsl-copy > h2'), service.heading || service.title);
          setText(card.querySelector('.fcsl-n'), String(index + 1).padStart(2, '0') + ' — ' + service.keyword);
          if (service.description) setText(card.querySelector('.fcsl-short'), service.description);

          const rows = [...card.querySelectorAll('.fcsl-inc > li')];
          rows.slice(service.bullets.length).forEach(row => row.remove());
          rows.slice(0, service.bullets.length).forEach((row, rowIndex) => {
            const label = service.bullets[rowIndex];
            if (row.textContent === label) return;
            const icon = row.querySelector('svg');
            row.replaceChildren(...(icon ? [icon] : []), label);
          });
          mountIllustration(card.querySelector('.fcsl-demo'), service.illustration);
        });
        pageContent.querySelectorAll(sectionSelector + ' .fcsl-idx a[href="#' + service.id + '"]').forEach(link => {
          const label = link.querySelector('em')?.nextSibling;
          if (label?.nodeType === Node.TEXT_NODE && label.data !== service.title) label.data = service.title;
        });
      });
    } finally {
      observer.observe(pageContent, { childList: true, subtree: true, characterData: true });
    }
  }

  const observer = new MutationObserver(records => {
    const changed = records.some(({ target, addedNodes }) => {
      const element = target.nodeType === Node.ELEMENT_NODE ? target : target.parentElement;
      if (element?.closest('employee-wall')) return false;
      return element?.closest(sectionSelector) || [...addedNodes].some(node =>
        node.matches?.(sectionSelector) || node.querySelector?.(sectionSelector)
      );
    });
    if (changed) sync();
  });
  sync();
})();
