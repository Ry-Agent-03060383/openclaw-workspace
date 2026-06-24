/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../../store/user';
const router = useRouter();
const userStore = useUserStore();
const bannerIndex = ref(0);
const searchKeyword = ref('');
const emit = defineEmits();
const banners = [
    { title: '焦作市中小企业融资服务平台', subtitle: '政府主导 · 数据驱动 · 银企对接 · 信用赋能', desc: '运用互联网、大数据、云计算和人工智能等新技术，全面融合各方资源，一站式解决中小企业融资难题', color: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)' },
    { title: '金融产品超市', subtitle: '汇聚全市金融机构优质产品', desc: '在线比较、智能匹配，找到最适合您的融资方案，让融资像网购一样便捷', color: 'linear-gradient(135deg, #0a1628, #1a3a5c, #0d2137)' },
    { title: 'AI智能融资助手', subtitle: '7×24小时智能服务', desc: '基于大模型技术的智能客服，为您提供融资咨询、政策解读、产品推荐等一站式服务', color: 'linear-gradient(135deg, #1a0a2e, #302b63, #0f0c29)' },
];
let bannerTimer;
import { onMounted, onUnmounted } from 'vue';
onMounted(() => {
    bannerTimer = window.setInterval(() => {
        bannerIndex.value = (bannerIndex.value + 1) % banners.length;
    }, 5000);
});
onUnmounted(() => { if (bannerTimer)
    clearInterval(bannerTimer); });
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['banner-dots']} */ ;
/** @type {__VLS_StyleScopedClasses['banner-dots']} */ ;
/** @type {__VLS_StyleScopedClasses['search-inner']} */ ;
/** @type {__VLS_StyleScopedClasses['search-inner']} */ ;
/** @type {__VLS_StyleScopedClasses['hot-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['preview-item']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['search-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['search-inner']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    id: "hero",
    ...{ class: "hero-section" },
    'aria-label': "平台品牌宣传区",
});
/** @type {__VLS_StyleScopedClasses['hero-section']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "hero-slider" },
    ...{ style: ({ background: __VLS_ctx.banners[__VLS_ctx.bannerIndex].color }) },
});
/** @type {__VLS_StyleScopedClasses['hero-slider']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ class: "grid-overlay" },
});
/** @type {__VLS_StyleScopedClasses['grid-overlay']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ class: "hero-orb hero-orb-1" },
});
/** @type {__VLS_StyleScopedClasses['hero-orb']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-orb-1']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ class: "hero-orb hero-orb-2" },
});
/** @type {__VLS_StyleScopedClasses['hero-orb']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-orb-2']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ class: "hero-orb hero-orb-3" },
});
/** @type {__VLS_StyleScopedClasses['hero-orb']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-orb-3']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "hero-content" },
});
/** @type {__VLS_StyleScopedClasses['hero-content']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "banner-dots" },
    role: "tablist",
    'aria-label': "Banner切换",
});
/** @type {__VLS_StyleScopedClasses['banner-dots']} */ ;
for (const [_, i] of __VLS_vFor((__VLS_ctx.banners))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.bannerIndex = i;
                // @ts-ignore
                [banners, banners, bannerIndex, bannerIndex,];
            } },
        key: (i),
        ...{ class: ({ active: i === __VLS_ctx.bannerIndex }) },
        'aria-selected': (i === __VLS_ctx.bannerIndex),
        'aria-label': ('切换到第' + (i + 1) + '张Banner'),
        role: "tab",
    });
    /** @type {__VLS_StyleScopedClasses['active']} */ ;
    // @ts-ignore
    [bannerIndex, bannerIndex,];
}
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.transition | typeof __VLS_components.Transition | typeof __VLS_components.transition | typeof __VLS_components.Transition} */
transition;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    name: "banner-fade",
    mode: "out-in",
}));
const __VLS_2 = __VLS_1({
    name: "banner-fade",
    mode: "out-in",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    key: (__VLS_ctx.bannerIndex),
    ...{ class: "banner-text" },
});
/** @type {__VLS_StyleScopedClasses['banner-text']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "hero-badge" },
});
/** @type {__VLS_StyleScopedClasses['hero-badge']} */ ;
(__VLS_ctx.banners[__VLS_ctx.bannerIndex].subtitle);
__VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
    ...{ class: "hero-title" },
});
/** @type {__VLS_StyleScopedClasses['hero-title']} */ ;
(__VLS_ctx.banners[__VLS_ctx.bannerIndex].title);
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "hero-desc" },
});
/** @type {__VLS_StyleScopedClasses['hero-desc']} */ ;
(__VLS_ctx.banners[__VLS_ctx.bannerIndex].desc);
// @ts-ignore
[banners, banners, banners, bannerIndex, bannerIndex, bannerIndex, bannerIndex,];
var __VLS_3;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "hero-actions" },
});
/** @type {__VLS_StyleScopedClasses['hero-actions']} */ ;
let __VLS_6;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
    ...{ 'onClick': {} },
    type: "primary",
    size: "large",
    round: true,
}));
const __VLS_8 = __VLS_7({
    ...{ 'onClick': {} },
    type: "primary",
    size: "large",
    round: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
let __VLS_11;
const __VLS_12 = {
    /** @type {typeof __VLS_11.click} */
    onClick: (...[$event]) => {
        __VLS_ctx.userStore.isLoggedIn ? __VLS_ctx.router.push('/dashboard') : __VLS_ctx.router.push('/login');
        // @ts-ignore
        [userStore, router, router,];
    },
};
const { default: __VLS_13 } = __VLS_9.slots;
(__VLS_ctx.userStore.isLoggedIn ? '进入操控台' : '立即体验');
// @ts-ignore
[userStore,];
var __VLS_9;
var __VLS_10;
let __VLS_14;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent1(__VLS_14, new __VLS_14({
    ...{ 'onClick': {} },
    size: "large",
    round: true,
}));
const __VLS_16 = __VLS_15({
    ...{ 'onClick': {} },
    size: "large",
    round: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_15));
let __VLS_19;
const __VLS_20 = {
    /** @type {typeof __VLS_19.click} */
    onClick: (...[$event]) => {
        __VLS_ctx.emit('scrollTo', 'products');
        // @ts-ignore
        [emit,];
    },
};
const { default: __VLS_21 } = __VLS_17.slots;
// @ts-ignore
[];
var __VLS_17;
var __VLS_18;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "search-bar" },
    role: "search",
    'aria-label': "金融产品搜索",
});
/** @type {__VLS_StyleScopedClasses['search-bar']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "search-inner" },
});
/** @type {__VLS_StyleScopedClasses['search-inner']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "search-icon" },
    'aria-hidden': "true",
});
/** @type {__VLS_StyleScopedClasses['search-icon']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    value: (__VLS_ctx.searchKeyword),
    type: "text",
    placeholder: "搜索金融产品，如 小微快贷、纳税e贷...",
    'aria-label': "输入产品名称搜索",
});
let __VLS_22;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent1(__VLS_22, new __VLS_22({
    ...{ 'onClick': {} },
    type: "primary",
    round: true,
}));
const __VLS_24 = __VLS_23({
    ...{ 'onClick': {} },
    type: "primary",
    round: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_23));
let __VLS_27;
const __VLS_28 = {
    /** @type {typeof __VLS_27.click} */
    onClick: (...[$event]) => {
        __VLS_ctx.userStore.isLoggedIn ? __VLS_ctx.router.push('/dashboard') : __VLS_ctx.router.push('/login?search=' + __VLS_ctx.searchKeyword);
        // @ts-ignore
        [userStore, router, router, searchKeyword, searchKeyword,];
    },
};
const { default: __VLS_29 } = __VLS_25.slots;
// @ts-ignore
[];
var __VLS_25;
var __VLS_26;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "hot-tags" },
});
/** @type {__VLS_StyleScopedClasses['hot-tags']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "hot-label" },
});
/** @type {__VLS_StyleScopedClasses['hot-label']} */ ;
for (const [t] of __VLS_vFor((['小微快贷', '纳税e贷', '短期流资贷款', '科技贷']))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.searchKeyword = t;
                // @ts-ignore
                [searchKeyword,];
            } },
        key: (t),
        ...{ class: "hot-tag" },
        href: "#",
        'aria-label': "搜索{{ t }}",
    });
    /** @type {__VLS_StyleScopedClasses['hot-tag']} */ ;
    (t);
    // @ts-ignore
    [];
}
if (__VLS_ctx.searchKeyword) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "search-preview" },
        role: "listbox",
        'aria-label': "搜索结果预览",
    });
    /** @type {__VLS_StyleScopedClasses['search-preview']} */ ;
    for (const [p] of __VLS_vFor(((__VLS_ctx.searchKeyword ? [{ name: '小微快贷', bank: '工商银行', rate: '3.85%' }] : [])))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "preview-item" },
            key: (p.name),
        });
        /** @type {__VLS_StyleScopedClasses['preview-item']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "preview-name" },
        });
        /** @type {__VLS_StyleScopedClasses['preview-name']} */ ;
        (p.name);
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "preview-bank" },
        });
        /** @type {__VLS_StyleScopedClasses['preview-bank']} */ ;
        (p.bank);
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "preview-rate" },
        });
        /** @type {__VLS_StyleScopedClasses['preview-rate']} */ ;
        (p.rate);
        // @ts-ignore
        [searchKeyword, searchKeyword,];
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "preview-login-hint" },
    });
    /** @type {__VLS_StyleScopedClasses['preview-login-hint']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    let __VLS_30;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({
        ...{ 'onClick': {} },
        size: "small",
        round: true,
        type: "primary",
    }));
    const __VLS_32 = __VLS_31({
        ...{ 'onClick': {} },
        size: "small",
        round: true,
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_31));
    let __VLS_35;
    const __VLS_36 = {
        /** @type {typeof __VLS_35.click} */
        onClick: (...[$event]) => {
            if (!(__VLS_ctx.searchKeyword))
                return;
            __VLS_ctx.router.push('/login');
            // @ts-ignore
            [router,];
        },
    };
    const { default: __VLS_37 } = __VLS_33.slots;
    // @ts-ignore
    [];
    var __VLS_33;
    var __VLS_34;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.emit('scrollTo', 'data-stats');
            // @ts-ignore
            [emit,];
        } },
    ...{ class: "scroll-indicator" },
    role: "button",
    'aria-label': "向下滚动查看平台数据",
});
/** @type {__VLS_StyleScopedClasses['scroll-indicator']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "scroll-arrow" },
    'aria-hidden': "true",
});
/** @type {__VLS_StyleScopedClasses['scroll-arrow']} */ ;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
});
export default {};
