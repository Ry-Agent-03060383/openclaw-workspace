/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
function scrollTo(id) { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }
// ── SEO ╱ 页面元信息 ──
onMounted(() => {
    document.title = 'AI智能服务 — 焦作市智慧金融服务平台';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
    }
    meta.setAttribute('content', '基于大模型的智能客服，7×24小时在线，AI辅助融资决策。政策问答、产品推荐、企业分析、行情洞察、方案定制、文档审核一站式智能服务。');
});
// ── 滚动入场观察 ──
const observed = ref(new Set());
function observeEntries(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observed.value.delete(entry.target);
        }
    });
}
onMounted(() => {
    const observer = new IntersectionObserver(observeEntries, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
        observed.value.add(el);
    });
});
// ── 滚动阴影 ──
const scrolled = ref(false);
function handleScroll() {
    scrolled.value = window.scrollY > 60;
}
onMounted(() => window.addEventListener('scroll', handleScroll));
const chatMessages = ref([
    {
        role: 'bot',
        content: '您好！我是智慧金融AI助手，很高兴为您服务。我可以帮您解答贷款政策、推荐金融产品、分析企业资质、查询市场行情等。请问有什么可以帮助您的？',
        time: '09:32:15',
        avatar: '🤖',
    },
    {
        role: 'user',
        content: '我想申请贷款需要什么材料？',
        time: '09:32:28',
        avatar: '👤',
    },
    {
        role: 'bot',
        content: '您好！申请贷款通常需要准备以下材料：\n\n📋 **基础材料**：营业执照副本、法定代表人身份证、企业章程\n💰 **财务材料**：近6个月银行流水、近2年度财务报表及纳税证明\n🏢 **经营材料**：经营场所租赁合同或产权证明、主要业务合同\n📑 **贷款用途**：资金使用计划说明、项目可行性报告（大额贷款）\n\n具体所需材料可能因贷款类型和金融机构要求略有差异，建议您提交意向申请后，专属客户经理会为您提供详细的材料清单。',
        time: '09:32:35',
        avatar: '🤖',
    },
]);
const chatInput = ref('');
const serviceMatrix = [
    { icon: '📋', title: '政策问答', desc: '智能解读最新金融政策、贷款补贴、税收优惠等政策信息，帮助企业把握政策红利', color: '#F56C6C' },
    { icon: '🏦', title: '产品推荐', desc: '根据企业资质和需求，AI智能匹配最优贷款产品和金融服务方案', color: '#409EFF' },
    { icon: '📊', title: '企业分析', desc: '多维度企业数据分析，生成经营画像与信用评估报告，辅助融资决策', color: '#67C23A' },
    { icon: '📈', title: '行情洞察', desc: '实时跟踪利率走势、行业景气指数、区域金融环境，提供市场洞察', color: '#E6A23C' },
    { icon: '🎯', title: '方案定制', desc: '结合企业特点和融资目标，量身定制个性化的综合金融服务方案', color: '#B37FEB' },
    { icon: '🔍', title: '文档审核', desc: 'AI辅助审查贷款申请材料，智能识别缺失、异常及风险项并给出建议', color: '#909399' },
];
const serviceStats = [
    { icon: '💬', value: '2,847', label: '服务对话数', trend: '累计对话', color: '#F56C6C' },
    { icon: '🕐', value: '7×24', label: '在线服务时长', trend: '全年无休', color: '#409EFF' },
    { icon: '⭐', value: '98.6%', label: '用户满意度', trend: '好评率', color: '#67C23A' },
];
// ── 贷款计算器 ──
const loanAmount = ref(50);
const loanTerm = ref(12);
const annualRate = 4.35;
const monthlyPayment = computed(() => {
    const P = loanAmount.value * 10000;
    const n = loanTerm.value;
    const r = annualRate / 100 / 12;
    if (r === 0)
        return P / n;
    return Math.round((P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
});
const totalInterest = computed(() => {
    return Math.round(monthlyPayment.value * loanTerm.value - loanAmount.value * 10000);
});
const totalPayment = computed(() => {
    return Math.round(monthlyPayment.value * loanTerm.value);
});
const loanTermOptions = [
    { value: 3, label: '3个月' },
    { value: 6, label: '6个月' },
    { value: 12, label: '12个月' },
    { value: 24, label: '24个月' },
    { value: 36, label: '36个月' },
    { value: 60, label: '60个月' },
];
// ── 导航 ──
function goAiChat() {
    router.push('/dashboard/ai-chat');
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
/** @type {__VLS_StyleScopedClasses['navbar-links']} */ ;
/** @type {__VLS_StyleScopedClasses['navbar-links']} */ ;
/** @type {__VLS_StyleScopedClasses['navbar-links']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-content']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-visual']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-wave']} */ ;
/** @type {__VLS_StyleScopedClasses['chat-message']} */ ;
/** @type {__VLS_StyleScopedClasses['chat-message']} */ ;
/** @type {__VLS_StyleScopedClasses['user']} */ ;
/** @type {__VLS_StyleScopedClasses['msg-avatar']} */ ;
/** @type {__VLS_StyleScopedClasses['chat-message']} */ ;
/** @type {__VLS_StyleScopedClasses['user']} */ ;
/** @type {__VLS_StyleScopedClasses['msg-content']} */ ;
/** @type {__VLS_StyleScopedClasses['chat-message']} */ ;
/** @type {__VLS_StyleScopedClasses['user']} */ ;
/** @type {__VLS_StyleScopedClasses['msg-content']} */ ;
/** @type {__VLS_StyleScopedClasses['chat-input']} */ ;
/** @type {__VLS_StyleScopedClasses['chat-send-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['matrix-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['matrix-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['matrix-card']} */ ;
/** @type {__VLS_StyleScopedClasses['matrix-card']} */ ;
/** @type {__VLS_StyleScopedClasses['matrix-card-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-card']} */ ;
/** @type {__VLS_StyleScopedClasses['calc-card']} */ ;
/** @type {__VLS_StyleScopedClasses['calc-label']} */ ;
/** @type {__VLS_StyleScopedClasses['calc-slider']} */ ;
/** @type {__VLS_StyleScopedClasses['calc-slider']} */ ;
/** @type {__VLS_StyleScopedClasses['calc-slider']} */ ;
/** @type {__VLS_StyleScopedClasses['calc-slider']} */ ;
/** @type {__VLS_StyleScopedClasses['el-input__wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['calc-term-options']} */ ;
/** @type {__VLS_StyleScopedClasses['calc-term-options']} */ ;
/** @type {__VLS_StyleScopedClasses['el-radio-button__inner']} */ ;
/** @type {__VLS_StyleScopedClasses['calc-result']} */ ;
/** @type {__VLS_StyleScopedClasses['calc-result-value']} */ ;
/** @type {__VLS_StyleScopedClasses['cta-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-links']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-links']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "ai-service-page" },
});
/** @type {__VLS_StyleScopedClasses['ai-service-page']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.nav, __VLS_intrinsics.nav)({
    ...{ class: "navbar" },
    ...{ class: ({ 'navbar-scrolled': __VLS_ctx.scrolled }) },
});
/** @type {__VLS_StyleScopedClasses['navbar']} */ ;
/** @type {__VLS_StyleScopedClasses['navbar-scrolled']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "navbar-inner section-container" },
});
/** @type {__VLS_StyleScopedClasses['navbar-inner']} */ ;
/** @type {__VLS_StyleScopedClasses['section-container']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "navbar-brand" },
});
/** @type {__VLS_StyleScopedClasses['navbar-brand']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "brand-icon" },
});
/** @type {__VLS_StyleScopedClasses['brand-icon']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "brand-text" },
});
/** @type {__VLS_StyleScopedClasses['brand-text']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "navbar-links" },
});
/** @type {__VLS_StyleScopedClasses['navbar-links']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "#chat-preview",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "#service-matrix",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "#service-stats",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "#loan-calc",
});
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    type: "danger",
    round: true,
    ...{ class: "navbar-cta" },
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    type: "danger",
    round: true,
    ...{ class: "navbar-cta" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = {
    /** @type {typeof __VLS_5.click} */
    onClick: (__VLS_ctx.goAiChat),
};
/** @type {__VLS_StyleScopedClasses['navbar-cta']} */ ;
const { default: __VLS_7 } = __VLS_3.slots;
// @ts-ignore
[scrolled, goAiChat,];
var __VLS_3;
var __VLS_4;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "hero" },
});
/** @type {__VLS_StyleScopedClasses['hero']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "hero-bg" },
});
/** @type {__VLS_StyleScopedClasses['hero-bg']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "hero-particles" },
});
/** @type {__VLS_StyleScopedClasses['hero-particles']} */ ;
for (const [i] of __VLS_vFor((12))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span)({
        key: (i),
        ...{ class: "particle" },
        ...{ style: ({ '--i': i }) },
    });
    /** @type {__VLS_StyleScopedClasses['particle']} */ ;
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "hero-content section-container" },
});
/** @type {__VLS_StyleScopedClasses['hero-content']} */ ;
/** @type {__VLS_StyleScopedClasses['section-container']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "hero-text animate-on-scroll" },
});
/** @type {__VLS_StyleScopedClasses['hero-text']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "hero-badge" },
});
/** @type {__VLS_StyleScopedClasses['hero-badge']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
    ...{ class: "hero-title" },
});
/** @type {__VLS_StyleScopedClasses['hero-title']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "hero-subtitle" },
});
/** @type {__VLS_StyleScopedClasses['hero-subtitle']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "hero-desc" },
});
/** @type {__VLS_StyleScopedClasses['hero-desc']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.br)({
    ...{ class: "hide-mobile" },
});
/** @type {__VLS_StyleScopedClasses['hide-mobile']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "hero-actions" },
});
/** @type {__VLS_StyleScopedClasses['hero-actions']} */ ;
let __VLS_8;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent1(__VLS_8, new __VLS_8({
    ...{ 'onClick': {} },
    type: "primary",
    round: true,
    size: "large",
    ...{ class: "hero-btn-primary" },
}));
const __VLS_10 = __VLS_9({
    ...{ 'onClick': {} },
    type: "primary",
    round: true,
    size: "large",
    ...{ class: "hero-btn-primary" },
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_13;
const __VLS_14 = {
    /** @type {typeof __VLS_13.click} */
    onClick: (__VLS_ctx.goAiChat),
};
/** @type {__VLS_StyleScopedClasses['hero-btn-primary']} */ ;
const { default: __VLS_15 } = __VLS_11.slots;
// @ts-ignore
[goAiChat,];
var __VLS_11;
var __VLS_12;
let __VLS_16;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent1(__VLS_16, new __VLS_16({
    ...{ 'onClick': {} },
    round: true,
    size: "large",
    plain: true,
    ...{ class: "hero-btn-ghost" },
}));
const __VLS_18 = __VLS_17({
    ...{ 'onClick': {} },
    round: true,
    size: "large",
    plain: true,
    ...{ class: "hero-btn-ghost" },
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
let __VLS_21;
const __VLS_22 = {
    /** @type {typeof __VLS_21.click} */
    onClick: (...[$event]) => {
        __VLS_ctx.scrollTo('chat-preview');
        // @ts-ignore
        [scrollTo,];
    },
};
/** @type {__VLS_StyleScopedClasses['hero-btn-ghost']} */ ;
const { default: __VLS_23 } = __VLS_19.slots;
// @ts-ignore
[];
var __VLS_19;
var __VLS_20;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "hero-visual animate-on-scroll" },
});
/** @type {__VLS_StyleScopedClasses['hero-visual']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "hero-ai-card" },
});
/** @type {__VLS_StyleScopedClasses['hero-ai-card']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "hero-ai-orb" },
});
/** @type {__VLS_StyleScopedClasses['hero-ai-orb']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    width: "200",
    height: "200",
    viewBox: "0 0 200 200",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.circle)({
    cx: "100",
    cy: "100",
    r: "70",
    fill: "none",
    stroke: "rgba(255,255,255,0.15)",
    'stroke-width': "1",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.circle)({
    cx: "100",
    cy: "100",
    r: "50",
    fill: "none",
    stroke: "rgba(255,255,255,0.2)",
    'stroke-width': "1",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.circle)({
    cx: "100",
    cy: "100",
    r: "30",
    fill: "rgba(255,255,255,0.1)",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.text, __VLS_intrinsics.text)({
    x: "100",
    y: "106",
    'text-anchor': "middle",
    fill: "#fff",
    'font-size': "36",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "hero-ai-tags" },
});
/** @type {__VLS_StyleScopedClasses['hero-ai-tags']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "ai-tag" },
});
/** @type {__VLS_StyleScopedClasses['ai-tag']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "ai-tag" },
});
/** @type {__VLS_StyleScopedClasses['ai-tag']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "ai-tag" },
});
/** @type {__VLS_StyleScopedClasses['ai-tag']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "ai-tag" },
});
/** @type {__VLS_StyleScopedClasses['ai-tag']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "hero-wave" },
});
/** @type {__VLS_StyleScopedClasses['hero-wave']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    viewBox: "0 0 1440 120",
    preserveAspectRatio: "none",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.path)({
    d: "M0,60 C360,120 720,0 1440,60 L1440,120 L0,120 Z",
    fill: "#f5f7fa",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ref: "chatPreview",
    id: "chat-preview",
    ...{ class: "section chat-section" },
});
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['chat-section']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "section-container" },
});
/** @type {__VLS_StyleScopedClasses['section-container']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "section-header animate-on-scroll" },
});
/** @type {__VLS_StyleScopedClasses['section-header']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "section-label" },
});
/** @type {__VLS_StyleScopedClasses['section-label']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "section-title" },
});
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "section-desc" },
});
/** @type {__VLS_StyleScopedClasses['section-desc']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "chat-preview-card animate-on-scroll" },
});
/** @type {__VLS_StyleScopedClasses['chat-preview-card']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "chat-header" },
});
/** @type {__VLS_StyleScopedClasses['chat-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "chat-header-info" },
});
/** @type {__VLS_StyleScopedClasses['chat-header-info']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "chat-header-avatar" },
});
/** @type {__VLS_StyleScopedClasses['chat-header-avatar']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "chat-header-name" },
});
/** @type {__VLS_StyleScopedClasses['chat-header-name']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "chat-header-status" },
});
/** @type {__VLS_StyleScopedClasses['chat-header-status']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "chat-header-actions" },
});
/** @type {__VLS_StyleScopedClasses['chat-header-actions']} */ ;
let __VLS_24;
/** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
elTag;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({
    size: "small",
    type: "danger",
    effect: "plain",
}));
const __VLS_26 = __VLS_25({
    size: "small",
    type: "danger",
    effect: "plain",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
const { default: __VLS_29 } = __VLS_27.slots;
// @ts-ignore
[];
var __VLS_27;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "chat-body" },
});
/** @type {__VLS_StyleScopedClasses['chat-body']} */ ;
for (const [msg, i] of __VLS_vFor((__VLS_ctx.chatMessages))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (i),
        ...{ class: "chat-message" },
        ...{ class: (msg.role) },
    });
    /** @type {__VLS_StyleScopedClasses['chat-message']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "msg-avatar" },
    });
    /** @type {__VLS_StyleScopedClasses['msg-avatar']} */ ;
    (msg.avatar);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "msg-content-wrapper" },
    });
    /** @type {__VLS_StyleScopedClasses['msg-content-wrapper']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ class: "msg-content" },
    });
    __VLS_asFunctionalDirective(__VLS_directives.vHtml, {})(null, { ...__VLS_directiveBindingRestFields, value: (msg.content.replace(/\n/g, '<br>').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')) }, null, null);
    /** @type {__VLS_StyleScopedClasses['msg-content']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "msg-time" },
    });
    /** @type {__VLS_StyleScopedClasses['msg-time']} */ ;
    (msg.time);
    // @ts-ignore
    [chatMessages,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "chat-footer" },
});
/** @type {__VLS_StyleScopedClasses['chat-footer']} */ ;
let __VLS_30;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input'] | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({
    modelValue: (__VLS_ctx.chatInput),
    placeholder: "请输入您的问题...",
    disabled: true,
    ...{ class: "chat-input" },
    size: "large",
}));
const __VLS_32 = __VLS_31({
    modelValue: (__VLS_ctx.chatInput),
    placeholder: "请输入您的问题...",
    disabled: true,
    ...{ class: "chat-input" },
    size: "large",
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
/** @type {__VLS_StyleScopedClasses['chat-input']} */ ;
const { default: __VLS_35 } = __VLS_33.slots;
{
    const { prefix: __VLS_36 } = __VLS_33.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "chat-input-icon" },
    });
    /** @type {__VLS_StyleScopedClasses['chat-input-icon']} */ ;
    // @ts-ignore
    [chatInput,];
}
// @ts-ignore
[];
var __VLS_33;
let __VLS_37;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_38 = __VLS_asFunctionalComponent1(__VLS_37, new __VLS_37({
    type: "danger",
    disabled: true,
    ...{ class: "chat-send-btn" },
    icon: (null),
}));
const __VLS_39 = __VLS_38({
    type: "danger",
    disabled: true,
    ...{ class: "chat-send-btn" },
    icon: (null),
}, ...__VLS_functionalComponentArgsRest(__VLS_38));
/** @type {__VLS_StyleScopedClasses['chat-send-btn']} */ ;
const { default: __VLS_42 } = __VLS_40.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.path)({
    d: "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z",
    stroke: "currentColor",
    'stroke-width': "2",
    'stroke-linecap': "round",
    'stroke-linejoin': "round",
});
// @ts-ignore
[];
var __VLS_40;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    id: "service-matrix",
    ...{ class: "section matrix-section" },
});
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['matrix-section']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "section-container" },
});
/** @type {__VLS_StyleScopedClasses['section-container']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "section-header animate-on-scroll" },
});
/** @type {__VLS_StyleScopedClasses['section-header']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "section-label" },
});
/** @type {__VLS_StyleScopedClasses['section-label']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "section-title" },
});
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "section-desc" },
});
/** @type {__VLS_StyleScopedClasses['section-desc']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "matrix-grid" },
});
/** @type {__VLS_StyleScopedClasses['matrix-grid']} */ ;
for (const [svc, i] of __VLS_vFor((__VLS_ctx.serviceMatrix))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (svc.title),
        ...{ class: "matrix-card animate-on-scroll" },
        ...{ style: ({ animationDelay: `${i * 0.1}s` }) },
    });
    /** @type {__VLS_StyleScopedClasses['matrix-card']} */ ;
    /** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "matrix-card-icon" },
        ...{ style: ({ background: svc.color + '15' }) },
    });
    /** @type {__VLS_StyleScopedClasses['matrix-card-icon']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "matrix-icon" },
    });
    /** @type {__VLS_StyleScopedClasses['matrix-icon']} */ ;
    (svc.icon);
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
        ...{ class: "matrix-card-title" },
    });
    /** @type {__VLS_StyleScopedClasses['matrix-card-title']} */ ;
    (svc.title);
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "matrix-card-desc" },
    });
    /** @type {__VLS_StyleScopedClasses['matrix-card-desc']} */ ;
    (svc.desc);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ class: "matrix-card-bar" },
        ...{ style: ({ background: svc.color }) },
    });
    /** @type {__VLS_StyleScopedClasses['matrix-card-bar']} */ ;
    // @ts-ignore
    [serviceMatrix,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    id: "service-stats",
    ...{ class: "section stats-section" },
});
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-section']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "section-container" },
});
/** @type {__VLS_StyleScopedClasses['section-container']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "section-header animate-on-scroll" },
});
/** @type {__VLS_StyleScopedClasses['section-header']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "section-label" },
});
/** @type {__VLS_StyleScopedClasses['section-label']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "section-title" },
});
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "section-desc" },
});
/** @type {__VLS_StyleScopedClasses['section-desc']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "stats-grid" },
});
/** @type {__VLS_StyleScopedClasses['stats-grid']} */ ;
for (const [stat, i] of __VLS_vFor((__VLS_ctx.serviceStats))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (stat.label),
        ...{ class: "stat-card animate-on-scroll" },
        ...{ style: ({ animationDelay: `${i * 0.12}s` }) },
    });
    /** @type {__VLS_StyleScopedClasses['stat-card']} */ ;
    /** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "stat-card-inner" },
    });
    /** @type {__VLS_StyleScopedClasses['stat-card-inner']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "stat-icon-circle" },
        ...{ style: ({ background: stat.color + '12', color: stat.color }) },
    });
    /** @type {__VLS_StyleScopedClasses['stat-icon-circle']} */ ;
    (stat.icon);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "stat-value" },
        ...{ style: ({ color: stat.color }) },
    });
    /** @type {__VLS_StyleScopedClasses['stat-value']} */ ;
    (stat.value);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "stat-label" },
    });
    /** @type {__VLS_StyleScopedClasses['stat-label']} */ ;
    (stat.label);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "stat-trend" },
    });
    /** @type {__VLS_StyleScopedClasses['stat-trend']} */ ;
    (stat.trend);
    // @ts-ignore
    [serviceStats,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    id: "loan-calc",
    ...{ class: "section calc-section" },
});
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['calc-section']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "section-container" },
});
/** @type {__VLS_StyleScopedClasses['section-container']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "section-header animate-on-scroll" },
});
/** @type {__VLS_StyleScopedClasses['section-header']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "section-label" },
});
/** @type {__VLS_StyleScopedClasses['section-label']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "section-title" },
});
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "section-desc" },
});
/** @type {__VLS_StyleScopedClasses['section-desc']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "calc-card animate-on-scroll" },
});
/** @type {__VLS_StyleScopedClasses['calc-card']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "calc-form" },
});
/** @type {__VLS_StyleScopedClasses['calc-form']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "calc-field" },
});
/** @type {__VLS_StyleScopedClasses['calc-field']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    ...{ class: "calc-label" },
});
/** @type {__VLS_StyleScopedClasses['calc-label']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
(__VLS_ctx.loanAmount);
let __VLS_43;
/** @ts-ignore @type { | typeof __VLS_components.elSlider | typeof __VLS_components.ElSlider | typeof __VLS_components['el-slider']} */
elSlider;
// @ts-ignore
const __VLS_44 = __VLS_asFunctionalComponent1(__VLS_43, new __VLS_43({
    modelValue: (__VLS_ctx.loanAmount),
    min: (1),
    max: (1000),
    step: (1),
    showInput: true,
    inputSize: "small",
    ...{ class: "calc-slider" },
}));
const __VLS_45 = __VLS_44({
    modelValue: (__VLS_ctx.loanAmount),
    min: (1),
    max: (1000),
    step: (1),
    showInput: true,
    inputSize: "small",
    ...{ class: "calc-slider" },
}, ...__VLS_functionalComponentArgsRest(__VLS_44));
/** @type {__VLS_StyleScopedClasses['calc-slider']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "calc-field" },
});
/** @type {__VLS_StyleScopedClasses['calc-field']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    ...{ class: "calc-label" },
});
/** @type {__VLS_StyleScopedClasses['calc-label']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "calc-term-options" },
});
/** @type {__VLS_StyleScopedClasses['calc-term-options']} */ ;
let __VLS_48;
/** @ts-ignore @type { | typeof __VLS_components.elRadioGroup | typeof __VLS_components.ElRadioGroup | typeof __VLS_components['el-radio-group'] | typeof __VLS_components.elRadioGroup | typeof __VLS_components.ElRadioGroup | typeof __VLS_components['el-radio-group']} */
elRadioGroup;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent1(__VLS_48, new __VLS_48({
    modelValue: (__VLS_ctx.loanTerm),
}));
const __VLS_50 = __VLS_49({
    modelValue: (__VLS_ctx.loanTerm),
}, ...__VLS_functionalComponentArgsRest(__VLS_49));
const { default: __VLS_53 } = __VLS_51.slots;
for (const [opt] of __VLS_vFor((__VLS_ctx.loanTermOptions))) {
    let __VLS_54;
    /** @ts-ignore @type { | typeof __VLS_components.elRadioButton | typeof __VLS_components.ElRadioButton | typeof __VLS_components['el-radio-button'] | typeof __VLS_components.elRadioButton | typeof __VLS_components.ElRadioButton | typeof __VLS_components['el-radio-button']} */
    elRadioButton;
    // @ts-ignore
    const __VLS_55 = __VLS_asFunctionalComponent1(__VLS_54, new __VLS_54({
        key: (opt.value),
        value: (opt.value),
    }));
    const __VLS_56 = __VLS_55({
        key: (opt.value),
        value: (opt.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_55));
    const { default: __VLS_59 } = __VLS_57.slots;
    (opt.label);
    // @ts-ignore
    [loanAmount, loanAmount, loanTerm, loanTermOptions,];
    var __VLS_57;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_51;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "calc-field" },
});
/** @type {__VLS_StyleScopedClasses['calc-field']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    ...{ class: "calc-label" },
});
/** @type {__VLS_StyleScopedClasses['calc-label']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({
    ...{ class: "calc-rate" },
});
/** @type {__VLS_StyleScopedClasses['calc-rate']} */ ;
(__VLS_ctx.annualRate);
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "calc-rate-note" },
});
/** @type {__VLS_StyleScopedClasses['calc-rate-note']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "calc-result" },
});
/** @type {__VLS_StyleScopedClasses['calc-result']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "calc-result-header" },
});
/** @type {__VLS_StyleScopedClasses['calc-result-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "calc-result-grid" },
});
/** @type {__VLS_StyleScopedClasses['calc-result-grid']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "calc-result-item" },
});
/** @type {__VLS_StyleScopedClasses['calc-result-item']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "calc-result-value highlight" },
});
/** @type {__VLS_StyleScopedClasses['calc-result-value']} */ ;
/** @type {__VLS_StyleScopedClasses['highlight']} */ ;
(__VLS_ctx.monthlyPayment.toLocaleString());
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "calc-result-label" },
});
/** @type {__VLS_StyleScopedClasses['calc-result-label']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "calc-result-item" },
});
/** @type {__VLS_StyleScopedClasses['calc-result-item']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "calc-result-value" },
});
/** @type {__VLS_StyleScopedClasses['calc-result-value']} */ ;
(__VLS_ctx.totalInterest.toLocaleString());
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "calc-result-label" },
});
/** @type {__VLS_StyleScopedClasses['calc-result-label']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "calc-result-item" },
});
/** @type {__VLS_StyleScopedClasses['calc-result-item']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "calc-result-value" },
});
/** @type {__VLS_StyleScopedClasses['calc-result-value']} */ ;
(__VLS_ctx.totalPayment.toLocaleString());
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "calc-result-label" },
});
/** @type {__VLS_StyleScopedClasses['calc-result-label']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "calc-result-item" },
});
/** @type {__VLS_StyleScopedClasses['calc-result-item']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "calc-result-value" },
});
/** @type {__VLS_StyleScopedClasses['calc-result-value']} */ ;
(__VLS_ctx.loanTerm);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "calc-result-label" },
});
/** @type {__VLS_StyleScopedClasses['calc-result-label']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "calc-disclaimer" },
});
/** @type {__VLS_StyleScopedClasses['calc-disclaimer']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "cta-section" },
});
/** @type {__VLS_StyleScopedClasses['cta-section']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ class: "cta-bg" },
});
/** @type {__VLS_StyleScopedClasses['cta-bg']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "section-container cta-content animate-on-scroll" },
});
/** @type {__VLS_StyleScopedClasses['section-container']} */ ;
/** @type {__VLS_StyleScopedClasses['cta-content']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "cta-title" },
});
/** @type {__VLS_StyleScopedClasses['cta-title']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "cta-desc" },
});
/** @type {__VLS_StyleScopedClasses['cta-desc']} */ ;
let __VLS_60;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_61 = __VLS_asFunctionalComponent1(__VLS_60, new __VLS_60({
    ...{ 'onClick': {} },
    type: "primary",
    round: true,
    size: "large",
    ...{ class: "cta-btn" },
}));
const __VLS_62 = __VLS_61({
    ...{ 'onClick': {} },
    type: "primary",
    round: true,
    size: "large",
    ...{ class: "cta-btn" },
}, ...__VLS_functionalComponentArgsRest(__VLS_61));
let __VLS_65;
const __VLS_66 = {
    /** @type {typeof __VLS_65.click} */
    onClick: (__VLS_ctx.goAiChat),
};
/** @type {__VLS_StyleScopedClasses['cta-btn']} */ ;
const { default: __VLS_67 } = __VLS_63.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    ...{ style: {} },
});
__VLS_asFunctionalElement1(__VLS_intrinsics.path)({
    d: "M5 12h14M13 5l7 7-7 7",
    fill: "none",
    stroke: "currentColor",
    'stroke-width': "2",
    'stroke-linecap': "round",
    'stroke-linejoin': "round",
});
// @ts-ignore
[goAiChat, loanTerm, annualRate, monthlyPayment, totalInterest, totalPayment,];
var __VLS_63;
var __VLS_64;
__VLS_asFunctionalElement1(__VLS_intrinsics.footer, __VLS_intrinsics.footer)({
    ...{ class: "footer" },
});
/** @type {__VLS_StyleScopedClasses['footer']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "footer-inner section-container" },
});
/** @type {__VLS_StyleScopedClasses['footer-inner']} */ ;
/** @type {__VLS_StyleScopedClasses['section-container']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "footer-brand" },
});
/** @type {__VLS_StyleScopedClasses['footer-brand']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "footer-brand-icon" },
});
/** @type {__VLS_StyleScopedClasses['footer-brand-icon']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "footer-brand-text" },
});
/** @type {__VLS_StyleScopedClasses['footer-brand-text']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "footer-links" },
});
/** @type {__VLS_StyleScopedClasses['footer-links']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "/",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "#chat-preview",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "#service-matrix",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "#service-stats",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "#loan-calc",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "footer-copyright" },
});
/** @type {__VLS_StyleScopedClasses['footer-copyright']} */ ;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
