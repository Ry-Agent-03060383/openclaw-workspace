/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { useRouter } from 'vue-router';
import { Finished, OfficeBuilding, ArrowRight, Clock } from '@element-plus/icons-vue';
const router = useRouter();
/* ── 匹配步骤 ── */
const matchSteps = [
    { title: '企业填写融资需求', desc: '在线提交企业基本信息、融资金额、用途及期限，系统智能分析企业画像' },
    { title: '多维度智能匹配', desc: '基于企业经营数据、信用评分、行业特征等上百个维度，精准匹配银行产品' },
    { title: '推荐最优产品组合', desc: '综合利率、额度、审批周期等因素，为企业推荐最优的金融产品组合方案' },
];
/* ── 推荐金融产品 ── */
const products = [
    { name: '科创e贷', bank: '中国银行', rate: '3.2% - 4.5%', maxAmount: '1000万', match: 96, color: '#409EFF' },
    { name: '税企贷', bank: '建设银行', rate: '3.5% - 4.8%', maxAmount: '500万', match: 92, color: '#67C23A' },
    { name: '政采贷', bank: '工商银行', rate: '3.0% - 4.2%', maxAmount: '2000万', match: 88, color: '#E6A23C' },
    { name: '供应链融', bank: '农业银行', rate: '3.8% - 5.0%', maxAmount: '800万', match: 85, color: '#F56C6C' },
    { name: '专精特新贷', bank: '交通银行', rate: '3.1% - 4.3%', maxAmount: '1500万', match: 90, color: '#909399' },
    { name: '普惠e贷', bank: '邮储银行', rate: '3.6% - 4.9%', maxAmount: '300万', match: 82, color: '#409EFF' },
];
/* ── 融资案例 ── */
const cases = [
    {
        company: '河南中轴集团',
        industry: '高端制造',
        amount: '800万',
        product: '科创e贷',
        time: '3个工作日',
        desc: '通过平台智能匹配，快速获取中国银行科创e贷800万授信，利率仅3.45%，较传统渠道降低1.2个百分点。',
    },
    {
        company: '焦作市云台数据科技',
        industry: '信息技术',
        amount: '300万',
        product: '税企贷',
        time: '2个工作日',
        desc: '凭借良好的纳税信用记录，匹配建设银行税企贷产品，无需抵押即获300万纯信用贷款。',
    },
    {
        company: '修武县绿丰农业合作社',
        industry: '现代农业',
        amount: '200万',
        product: '惠农贷',
        time: '5个工作日',
        desc: '农业合作社通过平台对接惠农专项贷款，享受政府贴息政策，综合融资成本仅2.8%。',
    },
];
/* ── 合作银行 ── */
const banks = [
    '中国银行', '建设银行', '工商银行', '农业银行',
    '交通银行', '邮储银行', '中原银行', '焦作中旅银行',
];
function goRegister() {
    router.push('/register');
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['hero-bg']} */ ;
/** @type {__VLS_StyleScopedClasses['step-card']} */ ;
/** @type {__VLS_StyleScopedClasses['product-card']} */ ;
/** @type {__VLS_StyleScopedClasses['case-card']} */ ;
/** @type {__VLS_StyleScopedClasses['bank-card']} */ ;
/** @type {__VLS_StyleScopedClasses['cta-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['product-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['case-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['steps-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['step-card']} */ ;
/** @type {__VLS_StyleScopedClasses['product-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['case-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['bank-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-title']} */ ;
/** @type {__VLS_StyleScopedClasses['cta-section']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "bank-match" },
});
/** @type {__VLS_StyleScopedClasses['bank-match']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "hero-section" },
});
/** @type {__VLS_StyleScopedClasses['hero-section']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ class: "hero-bg" },
});
/** @type {__VLS_StyleScopedClasses['hero-bg']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "hero-content" },
});
/** @type {__VLS_StyleScopedClasses['hero-content']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
    ...{ class: "hero-title" },
});
/** @type {__VLS_StyleScopedClasses['hero-title']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "hero-subtitle" },
});
/** @type {__VLS_StyleScopedClasses['hero-subtitle']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    type: "primary",
    size: "large",
    round: true,
    ...{ class: "hero-btn" },
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    type: "primary",
    size: "large",
    round: true,
    ...{ class: "hero-btn" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = {
    /** @type {typeof __VLS_5.click} */
    onClick: (__VLS_ctx.goRegister),
};
/** @type {__VLS_StyleScopedClasses['hero-btn']} */ ;
const { default: __VLS_7 } = __VLS_3.slots;
// @ts-ignore
[goRegister,];
var __VLS_3;
var __VLS_4;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "section match-section" },
});
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['match-section']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "section-inner" },
});
/** @type {__VLS_StyleScopedClasses['section-inner']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "section-header" },
});
/** @type {__VLS_StyleScopedClasses['section-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "section-tag" },
});
/** @type {__VLS_StyleScopedClasses['section-tag']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "section-title" },
});
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "section-desc" },
});
/** @type {__VLS_StyleScopedClasses['section-desc']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "steps-grid" },
});
/** @type {__VLS_StyleScopedClasses['steps-grid']} */ ;
for (const [step, idx] of __VLS_vFor((__VLS_ctx.matchSteps))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (idx),
        ...{ class: "step-card" },
    });
    /** @type {__VLS_StyleScopedClasses['step-card']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "step-number" },
    });
    /** @type {__VLS_StyleScopedClasses['step-number']} */ ;
    (idx + 1);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "step-icon" },
    });
    /** @type {__VLS_StyleScopedClasses['step-icon']} */ ;
    if (idx === 0) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
            width: "40",
            height: "40",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "#409EFF",
            'stroke-width': "1.8",
            'stroke-linecap': "round",
            'stroke-linejoin': "round",
        });
        __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
            d: "M12 20h9",
        });
        __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
            d: "M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z",
        });
    }
    if (idx === 1) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
            width: "40",
            height: "40",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "#409EFF",
            'stroke-width': "1.8",
            'stroke-linecap': "round",
            'stroke-linejoin': "round",
        });
        __VLS_asFunctionalElement1(__VLS_intrinsics.circle)({
            cx: "12",
            cy: "12",
            r: "10",
        });
        __VLS_asFunctionalElement1(__VLS_intrinsics.circle)({
            cx: "12",
            cy: "12",
            r: "6",
        });
        __VLS_asFunctionalElement1(__VLS_intrinsics.circle)({
            cx: "12",
            cy: "12",
            r: "2",
        });
    }
    if (idx === 2) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
            width: "40",
            height: "40",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "#409EFF",
            'stroke-width': "1.8",
            'stroke-linecap': "round",
            'stroke-linejoin': "round",
        });
        __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
            d: "M6 9H4.5a2.5 2.5 0 010-5H6",
        });
        __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
            d: "M18 9h1.5a2.5 2.5 0 000-5H18",
        });
        __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
            d: "M4 22h16",
        });
        __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
            d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",
        });
        __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
            d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",
        });
        __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
            d: "M18 2H6v7a6 6 0 0012 0V2z",
        });
    }
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
    if (idx < __VLS_ctx.matchSteps.length - 1) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "step-arrow" },
        });
        /** @type {__VLS_StyleScopedClasses['step-arrow']} */ ;
        let __VLS_8;
        /** @ts-ignore @type { | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon'] | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon']} */
        elIcon;
        // @ts-ignore
        const __VLS_9 = __VLS_asFunctionalComponent1(__VLS_8, new __VLS_8({
            size: (24),
            color: "#409EFF",
        }));
        const __VLS_10 = __VLS_9({
            size: (24),
            color: "#409EFF",
        }, ...__VLS_functionalComponentArgsRest(__VLS_9));
        const { default: __VLS_13 } = __VLS_11.slots;
        let __VLS_14;
        /** @ts-ignore @type { | typeof __VLS_components.ArrowRight} */
        ArrowRight;
        // @ts-ignore
        const __VLS_15 = __VLS_asFunctionalComponent1(__VLS_14, new __VLS_14({}));
        const __VLS_16 = __VLS_15({}, ...__VLS_functionalComponentArgsRest(__VLS_15));
        // @ts-ignore
        [matchSteps, matchSteps,];
        var __VLS_11;
    }
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "section product-section" },
});
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['product-section']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "section-inner" },
});
/** @type {__VLS_StyleScopedClasses['section-inner']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "section-header" },
});
/** @type {__VLS_StyleScopedClasses['section-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "section-tag" },
});
/** @type {__VLS_StyleScopedClasses['section-tag']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "section-title" },
});
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "section-desc" },
});
/** @type {__VLS_StyleScopedClasses['section-desc']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "product-grid" },
});
/** @type {__VLS_StyleScopedClasses['product-grid']} */ ;
for (const [prod, idx] of __VLS_vFor((__VLS_ctx.products))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (idx),
        ...{ class: "product-card" },
    });
    /** @type {__VLS_StyleScopedClasses['product-card']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "product-header" },
        ...{ style: ({ borderLeftColor: prod.color }) },
    });
    /** @type {__VLS_StyleScopedClasses['product-header']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
        ...{ class: "product-name" },
    });
    /** @type {__VLS_StyleScopedClasses['product-name']} */ ;
    (prod.name);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "product-bank" },
    });
    /** @type {__VLS_StyleScopedClasses['product-bank']} */ ;
    (prod.bank);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "product-body" },
    });
    /** @type {__VLS_StyleScopedClasses['product-body']} */ ;
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
        ...{ class: "meta-value" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['meta-value']} */ ;
    (prod.rate);
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
    (prod.maxAmount);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "match-row" },
    });
    /** @type {__VLS_StyleScopedClasses['match-row']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "match-label" },
    });
    /** @type {__VLS_StyleScopedClasses['match-label']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "match-bar-wrap" },
    });
    /** @type {__VLS_StyleScopedClasses['match-bar-wrap']} */ ;
    let __VLS_19;
    /** @ts-ignore @type { | typeof __VLS_components.elProgress | typeof __VLS_components.ElProgress | typeof __VLS_components['el-progress']} */
    elProgress;
    // @ts-ignore
    const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
        percentage: (prod.match),
        color: (prod.color),
        strokeWidth: (10),
        textInside: (true),
        format: ((p) => p + '%'),
    }));
    const __VLS_21 = __VLS_20({
        percentage: (prod.match),
        color: (prod.color),
        strokeWidth: (10),
        textInside: (true),
        format: ((p) => p + '%'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_20));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "product-footer" },
    });
    /** @type {__VLS_StyleScopedClasses['product-footer']} */ ;
    let __VLS_24;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({
        ...{ 'onClick': {} },
        type: "primary",
        round: true,
        size: "small",
    }));
    const __VLS_26 = __VLS_25({
        ...{ 'onClick': {} },
        type: "primary",
        round: true,
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    let __VLS_29;
    const __VLS_30 = {
        /** @type {typeof __VLS_29.click} */
        onClick: (__VLS_ctx.goRegister),
    };
    const { default: __VLS_31 } = __VLS_27.slots;
    // @ts-ignore
    [goRegister, products,];
    var __VLS_27;
    var __VLS_28;
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "section case-section" },
});
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['case-section']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "section-inner" },
});
/** @type {__VLS_StyleScopedClasses['section-inner']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "section-header" },
});
/** @type {__VLS_StyleScopedClasses['section-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "section-tag" },
});
/** @type {__VLS_StyleScopedClasses['section-tag']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "section-title" },
});
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "section-desc" },
});
/** @type {__VLS_StyleScopedClasses['section-desc']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "case-grid" },
});
/** @type {__VLS_StyleScopedClasses['case-grid']} */ ;
for (const [c, idx] of __VLS_vFor((__VLS_ctx.cases))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (idx),
        ...{ class: "case-card" },
    });
    /** @type {__VLS_StyleScopedClasses['case-card']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "case-top" },
    });
    /** @type {__VLS_StyleScopedClasses['case-top']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "case-avatar" },
    });
    /** @type {__VLS_StyleScopedClasses['case-avatar']} */ ;
    (c.company[0]);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "case-info" },
    });
    /** @type {__VLS_StyleScopedClasses['case-info']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h4, __VLS_intrinsics.h4)({
        ...{ class: "case-company" },
    });
    /** @type {__VLS_StyleScopedClasses['case-company']} */ ;
    (c.company);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "case-industry" },
    });
    /** @type {__VLS_StyleScopedClasses['case-industry']} */ ;
    (c.industry);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "case-amount-row" },
    });
    /** @type {__VLS_StyleScopedClasses['case-amount-row']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "case-amount" },
    });
    /** @type {__VLS_StyleScopedClasses['case-amount']} */ ;
    (c.amount);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "case-amount-label" },
    });
    /** @type {__VLS_StyleScopedClasses['case-amount-label']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "case-detail" },
    });
    /** @type {__VLS_StyleScopedClasses['case-detail']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "case-detail-item" },
    });
    /** @type {__VLS_StyleScopedClasses['case-detail-item']} */ ;
    let __VLS_32;
    /** @ts-ignore @type { | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon'] | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon']} */
    elIcon;
    // @ts-ignore
    const __VLS_33 = __VLS_asFunctionalComponent1(__VLS_32, new __VLS_32({
        size: (14),
        color: "#409EFF",
    }));
    const __VLS_34 = __VLS_33({
        size: (14),
        color: "#409EFF",
    }, ...__VLS_functionalComponentArgsRest(__VLS_33));
    const { default: __VLS_37 } = __VLS_35.slots;
    let __VLS_38;
    /** @ts-ignore @type { | typeof __VLS_components.Finished} */
    Finished;
    // @ts-ignore
    const __VLS_39 = __VLS_asFunctionalComponent1(__VLS_38, new __VLS_38({}));
    const __VLS_40 = __VLS_39({}, ...__VLS_functionalComponentArgsRest(__VLS_39));
    // @ts-ignore
    [cases,];
    var __VLS_35;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (c.product);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "case-detail-item" },
    });
    /** @type {__VLS_StyleScopedClasses['case-detail-item']} */ ;
    let __VLS_43;
    /** @ts-ignore @type { | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon'] | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon']} */
    elIcon;
    // @ts-ignore
    const __VLS_44 = __VLS_asFunctionalComponent1(__VLS_43, new __VLS_43({
        size: (14),
        color: "#409EFF",
    }));
    const __VLS_45 = __VLS_44({
        size: (14),
        color: "#409EFF",
    }, ...__VLS_functionalComponentArgsRest(__VLS_44));
    const { default: __VLS_48 } = __VLS_46.slots;
    let __VLS_49;
    /** @ts-ignore @type { | typeof __VLS_components.Clock} */
    Clock;
    // @ts-ignore
    const __VLS_50 = __VLS_asFunctionalComponent1(__VLS_49, new __VLS_49({}));
    const __VLS_51 = __VLS_50({}, ...__VLS_functionalComponentArgsRest(__VLS_50));
    // @ts-ignore
    [];
    var __VLS_46;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (c.time);
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "case-desc" },
    });
    /** @type {__VLS_StyleScopedClasses['case-desc']} */ ;
    (c.desc);
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "section bank-section" },
});
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['bank-section']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "section-inner" },
});
/** @type {__VLS_StyleScopedClasses['section-inner']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "section-header" },
});
/** @type {__VLS_StyleScopedClasses['section-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "section-tag" },
});
/** @type {__VLS_StyleScopedClasses['section-tag']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "section-title" },
});
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "section-desc" },
});
/** @type {__VLS_StyleScopedClasses['section-desc']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "bank-grid" },
});
/** @type {__VLS_StyleScopedClasses['bank-grid']} */ ;
for (const [bank, idx] of __VLS_vFor((__VLS_ctx.banks))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (idx),
        ...{ class: "bank-card" },
    });
    /** @type {__VLS_StyleScopedClasses['bank-card']} */ ;
    let __VLS_54;
    /** @ts-ignore @type { | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon'] | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon']} */
    elIcon;
    // @ts-ignore
    const __VLS_55 = __VLS_asFunctionalComponent1(__VLS_54, new __VLS_54({
        size: (32),
        color: "#409EFF",
    }));
    const __VLS_56 = __VLS_55({
        size: (32),
        color: "#409EFF",
    }, ...__VLS_functionalComponentArgsRest(__VLS_55));
    const { default: __VLS_59 } = __VLS_57.slots;
    let __VLS_60;
    /** @ts-ignore @type { | typeof __VLS_components.OfficeBuilding} */
    OfficeBuilding;
    // @ts-ignore
    const __VLS_61 = __VLS_asFunctionalComponent1(__VLS_60, new __VLS_60({}));
    const __VLS_62 = __VLS_61({}, ...__VLS_functionalComponentArgsRest(__VLS_61));
    // @ts-ignore
    [banks,];
    var __VLS_57;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "bank-name" },
    });
    /** @type {__VLS_StyleScopedClasses['bank-name']} */ ;
    (bank);
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "cta-section" },
});
/** @type {__VLS_StyleScopedClasses['cta-section']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "cta-inner" },
});
/** @type {__VLS_StyleScopedClasses['cta-inner']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "cta-title" },
});
/** @type {__VLS_StyleScopedClasses['cta-title']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "cta-desc" },
});
/** @type {__VLS_StyleScopedClasses['cta-desc']} */ ;
let __VLS_65;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_66 = __VLS_asFunctionalComponent1(__VLS_65, new __VLS_65({
    ...{ 'onClick': {} },
    type: "primary",
    size: "large",
    round: true,
    ...{ class: "cta-btn" },
}));
const __VLS_67 = __VLS_66({
    ...{ 'onClick': {} },
    type: "primary",
    size: "large",
    round: true,
    ...{ class: "cta-btn" },
}, ...__VLS_functionalComponentArgsRest(__VLS_66));
let __VLS_70;
const __VLS_71 = {
    /** @type {typeof __VLS_70.click} */
    onClick: (__VLS_ctx.goRegister),
};
/** @type {__VLS_StyleScopedClasses['cta-btn']} */ ;
const { default: __VLS_72 } = __VLS_68.slots;
// @ts-ignore
[goRegister,];
var __VLS_68;
var __VLS_69;
__VLS_asFunctionalElement1(__VLS_intrinsics.footer, __VLS_intrinsics.footer)({
    ...{ class: "site-footer" },
});
/** @type {__VLS_StyleScopedClasses['site-footer']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "footer-text" },
});
/** @type {__VLS_StyleScopedClasses['footer-text']} */ ;
(new Date().getFullYear());
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
