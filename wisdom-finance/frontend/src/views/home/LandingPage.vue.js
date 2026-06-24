/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../store/user';
import LandingNavbar from './components/LandingNavbar.vue';
import LandingHero from './components/LandingHero.vue';
import LandingStats from './components/LandingStats.vue';
import LandingFeatures from './components/LandingFeatures.vue';
import LandingProducts from './components/LandingProducts.vue';
import LandingDataViz from './components/LandingDataViz.vue';
import LandingPartners from './components/LandingPartners.vue';
import LandingFooter from './components/LandingFooter.vue';
const router = useRouter();
const userStore = useUserStore();
// ── SEO ╱ 页面元信息 ──
onMounted(() => {
    document.title = '焦作市智慧金融服务平台 — 中小企业融资一站式服务';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
    }
    meta.setAttribute('content', '焦作市智慧金融服务平台，政府主导、数据驱动、银企对接、信用赋能，一站式解决中小企业融资难题。汇聚全市金融机构优质产品，AI智能融资助手7×24小时在线服务。');
});
// ── 滚动导航 & 入场动画 ──
const scrolled = ref(false);
const activeSection = ref('hero');
let observer = null;
let scrollTimer;
function setupObserver() {
    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer?.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer?.observe(el));
}
function handleScroll() {
    if (scrollTimer)
        clearTimeout(scrollTimer);
    scrollTimer = window.setTimeout(() => {
        scrolled.value = window.scrollY > 60;
        const ids = ['hero', 'data-stats', 'features', 'products', 'data-viz', 'partners'];
        for (const id of ids) {
            const el = document.getElementById(id);
            if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4)
                activeSection.value = id;
        }
    }, 10);
}
function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}
onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    nextTick(setupObserver);
});
onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
    if (scrollTimer)
        clearTimeout(scrollTimer);
    observer?.disconnect();
});
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['ai-float']} */ ;
/** @type {__VLS_StyleScopedClasses['ai-float-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['ai-float']} */ ;
/** @type {__VLS_StyleScopedClasses['ai-float-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['ai-float-ring']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "landing-page" },
});
/** @type {__VLS_StyleScopedClasses['landing-page']} */ ;
const __VLS_0 = LandingNavbar;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onScrollTo': {} },
    scrolled: (__VLS_ctx.scrolled),
    activeSection: (__VLS_ctx.activeSection),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onScrollTo': {} },
    scrolled: (__VLS_ctx.scrolled),
    activeSection: (__VLS_ctx.activeSection),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = {
    /** @type {typeof __VLS_5.scrollTo} */
    onScrollTo: (__VLS_ctx.scrollTo),
};
var __VLS_3;
var __VLS_4;
const __VLS_7 = LandingHero;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    ...{ 'onScrollTo': {} },
}));
const __VLS_9 = __VLS_8({
    ...{ 'onScrollTo': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
let __VLS_12;
const __VLS_13 = {
    /** @type {typeof __VLS_12.scrollTo} */
    onScrollTo: (__VLS_ctx.scrollTo),
};
var __VLS_10;
var __VLS_11;
const __VLS_14 = LandingStats;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent1(__VLS_14, new __VLS_14({}));
const __VLS_16 = __VLS_15({}, ...__VLS_functionalComponentArgsRest(__VLS_15));
const __VLS_19 = LandingFeatures;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({}));
const __VLS_21 = __VLS_20({}, ...__VLS_functionalComponentArgsRest(__VLS_20));
const __VLS_24 = LandingProducts;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({}));
const __VLS_26 = __VLS_25({}, ...__VLS_functionalComponentArgsRest(__VLS_25));
const __VLS_29 = LandingDataViz;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent1(__VLS_29, new __VLS_29({}));
const __VLS_31 = __VLS_30({}, ...__VLS_functionalComponentArgsRest(__VLS_30));
const __VLS_34 = LandingPartners;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent1(__VLS_34, new __VLS_34({}));
const __VLS_36 = __VLS_35({}, ...__VLS_functionalComponentArgsRest(__VLS_35));
const __VLS_39 = LandingFooter;
// @ts-ignore
const __VLS_40 = __VLS_asFunctionalComponent1(__VLS_39, new __VLS_39({}));
const __VLS_41 = __VLS_40({}, ...__VLS_functionalComponentArgsRest(__VLS_40));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.router.push(__VLS_ctx.userStore.isLoggedIn ? '/dashboard/ai-chat' : '/login');
            // @ts-ignore
            [scrolled, activeSection, scrollTo, scrollTo, router, userStore,];
        } },
    ...{ class: "ai-float" },
    role: "button",
    'aria-label': "打开AI智能客服",
    tabindex: "0",
});
/** @type {__VLS_StyleScopedClasses['ai-float']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ class: "ai-float-ring" },
    'aria-hidden': "true",
});
/** @type {__VLS_StyleScopedClasses['ai-float-ring']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "ai-float-icon" },
    'aria-hidden': "true",
});
/** @type {__VLS_StyleScopedClasses['ai-float-icon']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "ai-float-label" },
});
/** @type {__VLS_StyleScopedClasses['ai-float-label']} */ ;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
