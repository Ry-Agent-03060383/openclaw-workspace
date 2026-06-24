/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, onMounted, nextTick, computed } from 'vue';
import { useUserStore } from '../../store/user';
import { ChatDotSquare, Promotion } from '@element-plus/icons-vue';
import { aiChat } from '../../api/ai';
const userStore = useUserStore();
const messages = ref([]);
const inputText = ref('');
const loading = ref(false);
const quickQuestions = computed(() => {
    const common = [
        { label: '贷款申请流程', text: '贷款申请流程是什么？' },
        { label: '征信查询', text: '如何查询企业征信报告？' },
        { label: '利率说明', text: '目前贷款利率是多少？' },
        { label: '所需材料', text: '申请贷款需要什么材料？' },
        { label: '还款方式', text: '有哪些还款方式？' },
        { label: '贷款期限', text: '贷款期限最长多久？' },
    ];
    if (userStore.userType === 'FARMER') {
        common.push({ label: '惠农政策', text: '有哪些惠农贷款政策？' });
    }
    if (userStore.userType === 'SME') {
        common.push({ label: '科技补贴', text: '科技型企业有哪些补贴政策？' });
    }
    if (userStore.userType === 'THIRD_PARTY') {
        common.push({ label: '服务商入驻', text: '如何入驻成为服务商？' });
    }
    return common;
});
const chatContainer = ref(null);
const welcomeMessages = [
    { role: 'bot', content: '您好！我是焦作市智慧金融服务平台的AI智能客服。', time: new Date().toLocaleTimeString() },
    { role: 'bot', content: '我可以为您提供贷款政策咨询、业务流程指引、金融产品介绍等服务。', time: new Date().toLocaleTimeString() },
    { role: 'bot', content: '请问有什么可以帮助您的？您可以直接输入问题，或点击下方快捷问题。', time: new Date().toLocaleTimeString() },
];
const qaMap = {
    '贷款申请流程是什么？': (role) => {
        if (role === 'SME' || role === 'FARMER') {
            return '贷款申请流程如下：\n\n1️⃣ 登录平台后进入"贷款申请"页面\n2️⃣ 点击"申请贷款"按钮\n3️⃣ 填写企业/个人信息、贷款金额和用途\n4️⃣ 选择贷款产品和还款方式\n5️⃣ 提交申请后等待金融机构审核\n6️⃣ 审核通过后签署合同并放款\n\n整个流程线上化操作，通常3-5个工作日完成审核。';
        }
        if (role === 'FINANCIAL_INSTITUTION') {
            return '贷款审核流程如下：\n\n1️⃣ 登录平台后进入"贷款审核"页面\n2️⃣ 查看待审核的贷款申请列表\n3️⃣ 点击"通过"或"驳回"进行处理\n4️⃣ 如驳回需填写驳回原因\n5️⃣ 审核通过后贷款状态更新为"已通过"\n\n系统会自动进行风险评估辅助决策。';
        }
        return '贷款申请流程：\n1. 企业/个人在平台提交贷款申请\n2. 金融机构在线审核\n3. 审核通过后签订合同\n4. 银行放款\n\n完整的流程指引请咨询平台客服。';
    },
    '如何查询企业征信报告？': () => '企业征信查询流程：\n\n1️⃣ 登录平台后进入"征信评级"页面\n2️⃣ 在搜索框中输入企业名称或统一社会信用代码\n3️⃣ 点击"查询"按钮即可查看企业信息\n4️⃣ 选择目标企业后可查看信用评分和风险等级\n5️⃣ 点击"生成报告"可生成正式信用报告\n\n信用报告包含企业基本信息、信用评分、风险分析等多个维度。',
    '目前贷款利率是多少？': () => '目前平台上的贷款利率因产品和类型而异：\n\n🏦 企业经营贷款：年利率 3.5% - 6.5%\n💻 科技企业专项贷：年利率 2.5% - 4.5%\n👤 个人经营贷款：年利率 4.0% - 8.0%\n🌾 农户专项贷款：年利率 2.0% - 4.0%\n\n实际利率根据企业资质、信用评分和贷款期限综合确定。信用越好，利率越低！',
    '申请贷款需要什么材料？': (role) => {
        if (role === 'SME' || role === 'FINANCIAL_INSTITUTION') {
            return '企业申请贷款需要准备的材料：\n\n📋 基础材料：\n• 营业执照（副本）\n• 法定代表人身份证\n• 企业征信授权书\n\n💰 财务材料：\n• 近两年财务报表\n• 近6个月银行流水\n• 纳税证明\n\n🏪 经营材料：\n• 经营场所证明\n• 主要业务合同\n• 贷款用途说明';
        }
        if (role === 'FARMER') {
            return '农户申请贷款需要准备的材料：\n\n📋 基础材料：\n• 身份证（正反面）\n• 户口本\n• 土地承包合同或经营权证\n\n🌾 经营材料：\n• 种植/养殖证明\n• 近一年收入证明\n• 贷款用途说明\n\n具体材料以所选贷款产品要求为准。';
        }
        return '申请贷款的基本材料包括：身份证明、经营证明、收入证明、贷款用途说明等。具体材料清单因贷款产品和企业类型而异。';
    },
    '有哪些还款方式？': () => '平台支持以下还款方式：\n\n💰 等额本息：每月还款金额固定，包含本金和利息\n• 适合收入稳定的借款人\n\n💰 等额本金：每月偿还相同本金，利息逐月递减\n• 适合预期未来收入增长的借款人\n\n💰 先息后本：每月只还利息，到期一次性还本\n• 适合短期资金周转\n\n请根据自身经营情况和现金流状况选择合适的还款方式。',
    '贷款期限最长多久？': () => '平台贷款期限根据产品类型有所不同：\n\n📊 企业经营贷款：6-36个月\n📊 科技企业专项贷：12-60个月\n📊 个人经营贷款：3-24个月\n📊 农户专项贷款：3-24个月\n📊 农业产业链贷款：6-36个月\n\n具体期限以所选贷款产品为准，建议根据资金用途和还款能力合理选择。',
    '有哪些惠农贷款政策？': () => '🌾 惠农贷款政策：\n\n1️⃣ 农户专项贷款\n• 额度：1万-30万元\n• 利率：2.0%起（政府贴息）\n• 期限：3-24个月\n• 特点：无抵押、手续简便\n\n2️⃣ 农业产业链贷款\n• 额度：20万-300万元\n• 利率：3.0%起\n• 期限：6-36个月\n• 特点：支持农业全产业链\n\n3️⃣ 政府贴息政策\n• 符合条件的农户可享受50%贴息\n• 具体请咨询当地农业农村部门',
    '科技型企业有哪些补贴政策？': () => '💡 科技型企业扶持政策：\n\n1️⃣ 科技企业专项贷\n• 额度：50万-1000万元\n• 利率：2.5%起（政府贴息）\n• 特点：高新技术企业优先\n\n2️⃣ 研发费用加计扣除\n• 科技型中小企业研发费用可享受75%加计扣除\n\n3️⃣ 科技创新券\n• 用于购买检验检测、知识产权等服务\n\n4️⃣ 科技项目补助\n• 国家级/省级科技项目可获专项资金支持',
    '如何入驻成为服务商？': () => '服务商入驻流程：\n\n1️⃣ 登录平台后联系平台运营团队\n2️⃣ 提交服务商资质材料\n3️⃣ 平台审核通过后签订合作协议\n4️⃣ 配置服务产品和定价\n5️⃣ 正式上线提供服务\n\n如有入驻意向，请联系平台运营人员获取详细信息。',
};
function getResponse(input) {
    const normalized = input.trim().toLowerCase();
    if (normalized.includes('贷款') && normalized.includes('流程')) {
        return qaMap['贷款申请流程是什么？'](userStore.userType);
    }
    if (normalized.includes('征信') || normalized.includes('报告')) {
        return qaMap['如何查询企业征信报告？'](userStore.userType);
    }
    if (normalized.includes('利率') || normalized.includes('利息')) {
        return qaMap['目前贷款利率是多少？'](userStore.userType);
    }
    if (normalized.includes('材料') || normalized.includes('准备')) {
        return qaMap['申请贷款需要什么材料？'](userStore.userType);
    }
    if (normalized.includes('还款') && (normalized.includes('方式') || normalized.includes('方法'))) {
        return qaMap['有哪些还款方式？'](userStore.userType);
    }
    if (normalized.includes('期限') || normalized.includes('最长')) {
        return qaMap['贷款期限最长多久？'](userStore.userType);
    }
    if (normalized.includes('惠农') || normalized.includes('农户')) {
        return qaMap['有哪些惠农贷款政策？'](userStore.userType);
    }
    if (normalized.includes('科技') || normalized.includes('补贴') || normalized.includes('高新')) {
        return qaMap['科技型企业有哪些补贴政策？'](userStore.userType);
    }
    if (normalized.includes('入驻') || normalized.includes('服务商') || normalized.includes('合作')) {
        return qaMap['如何入驻成为服务商？'](userStore.userType);
    }
    const keywords = [
        { keys: ['你好', '您好', 'hi', 'hello', '在吗'], reply: '您好！很高兴为您服务。请问有什么可以帮助您的？' },
        { keys: ['额度', '能贷'], reply: '贷款额度因产品和资质而异，企业经营贷款最高500万元，科技专项贷最高1000万元。您可以在"贷款申请"页面查看具体产品的额度范围。' },
        { keys: ['审核', '多久', '时间'], reply: '贷款审核通常需要3-5个工作日。审核通过后，放款一般在1-3个工作日内到账。' },
        { keys: ['风控', '风险'], reply: '平台采用多维度风险评估模型，从基础资质（30%）、信用记录（35%）、财务状况（25%）、行业风险（10%）四个维度进行综合评估。您可以在"风险处置"页面查看详细的风险评估报告。' },
        { keys: ['注册', '开户'], reply: '平台注册流程：1. 点击登录页的"注册"按钮 2. 填写用户名、密码等基本信息 3. 选择用户类型 4. 提交后等待审核 5. 审核通过后即可登录使用。' },
    ];
    for (const { keys, reply } of keywords) {
        if (keys.some(k => normalized.includes(k))) {
            return reply;
        }
    }
    return '非常抱歉，我没有理解您的问题。建议您尝试点击下方的快捷问题，或者换个方式描述您的问题。如需人工服务，请联系平台客服热线。';
}
onMounted(() => {
    messages.value = [...welcomeMessages];
});
async function sendMessage(text) {
    const content = (text || inputText.value).trim();
    if (!content || loading.value)
        return;
    inputText.value = '';
    messages.value.push({ role: 'user', content, time: new Date().toLocaleTimeString() });
    await scrollToBottom();
    loading.value = true;
    let reply = '';
    try {
        const res = await aiChat(content);
        if (res.code === 200) {
            reply = res.data.reply;
        }
    }
    catch { /* fall through to client-side */ }
    if (!reply) {
        await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 900));
        reply = getResponse(content);
    }
    messages.value.push({ role: 'bot', content: reply, time: new Date().toLocaleTimeString() });
    loading.value = false;
    await scrollToBottom();
}
async function scrollToBottom() {
    await nextTick();
    if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
}
function handleKeydown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['msg-row']} */ ;
/** @type {__VLS_StyleScopedClasses['msg-row']} */ ;
/** @type {__VLS_StyleScopedClasses['msg-avatar']} */ ;
/** @type {__VLS_StyleScopedClasses['msg-row']} */ ;
/** @type {__VLS_StyleScopedClasses['user']} */ ;
/** @type {__VLS_StyleScopedClasses['msg-avatar']} */ ;
/** @type {__VLS_StyleScopedClasses['msg-row']} */ ;
/** @type {__VLS_StyleScopedClasses['bot']} */ ;
/** @type {__VLS_StyleScopedClasses['msg-bubble']} */ ;
/** @type {__VLS_StyleScopedClasses['msg-row']} */ ;
/** @type {__VLS_StyleScopedClasses['user']} */ ;
/** @type {__VLS_StyleScopedClasses['msg-bubble']} */ ;
/** @type {__VLS_StyleScopedClasses['msg-row']} */ ;
/** @type {__VLS_StyleScopedClasses['user']} */ ;
/** @type {__VLS_StyleScopedClasses['msg-time']} */ ;
/** @type {__VLS_StyleScopedClasses['typing']} */ ;
/** @type {__VLS_StyleScopedClasses['dot']} */ ;
/** @type {__VLS_StyleScopedClasses['typing']} */ ;
/** @type {__VLS_StyleScopedClasses['dot']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "ai-chat-view" },
});
/** @type {__VLS_StyleScopedClasses['ai-chat-view']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
elCard;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    shadow: "never",
    ...{ class: "chat-card" },
}));
const __VLS_2 = __VLS_1({
    shadow: "never",
    ...{ class: "chat-card" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['chat-card']} */ ;
const { default: __VLS_5 } = __VLS_3.slots;
{
    const { header: __VLS_6 } = __VLS_3.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "chat-header" },
    });
    /** @type {__VLS_StyleScopedClasses['chat-header']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    let __VLS_7;
    /** @ts-ignore @type { | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon'] | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon']} */
    elIcon;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
        ...{ style: {} },
    }));
    const __VLS_9 = __VLS_8({
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    const { default: __VLS_12 } = __VLS_10.slots;
    let __VLS_13;
    /** @ts-ignore @type { | typeof __VLS_components.ChatDotSquare} */
    ChatDotSquare;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({}));
    const __VLS_15 = __VLS_14({}, ...__VLS_functionalComponentArgsRest(__VLS_14));
    var __VLS_10;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ style: {} },
    });
    (__VLS_ctx.userStore.roleName);
    // @ts-ignore
    [userStore,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ref: "chatContainer",
    ...{ class: "chat-messages" },
});
/** @type {__VLS_StyleScopedClasses['chat-messages']} */ ;
for (const [msg, i] of __VLS_vFor((__VLS_ctx.messages))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (i),
        ...{ class: (['msg-row', msg.role]) },
    });
    /** @type {__VLS_StyleScopedClasses['msg-row']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "msg-avatar" },
    });
    /** @type {__VLS_StyleScopedClasses['msg-avatar']} */ ;
    (msg.role === 'bot' ? 'AI' : '我');
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "msg-content" },
    });
    /** @type {__VLS_StyleScopedClasses['msg-content']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "msg-bubble" },
    });
    /** @type {__VLS_StyleScopedClasses['msg-bubble']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.pre, __VLS_intrinsics.pre)({
        ...{ style: {} },
    });
    (msg.content);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "msg-time" },
    });
    /** @type {__VLS_StyleScopedClasses['msg-time']} */ ;
    (msg.time);
    // @ts-ignore
    [messages,];
}
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "msg-row bot" },
    });
    /** @type {__VLS_StyleScopedClasses['msg-row']} */ ;
    /** @type {__VLS_StyleScopedClasses['bot']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "msg-avatar" },
    });
    /** @type {__VLS_StyleScopedClasses['msg-avatar']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "msg-content" },
    });
    /** @type {__VLS_StyleScopedClasses['msg-content']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "msg-bubble typing" },
    });
    /** @type {__VLS_StyleScopedClasses['msg-bubble']} */ ;
    /** @type {__VLS_StyleScopedClasses['typing']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "dot" },
    });
    /** @type {__VLS_StyleScopedClasses['dot']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "dot" },
    });
    /** @type {__VLS_StyleScopedClasses['dot']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "dot" },
    });
    /** @type {__VLS_StyleScopedClasses['dot']} */ ;
}
if (__VLS_ctx.messages.length <= 4) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "quick-questions" },
    });
    /** @type {__VLS_StyleScopedClasses['quick-questions']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "q-hint" },
    });
    /** @type {__VLS_StyleScopedClasses['q-hint']} */ ;
    for (const [q] of __VLS_vFor((__VLS_ctx.quickQuestions))) {
        let __VLS_18;
        /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
        elButton;
        // @ts-ignore
        const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
            ...{ 'onClick': {} },
            key: (q.label),
            size: "small",
            plain: true,
        }));
        const __VLS_20 = __VLS_19({
            ...{ 'onClick': {} },
            key: (q.label),
            size: "small",
            plain: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_19));
        let __VLS_23;
        const __VLS_24 = {
            /** @type {typeof __VLS_23.click} */
            onClick: (...[$event]) => {
                if (!(__VLS_ctx.messages.length <= 4))
                    return;
                __VLS_ctx.sendMessage(q.text);
                // @ts-ignore
                [messages, loading, quickQuestions, sendMessage,];
            },
        };
        const { default: __VLS_25 } = __VLS_21.slots;
        (q.label);
        // @ts-ignore
        [];
        var __VLS_21;
        var __VLS_22;
        // @ts-ignore
        [];
    }
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "chat-input" },
});
/** @type {__VLS_StyleScopedClasses['chat-input']} */ ;
let __VLS_26;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent1(__VLS_26, new __VLS_26({
    ...{ 'onKeydown': {} },
    modelValue: (__VLS_ctx.inputText),
    type: "textarea",
    rows: (2),
    placeholder: "请输入您的问题，按 Enter 发送",
    disabled: (__VLS_ctx.loading),
}));
const __VLS_28 = __VLS_27({
    ...{ 'onKeydown': {} },
    modelValue: (__VLS_ctx.inputText),
    type: "textarea",
    rows: (2),
    placeholder: "请输入您的问题，按 Enter 发送",
    disabled: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_27));
let __VLS_31;
const __VLS_32 = {
    /** @type {typeof __VLS_31.keydown} */
    onKeydown: (__VLS_ctx.handleKeydown),
};
var __VLS_29;
var __VLS_30;
let __VLS_33;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_34 = __VLS_asFunctionalComponent1(__VLS_33, new __VLS_33({
    ...{ 'onClick': {} },
    type: "primary",
    icon: (__VLS_ctx.Promotion),
    loading: (__VLS_ctx.loading),
    ...{ style: {} },
}));
const __VLS_35 = __VLS_34({
    ...{ 'onClick': {} },
    type: "primary",
    icon: (__VLS_ctx.Promotion),
    loading: (__VLS_ctx.loading),
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_34));
let __VLS_38;
const __VLS_39 = {
    /** @type {typeof __VLS_38.click} */
    onClick: (...[$event]) => {
        __VLS_ctx.sendMessage();
        // @ts-ignore
        [loading, loading, sendMessage, inputText, handleKeydown, Promotion,];
    },
};
const { default: __VLS_40 } = __VLS_36.slots;
// @ts-ignore
[];
var __VLS_36;
var __VLS_37;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
