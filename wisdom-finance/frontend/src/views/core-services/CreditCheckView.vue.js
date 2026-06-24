/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
// ── SEO ╱ 页面元信息 ──
onMounted(() => {
    document.title = '信用体检 — 焦作市智慧金融服务平台';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
    }
    meta.setAttribute('content', '多维数据融合，企业信用一键体检。焦作市智慧金融服务平台提供企业信用评分、5维评分体系、信用体检报告等一站式信用服务。');
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
function goLogin() {
    router.push('/login');
}
const donutData = [
    { label: '优秀 (80-100)', value: 20, color: '#67C23A', icon: '🏆' },
    { label: '良好 (60-79)', value: 40, color: '#409EFF', icon: '👍' },
    { label: '一般 (40-59)', value: 30, color: '#E6A23C', icon: '⚠️' },
    { label: '较差 (0-39)', value: 10, color: '#F56C6C', icon: '🔻' },
];
// SVG donut: accumulate angles
const donutRadius = 90;
const donutStroke = 28;
const donutCx = 120;
const donutCy = 120;
const donutCircumference = 2 * Math.PI * donutRadius;
const donutArcs = computed(() => {
    let currentOffset = 0;
    return donutData.map(seg => {
        const length = (seg.value / 100) * donutCircumference;
        const arc = { offset: currentOffset, length, color: seg.color };
        currentOffset += length;
        return arc;
    });
});
const dimensions = [
    { name: '基础信息', percentage: 20, color: '#67C23A', icon: '📋', desc: '企业工商登记、股东结构、经营资质等基础数据' },
    { name: '信贷历史', percentage: 25, color: '#409EFF', icon: '🏦', desc: '历史借贷记录、还款履约情况、授信额度使用' },
    { name: '财务状况', percentage: 35, color: '#E6A23C', icon: '📊', desc: '资产负债率、现金流、营收增长、盈利指标' },
    { name: '法律合规', percentage: 12, color: '#909399', icon: '⚖️', desc: '涉诉记录、行政处罚、经营异常、合规审查' },
    { name: '行业前景', percentage: 8, color: '#B37FEB', icon: '🚀', desc: '行业景气度、政策导向、市场竞争格局' },
];
const steps = [
    { icon: '🔑', title: '企业授权', desc: '企业在线签署数据授权协议，合规采集信用数据' },
    { icon: '📡', title: '数据采集', desc: '对接工商、税务、司法、银行等多源异构数据' },
    { icon: '🧠', title: '智能分析', desc: 'AI模型多维度交叉验证，生成企业信用画像' },
    { icon: '📄', title: '体检报告', desc: '输出可视化信用报告，含评分、风险提示与建议' },
];
const features = [
    { icon: '🔗', title: '多源数据融合', desc: '整合政务数据、金融数据、公开数据等20+数据源，全方位画像企业信用' },
    { icon: '🤖', title: 'AI智能评估', desc: '基于深度学习模型的信用评分引擎，秒级输出精准评级结果' },
    { icon: '📱', title: '全流程线上化', desc: '从授权、采集到报告输出全程线上操作，企业足不出户完成体检' },
    { icon: '🔒', title: '数据安全合规', desc: '通过国密算法加密传输存储，严格遵循数据安全法和个人信息保护法' },
];
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
/** @type {__VLS_StyleScopedClasses['hero-wave']} */ ;
/** @type {__VLS_StyleScopedClasses['hero']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-content']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-visual']} */ ;
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['legend-item']} */ ;
/** @type {__VLS_StyleScopedClasses['legend-note']} */ ;
/** @type {__VLS_StyleScopedClasses['dim-card']} */ ;
/** @type {__VLS_StyleScopedClasses['dims-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['dims-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['dim-card']} */ ;
/** @type {__VLS_StyleScopedClasses['step-card']} */ ;
/** @type {__VLS_StyleScopedClasses['process-steps']} */ ;
/** @type {__VLS_StyleScopedClasses['step-connector']} */ ;
/** @type {__VLS_StyleScopedClasses['step-item']} */ ;
/** @type {__VLS_StyleScopedClasses['step-connector']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-card']} */ ;
/** @type {__VLS_StyleScopedClasses['features-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['cta-section']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-links']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-links']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "credit-check-page" },
});
/** @type {__VLS_StyleScopedClasses['credit-check-page']} */ ;
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
    href: "#score-model",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "#dimensions",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "#process",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "#features",
});
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    type: "success",
    round: true,
    ...{ class: "navbar-cta" },
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    type: "success",
    round: true,
    ...{ class: "navbar-cta" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = {
    /** @type {typeof __VLS_5.click} */
    onClick: (__VLS_ctx.goLogin),
};
/** @type {__VLS_StyleScopedClasses['navbar-cta']} */ ;
const { default: __VLS_7 } = __VLS_3.slots;
// @ts-ignore
[scrolled, goLogin,];
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
    onClick: (__VLS_ctx.goLogin),
};
/** @type {__VLS_StyleScopedClasses['hero-btn-primary']} */ ;
const { default: __VLS_15 } = __VLS_11.slots;
// @ts-ignore
[goLogin,];
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
        __VLS_ctx.router.push('/');
        // @ts-ignore
        [router,];
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
    ...{ class: "hero-card-stack" },
});
/** @type {__VLS_StyleScopedClasses['hero-card-stack']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "hero-card card-1" },
});
/** @type {__VLS_StyleScopedClasses['hero-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-1']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "hero-card card-2" },
});
/** @type {__VLS_StyleScopedClasses['hero-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-2']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "hero-card card-3" },
});
/** @type {__VLS_StyleScopedClasses['hero-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-3']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "hero-card card-4" },
});
/** @type {__VLS_StyleScopedClasses['hero-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-4']} */ ;
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
    id: "score-model",
    ...{ class: "section score-section" },
});
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['score-section']} */ ;
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
    ...{ class: "score-content" },
});
/** @type {__VLS_StyleScopedClasses['score-content']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "chart-area animate-on-scroll" },
});
/** @type {__VLS_StyleScopedClasses['chart-area']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "donut-wrapper" },
});
/** @type {__VLS_StyleScopedClasses['donut-wrapper']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    width: "240",
    height: "240",
    viewBox: "0 0 240 240",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.circle)({
    cx: (__VLS_ctx.donutCx),
    cy: (__VLS_ctx.donutCy),
    r: (__VLS_ctx.donutRadius),
    fill: "none",
    stroke: "#f0f2f5",
    'stroke-width': (__VLS_ctx.donutStroke),
});
for (const [arc, i] of __VLS_vFor((__VLS_ctx.donutArcs))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.circle)({
        key: (i),
        cx: (__VLS_ctx.donutCx),
        cy: (__VLS_ctx.donutCy),
        r: (__VLS_ctx.donutRadius),
        fill: "none",
        stroke: (arc.color),
        'stroke-width': (__VLS_ctx.donutStroke),
        'stroke-linecap': "round",
        'stroke-dasharray': (`${arc.length} ${__VLS_ctx.donutCircumference - arc.length}`),
        'stroke-dashoffset': (-arc.offset),
        transform: "rotate(-90 120 120)",
        ...{ class: "donut-segment" },
        ...{ style: ({ animationDelay: `${i * 0.15}s` }) },
    });
    /** @type {__VLS_StyleScopedClasses['donut-segment']} */ ;
    // @ts-ignore
    [donutCx, donutCx, donutCy, donutCy, donutRadius, donutRadius, donutStroke, donutStroke, donutArcs, donutCircumference,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.text, __VLS_intrinsics.text)({
    x: "120",
    y: "112",
    'text-anchor': "middle",
    ...{ class: "donut-center-value" },
});
/** @type {__VLS_StyleScopedClasses['donut-center-value']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.text, __VLS_intrinsics.text)({
    x: "120",
    y: "132",
    'text-anchor': "middle",
    ...{ class: "donut-center-label" },
});
/** @type {__VLS_StyleScopedClasses['donut-center-label']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "legend-area animate-on-scroll" },
});
/** @type {__VLS_StyleScopedClasses['legend-area']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "legend-title" },
});
/** @type {__VLS_StyleScopedClasses['legend-title']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "legend-items" },
});
/** @type {__VLS_StyleScopedClasses['legend-items']} */ ;
for (const [item, i] of __VLS_vFor((__VLS_ctx.donutData))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (i),
        ...{ class: "legend-item" },
    });
    /** @type {__VLS_StyleScopedClasses['legend-item']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span)({
        ...{ class: "legend-dot" },
        ...{ style: ({ background: item.color }) },
    });
    /** @type {__VLS_StyleScopedClasses['legend-dot']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "legend-icon" },
    });
    /** @type {__VLS_StyleScopedClasses['legend-icon']} */ ;
    (item.icon);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "legend-label" },
    });
    /** @type {__VLS_StyleScopedClasses['legend-label']} */ ;
    (item.label);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "legend-value" },
        ...{ style: ({ color: item.color }) },
    });
    /** @type {__VLS_StyleScopedClasses['legend-value']} */ ;
    (item.value);
    // @ts-ignore
    [donutData,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "legend-note" },
});
/** @type {__VLS_StyleScopedClasses['legend-note']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    id: "dimensions",
    ...{ class: "section dims-section" },
});
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['dims-section']} */ ;
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
    ...{ class: "dims-grid" },
});
/** @type {__VLS_StyleScopedClasses['dims-grid']} */ ;
for (const [dim, i] of __VLS_vFor((__VLS_ctx.dimensions))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (i),
        ...{ class: "dim-card animate-on-scroll" },
        ...{ style: ({ animationDelay: `${i * 0.1}s` }) },
    });
    /** @type {__VLS_StyleScopedClasses['dim-card']} */ ;
    /** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "dim-radial" },
    });
    /** @type {__VLS_StyleScopedClasses['dim-radial']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        width: "120",
        height: "120",
        viewBox: "0 0 120 120",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.circle)({
        cx: "60",
        cy: "60",
        r: "48",
        fill: "none",
        stroke: "#f0f2f5",
        'stroke-width': "8",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.circle)({
        cx: "60",
        cy: "60",
        r: "48",
        fill: "none",
        stroke: (dim.color),
        'stroke-width': "8",
        'stroke-linecap': "round",
        'stroke-dasharray': (`${(dim.percentage / 100) * 2 * Math.PI * 48} ${2 * Math.PI * 48}`),
        transform: "rotate(-90 60 60)",
        ...{ class: "dim-progress" },
        ...{ style: ({ animationDelay: `${i * 0.15 + 0.3}s` }) },
    });
    /** @type {__VLS_StyleScopedClasses['dim-progress']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.text, __VLS_intrinsics.text)({
        x: "60",
        y: "56",
        'text-anchor': "middle",
        ...{ class: "dim-pct-value" },
        ...{ style: ({ fill: dim.color }) },
    });
    /** @type {__VLS_StyleScopedClasses['dim-pct-value']} */ ;
    (dim.percentage);
    __VLS_asFunctionalElement1(__VLS_intrinsics.text, __VLS_intrinsics.text)({
        x: "60",
        y: "72",
        'text-anchor': "middle",
        ...{ class: "dim-pct-label" },
    });
    /** @type {__VLS_StyleScopedClasses['dim-pct-label']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "dim-info" },
    });
    /** @type {__VLS_StyleScopedClasses['dim-info']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "dim-icon" },
    });
    /** @type {__VLS_StyleScopedClasses['dim-icon']} */ ;
    (dim.icon);
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
        ...{ class: "dim-name" },
    });
    /** @type {__VLS_StyleScopedClasses['dim-name']} */ ;
    (dim.name);
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "dim-desc" },
    });
    /** @type {__VLS_StyleScopedClasses['dim-desc']} */ ;
    (dim.desc);
    // @ts-ignore
    [dimensions,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    id: "process",
    ...{ class: "section process-section" },
});
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['process-section']} */ ;
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
    ...{ class: "process-steps" },
});
/** @type {__VLS_StyleScopedClasses['process-steps']} */ ;
for (const [step, i] of __VLS_vFor((__VLS_ctx.steps))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (i),
        ...{ class: "step-item animate-on-scroll" },
        ...{ style: ({ animationDelay: `${i * 0.12}s` }) },
    });
    /** @type {__VLS_StyleScopedClasses['step-item']} */ ;
    /** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
    if (i < __VLS_ctx.steps.length - 1) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "step-connector" },
        });
        /** @type {__VLS_StyleScopedClasses['step-connector']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
            width: "40",
            height: "40",
            viewBox: "0 0 40 40",
        });
        __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
            d: "M5 20 L35 20",
            stroke: "#67C23A",
            'stroke-width': "2",
            'stroke-dasharray': "6 4",
            fill: "none",
            ...{ class: "step-arrow-line" },
        });
        /** @type {__VLS_StyleScopedClasses['step-arrow-line']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.polygon)({
            points: "33,16 38,20 33,24",
            fill: "#67C23A",
            ...{ class: "step-arrow-head" },
        });
        /** @type {__VLS_StyleScopedClasses['step-arrow-head']} */ ;
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "step-card" },
    });
    /** @type {__VLS_StyleScopedClasses['step-card']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "step-number" },
        ...{ style: ({ background: `rgba(103,194,58,${1 - i * 0.15})` }) },
    });
    /** @type {__VLS_StyleScopedClasses['step-number']} */ ;
    (i + 1);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "step-icon" },
    });
    /** @type {__VLS_StyleScopedClasses['step-icon']} */ ;
    (step.icon);
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
        ...{ class: "step-title" },
    });
    /** @type {__VLS_StyleScopedClasses['step-title']} */ ;
    (step.title);
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "step-desc" },
    });
    /** @type {__VLS_StyleScopedClasses['step-desc']} */ ;
    (step.desc);
    // @ts-ignore
    [steps, steps,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    id: "features",
    ...{ class: "section features-section" },
});
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['features-section']} */ ;
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
    ...{ class: "features-grid" },
});
/** @type {__VLS_StyleScopedClasses['features-grid']} */ ;
for (const [feat, i] of __VLS_vFor((__VLS_ctx.features))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (i),
        ...{ class: "feature-card animate-on-scroll" },
        ...{ style: ({ animationDelay: `${i * 0.1}s` }) },
    });
    /** @type {__VLS_StyleScopedClasses['feature-card']} */ ;
    /** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "feature-icon-wrapper" },
        ...{ style: ({ background: `rgba(103,194,58,${0.1 + i * 0.02})` }) },
    });
    /** @type {__VLS_StyleScopedClasses['feature-icon-wrapper']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "feature-icon" },
    });
    /** @type {__VLS_StyleScopedClasses['feature-icon']} */ ;
    (feat.icon);
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
        ...{ class: "feature-title" },
    });
    /** @type {__VLS_StyleScopedClasses['feature-title']} */ ;
    (feat.title);
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "feature-desc" },
    });
    /** @type {__VLS_StyleScopedClasses['feature-desc']} */ ;
    (feat.desc);
    // @ts-ignore
    [features,];
}
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
let __VLS_24;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({
    ...{ 'onClick': {} },
    type: "primary",
    round: true,
    size: "large",
    ...{ class: "cta-btn" },
}));
const __VLS_26 = __VLS_25({
    ...{ 'onClick': {} },
    type: "primary",
    round: true,
    size: "large",
    ...{ class: "cta-btn" },
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
let __VLS_29;
const __VLS_30 = {
    /** @type {typeof __VLS_29.click} */
    onClick: (__VLS_ctx.goLogin),
};
/** @type {__VLS_StyleScopedClasses['cta-btn']} */ ;
const { default: __VLS_31 } = __VLS_27.slots;
let __VLS_32;
/** @ts-ignore @type { | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon'] | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon']} */
elIcon;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent1(__VLS_32, new __VLS_32({
    ...{ style: {} },
}));
const __VLS_34 = __VLS_33({
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
const { default: __VLS_37 } = __VLS_35.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    viewBox: "0 0 24 24",
    width: "16",
    height: "16",
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
[goLogin,];
var __VLS_35;
// @ts-ignore
[];
var __VLS_27;
var __VLS_28;
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
    href: "#score-model",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "#dimensions",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "#process",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "#features",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "footer-copyright" },
});
/** @type {__VLS_StyleScopedClasses['footer-copyright']} */ ;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
