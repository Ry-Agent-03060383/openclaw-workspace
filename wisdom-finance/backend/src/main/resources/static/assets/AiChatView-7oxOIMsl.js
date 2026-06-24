import{B as e,F as t,H as n,I as r,J as i,K as a,L as o,N as s,P as c,R as l,U as u,V as d,W as f,Z as p,et as m,i as h,it as g,l as _,nt as v,q as y,t as b,tt as x,x as S}from"./index-hhbv-s2e.js";import{t as C}from"./request-s0_2wnj_.js";function w(e){return C.post(`/ai/chat`,{message:e})}var T={class:`ai-chat-view`},E={class:`chat-header`},D={style:{"font-size":`12px`,color:`#999`}},O={class:`msg-avatar`},k={class:`msg-content`},A={class:`msg-bubble`},j={style:{"white-space":`pre-wrap`,margin:`0`,"font-family":`inherit`}},M={class:`msg-time`},N={key:0,class:`msg-row bot`},P={key:0,class:`quick-questions`},F={class:`chat-input`},I=h(n({__name:`AiChatView`,setup(n){let h=b(),C=m([]),I=m(``),L=m(!1),R=c(()=>{let e=[{label:`贷款申请流程`,text:`贷款申请流程是什么？`},{label:`征信查询`,text:`如何查询企业征信报告？`},{label:`利率说明`,text:`目前贷款利率是多少？`},{label:`所需材料`,text:`申请贷款需要什么材料？`},{label:`还款方式`,text:`有哪些还款方式？`},{label:`贷款期限`,text:`贷款期限最长多久？`}];return h.userType===`FARMER`&&e.push({label:`惠农政策`,text:`有哪些惠农贷款政策？`}),h.userType===`SME`&&e.push({label:`科技补贴`,text:`科技型企业有哪些补贴政策？`}),h.userType===`THIRD_PARTY`&&e.push({label:`服务商入驻`,text:`如何入驻成为服务商？`}),e}),z=m(null),B=[{role:`bot`,content:`您好！我是焦作市智慧金融服务平台的AI智能客服。`,time:new Date().toLocaleTimeString()},{role:`bot`,content:`我可以为您提供贷款政策咨询、业务流程指引、金融产品介绍等服务。`,time:new Date().toLocaleTimeString()},{role:`bot`,content:`请问有什么可以帮助您的？您可以直接输入问题，或点击下方快捷问题。`,time:new Date().toLocaleTimeString()}],V={"贷款申请流程是什么？":e=>e===`SME`||e===`FARMER`?`贷款申请流程如下：

1️⃣ 登录平台后进入"贷款申请"页面
2️⃣ 点击"申请贷款"按钮
3️⃣ 填写企业/个人信息、贷款金额和用途
4️⃣ 选择贷款产品和还款方式
5️⃣ 提交申请后等待金融机构审核
6️⃣ 审核通过后签署合同并放款

整个流程线上化操作，通常3-5个工作日完成审核。`:e===`FINANCIAL_INSTITUTION`?`贷款审核流程如下：

1️⃣ 登录平台后进入"贷款审核"页面
2️⃣ 查看待审核的贷款申请列表
3️⃣ 点击"通过"或"驳回"进行处理
4️⃣ 如驳回需填写驳回原因
5️⃣ 审核通过后贷款状态更新为"已通过"

系统会自动进行风险评估辅助决策。`:`贷款申请流程：
1. 企业/个人在平台提交贷款申请
2. 金融机构在线审核
3. 审核通过后签订合同
4. 银行放款

完整的流程指引请咨询平台客服。`,"如何查询企业征信报告？":()=>`企业征信查询流程：

1️⃣ 登录平台后进入"征信评级"页面
2️⃣ 在搜索框中输入企业名称或统一社会信用代码
3️⃣ 点击"查询"按钮即可查看企业信息
4️⃣ 选择目标企业后可查看信用评分和风险等级
5️⃣ 点击"生成报告"可生成正式信用报告

信用报告包含企业基本信息、信用评分、风险分析等多个维度。`,"目前贷款利率是多少？":()=>`目前平台上的贷款利率因产品和类型而异：

🏦 企业经营贷款：年利率 3.5% - 6.5%
💻 科技企业专项贷：年利率 2.5% - 4.5%
👤 个人经营贷款：年利率 4.0% - 8.0%
🌾 农户专项贷款：年利率 2.0% - 4.0%

实际利率根据企业资质、信用评分和贷款期限综合确定。信用越好，利率越低！`,"申请贷款需要什么材料？":e=>e===`SME`||e===`FINANCIAL_INSTITUTION`?`企业申请贷款需要准备的材料：

📋 基础材料：
• 营业执照（副本）
• 法定代表人身份证
• 企业征信授权书

💰 财务材料：
• 近两年财务报表
• 近6个月银行流水
• 纳税证明

🏪 经营材料：
• 经营场所证明
• 主要业务合同
• 贷款用途说明`:e===`FARMER`?`农户申请贷款需要准备的材料：

📋 基础材料：
• 身份证（正反面）
• 户口本
• 土地承包合同或经营权证

🌾 经营材料：
• 种植/养殖证明
• 近一年收入证明
• 贷款用途说明

具体材料以所选贷款产品要求为准。`:`申请贷款的基本材料包括：身份证明、经营证明、收入证明、贷款用途说明等。具体材料清单因贷款产品和企业类型而异。`,"有哪些还款方式？":()=>`平台支持以下还款方式：

💰 等额本息：每月还款金额固定，包含本金和利息
• 适合收入稳定的借款人

💰 等额本金：每月偿还相同本金，利息逐月递减
• 适合预期未来收入增长的借款人

💰 先息后本：每月只还利息，到期一次性还本
• 适合短期资金周转

请根据自身经营情况和现金流状况选择合适的还款方式。`,"贷款期限最长多久？":()=>`平台贷款期限根据产品类型有所不同：

📊 企业经营贷款：6-36个月
📊 科技企业专项贷：12-60个月
📊 个人经营贷款：3-24个月
📊 农户专项贷款：3-24个月
📊 农业产业链贷款：6-36个月

具体期限以所选贷款产品为准，建议根据资金用途和还款能力合理选择。`,"有哪些惠农贷款政策？":()=>`🌾 惠农贷款政策：

1️⃣ 农户专项贷款
• 额度：1万-30万元
• 利率：2.0%起（政府贴息）
• 期限：3-24个月
• 特点：无抵押、手续简便

2️⃣ 农业产业链贷款
• 额度：20万-300万元
• 利率：3.0%起
• 期限：6-36个月
• 特点：支持农业全产业链

3️⃣ 政府贴息政策
• 符合条件的农户可享受50%贴息
• 具体请咨询当地农业农村部门`,"科技型企业有哪些补贴政策？":()=>`💡 科技型企业扶持政策：

1️⃣ 科技企业专项贷
• 额度：50万-1000万元
• 利率：2.5%起（政府贴息）
• 特点：高新技术企业优先

2️⃣ 研发费用加计扣除
• 科技型中小企业研发费用可享受75%加计扣除

3️⃣ 科技创新券
• 用于购买检验检测、知识产权等服务

4️⃣ 科技项目补助
• 国家级/省级科技项目可获专项资金支持`,"如何入驻成为服务商？":()=>`服务商入驻流程：

1️⃣ 登录平台后联系平台运营团队
2️⃣ 提交服务商资质材料
3️⃣ 平台审核通过后签订合作协议
4️⃣ 配置服务产品和定价
5️⃣ 正式上线提供服务

如有入驻意向，请联系平台运营人员获取详细信息。`};function H(e){let t=e.trim().toLowerCase();if(t.includes(`贷款`)&&t.includes(`流程`))return V[`贷款申请流程是什么？`](h.userType);if(t.includes(`征信`)||t.includes(`报告`))return V[`如何查询企业征信报告？`](h.userType);if(t.includes(`利率`)||t.includes(`利息`))return V[`目前贷款利率是多少？`](h.userType);if(t.includes(`材料`)||t.includes(`准备`))return V[`申请贷款需要什么材料？`](h.userType);if(t.includes(`还款`)&&(t.includes(`方式`)||t.includes(`方法`)))return V[`有哪些还款方式？`](h.userType);if(t.includes(`期限`)||t.includes(`最长`))return V[`贷款期限最长多久？`](h.userType);if(t.includes(`惠农`)||t.includes(`农户`))return V[`有哪些惠农贷款政策？`](h.userType);if(t.includes(`科技`)||t.includes(`补贴`)||t.includes(`高新`))return V[`科技型企业有哪些补贴政策？`](h.userType);if(t.includes(`入驻`)||t.includes(`服务商`)||t.includes(`合作`))return V[`如何入驻成为服务商？`](h.userType);for(let{keys:e,reply:n}of[{keys:[`你好`,`您好`,`hi`,`hello`,`在吗`],reply:`您好！很高兴为您服务。请问有什么可以帮助您的？`},{keys:[`额度`,`能贷`],reply:`贷款额度因产品和资质而异，企业经营贷款最高500万元，科技专项贷最高1000万元。您可以在"贷款申请"页面查看具体产品的额度范围。`},{keys:[`审核`,`多久`,`时间`],reply:`贷款审核通常需要3-5个工作日。审核通过后，放款一般在1-3个工作日内到账。`},{keys:[`风控`,`风险`],reply:`平台采用多维度风险评估模型，从基础资质（30%）、信用记录（35%）、财务状况（25%）、行业风险（10%）四个维度进行综合评估。您可以在"风险处置"页面查看详细的风险评估报告。`},{keys:[`注册`,`开户`],reply:`平台注册流程：1. 点击登录页的"注册"按钮 2. 填写用户名、密码等基本信息 3. 选择用户类型 4. 提交后等待审核 5. 审核通过后即可登录使用。`}])if(e.some(e=>t.includes(e)))return n;return`非常抱歉，我没有理解您的问题。建议您尝试点击下方的快捷问题，或者换个方式描述您的问题。如需人工服务，请联系平台客服热线。`}f(()=>{C.value=[...B]});async function U(e){let t=(e||I.value).trim();if(!t||L.value)return;I.value=``,C.value.push({role:`user`,content:t,time:new Date().toLocaleTimeString()}),await W(),L.value=!0;let n=``;try{let e=await w(t);e.code===200&&(n=e.data.reply)}catch{}n||=(await new Promise(e=>setTimeout(e,600+Math.random()*900)),H(t)),C.value.push({role:`bot`,content:n,time:new Date().toLocaleTimeString()}),L.value=!1,await W()}async function W(){await u(),z.value&&(z.value.scrollTop=z.value.scrollHeight)}function G(e){e.key===`Enter`&&!e.shiftKey&&(e.preventDefault(),U())}return(n,c)=>{let u=i(`el-icon`),f=i(`el-button`),m=i(`el-input`),b=i(`el-card`);return a(),l(`div`,T,[d(b,{shadow:`never`,class:`chat-card`},{header:p(()=>[t(`div`,E,[t(`span`,null,[d(u,{style:{"vertical-align":`middle`,"margin-right":`6px`}},{default:p(()=>[d(x(_))]),_:1}),c[2]||=e(`AI智能客服`,-1)]),t(`span`,D,g(x(h).roleName),1)])]),default:p(()=>[t(`div`,{ref_key:`chatContainer`,ref:z,class:`chat-messages`},[(a(!0),l(s,null,y(C.value,(e,n)=>(a(),l(`div`,{key:n,class:v([`msg-row`,e.role])},[t(`div`,O,g(e.role===`bot`?`AI`:`我`),1),t(`div`,k,[t(`div`,A,[t(`pre`,j,g(e.content),1)]),t(`div`,M,g(e.time),1)])],2))),128)),L.value?(a(),l(`div`,N,[...c[3]||=[t(`div`,{class:`msg-avatar`},`AI`,-1),t(`div`,{class:`msg-content`},[t(`div`,{class:`msg-bubble typing`},[t(`span`,{class:`dot`},`.`),t(`span`,{class:`dot`},`.`),t(`span`,{class:`dot`},`.`)])],-1)]])):o(``,!0)],512),C.value.length<=4?(a(),l(`div`,P,[c[4]||=t(`span`,{class:`q-hint`},`快捷问题：`,-1),(a(!0),l(s,null,y(R.value,t=>(a(),r(f,{key:t.label,size:`small`,plain:``,onClick:e=>U(t.text)},{default:p(()=>[e(g(t.label),1)]),_:2},1032,[`onClick`]))),128))])):o(``,!0),t(`div`,F,[d(m,{modelValue:I.value,"onUpdate:modelValue":c[0]||=e=>I.value=e,type:`textarea`,rows:2,placeholder:`请输入您的问题，按 Enter 发送`,disabled:L.value,onKeydown:G},null,8,[`modelValue`,`disabled`]),d(f,{type:`primary`,icon:x(S),loading:L.value,onClick:c[1]||=e=>U(),style:{"margin-left":`12px`,"align-self":`flex-end`}},{default:p(()=>[...c[5]||=[e(`发送`,-1)]]),_:1},8,[`icon`,`loading`])])]),_:1})])}}}),[[`__scopeId`,`data-v-d1f443bb`]]);export{I as default};