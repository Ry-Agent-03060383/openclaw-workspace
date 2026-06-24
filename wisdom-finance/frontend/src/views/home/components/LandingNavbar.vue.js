/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { useRouter } from 'vue-router';
import { useUserStore } from '../../../store/user';
const __VLS_props = defineProps();
const emit = defineEmits();
const router = useRouter();
const userStore = useUserStore();
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
/** @type {__VLS_StyleScopedClasses['landing-navbar']} */ ;
/** @type {__VLS_StyleScopedClasses['scrolled']} */ ;
/** @type {__VLS_StyleScopedClasses['logo-text']} */ ;
/** @type {__VLS_StyleScopedClasses['scrolled']} */ ;
/** @type {__VLS_StyleScopedClasses['logo-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-links']} */ ;
/** @type {__VLS_StyleScopedClasses['scrolled']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-links']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-links']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-links']} */ ;
/** @type {__VLS_StyleScopedClasses['scrolled']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-links']} */ ;
/** @type {__VLS_StyleScopedClasses['scrolled']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-links']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-avatar']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.header, __VLS_intrinsics.header)({
    ...{ class: (['landing-navbar', { scrolled: __VLS_ctx.scrolled }]) },
});
/** @type {__VLS_StyleScopedClasses['scrolled']} */ ;
/** @type {__VLS_StyleScopedClasses['landing-navbar']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "nav-inner" },
});
/** @type {__VLS_StyleScopedClasses['nav-inner']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.emit('scrollTo', 'hero');
            // @ts-ignore
            [scrolled, emit,];
        } },
    ...{ class: "logo" },
    role: "button",
    tabindex: "0",
    'aria-label': "回到首页",
});
/** @type {__VLS_StyleScopedClasses['logo']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "logo-icon" },
});
/** @type {__VLS_StyleScopedClasses['logo-icon']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "logo-text" },
});
/** @type {__VLS_StyleScopedClasses['logo-text']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.nav, __VLS_intrinsics.nav)({
    ...{ class: "nav-links" },
    'aria-label': "主导航",
});
/** @type {__VLS_StyleScopedClasses['nav-links']} */ ;
for (const [s] of __VLS_vFor(([
    { id: 'hero', label: '首页' }, { id: 'data-stats', label: '平台数据' },
    { id: 'features', label: '核心服务' }, { id: 'products', label: '金融产品' },
    { id: 'data-viz', label: '数据看板' }, { id: 'partners', label: '合作机构' },
]))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.emit('scrollTo', s.id);
                // @ts-ignore
                [emit,];
            } },
        key: (s.id),
        ...{ class: ({ active: __VLS_ctx.activeSection === s.id }) },
        href: ('#' + s.id),
    });
    /** @type {__VLS_StyleScopedClasses['active']} */ ;
    (s.label);
    // @ts-ignore
    [activeSection,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "nav-actions" },
});
/** @type {__VLS_StyleScopedClasses['nav-actions']} */ ;
if (__VLS_ctx.userStore.isLoggedIn) {
    let __VLS_0;
    /** @ts-ignore @type { | typeof __VLS_components.elBadge | typeof __VLS_components.ElBadge | typeof __VLS_components['el-badge'] | typeof __VLS_components.elBadge | typeof __VLS_components.ElBadge | typeof __VLS_components['el-badge']} */
    elBadge;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        value: (3),
        hidden: (false),
        ...{ class: "nav-badge" },
    }));
    const __VLS_2 = __VLS_1({
        value: (3),
        hidden: (false),
        ...{ class: "nav-badge" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    /** @type {__VLS_StyleScopedClasses['nav-badge']} */ ;
    const { default: __VLS_5 } = __VLS_3.slots;
    let __VLS_6;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
        icon: (''),
        circle: true,
        size: "small",
        ...{ class: "notif-btn" },
    }));
    const __VLS_8 = __VLS_7({
        icon: (''),
        circle: true,
        size: "small",
        ...{ class: "notif-btn" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    /** @type {__VLS_StyleScopedClasses['notif-btn']} */ ;
    const { default: __VLS_11 } = __VLS_9.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        role: "img",
        'aria-label': "通知",
    });
    // @ts-ignore
    [userStore,];
    var __VLS_9;
    // @ts-ignore
    [];
    var __VLS_3;
    let __VLS_12;
    /** @ts-ignore @type { | typeof __VLS_components.elAvatar | typeof __VLS_components.ElAvatar | typeof __VLS_components['el-avatar'] | typeof __VLS_components.elAvatar | typeof __VLS_components.ElAvatar | typeof __VLS_components['el-avatar']} */
    elAvatar;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
        size: (32),
        src: (''),
        ...{ class: "nav-avatar" },
    }));
    const __VLS_14 = __VLS_13({
        size: (32),
        src: (''),
        ...{ class: "nav-avatar" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    /** @type {__VLS_StyleScopedClasses['nav-avatar']} */ ;
    const { default: __VLS_17 } = __VLS_15.slots;
    (__VLS_ctx.userStore.realName?.charAt(0) || 'U');
    // @ts-ignore
    [userStore,];
    var __VLS_15;
    let __VLS_18;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
        ...{ 'onClick': {} },
        type: "primary",
        size: "default",
        round: true,
    }));
    const __VLS_20 = __VLS_19({
        ...{ 'onClick': {} },
        type: "primary",
        size: "default",
        round: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    let __VLS_23;
    const __VLS_24 = {
        /** @type {typeof __VLS_23.click} */
        onClick: (...[$event]) => {
            if (!(__VLS_ctx.userStore.isLoggedIn))
                return;
            __VLS_ctx.router.push('/dashboard');
            // @ts-ignore
            [router,];
        },
    };
    const { default: __VLS_25 } = __VLS_21.slots;
    // @ts-ignore
    [];
    var __VLS_21;
    var __VLS_22;
}
else {
    let __VLS_26;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_27 = __VLS_asFunctionalComponent1(__VLS_26, new __VLS_26({
        ...{ 'onClick': {} },
        size: "default",
        round: true,
    }));
    const __VLS_28 = __VLS_27({
        ...{ 'onClick': {} },
        size: "default",
        round: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_27));
    let __VLS_31;
    const __VLS_32 = {
        /** @type {typeof __VLS_31.click} */
        onClick: (...[$event]) => {
            if (!!(__VLS_ctx.userStore.isLoggedIn))
                return;
            __VLS_ctx.router.push('/login');
            // @ts-ignore
            [router,];
        },
    };
    const { default: __VLS_33 } = __VLS_29.slots;
    // @ts-ignore
    [];
    var __VLS_29;
    var __VLS_30;
    let __VLS_34;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_35 = __VLS_asFunctionalComponent1(__VLS_34, new __VLS_34({
        ...{ 'onClick': {} },
        type: "primary",
        size: "default",
        round: true,
    }));
    const __VLS_36 = __VLS_35({
        ...{ 'onClick': {} },
        type: "primary",
        size: "default",
        round: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_35));
    let __VLS_39;
    const __VLS_40 = {
        /** @type {typeof __VLS_39.click} */
        onClick: (...[$event]) => {
            if (!!(__VLS_ctx.userStore.isLoggedIn))
                return;
            __VLS_ctx.router.push('/login');
            // @ts-ignore
            [router,];
        },
    };
    const { default: __VLS_41 } = __VLS_37.slots;
    // @ts-ignore
    [];
    var __VLS_37;
    var __VLS_38;
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
