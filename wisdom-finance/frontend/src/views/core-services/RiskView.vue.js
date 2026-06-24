/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Check, CircleCheckFilled } from '@element-plus/icons-vue';
const router = useRouter();
// ── 风险全景统计数据 ──
const stats = ref([
    { label: '监控企业数', value: '12,846', unit: '家', icon: '🏢', color: '#E6A23C' },
    { label: '活跃预警数', value: '186', unit: '条', icon: '🔔', color: '#F56C6C' },
    { label: '平均风险分', value: '68.5', unit: '分', icon: '📊', color: '#409EFF' },
    { label: '风险趋势', value: '↓ 12.3%', unit: '', icon: '📉', color: '#67C23A', trend: 'down' },
]);
// ── 风控体系层级 ──
const riskLayers = ref([
    {
        title: '数据采集',
        subtitle: '多维数据汇聚，构建风控数据底座',
        icon: '📡',
        details: [
            '工商注册信息实时同步',
            '司法诉讼数据全量采集',
            '税务申报数据对接',
            '舆情信息多源汇聚',
            '银行流水数据授权接入',
        ],
    },
    {
        title: '模型分析',
        subtitle: 'AI智能分析，精准评估风险水平',
        icon: '🧠',
        details: [
            '5维度信用评分模型',
            '机器学习风险预测',
            '行业风险基准对比',
            '企业关联关系图谱',
            '财务报表智能分析',
        ],
    },
    {
        title: '预警监控',
        subtitle: '7×24小时实时监控，异常即时预警',
        icon: '🚨',
        details: [
            '经营异常自动检测',
            '司法诉讼实时告警',
            '税务异常及时推送',
            '舆情负面信息监控',
            '信贷违约预警通知',
        ],
    },
    {
        title: '决策支持',
        subtitle: '数据驱动决策，风控建议一键生成',
        icon: '💡',
        details: [
            '风险报告自动生成',
            '授信额度智能建议',
            '贷后管理风险提示',
            '批量评估批量处理',
            '风险可视化大屏展示',
        ],
    },
]);
// ── 预警规则 ──
const rules = ref([
    {
        title: '经营异常',
        icon: '⚠️',
        color: '#E6A23C',
        desc: '企业变更频繁、地址异常、连续亏损等经营风险监控与自动预警',
        tags: ['地址异常', '法人变更', '亏损预警', '停业风险'],
    },
    {
        title: '司法诉讼',
        icon: '⚖️',
        color: '#F56C6C',
        desc: '被执行人、失信名单、开庭公告、裁判文书等司法风险实时监控',
        tags: ['被执行人', '失信名单', '诉讼', '仲裁'],
    },
    {
        title: '税务异常',
        icon: '📋',
        color: '#909399',
        desc: '税务欠缴、纳税信用降级、税务稽查等涉税风险动态监测',
        tags: ['欠税', '纳税降级', '稽查', '非正常户'],
    },
    {
        title: '舆情监控',
        icon: '📰',
        color: '#409EFF',
        desc: '新闻媒体、社交平台、行业论坛等多渠道负面舆情智能抓取',
        tags: ['负面新闻', '口碑监测', '行业曝光', '投诉'],
    },
    {
        title: '信贷异常',
        icon: '🏦',
        color: '#67C23A',
        desc: '贷款逾期、多头借贷、担保代偿等信贷风险全周期预警监控',
        tags: ['逾期', '多头借贷', '担保代偿', '征信不良'],
    },
]);
// ── 核心优势 ──
const advantages = ref([
    { title: '多维数据融合', desc: '整合工商、司法、税务、舆情、信贷等30+数据源，全面刻画企业风险画像' },
    { title: 'AI智能评估', desc: '基于机器学习模型，从5大维度200+指标精准评估企业信用风险' },
    { title: '实时预警监控', desc: '7×24小时不间断监控，风险事件秒级感知，第一时间推送预警通知' },
    { title: '全流程风控', desc: '从贷前调查、贷中审批到贷后监控，覆盖信贷业务全生命周期风控' },
]);
function handleCTA() {
    router.push('/dashboard/risk');
}
function scrollToSection(id) {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-bg']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-btn-outline']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-card']} */ ;
/** @type {__VLS_StyleScopedClasses['layer-body']} */ ;
/** @type {__VLS_StyleScopedClasses['rule-card']} */ ;
/** @type {__VLS_StyleScopedClasses['rule-tags']} */ ;
/** @type {__VLS_StyleScopedClasses['advantage-card']} */ ;
/** @type {__VLS_StyleScopedClasses['cta-bg']} */ ;
/** @type {__VLS_StyleScopedClasses['cta-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-brand']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-col']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-col']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-bottom']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['rules-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['rules-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['advantages-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['layer-details']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-content']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-links']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-section']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-card']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-value']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "risk-prevention" },
});
/** @type {__VLS_StyleScopedClasses['risk-prevention']} */ ;
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
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
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
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "hero-actions" },
});
/** @type {__VLS_StyleScopedClasses['hero-actions']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    type: "danger",
    size: "large",
    ...{ class: "hero-btn-primary" },
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    type: "danger",
    size: "large",
    ...{ class: "hero-btn-primary" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = {
    /** @type {typeof __VLS_5.click} */
    onClick: (__VLS_ctx.handleCTA),
};
/** @type {__VLS_StyleScopedClasses['hero-btn-primary']} */ ;
const { default: __VLS_7 } = __VLS_3.slots;
// @ts-ignore
[handleCTA,];
var __VLS_3;
var __VLS_4;
let __VLS_8;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent1(__VLS_8, new __VLS_8({
    ...{ 'onClick': {} },
    size: "large",
    ...{ class: "hero-btn-outline" },
}));
const __VLS_10 = __VLS_9({
    ...{ 'onClick': {} },
    size: "large",
    ...{ class: "hero-btn-outline" },
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_13;
const __VLS_14 = {
    /** @type {typeof __VLS_13.click} */
    onClick: (...[$event]) => {
        __VLS_ctx.scrollToSection('overview');
        // @ts-ignore
        [scrollToSection,];
    },
};
/** @type {__VLS_StyleScopedClasses['hero-btn-outline']} */ ;
const { default: __VLS_15 } = __VLS_11.slots;
// @ts-ignore
[];
var __VLS_11;
var __VLS_12;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ref: "overview",
    id: "overview",
    ...{ class: "section animate-on-scroll" },
});
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "section-container" },
});
/** @type {__VLS_StyleScopedClasses['section-container']} */ ;
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
    ...{ class: "stats-grid" },
});
/** @type {__VLS_StyleScopedClasses['stats-grid']} */ ;
for (const [stat] of __VLS_vFor((__VLS_ctx.stats))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (stat.label),
        ...{ class: "stat-card" },
    });
    /** @type {__VLS_StyleScopedClasses['stat-card']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "stat-icon" },
        ...{ style: ({ background: stat.color + '15', color: stat.color }) },
    });
    /** @type {__VLS_StyleScopedClasses['stat-icon']} */ ;
    (stat.icon);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "stat-info" },
    });
    /** @type {__VLS_StyleScopedClasses['stat-info']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "stat-value" },
        ...{ style: ({ color: stat.color }) },
    });
    /** @type {__VLS_StyleScopedClasses['stat-value']} */ ;
    (stat.value);
    if (stat.unit) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "stat-unit" },
        });
        /** @type {__VLS_StyleScopedClasses['stat-unit']} */ ;
        (stat.unit);
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "stat-label" },
    });
    /** @type {__VLS_StyleScopedClasses['stat-label']} */ ;
    (stat.label);
    // @ts-ignore
    [stats,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "section section-alt animate-on-scroll" },
});
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-alt']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "section-container" },
});
/** @type {__VLS_StyleScopedClasses['section-container']} */ ;
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
    ...{ class: "layers-flow" },
});
/** @type {__VLS_StyleScopedClasses['layers-flow']} */ ;
for (const [layer, idx] of __VLS_vFor((__VLS_ctx.riskLayers))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (layer.title),
        ...{ class: "layer-card" },
    });
    /** @type {__VLS_StyleScopedClasses['layer-card']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "layer-step" },
    });
    /** @type {__VLS_StyleScopedClasses['layer-step']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "step-number" },
    });
    /** @type {__VLS_StyleScopedClasses['step-number']} */ ;
    (idx + 1);
    if (idx < __VLS_ctx.riskLayers.length - 1) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
            ...{ class: "step-line" },
        });
        /** @type {__VLS_StyleScopedClasses['step-line']} */ ;
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "layer-body" },
    });
    /** @type {__VLS_StyleScopedClasses['layer-body']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "layer-header" },
    });
    /** @type {__VLS_StyleScopedClasses['layer-header']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "layer-icon" },
    });
    /** @type {__VLS_StyleScopedClasses['layer-icon']} */ ;
    (layer.icon);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
        ...{ class: "layer-title" },
    });
    /** @type {__VLS_StyleScopedClasses['layer-title']} */ ;
    (layer.title);
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "layer-subtitle" },
    });
    /** @type {__VLS_StyleScopedClasses['layer-subtitle']} */ ;
    (layer.subtitle);
    __VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
        ...{ class: "layer-details" },
    });
    /** @type {__VLS_StyleScopedClasses['layer-details']} */ ;
    for (const [detail] of __VLS_vFor((layer.details))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
            key: (detail),
            ...{ class: "layer-detail-item" },
        });
        /** @type {__VLS_StyleScopedClasses['layer-detail-item']} */ ;
        let __VLS_16;
        /** @ts-ignore @type { | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon'] | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon']} */
        elIcon;
        // @ts-ignore
        const __VLS_17 = __VLS_asFunctionalComponent1(__VLS_16, new __VLS_16({
            ...{ class: "check-icon" },
        }));
        const __VLS_18 = __VLS_17({
            ...{ class: "check-icon" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_17));
        /** @type {__VLS_StyleScopedClasses['check-icon']} */ ;
        const { default: __VLS_21 } = __VLS_19.slots;
        let __VLS_22;
        /** @ts-ignore @type { | typeof __VLS_components.Check} */
        Check;
        // @ts-ignore
        const __VLS_23 = __VLS_asFunctionalComponent1(__VLS_22, new __VLS_22({}));
        const __VLS_24 = __VLS_23({}, ...__VLS_functionalComponentArgsRest(__VLS_23));
        // @ts-ignore
        [riskLayers, riskLayers,];
        var __VLS_19;
        (detail);
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "section animate-on-scroll" },
});
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "section-container" },
});
/** @type {__VLS_StyleScopedClasses['section-container']} */ ;
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
    ...{ class: "rules-grid" },
});
/** @type {__VLS_StyleScopedClasses['rules-grid']} */ ;
for (const [rule] of __VLS_vFor((__VLS_ctx.rules))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (rule.title),
        ...{ class: "rule-card" },
    });
    /** @type {__VLS_StyleScopedClasses['rule-card']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "rule-header" },
        ...{ style: ({ background: rule.color + '12' }) },
    });
    /** @type {__VLS_StyleScopedClasses['rule-header']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "rule-icon" },
    });
    /** @type {__VLS_StyleScopedClasses['rule-icon']} */ ;
    (rule.icon);
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
        ...{ class: "rule-title" },
        ...{ style: ({ color: rule.color }) },
    });
    /** @type {__VLS_StyleScopedClasses['rule-title']} */ ;
    (rule.title);
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "rule-desc" },
    });
    /** @type {__VLS_StyleScopedClasses['rule-desc']} */ ;
    (rule.desc);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "rule-tags" },
    });
    /** @type {__VLS_StyleScopedClasses['rule-tags']} */ ;
    for (const [tag] of __VLS_vFor((rule.tags))) {
        let __VLS_27;
        /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
        elTag;
        // @ts-ignore
        const __VLS_28 = __VLS_asFunctionalComponent1(__VLS_27, new __VLS_27({
            key: (tag),
            size: "small",
            color: (rule.color + '18'),
            ...{ style: ({ color: rule.color, borderColor: rule.color + '30' }) },
        }));
        const __VLS_29 = __VLS_28({
            key: (tag),
            size: "small",
            color: (rule.color + '18'),
            ...{ style: ({ color: rule.color, borderColor: rule.color + '30' }) },
        }, ...__VLS_functionalComponentArgsRest(__VLS_28));
        const { default: __VLS_32 } = __VLS_30.slots;
        (tag);
        // @ts-ignore
        [rules,];
        var __VLS_30;
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "section section-alt animate-on-scroll" },
});
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-alt']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "section-container" },
});
/** @type {__VLS_StyleScopedClasses['section-container']} */ ;
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
    ...{ class: "advantages-grid" },
});
/** @type {__VLS_StyleScopedClasses['advantages-grid']} */ ;
for (const [adv] of __VLS_vFor((__VLS_ctx.advantages))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (adv.title),
        ...{ class: "advantage-card" },
    });
    /** @type {__VLS_StyleScopedClasses['advantage-card']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "adv-check" },
    });
    /** @type {__VLS_StyleScopedClasses['adv-check']} */ ;
    let __VLS_33;
    /** @ts-ignore @type { | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon'] | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon']} */
    elIcon;
    // @ts-ignore
    const __VLS_34 = __VLS_asFunctionalComponent1(__VLS_33, new __VLS_33({
        size: (20),
        color: "#E6A23C",
    }));
    const __VLS_35 = __VLS_34({
        size: (20),
        color: "#E6A23C",
    }, ...__VLS_functionalComponentArgsRest(__VLS_34));
    const { default: __VLS_38 } = __VLS_36.slots;
    let __VLS_39;
    /** @ts-ignore @type { | typeof __VLS_components.CircleCheckFilled} */
    CircleCheckFilled;
    // @ts-ignore
    const __VLS_40 = __VLS_asFunctionalComponent1(__VLS_39, new __VLS_39({}));
    const __VLS_41 = __VLS_40({}, ...__VLS_functionalComponentArgsRest(__VLS_40));
    // @ts-ignore
    [advantages,];
    var __VLS_36;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "adv-body" },
    });
    /** @type {__VLS_StyleScopedClasses['adv-body']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
        ...{ class: "adv-title" },
    });
    /** @type {__VLS_StyleScopedClasses['adv-title']} */ ;
    (adv.title);
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "adv-desc" },
    });
    /** @type {__VLS_StyleScopedClasses['adv-desc']} */ ;
    (adv.desc);
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "cta-section animate-on-scroll" },
});
/** @type {__VLS_StyleScopedClasses['cta-section']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ class: "cta-bg" },
});
/** @type {__VLS_StyleScopedClasses['cta-bg']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "section-container cta-content" },
});
/** @type {__VLS_StyleScopedClasses['section-container']} */ ;
/** @type {__VLS_StyleScopedClasses['cta-content']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "cta-title" },
});
/** @type {__VLS_StyleScopedClasses['cta-title']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "cta-desc" },
});
/** @type {__VLS_StyleScopedClasses['cta-desc']} */ ;
let __VLS_44;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent1(__VLS_44, new __VLS_44({
    ...{ 'onClick': {} },
    type: "danger",
    size: "large",
    ...{ class: "cta-btn" },
}));
const __VLS_46 = __VLS_45({
    ...{ 'onClick': {} },
    type: "danger",
    size: "large",
    ...{ class: "cta-btn" },
}, ...__VLS_functionalComponentArgsRest(__VLS_45));
let __VLS_49;
const __VLS_50 = {
    /** @type {typeof __VLS_49.click} */
    onClick: (__VLS_ctx.handleCTA),
};
/** @type {__VLS_StyleScopedClasses['cta-btn']} */ ;
const { default: __VLS_51 } = __VLS_47.slots;
// @ts-ignore
[handleCTA,];
var __VLS_47;
var __VLS_48;
__VLS_asFunctionalElement1(__VLS_intrinsics.footer, __VLS_intrinsics.footer)({
    ...{ class: "footer" },
});
/** @type {__VLS_StyleScopedClasses['footer']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "section-container footer-content" },
});
/** @type {__VLS_StyleScopedClasses['section-container']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-content']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "footer-brand" },
});
/** @type {__VLS_StyleScopedClasses['footer-brand']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "footer-links" },
});
/** @type {__VLS_StyleScopedClasses['footer-links']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "footer-col" },
});
/** @type {__VLS_StyleScopedClasses['footer-col']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h4, __VLS_intrinsics.h4)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "footer-col" },
});
/** @type {__VLS_StyleScopedClasses['footer-col']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h4, __VLS_intrinsics.h4)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "footer-col" },
});
/** @type {__VLS_StyleScopedClasses['footer-col']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h4, __VLS_intrinsics.h4)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "footer-bottom" },
});
/** @type {__VLS_StyleScopedClasses['footer-bottom']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
