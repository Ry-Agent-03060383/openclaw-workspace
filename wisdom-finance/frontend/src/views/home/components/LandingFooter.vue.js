/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { useRouter } from 'vue-router';
const router = useRouter();
const platformItems = [
    { label: '金融产品', id: 'financial-products' },
    { label: '信用体检', id: 'credit-check' },
    { label: '绿色金融', id: 'green-finance' },
    { label: '金融调解', id: 'mediation' }
];
const policyItems = [
    { label: '国家政策', id: 'national-policy' },
    { label: '河南省政策', id: 'provincial-policy' },
    { label: '焦作市政策', id: 'city-policy' },
    { label: '风险补偿', id: 'risk-compensation' }
];
const aboutItems = [
    { label: '公司简介', id: 'company-intro' },
    { label: '新闻中心', id: 'news' },
    { label: '服务案例', id: 'cases' },
    { label: '联系我们', id: 'contact-us' }
];
function goFooter(id) {
    router.push(`/footer/${id}`);
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['footer-col']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-col']} */ ;
/** @type {__VLS_StyleScopedClasses['bottom-left']} */ ;
/** @type {__VLS_StyleScopedClasses['bottom-left']} */ ;
/** @type {__VLS_StyleScopedClasses['bottom-right']} */ ;
/** @type {__VLS_StyleScopedClasses['bottom-right']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-main']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-links']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-bottom']} */ ;
/** @type {__VLS_StyleScopedClasses['bottom-left']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.footer, __VLS_intrinsics.footer)({
    ...{ class: "landing-footer" },
    'aria-label': "页脚",
});
/** @type {__VLS_StyleScopedClasses['landing-footer']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "section-container" },
});
/** @type {__VLS_StyleScopedClasses['section-container']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "footer-main" },
});
/** @type {__VLS_StyleScopedClasses['footer-main']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "footer-brand" },
});
/** @type {__VLS_StyleScopedClasses['footer-brand']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "footer-logo" },
});
/** @type {__VLS_StyleScopedClasses['footer-logo']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "brand-name" },
});
/** @type {__VLS_StyleScopedClasses['brand-name']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "brand-addr" },
});
/** @type {__VLS_StyleScopedClasses['brand-addr']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "brand-phone" },
});
/** @type {__VLS_StyleScopedClasses['brand-phone']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "brand-extra" },
});
/** @type {__VLS_StyleScopedClasses['brand-extra']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "badge" },
});
/** @type {__VLS_StyleScopedClasses['badge']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "badge" },
});
/** @type {__VLS_StyleScopedClasses['badge']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "badge" },
});
/** @type {__VLS_StyleScopedClasses['badge']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "footer-links" },
});
/** @type {__VLS_StyleScopedClasses['footer-links']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "footer-col" },
});
/** @type {__VLS_StyleScopedClasses['footer-col']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h4, __VLS_intrinsics.h4)({});
for (const [item] of __VLS_vFor((__VLS_ctx.platformItems))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.goFooter(item.id);
                // @ts-ignore
                [platformItems, goFooter,];
            } },
        ...{ onKeydown: (...[$event]) => {
                __VLS_ctx.goFooter(item.id);
                // @ts-ignore
                [goFooter,];
            } },
        key: (item.id),
        tabindex: "0",
        role: "link",
        'aria-label': (item.label),
    });
    (item.label);
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "footer-col" },
});
/** @type {__VLS_StyleScopedClasses['footer-col']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h4, __VLS_intrinsics.h4)({});
for (const [item] of __VLS_vFor((__VLS_ctx.policyItems))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.goFooter(item.id);
                // @ts-ignore
                [goFooter, policyItems,];
            } },
        ...{ onKeydown: (...[$event]) => {
                __VLS_ctx.goFooter(item.id);
                // @ts-ignore
                [goFooter,];
            } },
        key: (item.id),
        tabindex: "0",
        role: "link",
        'aria-label': (item.label),
    });
    (item.label);
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "footer-col" },
});
/** @type {__VLS_StyleScopedClasses['footer-col']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h4, __VLS_intrinsics.h4)({});
for (const [item] of __VLS_vFor((__VLS_ctx.aboutItems))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.goFooter(item.id);
                // @ts-ignore
                [goFooter, aboutItems,];
            } },
        ...{ onKeydown: (...[$event]) => {
                __VLS_ctx.goFooter(item.id);
                // @ts-ignore
                [goFooter,];
            } },
        key: (item.id),
        tabindex: "0",
        role: "link",
        'aria-label': (item.label),
    });
    (item.label);
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ class: "footer-line" },
    role: "separator",
    'aria-hidden': "true",
});
/** @type {__VLS_StyleScopedClasses['footer-line']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "footer-bottom" },
});
/** @type {__VLS_StyleScopedClasses['footer-bottom']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "bottom-left" },
});
/** @type {__VLS_StyleScopedClasses['bottom-left']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "https://beian.miit.gov.cn",
    target: "_blank",
    rel: "noopener noreferrer",
    'aria-label': "豫ICP备案",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "https://beian.mps.gov.cn",
    target: "_blank",
    rel: "noopener noreferrer",
    'aria-label': "豫公网安备案",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "bottom-right" },
});
/** @type {__VLS_StyleScopedClasses['bottom-right']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "friendly-label" },
});
/** @type {__VLS_StyleScopedClasses['friendly-label']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "https://www.jz.gov.cn",
    target: "_blank",
    rel: "noopener",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "http://jrj.jz.gov.cn",
    target: "_blank",
    rel: "noopener",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "https://www.jzzwfw.gov.cn",
    target: "_blank",
    rel: "noopener",
});
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
