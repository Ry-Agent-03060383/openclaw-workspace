/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
// ── SEO ╱ 页面元信息 ──
onMounted(() => {
    document.title = '掌上金融 — 焦作市智慧金融服务平台';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
    }
    meta.setAttribute('content', '移动端全覆盖，随时随地办理融资业务。焦作市智慧金融服务平台提供微信小程序、手机APP、微信公众号等移动端服务。');
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
const platforms = [
    { icon: '💬', title: '微信小程序', desc: '焦作智慧金服', qrLabel: '扫码打开小程序' },
    { icon: '📱', title: '手机APP', desc: '焦作智慧金融', qrLabel: '扫码下载APP' },
    { icon: '🔔', title: '微信公众号', desc: '焦作智慧金服', qrLabel: '扫码关注公众号' },
];
const features = [
    { icon: '📝', title: '贷款申请', desc: '在线提交融资申请，智能匹配金融产品' },
    { icon: '📈', title: '进度查询', desc: '实时查看业务办理进度，审批状态一目了然' },
    { icon: '🔍', title: '信用查询', desc: '企业信用信息一键查询，信用报告随时下载' },
    { icon: '💳', title: '还款管理', desc: '便捷还款操作，还款计划清晰可查' },
    { icon: '👩‍💼', title: '在线客服', desc: '智能客服+人工服务，7×24小时在线解答' },
    { icon: '📰', title: '政策公告', desc: '最新金融政策、平台公告实时推送' },
];
const stats = [
    { value: '1,250', label: '日活跃用户（人）', icon: '👥' },
    { value: '85%', label: '企业覆盖率', icon: '🎯' },
    { value: '96%', label: '用户好评率', icon: '⭐' },
];
const downloads = [
    { platform: 'iOS', icon: '🍎', desc: 'App Store 搜索"焦作智慧金融"下载' },
    { platform: 'Android', icon: '🤖', desc: '各大应用商店搜索"焦作智慧金融"下载' },
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
/** @type {__VLS_StyleScopedClasses['hero-phone']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-content']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-wave']} */ ;
/** @type {__VLS_StyleScopedClasses['platform-card']} */ ;
/** @type {__VLS_StyleScopedClasses['platform-card']} */ ;
/** @type {__VLS_StyleScopedClasses['platform-phone']} */ ;
/** @type {__VLS_StyleScopedClasses['platform-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-card']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-card']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-icon-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['features-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['features-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-card']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['download-card']} */ ;
/** @type {__VLS_StyleScopedClasses['download-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-links']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-links']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "mobile-page" },
});
/** @type {__VLS_StyleScopedClasses['mobile-page']} */ ;
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
    href: "#platforms",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "#features",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "#stats",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "#download",
});
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    type: "primary",
    round: true,
    ...{ class: "navbar-cta" },
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    type: "primary",
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
    ...{ class: "hero-phone-wrapper" },
});
/** @type {__VLS_StyleScopedClasses['hero-phone-wrapper']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "hero-phone" },
});
/** @type {__VLS_StyleScopedClasses['hero-phone']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ class: "hero-phone-notch" },
});
/** @type {__VLS_StyleScopedClasses['hero-phone-notch']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "hero-phone-screen" },
});
/** @type {__VLS_StyleScopedClasses['hero-phone-screen']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "hero-phone-header" },
});
/** @type {__VLS_StyleScopedClasses['hero-phone-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "hero-phone-icon" },
});
/** @type {__VLS_StyleScopedClasses['hero-phone-icon']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "hero-phone-title" },
});
/** @type {__VLS_StyleScopedClasses['hero-phone-title']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "hero-phone-features" },
});
/** @type {__VLS_StyleScopedClasses['hero-phone-features']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "hero-phone-feat" },
});
/** @type {__VLS_StyleScopedClasses['hero-phone-feat']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "hero-phone-feat" },
});
/** @type {__VLS_StyleScopedClasses['hero-phone-feat']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "hero-phone-feat" },
});
/** @type {__VLS_StyleScopedClasses['hero-phone-feat']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ class: "hero-phone-home-btn" },
});
/** @type {__VLS_StyleScopedClasses['hero-phone-home-btn']} */ ;
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
    id: "platforms",
    ...{ class: "section platform-section" },
});
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['platform-section']} */ ;
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
    ...{ class: "platform-grid" },
});
/** @type {__VLS_StyleScopedClasses['platform-grid']} */ ;
for (const [item, i] of __VLS_vFor((__VLS_ctx.platforms))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (i),
        ...{ class: "platform-card animate-on-scroll" },
        ...{ style: ({ animationDelay: `${i * 0.12}s` }) },
    });
    /** @type {__VLS_StyleScopedClasses['platform-card']} */ ;
    /** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "platform-phone-wrapper" },
    });
    /** @type {__VLS_StyleScopedClasses['platform-phone-wrapper']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "platform-phone" },
    });
    /** @type {__VLS_StyleScopedClasses['platform-phone']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ class: "platform-phone-notch" },
    });
    /** @type {__VLS_StyleScopedClasses['platform-phone-notch']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "platform-phone-screen" },
    });
    /** @type {__VLS_StyleScopedClasses['platform-phone-screen']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "platform-phone-icon" },
    });
    /** @type {__VLS_StyleScopedClasses['platform-phone-icon']} */ ;
    (item.icon);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "platform-phone-name" },
    });
    /** @type {__VLS_StyleScopedClasses['platform-phone-name']} */ ;
    (item.title);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "platform-phone-desc" },
    });
    /** @type {__VLS_StyleScopedClasses['platform-phone-desc']} */ ;
    (item.desc);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "platform-phone-qr" },
    });
    /** @type {__VLS_StyleScopedClasses['platform-phone-qr']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "qr-placeholder" },
    });
    /** @type {__VLS_StyleScopedClasses['qr-placeholder']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        width: "80",
        height: "80",
        viewBox: "0 0 80 80",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.rect)({
        x: "0",
        y: "0",
        width: "32",
        height: "32",
        fill: "#909399",
        rx: "3",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.rect)({
        x: "48",
        y: "0",
        width: "32",
        height: "32",
        fill: "#909399",
        rx: "3",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.rect)({
        x: "0",
        y: "48",
        width: "32",
        height: "32",
        fill: "#909399",
        rx: "3",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.rect)({
        x: "24",
        y: "24",
        width: "8",
        height: "8",
        fill: "#909399",
        rx: "1",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.rect)({
        x: "48",
        y: "48",
        width: "16",
        height: "16",
        fill: "#909399",
        rx: "2",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.rect)({
        x: "68",
        y: "48",
        width: "12",
        height: "12",
        fill: "#909399",
        rx: "2",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.rect)({
        x: "48",
        y: "68",
        width: "12",
        height: "12",
        fill: "#909399",
        rx: "2",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "platform-phone-qr-label" },
    });
    /** @type {__VLS_StyleScopedClasses['platform-phone-qr-label']} */ ;
    (item.qrLabel);
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
        ...{ class: "platform-title" },
    });
    /** @type {__VLS_StyleScopedClasses['platform-title']} */ ;
    (item.title);
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "platform-desc" },
    });
    /** @type {__VLS_StyleScopedClasses['platform-desc']} */ ;
    (item.desc);
    (item.qrLabel);
    // @ts-ignore
    [platforms,];
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
        ...{ style: ({ animationDelay: `${i * 0.08}s` }) },
    });
    /** @type {__VLS_StyleScopedClasses['feature-card']} */ ;
    /** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "feature-icon-wrapper" },
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
    id: "stats",
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
for (const [stat, i] of __VLS_vFor((__VLS_ctx.stats))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (i),
        ...{ class: "stat-card animate-on-scroll" },
        ...{ style: ({ animationDelay: `${i * 0.12}s` }) },
    });
    /** @type {__VLS_StyleScopedClasses['stat-card']} */ ;
    /** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "stat-icon" },
    });
    /** @type {__VLS_StyleScopedClasses['stat-icon']} */ ;
    (stat.icon);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "stat-value" },
    });
    /** @type {__VLS_StyleScopedClasses['stat-value']} */ ;
    (stat.value);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "stat-label" },
    });
    /** @type {__VLS_StyleScopedClasses['stat-label']} */ ;
    (stat.label);
    // @ts-ignore
    [stats,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    id: "download",
    ...{ class: "section download-section" },
});
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['download-section']} */ ;
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
    ...{ class: "download-grid" },
});
/** @type {__VLS_StyleScopedClasses['download-grid']} */ ;
for (const [item, i] of __VLS_vFor((__VLS_ctx.downloads))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (i),
        ...{ class: "download-card animate-on-scroll" },
        ...{ style: ({ animationDelay: `${i * 0.12}s` }) },
    });
    /** @type {__VLS_StyleScopedClasses['download-card']} */ ;
    /** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "download-platform-icon" },
    });
    /** @type {__VLS_StyleScopedClasses['download-platform-icon']} */ ;
    (item.icon);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "download-qr" },
    });
    /** @type {__VLS_StyleScopedClasses['download-qr']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "qr-placeholder qr-large" },
    });
    /** @type {__VLS_StyleScopedClasses['qr-placeholder']} */ ;
    /** @type {__VLS_StyleScopedClasses['qr-large']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        width: "120",
        height: "120",
        viewBox: "0 0 120 120",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.rect)({
        x: "0",
        y: "0",
        width: "48",
        height: "48",
        fill: "#909399",
        rx: "4",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.rect)({
        x: "72",
        y: "0",
        width: "48",
        height: "48",
        fill: "#909399",
        rx: "4",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.rect)({
        x: "0",
        y: "72",
        width: "48",
        height: "48",
        fill: "#909399",
        rx: "4",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.rect)({
        x: "36",
        y: "36",
        width: "12",
        height: "12",
        fill: "#909399",
        rx: "2",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.rect)({
        x: "72",
        y: "72",
        width: "24",
        height: "24",
        fill: "#909399",
        rx: "3",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.rect)({
        x: "102",
        y: "72",
        width: "18",
        height: "18",
        fill: "#909399",
        rx: "3",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.rect)({
        x: "72",
        y: "102",
        width: "18",
        height: "18",
        fill: "#909399",
        rx: "3",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.rect)({
        x: "60",
        y: "60",
        width: "8",
        height: "8",
        fill: "#909399",
        rx: "1",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.rect)({
        x: "56",
        y: "0",
        width: "8",
        height: "8",
        fill: "#909399",
        rx: "1",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.rect)({
        x: "0",
        y: "56",
        width: "8",
        height: "8",
        fill: "#909399",
        rx: "1",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "download-info" },
    });
    /** @type {__VLS_StyleScopedClasses['download-info']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
        ...{ class: "download-platform" },
    });
    /** @type {__VLS_StyleScopedClasses['download-platform']} */ ;
    (item.platform);
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "download-desc" },
    });
    /** @type {__VLS_StyleScopedClasses['download-desc']} */ ;
    (item.desc);
    // @ts-ignore
    [downloads,];
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
    href: "#platforms",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "#features",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "#stats",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "#download",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "footer-copyright" },
});
/** @type {__VLS_StyleScopedClasses['footer-copyright']} */ ;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
