/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getCmsByType, getCmsByCategory, getCategoryLabel } from '../../api/cms';
const route = useRoute();
const router = useRouter();
const item = ref(null);
const categoryItems = ref([]);
const loading = ref(true);
const error = ref('');
const categoryLabel = computed(() => {
    if (!item.value)
        return '';
    return getCategoryLabel(item.value.category);
});
async function loadContent() {
    loading.value = true;
    error.value = '';
    const id = route.params.id;
    try {
        const res = await getCmsByType(id);
        if (res?.data) {
            item.value = res.data;
            // 同时加载同分类列表
            const catRes = await getCmsByCategory(res.data.category);
            categoryItems.value = catRes?.data || [];
        }
        else {
            error.value = '内容不存在';
        }
    }
    catch {
        error.value = '加载失败，请稍后重试';
    }
    finally {
        loading.value = false;
    }
}
function goHome() {
    router.push('/');
}
onMounted(loadContent);
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['error-state']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-content']} */ ;
/** @type {__VLS_StyleScopedClasses['breadcrumb']} */ ;
/** @type {__VLS_StyleScopedClasses['breadcrumb']} */ ;
/** @type {__VLS_StyleScopedClasses['body-sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['body-sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['body-sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['body-sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-back']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-back']} */ ;
/** @type {__VLS_StyleScopedClasses['summary-card']} */ ;
/** @type {__VLS_StyleScopedClasses['meta-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['related-links']} */ ;
/** @type {__VLS_StyleScopedClasses['related-card']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['sep']} */ ;
/** @type {__VLS_StyleScopedClasses['body-container']} */ ;
/** @type {__VLS_StyleScopedClasses['body-sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['body-section']} */ ;
/** @type {__VLS_StyleScopedClasses['related-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-hero']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "footer-detail-page" },
});
/** @type {__VLS_StyleScopedClasses['footer-detail-page']} */ ;
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "loading-state" },
    });
    /** @type {__VLS_StyleScopedClasses['loading-state']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ class: "spinner" },
    });
    /** @type {__VLS_StyleScopedClasses['spinner']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
}
else if (__VLS_ctx.error) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "error-state" },
    });
    /** @type {__VLS_StyleScopedClasses['error-state']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "error-icon" },
    });
    /** @type {__VLS_StyleScopedClasses['error-icon']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
    (__VLS_ctx.error);
    let __VLS_0;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        ...{ 'onClick': {} },
    }));
    const __VLS_2 = __VLS_1({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_5;
    const __VLS_6 = {
        /** @type {typeof __VLS_5.click} */
        onClick: (__VLS_ctx.goHome),
    };
    const { default: __VLS_7 } = __VLS_3.slots;
    // @ts-ignore
    [loading, error, error, goHome,];
    var __VLS_3;
    var __VLS_4;
}
else if (__VLS_ctx.item) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
        ...{ class: "detail-hero" },
        ...{ style: ({ backgroundImage: `linear-gradient(135deg, #0f0c29, #302b63, #24243e)` }) },
    });
    /** @type {__VLS_StyleScopedClasses['detail-hero']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "hero-content" },
    });
    /** @type {__VLS_StyleScopedClasses['hero-content']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "hero-icon" },
    });
    /** @type {__VLS_StyleScopedClasses['hero-icon']} */ ;
    (__VLS_ctx.item.icon || '📄');
    __VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({});
    (__VLS_ctx.item.title);
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "hero-subtitle" },
    });
    /** @type {__VLS_StyleScopedClasses['hero-subtitle']} */ ;
    (__VLS_ctx.item.subtitle);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "breadcrumb" },
    });
    /** @type {__VLS_StyleScopedClasses['breadcrumb']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
        ...{ onClick: (__VLS_ctx.goHome) },
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "sep" },
    });
    /** @type {__VLS_StyleScopedClasses['sep']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
        ...{ onClick: (__VLS_ctx.goHome) },
        ...{ class: "no-style" },
    });
    /** @type {__VLS_StyleScopedClasses['no-style']} */ ;
    (__VLS_ctx.categoryLabel);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "sep" },
    });
    /** @type {__VLS_StyleScopedClasses['sep']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "current" },
    });
    /** @type {__VLS_StyleScopedClasses['current']} */ ;
    (__VLS_ctx.item.title);
    __VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
        ...{ class: "detail-body" },
    });
    /** @type {__VLS_StyleScopedClasses['detail-body']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "body-container" },
    });
    /** @type {__VLS_StyleScopedClasses['body-container']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.aside, __VLS_intrinsics.aside)({
        ...{ class: "body-sidebar" },
    });
    /** @type {__VLS_StyleScopedClasses['body-sidebar']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
    (__VLS_ctx.categoryLabel);
    __VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({});
    for (const [ci] of __VLS_vFor((__VLS_ctx.categoryItems))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.loading))
                        return;
                    if (!!(__VLS_ctx.error))
                        return;
                    if (!(__VLS_ctx.item))
                        return;
                    __VLS_ctx.router.push(`/footer/${ci.type}`);
                    // @ts-ignore
                    [goHome, goHome, item, item, item, item, item, categoryLabel, categoryLabel, categoryItems, router,];
                } },
            key: (ci.id),
            ...{ class: ({ active: ci.id === __VLS_ctx.item.id }) },
        });
        /** @type {__VLS_StyleScopedClasses['active']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "sidebar-icon" },
        });
        /** @type {__VLS_StyleScopedClasses['sidebar-icon']} */ ;
        (ci.icon);
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
        (ci.title);
        // @ts-ignore
        [item,];
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "sidebar-back" },
    });
    /** @type {__VLS_StyleScopedClasses['sidebar-back']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
        ...{ onClick: (__VLS_ctx.goHome) },
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.article, __VLS_intrinsics.article)({
        ...{ class: "body-main" },
    });
    /** @type {__VLS_StyleScopedClasses['body-main']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "summary-card" },
    });
    /** @type {__VLS_StyleScopedClasses['summary-card']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    (__VLS_ctx.item.summary);
    for (const [section, i] of __VLS_vFor((__VLS_ctx.item.body))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
            key: (i),
            ...{ class: "body-section" },
        });
        __VLS_asFunctionalDirective(__VLS_directives.vHtml, {})(null, { ...__VLS_directiveBindingRestFields, value: (section) }, null, null);
        /** @type {__VLS_StyleScopedClasses['body-section']} */ ;
        // @ts-ignore
        [goHome, item, item,];
    }
    if (__VLS_ctx.item.meta?.length) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "meta-grid" },
        });
        /** @type {__VLS_StyleScopedClasses['meta-grid']} */ ;
        for (const [m, i] of __VLS_vFor((__VLS_ctx.item.meta))) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                key: (i),
                ...{ class: "meta-item" },
            });
            /** @type {__VLS_StyleScopedClasses['meta-item']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "meta-value" },
            });
            /** @type {__VLS_StyleScopedClasses['meta-value']} */ ;
            (m.value);
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "meta-key" },
            });
            /** @type {__VLS_StyleScopedClasses['meta-key']} */ ;
            (m.key);
            // @ts-ignore
            [item, item,];
        }
    }
    if (__VLS_ctx.item.related?.length) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "related-links" },
        });
        /** @type {__VLS_StyleScopedClasses['related-links']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "related-grid" },
        });
        /** @type {__VLS_StyleScopedClasses['related-grid']} */ ;
        for (const [r] of __VLS_vFor((__VLS_ctx.item.related))) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
                ...{ onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.loading))
                            return;
                        if (!!(__VLS_ctx.error))
                            return;
                        if (!(__VLS_ctx.item))
                            return;
                        if (!(__VLS_ctx.item.related?.length))
                            return;
                        __VLS_ctx.router.push(r.link);
                        // @ts-ignore
                        [item, item, router,];
                    } },
                key: (r.label),
                ...{ class: "related-card" },
            });
            /** @type {__VLS_StyleScopedClasses['related-card']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "related-arrow" },
            });
            /** @type {__VLS_StyleScopedClasses['related-arrow']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
            (r.label);
            // @ts-ignore
            [];
        }
    }
}
__VLS_asFunctionalElement1(__VLS_intrinsics.footer, __VLS_intrinsics.footer)({
    ...{ class: "detail-footer" },
});
/** @type {__VLS_StyleScopedClasses['detail-footer']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "footer-inner" },
});
/** @type {__VLS_StyleScopedClasses['footer-inner']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "https://beian.miit.gov.cn",
    target: "_blank",
    rel: "noopener",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "sep" },
});
/** @type {__VLS_StyleScopedClasses['sep']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "https://beian.mps.gov.cn",
    target: "_blank",
    rel: "noopener",
});
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
