/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../../store/user';
const router = useRouter();
const userStore = useUserStore();
const searchKeyword = ref('');
const hotProducts = [
    { bank: '工商银行', name: '小微快贷', rate: '3.85%', term: '1-12月', type: '信用', tag: '热门' },
    { bank: '农业银行', name: '纳税e贷', rate: '4.0%', term: '1-12月', type: '信用', tag: '热门' },
    { bank: '中国银行', name: '短期流资贷款', rate: '3.95%', term: '3-12月', type: '抵押', tag: '推荐' },
    { bank: '建设银行', name: '惠懂你', rate: '3.75%', term: '1-12月', type: '信用', tag: '热销' },
    { bank: '交通银行', name: '线上税融通', rate: '4.1%', term: '1-6月', type: '信用', tag: '' },
    { bank: '邮储银行', name: '极速贷', rate: '4.2%', term: '1-24月', type: '抵押', tag: '新品' },
];
const filteredProducts = ref([...hotProducts]);
function handleSearch() {
    if (!searchKeyword.value.trim()) {
        filteredProducts.value = [...hotProducts];
        return;
    }
    const kw = searchKeyword.value.trim().toLowerCase();
    filteredProducts.value = hotProducts.filter(p => p.name.toLowerCase().includes(kw) || p.bank.toLowerCase().includes(kw));
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['product-search-inner']} */ ;
/** @type {__VLS_StyleScopedClasses['product-search-inner']} */ ;
/** @type {__VLS_StyleScopedClasses['product-hot-tags']} */ ;
/** @type {__VLS_StyleScopedClasses['product-hot-tags']} */ ;
/** @type {__VLS_StyleScopedClasses['product-hot-tags']} */ ;
/** @type {__VLS_StyleScopedClasses['hot-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['product-card']} */ ;
/** @type {__VLS_StyleScopedClasses['product-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['product-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['product-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['product-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['meta-value']} */ ;
/** @type {__VLS_StyleScopedClasses['products-cta']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
/** @type {__VLS_StyleScopedClasses['product-card']} */ ;
/** @type {__VLS_StyleScopedClasses['products-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['products-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['product-card']} */ ;
/** @type {__VLS_StyleScopedClasses['products-cta']} */ ;
/** @type {__VLS_StyleScopedClasses['product-search-bar']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    id: "products",
    ...{ class: "products-section" },
    'aria-label': "金融产品",
});
/** @type {__VLS_StyleScopedClasses['products-section']} */ ;
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
    ...{ class: "product-search-bar" },
    role: "search",
    'aria-label': "金融产品搜索",
});
/** @type {__VLS_StyleScopedClasses['product-search-bar']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "product-search-inner" },
});
/** @type {__VLS_StyleScopedClasses['product-search-inner']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "product-search-icon" },
    'aria-hidden': "true",
});
/** @type {__VLS_StyleScopedClasses['product-search-icon']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    ...{ onInput: (__VLS_ctx.handleSearch) },
    value: (__VLS_ctx.searchKeyword),
    type: "text",
    placeholder: "按产品名称或银行搜索...",
    'aria-label': "输入产品名称或银行搜索",
});
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    type: "primary",
    round: true,
    size: "small",
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    type: "primary",
    round: true,
    size: "small",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = {
    /** @type {typeof __VLS_5.click} */
    onClick: (__VLS_ctx.handleSearch),
};
const { default: __VLS_7 } = __VLS_3.slots;
// @ts-ignore
[handleSearch, handleSearch, searchKeyword,];
var __VLS_3;
var __VLS_4;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "product-hot-tags" },
});
/** @type {__VLS_StyleScopedClasses['product-hot-tags']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "hot-label" },
});
/** @type {__VLS_StyleScopedClasses['hot-label']} */ ;
for (const [t] of __VLS_vFor((['小微快贷', '纳税e贷', '短期流资贷款', '科技贷']))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.searchKeyword = t;
                __VLS_ctx.handleSearch();
                // @ts-ignore
                [handleSearch, searchKeyword,];
            } },
        key: (t),
        ...{ class: "hot-tag" },
        href: "#",
        'aria-label': ('搜索' + t),
    });
    /** @type {__VLS_StyleScopedClasses['hot-tag']} */ ;
    (t);
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "products-grid" },
    role: "list",
});
/** @type {__VLS_StyleScopedClasses['products-grid']} */ ;
for (const [p, i] of __VLS_vFor((__VLS_ctx.filteredProducts))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (i),
        ...{ class: "product-card" },
        role: "listitem",
        'aria-label': (p.bank + ' - ' + p.name),
        ...{ style: ({ '--delay': i * 0.06 + 's' }) },
    });
    /** @type {__VLS_StyleScopedClasses['product-card']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "product-header" },
    });
    /** @type {__VLS_StyleScopedClasses['product-header']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "product-bank" },
    });
    /** @type {__VLS_StyleScopedClasses['product-bank']} */ ;
    (p.bank);
    if (p.tag) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: (['product-tag', p.tag]) },
        });
        /** @type {__VLS_StyleScopedClasses['product-tag']} */ ;
        (p.tag);
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.h4, __VLS_intrinsics.h4)({
        ...{ class: "product-name" },
    });
    /** @type {__VLS_StyleScopedClasses['product-name']} */ ;
    (p.name);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "product-meta" },
    });
    /** @type {__VLS_StyleScopedClasses['product-meta']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "meta-item" },
    });
    /** @type {__VLS_StyleScopedClasses['meta-item']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "meta-label" },
    });
    /** @type {__VLS_StyleScopedClasses['meta-label']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "meta-value rate" },
    });
    /** @type {__VLS_StyleScopedClasses['meta-value']} */ ;
    /** @type {__VLS_StyleScopedClasses['rate']} */ ;
    (p.rate);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ class: "meta-divider" },
    });
    /** @type {__VLS_StyleScopedClasses['meta-divider']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "meta-item" },
    });
    /** @type {__VLS_StyleScopedClasses['meta-item']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "meta-label" },
    });
    /** @type {__VLS_StyleScopedClasses['meta-label']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "meta-value" },
    });
    /** @type {__VLS_StyleScopedClasses['meta-value']} */ ;
    (p.term);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ class: "meta-divider" },
    });
    /** @type {__VLS_StyleScopedClasses['meta-divider']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "meta-item" },
    });
    /** @type {__VLS_StyleScopedClasses['meta-item']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "meta-label" },
    });
    /** @type {__VLS_StyleScopedClasses['meta-label']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "meta-value" },
    });
    /** @type {__VLS_StyleScopedClasses['meta-value']} */ ;
    (p.type);
    let __VLS_8;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent1(__VLS_8, new __VLS_8({
        ...{ 'onClick': {} },
        type: (i < 3 ? 'primary' : 'default'),
        round: true,
        size: "small",
    }));
    const __VLS_10 = __VLS_9({
        ...{ 'onClick': {} },
        type: (i < 3 ? 'primary' : 'default'),
        round: true,
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    let __VLS_13;
    const __VLS_14 = {
        /** @type {typeof __VLS_13.click} */
        onClick: (...[$event]) => {
            __VLS_ctx.userStore.isLoggedIn ? __VLS_ctx.router.push('/dashboard/products/apply?name=' + p.name) : __VLS_ctx.router.push('/login');
            // @ts-ignore
            [filteredProducts, userStore, router, router,];
        },
    };
    const { default: __VLS_15 } = __VLS_11.slots;
    (__VLS_ctx.userStore.isLoggedIn ? '立即申请' : '登录申请');
    // @ts-ignore
    [userStore,];
    var __VLS_11;
    var __VLS_12;
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "products-cta" },
});
/** @type {__VLS_StyleScopedClasses['products-cta']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
let __VLS_16;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent1(__VLS_16, new __VLS_16({
    ...{ 'onClick': {} },
    round: true,
}));
const __VLS_18 = __VLS_17({
    ...{ 'onClick': {} },
    round: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
let __VLS_21;
const __VLS_22 = {
    /** @type {typeof __VLS_21.click} */
    onClick: (...[$event]) => {
        __VLS_ctx.userStore.isLoggedIn ? __VLS_ctx.router.push('/dashboard/products') : __VLS_ctx.router.push('/login');
        // @ts-ignore
        [userStore, router, router,];
    },
};
const { default: __VLS_23 } = __VLS_19.slots;
(__VLS_ctx.userStore.isLoggedIn ? '查看全部产品 →' : '登录查看 →');
// @ts-ignore
[userStore,];
var __VLS_19;
var __VLS_20;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
