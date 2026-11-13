const serviceListSelector = '[data-framer-name="S1 FcServiceList"]';
if (document.querySelector(serviceListSelector)) {
  const response = await fetch('/ondrel/content.html?v=5');
  if (!response.ok) throw new Error('Could not load the workbench illustration');
  const source = new DOMParser().parseFromString(await response.text(), 'text/html');
  const panel = source.querySelector('#feature-1 > [data-framer-name="Feature Requests Panel"]');
  const symbols = source.getElementById('2195084183')?.parentElement.closest('svg');

  if (panel && symbols) {
    const knowledgeBaseLabels = [
      '财务制度与流程知识库', '知识内容', '切片', '待审核',
      '01', '费用报销管理办法.pdf', '2026-10-28', '文档', '索引失败',
      '02', '费用报销申请单.xlsx', '2026-10-22', '表格', '已索引',
      '03', '差旅费用报销标准.pdf', '2026-10-26', '文档', '已索引',
      '04', '月度费用汇总表.xlsx', '2026-10-20', '表格', '已索引',
      '05', '发票审核操作指引.docx', '2026-10-24', '文档', '已索引',
    ];
    panel.querySelectorAll('p').forEach((label, index) => {
      label.textContent = knowledgeBaseLabels[index] ?? label.textContent;
    });

    panel.querySelectorAll('[data-framer-name^="Request "][data-framer-name$=" Votes"]').forEach((badge, index) => {
      const type = knowledgeBaseLabels[4 + index * 5 + 3];
      const icon = document.createElement('img');
      icon.src = type === '表格' ? '/company-copy/knowledge-xls.svg' : '/company-copy/knowledge-doc.svg';
      icon.alt = '';
      icon.width = 20;
      icon.height = 20;
      badge.removeAttribute('data-border');
      badge.classList.add('knowledge-file-icon');
      badge.replaceChildren(icon);
    });

    const reviewTab = panel.querySelector('[data-framer-name="Filter 3"]');
    const searchTab = reviewTab.cloneNode(true);
    searchTab.setAttribute('data-framer-name', 'Filter 4');
    searchTab.querySelector('p').textContent = '知识检索';
    reviewTab.after(searchTab);

    const cover = document.createElement('span');
    cover.className = 'knowledge-cover';
    cover.setAttribute('aria-hidden', 'true');
    const overlay = document.createElement('img');
    overlay.src = '/company-copy/knowledge-cover-overlay.svg';
    overlay.alt = '';
    const coverTitle = document.createElement('span');
    coverTitle.textContent = knowledgeBaseLabels[0];
    cover.append(overlay, coverTitle);
    panel.querySelector('[data-framer-name="Inbox Header Icon"]').replaceWith(cover);

    const team = document.createElement('span');
    team.className = 'knowledge-team';
    team.textContent = '财务团队';
    panel.querySelector('[data-framer-name="Inbox Header Title"]').append(team);

    function mount() {
      for (const row of document.querySelectorAll(serviceListSelector + ' [id="svc-knowledge-base"]')) {
        const demo = row.querySelector('.fcsl-demo');
        if (!demo || demo.querySelector('workbench-illustration')) continue;

        const illustration = document.createElement('workbench-illustration');
        const shadow = illustration.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
          <link rel="stylesheet" href="/ondrel/source.css?v=1">
          <link rel="stylesheet" href="/ondrel/theme.css?v=26">
          <style>
            [data-framer-name="Inbox Header"] {
              box-sizing: border-box;
              min-height: 66px;
            }
            .framer-ivkTB .framer-1ebz82h {
              flex: 1 1 auto;
              min-height: 0;
              border-bottom-left-radius: 0;
              border-bottom-right-radius: 0;
            }
            .knowledge-team { display: block; margin-top: 3px; color: var(--site-text-muted,#6b6f69); font-size: 11px; line-height: 15px; }
            .framer-ivkTB [data-framer-name]:has(> .knowledge-file-icon) { column-gap: 8px; }
            .framer-ivkTB .knowledge-file-icon {
              position: relative;
              flex: none;
              width: 32px;
              height: 32px;
              padding: 0;
              border-bottom-left-radius: 0;
              border-bottom-right-radius: 0;
              border-radius: 8px;
              background: #f1f2f4;
            }
            [data-framer-name^="Request "][data-framer-name$=" Source"] + [data-framer-name$=" Status"] { margin-inline-start: 16px; }
            .framer-ivkTB [data-framer-name^="Request "][data-framer-name$=" Status Dot"]:not([data-framer-name="Request 1 Status Dot"]) {
              background-color: #22a06b !important;
            }
            .framer-ivkTB [data-framer-name="Request 1 Status Dot"] {
              background-color: #e67e22 !important;
            }
            .knowledge-file-icon > img {
              display: block;
              position: absolute;
              inset: 0;
              margin: auto;
              width: 20px;
              height: 20px;
              object-fit: contain;
            }
            .knowledge-cover {
              position: relative;
              flex: none;
              width: 56px;
              height: 64px;
              zoom: .75;
              border-radius: 8px;
              overflow: hidden;
              background: url("/company-copy/knowledge-cover-gradients.svg") 40% 0 / 600% 100% no-repeat;
            }
            .knowledge-cover img { position: absolute; inset: 0; width: 100%; opacity: .45; }
            .knowledge-cover span {
              position: absolute;
              inset: 11px 7px auto 10px;
              overflow: hidden;
              white-space: nowrap;
              color: white;
              font: 600 10px/14px "PingFang SC", sans-serif;
            }
            :host { display: block; position: absolute; inset: 0; }
            .framer-ivkTB.framer-72rtr7 {
              width: 100%;
              height: 100%;
              container-type: inline-size;
              background: transparent;
            }
            .framer-ivkTB .framer-17mu9k3 {
              box-sizing: border-box;
              height: 100%;
              padding: 0;
              border-bottom-left-radius: 0;
              border-bottom-right-radius: 0;
              background: transparent;
            }
          </style><link rel="stylesheet" href="/ondrel/knowledge-mobile.css?v=1">
        `;
        const wrapper = document.createElement('div');
        wrapper.className = panel.closest('.framer-ivkTB').className;
        wrapper.append(panel.cloneNode(true), symbols.cloneNode(true));
        shadow.append(wrapper);
        demo.append(illustration);
      }
    }

    new MutationObserver(mount).observe(document.body, { childList: true, subtree: true });
    mount();
  }
}
