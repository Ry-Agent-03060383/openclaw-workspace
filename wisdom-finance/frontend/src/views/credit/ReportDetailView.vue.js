/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getReportById } from '../../api/credit';
import { ElMessage } from 'element-plus';
import { ArrowLeft, Download } from '@element-plus/icons-vue';
const route = useRoute();
const router = useRouter();
const report = ref(null);
const loading = ref(true);
const activeTab = ref('basic');
function parseJson(str) {
    if (!str || str === '{}')
        return null;
    try {
        return JSON.parse(str);
    }
    catch {
        return null;
    }
}
const creditLevelMap = {
    AAA: '极好', AA: '优秀', A: '良好', BBB: '中等',
    BB: '关注', B: '预警', C: '高危', NR: '未评级'
};
const creditLevelType = {
    AAA: 'success', AA: '', A: 'primary', BBB: 'warning',
    BB: 'warning', B: 'danger', C: 'danger', NR: 'info'
};
const riskLevelMap = { LOW: '低风险', MEDIUM: '中等风险', HIGH: '高风险' };
const riskLevelType = { LOW: 'success', MEDIUM: 'warning', HIGH: 'danger' };
const basicInfo = computed(() => parseJson(report.value?.basicInfo));
const creditHistory = computed(() => parseJson(report.value?.creditHistory));
const financialInfo = computed(() => parseJson(report.value?.financialInfo));
const legalInfo = computed(() => parseJson(report.value?.legalInfo));
const industryInfo = computed(() => parseJson(report.value?.industryInfo));
const riskAnalysis = computed(() => parseJson(report.value?.riskAnalysis));
const suggestions = computed(() => parseJson(report.value?.suggestions));
function getRiskColor(score) {
    if (score >= 80)
        return '#67C23A';
    if (score >= 60)
        return '#E6A23C';
    return '#F56C6C';
}
function printReport() { window.print(); }
onMounted(async () => {
    try {
        const id = route.params.id;
        const res = await getReportById(Number(id));
        report.value = res?.data || null;
        if (!report.value)
            ElMessage.error('报告不存在');
    }
    catch {
        ElMessage.error('加载报告失败');
    }
    finally {
        loading.value = false;
    }
});
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
/** @type {__VLS_StyleScopedClasses['summary-score']} */ ;
/** @type {__VLS_StyleScopedClasses['summary-score']} */ ;
/** @type {__VLS_StyleScopedClasses['level-item']} */ ;
/** @type {__VLS_StyleScopedClasses['finance-section']} */ ;
/** @type {__VLS_StyleScopedClasses['data-sources']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "report-detail" },
});
/** @type {__VLS_StyleScopedClasses['report-detail']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "page-header" },
});
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    icon: (__VLS_ctx.ArrowLeft),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    icon: (__VLS_ctx.ArrowLeft),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = {
    /** @type {typeof __VLS_5.click} */
    onClick: (...[$event]) => {
        __VLS_ctx.router.back();
        // @ts-ignore
        [ArrowLeft, router,];
    },
};
const { default: __VLS_7 } = __VLS_3.slots;
// @ts-ignore
[];
var __VLS_3;
var __VLS_4;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
let __VLS_8;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent1(__VLS_8, new __VLS_8({
    ...{ 'onClick': {} },
    icon: (__VLS_ctx.Download),
    type: "primary",
}));
const __VLS_10 = __VLS_9({
    ...{ 'onClick': {} },
    icon: (__VLS_ctx.Download),
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_13;
const __VLS_14 = {
    /** @type {typeof __VLS_13.click} */
    onClick: (__VLS_ctx.printReport),
};
const { default: __VLS_15 } = __VLS_11.slots;
// @ts-ignore
[Download, printReport,];
var __VLS_11;
var __VLS_12;
if (__VLS_ctx.loading) {
    let __VLS_16;
    /** @ts-ignore @type { | typeof __VLS_components.elSkeleton | typeof __VLS_components.ElSkeleton | typeof __VLS_components['el-skeleton']} */
    elSkeleton;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent1(__VLS_16, new __VLS_16({
        rows: (10),
        animated: true,
    }));
    const __VLS_18 = __VLS_17({
        rows: (10),
        animated: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_17));
}
else if (__VLS_ctx.report) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    let __VLS_21;
    /** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
    elCard;
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent1(__VLS_21, new __VLS_21({
        ...{ class: "report-header" },
    }));
    const __VLS_23 = __VLS_22({
        ...{ class: "report-header" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_22));
    /** @type {__VLS_StyleScopedClasses['report-header']} */ ;
    const { default: __VLS_26 } = __VLS_24.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "header-content" },
    });
    /** @type {__VLS_StyleScopedClasses['header-content']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "report-meta" },
    });
    /** @type {__VLS_StyleScopedClasses['report-meta']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "meta-item" },
    });
    /** @type {__VLS_StyleScopedClasses['meta-item']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
    (__VLS_ctx.report.reportNo);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "meta-item" },
    });
    /** @type {__VLS_StyleScopedClasses['meta-item']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
    (__VLS_ctx.report.reportDate);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "meta-item" },
    });
    /** @type {__VLS_StyleScopedClasses['meta-item']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
    (__VLS_ctx.report.validUntil);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "meta-item" },
    });
    /** @type {__VLS_StyleScopedClasses['meta-item']} */ ;
    let __VLS_27;
    /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
    elTag;
    // @ts-ignore
    const __VLS_28 = __VLS_asFunctionalComponent1(__VLS_27, new __VLS_27({
        size: "small",
    }));
    const __VLS_29 = __VLS_28({
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_28));
    const { default: __VLS_32 } = __VLS_30.slots;
    ({ BASIC: '基础版', STANDARD: '标准版', FULL: '详细版' }[__VLS_ctx.report.reportType] || __VLS_ctx.report.reportType);
    // @ts-ignore
    [loading, report, report, report, report, report, report,];
    var __VLS_30;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "report-summary" },
    });
    /** @type {__VLS_StyleScopedClasses['report-summary']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "summary-score" },
        ...{ style: ({ borderColor: __VLS_ctx.getRiskColor(__VLS_ctx.report.creditScore || 0) }) },
    });
    /** @type {__VLS_StyleScopedClasses['summary-score']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "score-value" },
    });
    /** @type {__VLS_StyleScopedClasses['score-value']} */ ;
    (__VLS_ctx.report.creditScore);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "score-label" },
    });
    /** @type {__VLS_StyleScopedClasses['score-label']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "summary-levels" },
    });
    /** @type {__VLS_StyleScopedClasses['summary-levels']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "level-item" },
    });
    /** @type {__VLS_StyleScopedClasses['level-item']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({});
    let __VLS_33;
    /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
    elTag;
    // @ts-ignore
    const __VLS_34 = __VLS_asFunctionalComponent1(__VLS_33, new __VLS_33({
        type: (__VLS_ctx.creditLevelType[__VLS_ctx.report.creditLevel] || 'info'),
        size: "large",
    }));
    const __VLS_35 = __VLS_34({
        type: (__VLS_ctx.creditLevelType[__VLS_ctx.report.creditLevel] || 'info'),
        size: "large",
    }, ...__VLS_functionalComponentArgsRest(__VLS_34));
    const { default: __VLS_38 } = __VLS_36.slots;
    (__VLS_ctx.report.creditLevel);
    // @ts-ignore
    [report, report, report, report, getRiskColor, creditLevelType,];
    var __VLS_36;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "level-desc" },
    });
    /** @type {__VLS_StyleScopedClasses['level-desc']} */ ;
    (__VLS_ctx.creditLevelMap[__VLS_ctx.report.creditLevel] || '');
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "level-item" },
    });
    /** @type {__VLS_StyleScopedClasses['level-item']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({});
    let __VLS_39;
    /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
    elTag;
    // @ts-ignore
    const __VLS_40 = __VLS_asFunctionalComponent1(__VLS_39, new __VLS_39({
        type: (__VLS_ctx.riskLevelType[__VLS_ctx.report.riskLevel] || 'info'),
        size: "large",
    }));
    const __VLS_41 = __VLS_40({
        type: (__VLS_ctx.riskLevelType[__VLS_ctx.report.riskLevel] || 'info'),
        size: "large",
    }, ...__VLS_functionalComponentArgsRest(__VLS_40));
    const { default: __VLS_44 } = __VLS_42.slots;
    (__VLS_ctx.riskLevelMap[__VLS_ctx.report.riskLevel] || __VLS_ctx.report.riskLevel);
    // @ts-ignore
    [report, report, report, report, creditLevelMap, riskLevelType, riskLevelMap,];
    var __VLS_42;
    // @ts-ignore
    [];
    var __VLS_24;
    let __VLS_45;
    /** @ts-ignore @type { | typeof __VLS_components.elTabs | typeof __VLS_components.ElTabs | typeof __VLS_components['el-tabs'] | typeof __VLS_components.elTabs | typeof __VLS_components.ElTabs | typeof __VLS_components['el-tabs']} */
    elTabs;
    // @ts-ignore
    const __VLS_46 = __VLS_asFunctionalComponent1(__VLS_45, new __VLS_45({
        modelValue: (__VLS_ctx.activeTab),
        ...{ class: "report-tabs" },
    }));
    const __VLS_47 = __VLS_46({
        modelValue: (__VLS_ctx.activeTab),
        ...{ class: "report-tabs" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_46));
    /** @type {__VLS_StyleScopedClasses['report-tabs']} */ ;
    const { default: __VLS_50 } = __VLS_48.slots;
    let __VLS_51;
    /** @ts-ignore @type { | typeof __VLS_components.elTabPane | typeof __VLS_components.ElTabPane | typeof __VLS_components['el-tab-pane'] | typeof __VLS_components.elTabPane | typeof __VLS_components.ElTabPane | typeof __VLS_components['el-tab-pane']} */
    elTabPane;
    // @ts-ignore
    const __VLS_52 = __VLS_asFunctionalComponent1(__VLS_51, new __VLS_51({
        label: "基本信息",
        name: "basic",
    }));
    const __VLS_53 = __VLS_52({
        label: "基本信息",
        name: "basic",
    }, ...__VLS_functionalComponentArgsRest(__VLS_52));
    const { default: __VLS_56 } = __VLS_54.slots;
    if (__VLS_ctx.basicInfo) {
        let __VLS_57;
        /** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
        elCard;
        // @ts-ignore
        const __VLS_58 = __VLS_asFunctionalComponent1(__VLS_57, new __VLS_57({}));
        const __VLS_59 = __VLS_58({}, ...__VLS_functionalComponentArgsRest(__VLS_58));
        const { default: __VLS_62 } = __VLS_60.slots;
        let __VLS_63;
        /** @ts-ignore @type { | typeof __VLS_components.elDescriptions | typeof __VLS_components.ElDescriptions | typeof __VLS_components['el-descriptions'] | typeof __VLS_components.elDescriptions | typeof __VLS_components.ElDescriptions | typeof __VLS_components['el-descriptions']} */
        elDescriptions;
        // @ts-ignore
        const __VLS_64 = __VLS_asFunctionalComponent1(__VLS_63, new __VLS_63({
            column: (2),
            border: true,
        }));
        const __VLS_65 = __VLS_64({
            column: (2),
            border: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_64));
        const { default: __VLS_68 } = __VLS_66.slots;
        for (const [val, key] of __VLS_vFor(__VLS_ctx.basicInfo)) {
            let __VLS_69;
            /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
            elDescriptionsItem;
            // @ts-ignore
            const __VLS_70 = __VLS_asFunctionalComponent1(__VLS_69, new __VLS_69({
                key: (key),
                label: ({ companyName: '企业名称', creditCode: '信用代码', legalPerson: '法定代表人', registeredCapital: '注册资本', establishmentDate: '成立日期', businessStatus: '经营状态', industry: '所属行业', address: '地址', employeeCount: '员工人数', annualRevenue: '年营收', establishmentYears: '成立年限', tags: '企业标签' }[key] || key),
            }));
            const __VLS_71 = __VLS_70({
                key: (key),
                label: ({ companyName: '企业名称', creditCode: '信用代码', legalPerson: '法定代表人', registeredCapital: '注册资本', establishmentDate: '成立日期', businessStatus: '经营状态', industry: '所属行业', address: '地址', employeeCount: '员工人数', annualRevenue: '年营收', establishmentYears: '成立年限', tags: '企业标签' }[key] || key),
            }, ...__VLS_functionalComponentArgsRest(__VLS_70));
            const { default: __VLS_74 } = __VLS_72.slots;
            if (key === 'tags' && Array.isArray(val)) {
                for (const [tag] of __VLS_vFor((val))) {
                    let __VLS_75;
                    /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
                    elTag;
                    // @ts-ignore
                    const __VLS_76 = __VLS_asFunctionalComponent1(__VLS_75, new __VLS_75({
                        key: (tag),
                        size: "small",
                        ...{ style: {} },
                    }));
                    const __VLS_77 = __VLS_76({
                        key: (tag),
                        size: "small",
                        ...{ style: {} },
                    }, ...__VLS_functionalComponentArgsRest(__VLS_76));
                    const { default: __VLS_80 } = __VLS_78.slots;
                    (tag);
                    // @ts-ignore
                    [activeTab, basicInfo, basicInfo,];
                    var __VLS_78;
                    // @ts-ignore
                    [];
                }
            }
            else {
                (val);
            }
            // @ts-ignore
            [];
            var __VLS_72;
            // @ts-ignore
            [];
        }
        // @ts-ignore
        [];
        var __VLS_66;
        // @ts-ignore
        [];
        var __VLS_60;
    }
    // @ts-ignore
    [];
    var __VLS_54;
    let __VLS_81;
    /** @ts-ignore @type { | typeof __VLS_components.elTabPane | typeof __VLS_components.ElTabPane | typeof __VLS_components['el-tab-pane'] | typeof __VLS_components.elTabPane | typeof __VLS_components.ElTabPane | typeof __VLS_components['el-tab-pane']} */
    elTabPane;
    // @ts-ignore
    const __VLS_82 = __VLS_asFunctionalComponent1(__VLS_81, new __VLS_81({
        label: "财务分析",
        name: "finance",
    }));
    const __VLS_83 = __VLS_82({
        label: "财务分析",
        name: "finance",
    }, ...__VLS_functionalComponentArgsRest(__VLS_82));
    const { default: __VLS_86 } = __VLS_84.slots;
    if (__VLS_ctx.financialInfo) {
        let __VLS_87;
        /** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
        elCard;
        // @ts-ignore
        const __VLS_88 = __VLS_asFunctionalComponent1(__VLS_87, new __VLS_87({}));
        const __VLS_89 = __VLS_88({}, ...__VLS_functionalComponentArgsRest(__VLS_88));
        const { default: __VLS_92 } = __VLS_90.slots;
        for (const [section, key] of __VLS_vFor(__VLS_ctx.financialInfo)) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "finance-section" },
                key: (key),
            });
            /** @type {__VLS_StyleScopedClasses['finance-section']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.h4, __VLS_intrinsics.h4)({});
            ({ solvency: '偿债能力', profitability: '盈利能力', operation: '营运能力', cashFlow: '现金流分析', overallFinancialHealth: '综合健康度', overallAssessment: '综合评估' }[key] || key);
            if (typeof section === 'object' && !Array.isArray(section)) {
                let __VLS_93;
                /** @ts-ignore @type { | typeof __VLS_components.elDescriptions | typeof __VLS_components.ElDescriptions | typeof __VLS_components['el-descriptions'] | typeof __VLS_components.elDescriptions | typeof __VLS_components.ElDescriptions | typeof __VLS_components['el-descriptions']} */
                elDescriptions;
                // @ts-ignore
                const __VLS_94 = __VLS_asFunctionalComponent1(__VLS_93, new __VLS_93({
                    column: (2),
                    border: true,
                }));
                const __VLS_95 = __VLS_94({
                    column: (2),
                    border: true,
                }, ...__VLS_functionalComponentArgsRest(__VLS_94));
                const { default: __VLS_98 } = __VLS_96.slots;
                for (const [v, k] of __VLS_vFor(section)) {
                    let __VLS_99;
                    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
                    elDescriptionsItem;
                    // @ts-ignore
                    const __VLS_100 = __VLS_asFunctionalComponent1(__VLS_99, new __VLS_99({
                        key: (k),
                        label: ({
                            assetLiabilityRatio: '资产负债率', currentRatio: '流动比率', quickRatio: '速动比率',
                            roe: '净资产收益率(ROE)', roa: '总资产报酬率(ROA)', netProfitRate: '销售利润率',
                            revenueGrowthRate: '营收增长率', accountsReceivableTurnover: '应收账款周转率',
                            inventoryTurnover: '存货周转率', operatingCashFlow: '经营活动现金流', cashFlowCoverage: '现金流覆盖率',
                            assetLiabilityRatioEvaluation: '评价', currentRatioEvaluation: '评价',
                            quickRatioEvaluation: '评价', roeEvaluation: '评价', cashFlowEvaluation: '评价'
                        }[k] || k),
                    }));
                    const __VLS_101 = __VLS_100({
                        key: (k),
                        label: ({
                            assetLiabilityRatio: '资产负债率', currentRatio: '流动比率', quickRatio: '速动比率',
                            roe: '净资产收益率(ROE)', roa: '总资产报酬率(ROA)', netProfitRate: '销售利润率',
                            revenueGrowthRate: '营收增长率', accountsReceivableTurnover: '应收账款周转率',
                            inventoryTurnover: '存货周转率', operatingCashFlow: '经营活动现金流', cashFlowCoverage: '现金流覆盖率',
                            assetLiabilityRatioEvaluation: '评价', currentRatioEvaluation: '评价',
                            quickRatioEvaluation: '评价', roeEvaluation: '评价', cashFlowEvaluation: '评价'
                        }[k] || k),
                    }, ...__VLS_functionalComponentArgsRest(__VLS_100));
                    const { default: __VLS_104 } = __VLS_102.slots;
                    if (String(k).includes('Evaluation') || String(k).includes('Assessment')) {
                        let __VLS_105;
                        /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
                        elTag;
                        // @ts-ignore
                        const __VLS_106 = __VLS_asFunctionalComponent1(__VLS_105, new __VLS_105({}));
                        const __VLS_107 = __VLS_106({}, ...__VLS_functionalComponentArgsRest(__VLS_106));
                        const { default: __VLS_110 } = __VLS_108.slots;
                        (v);
                        // @ts-ignore
                        [financialInfo, financialInfo,];
                        var __VLS_108;
                    }
                    else {
                        (v);
                    }
                    // @ts-ignore
                    [];
                    var __VLS_102;
                    // @ts-ignore
                    [];
                }
                // @ts-ignore
                [];
                var __VLS_96;
            }
            // @ts-ignore
            [];
        }
        // @ts-ignore
        [];
        var __VLS_90;
    }
    // @ts-ignore
    [];
    var __VLS_84;
    let __VLS_111;
    /** @ts-ignore @type { | typeof __VLS_components.elTabPane | typeof __VLS_components.ElTabPane | typeof __VLS_components['el-tab-pane'] | typeof __VLS_components.elTabPane | typeof __VLS_components.ElTabPane | typeof __VLS_components['el-tab-pane']} */
    elTabPane;
    // @ts-ignore
    const __VLS_112 = __VLS_asFunctionalComponent1(__VLS_111, new __VLS_111({
        label: "信用历史",
        name: "credit",
    }));
    const __VLS_113 = __VLS_112({
        label: "信用历史",
        name: "credit",
    }, ...__VLS_functionalComponentArgsRest(__VLS_112));
    const { default: __VLS_116 } = __VLS_114.slots;
    if (__VLS_ctx.creditHistory) {
        let __VLS_117;
        /** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
        elCard;
        // @ts-ignore
        const __VLS_118 = __VLS_asFunctionalComponent1(__VLS_117, new __VLS_117({}));
        const __VLS_119 = __VLS_118({}, ...__VLS_functionalComponentArgsRest(__VLS_118));
        const { default: __VLS_122 } = __VLS_120.slots;
        let __VLS_123;
        /** @ts-ignore @type { | typeof __VLS_components.elDescriptions | typeof __VLS_components.ElDescriptions | typeof __VLS_components['el-descriptions'] | typeof __VLS_components.elDescriptions | typeof __VLS_components.ElDescriptions | typeof __VLS_components['el-descriptions']} */
        elDescriptions;
        // @ts-ignore
        const __VLS_124 = __VLS_asFunctionalComponent1(__VLS_123, new __VLS_123({
            column: (2),
            border: true,
        }));
        const __VLS_125 = __VLS_124({
            column: (2),
            border: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_124));
        const { default: __VLS_128 } = __VLS_126.slots;
        for (const [val, key] of __VLS_vFor(__VLS_ctx.creditHistory)) {
            let __VLS_129;
            /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
            elDescriptionsItem;
            // @ts-ignore
            const __VLS_130 = __VLS_asFunctionalComponent1(__VLS_129, new __VLS_129({
                key: (key),
                label: (({ creditScore: '信用评分', creditLevel: '信用等级', riskLevel: '风险等级', repaymentWillingness: '还款意愿', historicalSummary: '历史概要' })[key] || key),
            }));
            const __VLS_131 = __VLS_130({
                key: (key),
                label: (({ creditScore: '信用评分', creditLevel: '信用等级', riskLevel: '风险等级', repaymentWillingness: '还款意愿', historicalSummary: '历史概要' })[key] || key),
            }, ...__VLS_functionalComponentArgsRest(__VLS_130));
            const { default: __VLS_134 } = __VLS_132.slots;
            (typeof val === 'object' ? JSON.stringify(val) : val);
            // @ts-ignore
            [creditHistory, creditHistory,];
            var __VLS_132;
            // @ts-ignore
            [];
        }
        // @ts-ignore
        [];
        var __VLS_126;
        // @ts-ignore
        [];
        var __VLS_120;
    }
    // @ts-ignore
    [];
    var __VLS_114;
    let __VLS_135;
    /** @ts-ignore @type { | typeof __VLS_components.elTabPane | typeof __VLS_components.ElTabPane | typeof __VLS_components['el-tab-pane'] | typeof __VLS_components.elTabPane | typeof __VLS_components.ElTabPane | typeof __VLS_components['el-tab-pane']} */
    elTabPane;
    // @ts-ignore
    const __VLS_136 = __VLS_asFunctionalComponent1(__VLS_135, new __VLS_135({
        label: "风险分析",
        name: "risk",
    }));
    const __VLS_137 = __VLS_136({
        label: "风险分析",
        name: "risk",
    }, ...__VLS_functionalComponentArgsRest(__VLS_136));
    const { default: __VLS_140 } = __VLS_138.slots;
    if (__VLS_ctx.riskAnalysis) {
        let __VLS_141;
        /** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
        elCard;
        // @ts-ignore
        const __VLS_142 = __VLS_asFunctionalComponent1(__VLS_141, new __VLS_141({}));
        const __VLS_143 = __VLS_142({}, ...__VLS_functionalComponentArgsRest(__VLS_142));
        const { default: __VLS_146 } = __VLS_144.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "risk-header" },
        });
        /** @type {__VLS_StyleScopedClasses['risk-header']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "risk-title" },
        });
        /** @type {__VLS_StyleScopedClasses['risk-title']} */ ;
        let __VLS_147;
        /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
        elTag;
        // @ts-ignore
        const __VLS_148 = __VLS_asFunctionalComponent1(__VLS_147, new __VLS_147({
            type: (__VLS_ctx.riskLevelType[__VLS_ctx.riskAnalysis.compositeRiskLevel] || 'info'),
            size: "large",
        }));
        const __VLS_149 = __VLS_148({
            type: (__VLS_ctx.riskLevelType[__VLS_ctx.riskAnalysis.compositeRiskLevel] || 'info'),
            size: "large",
        }, ...__VLS_functionalComponentArgsRest(__VLS_148));
        const { default: __VLS_152 } = __VLS_150.slots;
        (__VLS_ctx.riskAnalysis.compositeRiskScore);
        (__VLS_ctx.riskLevelMap[__VLS_ctx.riskAnalysis.compositeRiskLevel] || __VLS_ctx.riskAnalysis.compositeRiskLevel);
        // @ts-ignore
        [riskLevelType, riskLevelMap, riskAnalysis, riskAnalysis, riskAnalysis, riskAnalysis, riskAnalysis,];
        var __VLS_150;
        let __VLS_153;
        /** @ts-ignore @type { | typeof __VLS_components.elDivider | typeof __VLS_components.ElDivider | typeof __VLS_components['el-divider']} */
        elDivider;
        // @ts-ignore
        const __VLS_154 = __VLS_asFunctionalComponent1(__VLS_153, new __VLS_153({}));
        const __VLS_155 = __VLS_154({}, ...__VLS_functionalComponentArgsRest(__VLS_154));
        __VLS_asFunctionalElement1(__VLS_intrinsics.h4, __VLS_intrinsics.h4)({});
        if (__VLS_ctx.riskAnalysis.radarData) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "risk-dimensions" },
            });
            /** @type {__VLS_StyleScopedClasses['risk-dimensions']} */ ;
            for (const [score, dim] of __VLS_vFor((__VLS_ctx.riskAnalysis.radarData))) {
                __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    key: dim,
                    ...{ class: "risk-dim-item" },
                });
                /** @type {__VLS_StyleScopedClasses['risk-dim-item']} */ ;
                __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "dim-label" },
                });
                /** @type {__VLS_StyleScopedClasses['dim-label']} */ ;
                ({ credit: '信用风险', operation: '经营风险', finance: '财务风险', legal: '法律风险', market: '市场风险' }[dim] || dim);
                let __VLS_158;
                /** @ts-ignore @type { | typeof __VLS_components.elProgress | typeof __VLS_components.ElProgress | typeof __VLS_components['el-progress'] | typeof __VLS_components.elProgress | typeof __VLS_components.ElProgress | typeof __VLS_components['el-progress']} */
                elProgress;
                // @ts-ignore
                const __VLS_159 = __VLS_asFunctionalComponent1(__VLS_158, new __VLS_158({
                    percentage: score,
                    color: (__VLS_ctx.getRiskColor(score)),
                    textInside: (true),
                    strokeWidth: (14),
                }));
                const __VLS_160 = __VLS_159({
                    percentage: score,
                    color: (__VLS_ctx.getRiskColor(score)),
                    textInside: (true),
                    strokeWidth: (14),
                }, ...__VLS_functionalComponentArgsRest(__VLS_159));
                const { default: __VLS_163 } = __VLS_161.slots;
                __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
                (score);
                // @ts-ignore
                [getRiskColor, riskAnalysis, riskAnalysis,];
                var __VLS_161;
                // @ts-ignore
                [];
            }
        }
        let __VLS_164;
        /** @ts-ignore @type { | typeof __VLS_components.elDivider | typeof __VLS_components.ElDivider | typeof __VLS_components['el-divider']} */
        elDivider;
        // @ts-ignore
        const __VLS_165 = __VLS_asFunctionalComponent1(__VLS_164, new __VLS_164({}));
        const __VLS_166 = __VLS_165({}, ...__VLS_functionalComponentArgsRest(__VLS_165));
        __VLS_asFunctionalElement1(__VLS_intrinsics.h4, __VLS_intrinsics.h4)({});
        if (__VLS_ctx.riskAnalysis.topRiskFactors) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "top-risks" },
            });
            /** @type {__VLS_StyleScopedClasses['top-risks']} */ ;
            for (const [risk, idx] of __VLS_vFor((__VLS_ctx.riskAnalysis.topRiskFactors))) {
                let __VLS_169;
                /** @ts-ignore @type { | typeof __VLS_components.elAlert | typeof __VLS_components.ElAlert | typeof __VLS_components['el-alert']} */
                elAlert;
                // @ts-ignore
                const __VLS_170 = __VLS_asFunctionalComponent1(__VLS_169, new __VLS_169({
                    key: (idx),
                    title: (risk.name + ': ' + risk.level),
                    description: (risk.description),
                    type: (risk.level === '高' ? 'error' : risk.level === '中高' ? 'warning' : 'success'),
                    showIcon: true,
                    closable: (false),
                    ...{ style: {} },
                }));
                const __VLS_171 = __VLS_170({
                    key: (idx),
                    title: (risk.name + ': ' + risk.level),
                    description: (risk.description),
                    type: (risk.level === '高' ? 'error' : risk.level === '中高' ? 'warning' : 'success'),
                    showIcon: true,
                    closable: (false),
                    ...{ style: {} },
                }, ...__VLS_functionalComponentArgsRest(__VLS_170));
                // @ts-ignore
                [riskAnalysis, riskAnalysis,];
            }
        }
        // @ts-ignore
        [];
        var __VLS_144;
    }
    // @ts-ignore
    [];
    var __VLS_138;
    let __VLS_174;
    /** @ts-ignore @type { | typeof __VLS_components.elTabPane | typeof __VLS_components.ElTabPane | typeof __VLS_components['el-tab-pane'] | typeof __VLS_components.elTabPane | typeof __VLS_components.ElTabPane | typeof __VLS_components['el-tab-pane']} */
    elTabPane;
    // @ts-ignore
    const __VLS_175 = __VLS_asFunctionalComponent1(__VLS_174, new __VLS_174({
        label: "授信建议",
        name: "suggestions",
    }));
    const __VLS_176 = __VLS_175({
        label: "授信建议",
        name: "suggestions",
    }, ...__VLS_functionalComponentArgsRest(__VLS_175));
    const { default: __VLS_179 } = __VLS_177.slots;
    if (__VLS_ctx.suggestions) {
        let __VLS_180;
        /** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
        elCard;
        // @ts-ignore
        const __VLS_181 = __VLS_asFunctionalComponent1(__VLS_180, new __VLS_180({}));
        const __VLS_182 = __VLS_181({}, ...__VLS_functionalComponentArgsRest(__VLS_181));
        const { default: __VLS_185 } = __VLS_183.slots;
        let __VLS_186;
        /** @ts-ignore @type { | typeof __VLS_components.elDescriptions | typeof __VLS_components.ElDescriptions | typeof __VLS_components['el-descriptions'] | typeof __VLS_components.elDescriptions | typeof __VLS_components.ElDescriptions | typeof __VLS_components['el-descriptions']} */
        elDescriptions;
        // @ts-ignore
        const __VLS_187 = __VLS_asFunctionalComponent1(__VLS_186, new __VLS_186({
            column: (1),
            border: true,
        }));
        const __VLS_188 = __VLS_187({
            column: (1),
            border: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_187));
        const { default: __VLS_191 } = __VLS_189.slots;
        for (const [val, key] of __VLS_vFor(__VLS_ctx.suggestions)) {
            let __VLS_192;
            /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
            elDescriptionsItem;
            // @ts-ignore
            const __VLS_193 = __VLS_asFunctionalComponent1(__VLS_192, new __VLS_192({
                key: (key),
                label: (({ financingSuggestions: '融资建议', creditStrategy: '授信策略', recommendedAmountRange: '建议授信额度', recommendedRateRange: '建议利率区间', recommendedGuarantee: '建议担保方式', operationSuggestions: '运营建议', complianceSuggestions: '合规建议' })[key] || key),
            }));
            const __VLS_194 = __VLS_193({
                key: (key),
                label: (({ financingSuggestions: '融资建议', creditStrategy: '授信策略', recommendedAmountRange: '建议授信额度', recommendedRateRange: '建议利率区间', recommendedGuarantee: '建议担保方式', operationSuggestions: '运营建议', complianceSuggestions: '合规建议' })[key] || key),
            }, ...__VLS_functionalComponentArgsRest(__VLS_193));
            const { default: __VLS_197 } = __VLS_195.slots;
            (val);
            // @ts-ignore
            [suggestions, suggestions,];
            var __VLS_195;
            // @ts-ignore
            [];
        }
        // @ts-ignore
        [];
        var __VLS_189;
        // @ts-ignore
        [];
        var __VLS_183;
    }
    // @ts-ignore
    [];
    var __VLS_177;
    let __VLS_198;
    /** @ts-ignore @type { | typeof __VLS_components.elTabPane | typeof __VLS_components.ElTabPane | typeof __VLS_components['el-tab-pane'] | typeof __VLS_components.elTabPane | typeof __VLS_components.ElTabPane | typeof __VLS_components['el-tab-pane']} */
    elTabPane;
    // @ts-ignore
    const __VLS_199 = __VLS_asFunctionalComponent1(__VLS_198, new __VLS_198({
        label: "法律合规",
        name: "legal",
    }));
    const __VLS_200 = __VLS_199({
        label: "法律合规",
        name: "legal",
    }, ...__VLS_functionalComponentArgsRest(__VLS_199));
    const { default: __VLS_203 } = __VLS_201.slots;
    if (__VLS_ctx.legalInfo) {
        let __VLS_204;
        /** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
        elCard;
        // @ts-ignore
        const __VLS_205 = __VLS_asFunctionalComponent1(__VLS_204, new __VLS_204({}));
        const __VLS_206 = __VLS_205({}, ...__VLS_functionalComponentArgsRest(__VLS_205));
        const { default: __VLS_209 } = __VLS_207.slots;
        let __VLS_210;
        /** @ts-ignore @type { | typeof __VLS_components.elDescriptions | typeof __VLS_components.ElDescriptions | typeof __VLS_components['el-descriptions'] | typeof __VLS_components.elDescriptions | typeof __VLS_components.ElDescriptions | typeof __VLS_components['el-descriptions']} */
        elDescriptions;
        // @ts-ignore
        const __VLS_211 = __VLS_asFunctionalComponent1(__VLS_210, new __VLS_210({
            column: (2),
            border: true,
        }));
        const __VLS_212 = __VLS_211({
            column: (2),
            border: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_211));
        const { default: __VLS_215 } = __VLS_213.slots;
        let __VLS_216;
        /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
        elDescriptionsItem;
        // @ts-ignore
        const __VLS_217 = __VLS_asFunctionalComponent1(__VLS_216, new __VLS_216({
            label: "涉诉记录",
        }));
        const __VLS_218 = __VLS_217({
            label: "涉诉记录",
        }, ...__VLS_functionalComponentArgsRest(__VLS_217));
        const { default: __VLS_221 } = __VLS_219.slots;
        (__VLS_ctx.legalInfo.lawsuitCount);
        // @ts-ignore
        [legalInfo, legalInfo,];
        var __VLS_219;
        let __VLS_222;
        /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
        elDescriptionsItem;
        // @ts-ignore
        const __VLS_223 = __VLS_asFunctionalComponent1(__VLS_222, new __VLS_222({
            label: "行政处罚",
        }));
        const __VLS_224 = __VLS_223({
            label: "行政处罚",
        }, ...__VLS_functionalComponentArgsRest(__VLS_223));
        const { default: __VLS_227 } = __VLS_225.slots;
        (__VLS_ctx.legalInfo.administrativePenalties);
        // @ts-ignore
        [legalInfo,];
        var __VLS_225;
        let __VLS_228;
        /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
        elDescriptionsItem;
        // @ts-ignore
        const __VLS_229 = __VLS_asFunctionalComponent1(__VLS_228, new __VLS_228({
            label: "失信被执行人",
        }));
        const __VLS_230 = __VLS_229({
            label: "失信被执行人",
        }, ...__VLS_functionalComponentArgsRest(__VLS_229));
        const { default: __VLS_233 } = __VLS_231.slots;
        let __VLS_234;
        /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
        elTag;
        // @ts-ignore
        const __VLS_235 = __VLS_asFunctionalComponent1(__VLS_234, new __VLS_234({
            type: (__VLS_ctx.legalInfo.dishonestPerson ? 'danger' : 'success'),
        }));
        const __VLS_236 = __VLS_235({
            type: (__VLS_ctx.legalInfo.dishonestPerson ? 'danger' : 'success'),
        }, ...__VLS_functionalComponentArgsRest(__VLS_235));
        const { default: __VLS_239 } = __VLS_237.slots;
        (__VLS_ctx.legalInfo.dishonestPerson ? '是' : '否');
        // @ts-ignore
        [legalInfo, legalInfo,];
        var __VLS_237;
        // @ts-ignore
        [];
        var __VLS_231;
        let __VLS_240;
        /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
        elDescriptionsItem;
        // @ts-ignore
        const __VLS_241 = __VLS_asFunctionalComponent1(__VLS_240, new __VLS_240({
            label: "知识产权",
        }));
        const __VLS_242 = __VLS_241({
            label: "知识产权",
        }, ...__VLS_functionalComponentArgsRest(__VLS_241));
        const { default: __VLS_245 } = __VLS_243.slots;
        (__VLS_ctx.legalInfo.intellectualPropertyCount || 0);
        // @ts-ignore
        [legalInfo,];
        var __VLS_243;
        // @ts-ignore
        [];
        var __VLS_213;
        // @ts-ignore
        [];
        var __VLS_207;
    }
    // @ts-ignore
    [];
    var __VLS_201;
    let __VLS_246;
    /** @ts-ignore @type { | typeof __VLS_components.elTabPane | typeof __VLS_components.ElTabPane | typeof __VLS_components['el-tab-pane'] | typeof __VLS_components.elTabPane | typeof __VLS_components.ElTabPane | typeof __VLS_components['el-tab-pane']} */
    elTabPane;
    // @ts-ignore
    const __VLS_247 = __VLS_asFunctionalComponent1(__VLS_246, new __VLS_246({
        label: "行业分析",
        name: "industry",
    }));
    const __VLS_248 = __VLS_247({
        label: "行业分析",
        name: "industry",
    }, ...__VLS_functionalComponentArgsRest(__VLS_247));
    const { default: __VLS_251 } = __VLS_249.slots;
    if (__VLS_ctx.industryInfo) {
        let __VLS_252;
        /** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
        elCard;
        // @ts-ignore
        const __VLS_253 = __VLS_asFunctionalComponent1(__VLS_252, new __VLS_252({}));
        const __VLS_254 = __VLS_253({}, ...__VLS_functionalComponentArgsRest(__VLS_253));
        const { default: __VLS_257 } = __VLS_255.slots;
        let __VLS_258;
        /** @ts-ignore @type { | typeof __VLS_components.elDescriptions | typeof __VLS_components.ElDescriptions | typeof __VLS_components['el-descriptions'] | typeof __VLS_components.elDescriptions | typeof __VLS_components.ElDescriptions | typeof __VLS_components['el-descriptions']} */
        elDescriptions;
        // @ts-ignore
        const __VLS_259 = __VLS_asFunctionalComponent1(__VLS_258, new __VLS_258({
            column: (2),
            border: true,
        }));
        const __VLS_260 = __VLS_259({
            column: (2),
            border: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_259));
        const { default: __VLS_263 } = __VLS_261.slots;
        let __VLS_264;
        /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
        elDescriptionsItem;
        // @ts-ignore
        const __VLS_265 = __VLS_asFunctionalComponent1(__VLS_264, new __VLS_264({
            label: "所属行业",
        }));
        const __VLS_266 = __VLS_265({
            label: "所属行业",
        }, ...__VLS_functionalComponentArgsRest(__VLS_265));
        const { default: __VLS_269 } = __VLS_267.slots;
        (__VLS_ctx.industryInfo.industry);
        // @ts-ignore
        [industryInfo, industryInfo,];
        var __VLS_267;
        let __VLS_270;
        /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
        elDescriptionsItem;
        // @ts-ignore
        const __VLS_271 = __VLS_asFunctionalComponent1(__VLS_270, new __VLS_270({
            label: "市场地位",
        }));
        const __VLS_272 = __VLS_271({
            label: "市场地位",
        }, ...__VLS_functionalComponentArgsRest(__VLS_271));
        const { default: __VLS_275 } = __VLS_273.slots;
        (__VLS_ctx.industryInfo.marketPosition);
        // @ts-ignore
        [industryInfo,];
        var __VLS_273;
        if (__VLS_ctx.industryInfo.industryOutlook) {
            let __VLS_276;
            /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
            elDescriptionsItem;
            // @ts-ignore
            const __VLS_277 = __VLS_asFunctionalComponent1(__VLS_276, new __VLS_276({
                label: "发展阶段",
            }));
            const __VLS_278 = __VLS_277({
                label: "发展阶段",
            }, ...__VLS_functionalComponentArgsRest(__VLS_277));
            const { default: __VLS_281 } = __VLS_279.slots;
            (__VLS_ctx.industryInfo.industryOutlook.developmentStage);
            // @ts-ignore
            [industryInfo, industryInfo,];
            var __VLS_279;
        }
        let __VLS_282;
        /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
        elDescriptionsItem;
        // @ts-ignore
        const __VLS_283 = __VLS_asFunctionalComponent1(__VLS_282, new __VLS_282({
            label: "政策导向",
        }));
        const __VLS_284 = __VLS_283({
            label: "政策导向",
        }, ...__VLS_functionalComponentArgsRest(__VLS_283));
        const { default: __VLS_287 } = __VLS_285.slots;
        let __VLS_288;
        /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
        elTag;
        // @ts-ignore
        const __VLS_289 = __VLS_asFunctionalComponent1(__VLS_288, new __VLS_288({
            type: ((__VLS_ctx.industryInfo.industryOutlook?.policyOrientation === '重点支持' || __VLS_ctx.industryInfo.industryOutlook?.policyOrientation === '大力支持') ? 'success' : 'info'),
        }));
        const __VLS_290 = __VLS_289({
            type: ((__VLS_ctx.industryInfo.industryOutlook?.policyOrientation === '重点支持' || __VLS_ctx.industryInfo.industryOutlook?.policyOrientation === '大力支持') ? 'success' : 'info'),
        }, ...__VLS_functionalComponentArgsRest(__VLS_289));
        const { default: __VLS_293 } = __VLS_291.slots;
        (__VLS_ctx.industryInfo.industryOutlook?.policyOrientation);
        // @ts-ignore
        [industryInfo, industryInfo, industryInfo,];
        var __VLS_291;
        // @ts-ignore
        [];
        var __VLS_285;
        // @ts-ignore
        [];
        var __VLS_261;
        // @ts-ignore
        [];
        var __VLS_255;
    }
    // @ts-ignore
    [];
    var __VLS_249;
    // @ts-ignore
    [];
    var __VLS_48;
    let __VLS_294;
    /** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
    elCard;
    // @ts-ignore
    const __VLS_295 = __VLS_asFunctionalComponent1(__VLS_294, new __VLS_294({
        ...{ class: "data-sources" },
    }));
    const __VLS_296 = __VLS_295({
        ...{ class: "data-sources" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_295));
    /** @type {__VLS_StyleScopedClasses['data-sources']} */ ;
    const { default: __VLS_299 } = __VLS_297.slots;
    {
        const { header: __VLS_300 } = __VLS_297.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
        // @ts-ignore
        [];
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    (__VLS_ctx.report.dataSources || '工商登记、税务、司法、行业数据、征信系统');
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ style: {} },
    });
    (__VLS_ctx.report.validUntil);
    // @ts-ignore
    [report, report,];
    var __VLS_297;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "empty-state" },
    });
    /** @type {__VLS_StyleScopedClasses['empty-state']} */ ;
    let __VLS_301;
    /** @ts-ignore @type { | typeof __VLS_components.elEmpty | typeof __VLS_components.ElEmpty | typeof __VLS_components['el-empty']} */
    elEmpty;
    // @ts-ignore
    const __VLS_302 = __VLS_asFunctionalComponent1(__VLS_301, new __VLS_301({
        description: "未找到征信报告",
    }));
    const __VLS_303 = __VLS_302({
        description: "未找到征信报告",
    }, ...__VLS_functionalComponentArgsRest(__VLS_302));
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
