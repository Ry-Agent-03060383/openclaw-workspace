/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { fetchCoreServices } from '../../../api/core-services';
const router = useRouter();
const services = ref([
    { id: 'bank-match', title: '银企对接', summary: '智能匹配银行产品与企业需求，一站式融资对接', icon: '🏦', color: '#409EFF', route: '/core-services/bank-match', badge: '热门', order: 1 },
    { id: 'credit-check', title: '信用体检', summary: '多维数据融合，企业信用一键体检，实时掌握信用状况', icon: '📊', color: '#67C23A', route: '/core-services/credit-check', badge: '', order: 2 },
    { id: 'risk', title: '风险防控', summary: '多维度风控模型，全流程风险监测预警，保障资金安全', icon: '🛡️', color: '#E6A23C', route: '/core-services/risk', badge: '', order: 3 },
    { id: 'ai', title: 'AI智能服务', summary: '基于大模型的智能客服，7×24小时在线，AI辅助融资决策', icon: '🤖', color: '#F56C6C', route: '/core-services/ai', badge: '新', order: 4 },
    { id: 'mobile', title: '掌上金融', summary: '移动端全覆盖，随时随地办理融资业务', icon: '📱', color: '#909399', route: '/core-services/mobile', badge: '', order: 5 },
    { id: 'security', title: '数据安全', summary: '金融级数据加密，全方位信息安全保障', icon: '🔒', color: '#409EFF', route: '/core-services/security', badge: '', order: 6 },
]);
const loading = ref(true);
onMounted(async () => {
    try {
        const data = await fetchCoreServices();
        if (data?.services?.length) {
            services.value = data.services;
        }
    }
    catch {
        // fallback to static data
    }
    finally {
        loading.value = false;
    }
});
function goTo(service) {
    router.push(service.route);
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-card']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-card']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-icon-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-card']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-card']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-card']} */ ;
/** @type {__VLS_StyleScopedClasses['link-arrow']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-card']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-card']} */ ;
/** @type {__VLS_StyleScopedClasses['features-skeleton']} */ ;
/** @type {__VLS_StyleScopedClasses['features-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['features-skeleton']} */ ;
/** @type {__VLS_StyleScopedClasses['features-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['features-skeleton']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-card']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    id: "features",
    ...{ class: "features-section" },
    'aria-label': "核心服务",
});
/** @type {__VLS_StyleScopedClasses['features-section']} */ ;
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
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "features-skeleton" },
    });
    /** @type {__VLS_StyleScopedClasses['features-skeleton']} */ ;
    for (const [i] of __VLS_vFor((6))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            key: (i),
            ...{ class: "skeleton-card" },
        });
        /** @type {__VLS_StyleScopedClasses['skeleton-card']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
            ...{ class: "sk-icon" },
        });
        /** @type {__VLS_StyleScopedClasses['sk-icon']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "sk-lines" },
        });
        /** @type {__VLS_StyleScopedClasses['sk-lines']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
            ...{ class: "sk-line w-60" },
        });
        /** @type {__VLS_StyleScopedClasses['sk-line']} */ ;
        /** @type {__VLS_StyleScopedClasses['w-60']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
            ...{ class: "sk-line w-90" },
        });
        /** @type {__VLS_StyleScopedClasses['sk-line']} */ ;
        /** @type {__VLS_StyleScopedClasses['w-90']} */ ;
        // @ts-ignore
        [loading,];
    }
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "features-grid" },
        role: "list",
    });
    /** @type {__VLS_StyleScopedClasses['features-grid']} */ ;
    for (const [s] of __VLS_vFor((__VLS_ctx.services))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.loading))
                        return;
                    __VLS_ctx.goTo(s);
                    // @ts-ignore
                    [services, goTo,];
                } },
            key: (s.id),
            ...{ class: "feature-card" },
            role: "listitem",
            'aria-label': (s.title + '：' + s.summary),
            ...{ style: ({ '--accent': s.color, '--delay': (s.order || 0) * 0.08 + 's' }) },
        });
        /** @type {__VLS_StyleScopedClasses['feature-card']} */ ;
        if (s.badge) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "feature-badge" },
                ...{ style: ({ background: s.color }) },
            });
            /** @type {__VLS_StyleScopedClasses['feature-badge']} */ ;
            (s.badge);
        }
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "feature-icon-wrap" },
            ...{ style: ({ background: s.color + '15' }) },
            'aria-hidden': "true",
        });
        /** @type {__VLS_StyleScopedClasses['feature-icon-wrap']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "feature-icon" },
        });
        /** @type {__VLS_StyleScopedClasses['feature-icon']} */ ;
        (s.icon);
        __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
        (s.title);
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
        (s.summary);
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "feature-link" },
            ...{ style: ({ color: s.color }) },
        });
        /** @type {__VLS_StyleScopedClasses['feature-link']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "link-arrow" },
            'aria-hidden': "true",
        });
        /** @type {__VLS_StyleScopedClasses['link-arrow']} */ ;
        // @ts-ignore
        [];
    }
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
