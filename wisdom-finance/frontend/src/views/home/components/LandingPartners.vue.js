/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
const partnerNames = [
    '工商银行', '农业银行', '中国银行', '建设银行', '交通银行',
    '邮储银行', '中原银行', '焦作中旅银行', '人保财险', '国寿财险',
    '电e金服', '信用焦作', '河南省农信社', '郑州银行',
];
const partners = [...partnerNames, ...partnerNames];
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['partners-track']} */ ;
/** @type {__VLS_StyleScopedClasses['partner-card']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
/** @type {__VLS_StyleScopedClasses['partners-track']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    id: "partners",
    ...{ class: "partners-section" },
    'aria-label': "合作机构",
});
/** @type {__VLS_StyleScopedClasses['partners-section']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "section-container animate-on-scroll" },
});
/** @type {__VLS_StyleScopedClasses['section-container']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "section-header" },
});
/** @type {__VLS_StyleScopedClasses['section-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "section-label" },
});
/** @type {__VLS_StyleScopedClasses['section-label']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "section-title" },
});
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "section-desc" },
});
/** @type {__VLS_StyleScopedClasses['section-desc']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "partners-carousel" },
    role: "list",
    'aria-label': "合作伙伴列表，自动滚动",
});
/** @type {__VLS_StyleScopedClasses['partners-carousel']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "partners-track" },
});
/** @type {__VLS_StyleScopedClasses['partners-track']} */ ;
for (const [p, i] of __VLS_vFor((__VLS_ctx.partners))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (i),
        ...{ class: "partner-card" },
        role: "listitem",
        'aria-label': (p),
    });
    /** @type {__VLS_StyleScopedClasses['partner-card']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "partner-icon" },
        'aria-hidden': "true",
    });
    /** @type {__VLS_StyleScopedClasses['partner-icon']} */ ;
    (p.slice(0, 1));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "partner-name" },
    });
    /** @type {__VLS_StyleScopedClasses['partner-name']} */ ;
    (p);
    // @ts-ignore
    [partners,];
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
