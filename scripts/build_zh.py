from pathlib import Path
from html.parser import HTMLParser
import json,re

root=Path(__file__).resolve().parents[1]

def remove_home_manifesto(content):
    class SectionRange(HTMLParser):
        def __init__(self):
            super().__init__(convert_charrefs=False)
            self.lines=[0]+[m.end() for m in re.finditer('\n',content)]
            self.depth=0
            self.ranges=[]
        def source_offset(self):
            line,column=self.getpos()
            return self.lines[line-1]+column
        def handle_starttag(self,tag,attrs):
            if tag!='div':return
            if self.depth:self.depth+=1
            elif dict(attrs).get('data-framer-name')=='Manifesto':
                self.start=self.source_offset()
                self.depth=1
        def handle_endtag(self,tag):
            if tag=='div' and self.depth:
                self.depth-=1
                if self.depth==0:self.ranges.append((self.start,content.index('>',self.source_offset())+1))
    parser=SectionRange()
    parser.feed(content)
    if not parser.ranges or parser.depth:raise ValueError('Homepage Manifesto wrapper changed; inspect before removing')
    for start,end in reversed(parser.ranges):content=content[:start]+content[end:]
    return content
source=json.loads((root/'RECON/translation-source.json').read_text(encoding='utf-8'))
dictionary={}
for line in (root/'scripts/zh-translations.tsv').read_text(encoding='utf-8').splitlines():
    if '|' not in line:continue
    index,value=line.split('|',1);dictionary[source[int(index)]]=value

dictionary.update({
    'Services:/services, Work:/work, Process:/process, Pricing:/pricing, About:/about, Journal:/journal':'产品能力:/services, 解决方案:/work, 文档中心:/process, 价格:/pricing, 关于我们:/about, 观察:/journal',
    'Automate the work':'企业级 AI',
    'nobody *wants.*':'赋能制造业 *智能升级*',
    'Automate the work nobody wants.':'企业级 AI 赋能制造业智能升级',
    'Pick a time.':'选择时间。','Times in':'时区：',
    'people':'人','Back':'返回','back':'返回','h':'小时','s':'秒','wks':'周','min':'分钟','yrs':'年',
    'Operations people|who *build* agents.':'懂运营的人，|也懂*智能体*开发。',
    'Notes from|the *build.*':'开发一线|*手记。*',
    'Privacy &|*terms.*':'隐私与|*条款。*',
    'voice':'语音','workflow':'工作流','support':'客服','knowledge':'知识库','apps':'应用',
    'Something about an agent we built for you':'咨询我们为你开发的智能体',
    'Agencies, platforms and referrals':'机构、平台与转介绍合作',
    'Interviews, talks and quotes':'采访、演讲与媒体引述',
    'of conversations solved without a person':'的对话无需人工解决',
    'given back to each person, every month':'每人每月节省的时间',
    'Most teams lose a third of their week {1} to work a machine could do: copying data, chasing replies, answering the same questions {2} again and again. We build the AI agents that take that work off their desks, {3} so people get back to the part only people can do.':'大多数团队每周有三分之一的时间 {1} 花在机器就能完成的工作上：复制数据、催促回复、反复回答相同问题 {2}。我们打造 AI 智能体，接手这些重复事务 {3}，让大家回归只有人才能做好的工作。',
    'en-US':'zh-CN','en-GB':'zh-CN',
    'appointments':'预约量','design':'设计','build':'开发','builders':'开发成员','core':'核心',
    'tickets solved by AI':'工单由 AI 解决','tickets per person':'每人处理工单量',
    'of matters indexed':'年案件资料已索引','answers cited':'回答附带来源',
    'saved per associate weekly':'每位律师每周节省时间',
    'Closed · opens 09:00':'休息中 · 09:00 开始服务',
    "We're online":'当前在线',
    'of purchase, then pro-rated for the remaining months.':'内全额退款，之后按剩余月份比例退款。',
    'the AI':'AI',
    'Step inside the AI':'走进 AI','Step insidethe AI':'走进 AI',
    '38 s':'38 秒','40 s':'40 秒','31 h':'31 小时','9 s':'9 秒',
    '11 h':'11 小时','6 h':'6 小时','14 yrs':'14 年','+9 pts':'+9 分',
    '3x':'3 倍','12 h':'12 小时','2 min':'2 分钟',
    'Sending…':'发送中…','Sending...':'发送中…','Send another':'再次发送',
    'Copied':'已复制','Copied!':'已复制！','Required':'必填',
    'Select':'请选择','Select a service':'请选择服务','Select a topic':'请选择主题',
    'January':'1 月','February':'2 月','March':'3 月','April':'4 月','May':'5 月','June':'6 月',
    'July':'7 月','August':'8 月','September':'9 月','October':'10 月','November':'11 月','December':'12 月',
    'Sunday':'星期日','Monday':'星期一','Tuesday':'星期二','Wednesday':'星期三','Thursday':'星期四','Friday':'星期五','Saturday':'星期六',
    'Sun':'周日','Sat':'周六',
    'DONE':'完成','Done':'完成',
    'done':'完成',
    'Luma Studio':'Luma Studio',
    'Daniel Ortiz, COO':'Daniel Ortiz，首席运营官',
    'Leads to CRM · agent':'线索录入 CRM · 智能体',
    'Legal1':'法律服务 1','Working agent':'工作中的智能体',
    'Agents for the work|your team *repeats.*':'为团队的|*重复工作*打造智能体。',
    'Agents that are|*already working.*':'已经投入|*实际工作*的智能体。',
    'Ask the|*agent.*':'向智能体|*提问。*',
    'Clear prices.|*No* retainers you forget.':'价格清晰。|每笔费用*心中有数。*',
    'Clear prices.|*No* surprises.':'价格清晰。|*没有*意外费用。',
    'Five kinds of agents, each built around a process you already run.':'五类智能体，分别围绕你现有的业务流程构建。',
    'Five kinds of agents.|One *standard.*':'看见 AI|怎样完成一份*工作*',
    'Five weeks from|audit to *autopilot.*':'五周，从评估|到*自主运行。*',
    'From audit to|*autopilot* in five weeks.':'五周，从评估|到*自主运行。*',
    'Ready when|*you are.*':'随时|*为你准备好。*',
    'Same week.|*Different* job.':'同样的一周。|*不一样的*工作。',
    'Book your free|*automation audit.*':'预约免费|*自动化评估。*',
    "Let's talk about|your *busywork.*":'聊聊那些|*耗时的琐事。*',
    'Numbers from agents in *production.*':'来自*实际运行中*智能体的数据。',
    'Ten agents.|*One* core.':'十个智能体。|*一个*核心。',
    'We build the agents we|wished we *had.*':'打造我们自己|也曾*期待拥有的*智能体。',
    'Click to morph':'点击切换形态',
    'A calendar invite is on its way. Your reference is':'日历邀请即将发送。你的预约编号是',
    'A sentence or two helps us reply properly.':'请用一两句话说明，方便我们准确回复。',
    'Anything we should read first? (optional)':'有什么资料需要我们提前了解？（选填）',
    'Choose your team size.':'请选择团队规模。',
    'Confirm booking':'确认预约',
    'Hours a week lost to repetitive work':'每周耗在重复工作上的时间',
    'Message received.':'留言已收到。',
    'No case studies in this industry yet.':'这个行业暂时没有案例。',
    'Nothing here yet.':'暂无内容。',
    'Pick a day and a time.':'请选择日期和时间。',
    'Pick at least one service or a plan.':'请至少选择一项服务或一个方案。',
    'Please add a valid email.':'请输入有效的邮箱地址。',
    'Please add a valid work email.':'请输入有效的工作邮箱。',
    'Please add your name.':'请填写姓名。',
    'Team online now':'团队当前在线',
    'Team size':'团队规模',
    'Tell us about your team.':'介绍一下你的团队。',
    'Where should we send the invite?':'邀请应该发送到哪里？',
    "You're booked.":'预约成功。',
    'We will reply within two working hours. Your reference is':'我们将在两个工作小时内回复。你的咨询编号是',
    'Close':'关闭','CLOSE':'关闭','Close menu':'关闭菜单',
    'Morph the core, now showing Workflow':'切换核心形态，当前显示：工作流',
    'Morph the core, now showing Knowledge base':'切换核心形态，当前显示：知识库',
    'Fixed quote for the build':'开发固定报价',
    'Oakline Home — 7 in 10 support tickets closed by AI | argus Case Study':'Oakline Home — 每 10 张客服工单中有 7 张由 AI 解决 | argus 案例',
    'Vantage Legal — Every precedent, found in seconds | argus Case Study':'Vantage Legal — 数秒找到每一份判例 | argus 案例',
    'What a voice agent changed at six dental clinics | argus Journal':'语音智能体为六家牙科诊所带来了什么改变 | argus 观察',
    'Made in Framer':'使用 Framer 构建',
})
# Build composite CMS metrics/lists and accessible labels from exact translated
# fragments. Keep IDs, routes, product names, contacts and numeric values intact.
for _ in range(3):
    fragments=sorted(((k,v) for k,v in dictionary.items() if len(k)>=6),key=lambda item:-len(item[0]))
    pattern=re.compile('|'.join(re.escape(k) for k,_ in fragments))
    for value in source:
        if value in dictionary:continue
        translated=pattern.sub(lambda m:dictionary[m[0]],value)
        if translated!=value:dictionary[value]=translated
# Translate delimited defaults without changing their separators or emphasis.
extra=json.loads((root/'RECON/translation-extra2.json').read_text(encoding='utf-8'))
fragments=sorted(((k,v) for k,v in dictionary.items() if len(k)>=6),key=lambda item:-len(item[0]))
pattern=re.compile('|'.join(re.escape(k) for k,_ in fragments))
for value in extra:
    if value in dictionary:continue
    if ('|' in value or ';' in value) and not any(c in value for c in ('`','(',')','{','}','[',']','=','document.')):
        translated=pattern.sub(lambda m:dictionary[m[0]],value)
        if translated!=value:dictionary[value]=translated
for key,value in list(dictionary.items()):
    # The original heading parser recognizes emphasis only on a whole space-
    # delimited token. Keep that contract for CJK copy as well.
    if '*' in value:
        value=re.sub(r'\*([^*]+)\*',r' *\1* ',value)
        value=re.sub(r'[ \t]+',' ',value).replace(' |','|').replace('| ','|').strip()
        dictionary[key]=value
    if len(key)>2:dictionary.setdefault(key.upper(),value)
(root/'site/zh-cn.json').write_text(json.dumps(dictionary,ensure_ascii=False,indent=2),encoding='utf-8')
template=(root/'scripts/zh-runtime.js').read_text(encoding='utf-8')
(root/'site/zh-cn.js').write_text(template.replace('/*DICTIONARY*/{}',json.dumps(dictionary,ensure_ascii=False,separators=(',',':'))),encoding='utf-8')
from localization import localize_html
from common import transform
from external_styles import externalize_html
for original in (root/'originals').rglob('index.html'):
    path=root/'site'/original.relative_to(root/'originals')
    content=localize_html(transform(original.read_text(encoding='utf-8'),html=True))
    logo='<a class="fchd-logo" href="/" aria-label="朝夕智能，首页"><img class="chaoxi-logo-white" src="/brand/logo_w.svg" alt="" width="131" height="32"><img class="chaoxi-logo-light" src="/brand/logo_l.svg" alt="" width="131" height="32"></a>'
    content=re.sub(r'<a\b[^>]*class="fchd-logo"[^>]*>.*?</a>',logo,content,flags=re.S)
    header_labels={'服务':'产品能力','案例':'解决方案','流程':'文档中心'}
    content=re.sub(r'<header\b[^>]*>.*?</header>',
                   lambda section:re.sub(r'(?<=>)(服务|案例|流程)(?=</a>)',
                                         lambda label:header_labels[label[0]],section[0]),
                   content,flags=re.S)
    if original.parent == root/'originals':
        content=remove_home_manifesto(content)
        # Match only the rendered homepage Hero, including both animated labels.
        content=re.sub(r'<section\b[^>]*class="fc fch [^"]*"[^>]*>.*?</section>',
                       lambda match:match[0].replace('预约免费评估','探索业务应用')
                                           .replace('第四季度项目预约中 · 剩余 3 个名额','工业模型')
                                           .replace('AI 自动化工作室','FDE 现场工程')
                                           .replace('线索已回复','AI Agent 平台'),
                       content,count=1,flags=re.S)
        content=re.sub(r'(<b>AI Agent 平台</b>)\s*<span\b[^>]*>[^<]*</span>',r'\1',content)
        content=re.sub(r'<li\b[^>]*class="fch-chip\b[^"]*"[^>]*>.*?</li>',
                       lambda match:'' if re.search(r'<b\b[^>]*>(发票已入账|工单已解决)</b>',match[0]) else match[0],
                       content,flags=re.S)
        content=content.replace('</head>','<script src="/orynthiq/mount.js" defer></script><script src="/hero-layout.js" defer></script></head>')
        # Keep the homepage particle captions scoped to the hero at every breakpoint.
        particle_labels={'语音智能体':'企业知识','工作流':'业务执行','知识库':'系统连接'}
        content=re.sub(r'<span\b[^>]*class="fch-shape"[^>]*>.*?</span>',
                       lambda match:re.sub(r'(?<=>)(语音智能体|工作流|知识库)(?=</b>)',
                                           lambda label:particle_labels[label[0]],match[0]),
                       content,flags=re.S)
        content=content.replace('切换核心形态，当前显示：语音智能体','切换核心形态，当前显示：企业知识')
    content=content.replace('</head>','<script src="/stylesheet-runtime.js"></script></head>')
    content=re.sub(r'<html\b(?![^>]*data-overlayscrollbars-initialize)','<html data-overlayscrollbars-initialize',content)
    content=re.sub(r'<body\b(?![^>]*data-overlayscrollbars-initialize)','<body data-overlayscrollbars-initialize',content)
    content=content.replace('<head>','<head><link rel="stylesheet" href="/vendor/overlayscrollbars-2.17.0.css">')
    path.write_text(externalize_html(content),encoding='utf-8')
unmapped=[f'{i}|{s}' for i,s in enumerate(source) if s not in dictionary]
(root/'RECON/translation-unmapped.tsv').write_text('\n'.join(unmapped),encoding='utf-8')
print('Chinese dictionary:',len(dictionary),'entries; unmapped source strings:',len(unmapped))
