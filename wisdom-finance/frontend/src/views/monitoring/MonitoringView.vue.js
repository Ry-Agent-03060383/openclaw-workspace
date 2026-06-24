/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, onMounted, computed } from 'vue';
import { getAllLoans } from '../../api/loan';
import { getEvaluations } from '../../api/risk';
import { Refresh } from '@element-plus/icons-vue';
const loans = ref([]);
const evaluations = ref([]);
const loading = ref(true);
const statusMap = {
    DRAFT: '草稿', SUBMITTED: '已提交', PENDING: '待审核',
    APPROVING: '审批中', APPROVED: '已通过', REJECTED: '已驳回', NEEDS_MANUAL: '需人工',
};
const statusType = {
    DRAFT: 'info', SUBMITTED: 'primary', PENDING: 'warning',
    APPROVING: 'warning', APPROVED: 'success', REJECTED: 'danger', NEEDS_MANUAL: 'danger',
};
const riskLevelType = {
    AAA: 'success', AA: '', A: 'primary', BBB: 'warning', BB: 'warning', B: 'danger', C: 'danger',
};
onMounted(async () => { await loadData(); });
async function loadData() {
    loading.value = true;
    try {
        const [loRes, evRes] = await Promise.all([getAllLoans(), getEvaluations()]);
        if (loRes?.code === 200)
            loans.value = loRes.data || [];
        if (evRes?.code === 200)
            evaluations.value = evRes.data || [];
    }
    catch { /* ignore */ }
    loading.value = false;
}
const totalLoans = computed(() => loans.value.length);
const approvedLoans = computed(() => loans.value.filter((l) => l.status === 'APPROVED').length);
const rejectedLoans = computed(() => loans.value.filter((l) => l.status === 'REJECTED').length);
const pendingLoans = computed(() => loans.value.filter((l) => l.status === 'PENDING').length);
const highRiskEvals = computed(() => evaluations.value.filter((e) => e.riskLevel === 'C' || e.riskLevel === 'B' || e.riskLevel === 'BB').length);
const recentEvals = computed(() => [...evaluations.value].sort((a, b) => (b.evaluateTime || '').localeCompare(a.evaluateTime || '')).slice(0, 5));
const statCards = computed(() => [
    { label: '贷款总笔数', value: totalLoans.value, color: '#409eff' },
    { label: '已通过', value: approvedLoans.value, color: '#67c23a' },
    { label: '待审核', value: pendingLoans.value, color: '#e6a23c' },
    { label: '已拒绝', value: rejectedLoans.value, color: '#f56c6c' },
    { label: '高风险评估', value: highRiskEvals.value, color: '#f56c6c' },
]);
function formatTime(t) {
    if (!t)
        return '-';
    return t.substring(0, 19).replace('T', ' ');
}
function getScoreColor(score) {
    if (score >= 80)
        return '#67c23a';
    if (score >= 60)
        return '#409eff';
    if (score >= 40)
        return '#e6a23c';
    return '#f56c6c';
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "monitoring-view" },
});
/** @type {__VLS_StyleScopedClasses['monitoring-view']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
elCard;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    shadow: "never",
    ...{ style: {} },
}));
const __VLS_2 = __VLS_1({
    shadow: "never",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
{
    const { header: __VLS_6 } = __VLS_3.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "header-bar" },
    });
    /** @type {__VLS_StyleScopedClasses['header-bar']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    let __VLS_7;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
        ...{ 'onClick': {} },
        size: "small",
        icon: (__VLS_ctx.Refresh),
    }));
    const __VLS_9 = __VLS_8({
        ...{ 'onClick': {} },
        size: "small",
        icon: (__VLS_ctx.Refresh),
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    let __VLS_12;
    const __VLS_13 = {
        /** @type {typeof __VLS_12.click} */
        onClick: (__VLS_ctx.loadData),
    };
    const { default: __VLS_14 } = __VLS_10.slots;
    // @ts-ignore
    [Refresh, loadData,];
    var __VLS_10;
    var __VLS_11;
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "stat-grid" },
});
/** @type {__VLS_StyleScopedClasses['stat-grid']} */ ;
for (const [s] of __VLS_vFor((__VLS_ctx.statCards))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (s.label),
        ...{ class: "stat-card" },
        ...{ style: ({ borderTopColor: s.color }) },
    });
    /** @type {__VLS_StyleScopedClasses['stat-card']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "stat-value" },
        ...{ style: ({ color: s.color }) },
    });
    /** @type {__VLS_StyleScopedClasses['stat-value']} */ ;
    (s.value);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "stat-label" },
    });
    /** @type {__VLS_StyleScopedClasses['stat-label']} */ ;
    (s.label);
    // @ts-ignore
    [statCards,];
}
// @ts-ignore
[];
var __VLS_3;
let __VLS_15;
/** @ts-ignore @type { | typeof __VLS_components.elRow | typeof __VLS_components.ElRow | typeof __VLS_components['el-row'] | typeof __VLS_components.elRow | typeof __VLS_components.ElRow | typeof __VLS_components['el-row']} */
elRow;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent1(__VLS_15, new __VLS_15({
    gutter: (16),
}));
const __VLS_17 = __VLS_16({
    gutter: (16),
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
const { default: __VLS_20 } = __VLS_18.slots;
let __VLS_21;
/** @ts-ignore @type { | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col'] | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col']} */
elCol;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent1(__VLS_21, new __VLS_21({
    span: (16),
}));
const __VLS_23 = __VLS_22({
    span: (16),
}, ...__VLS_functionalComponentArgsRest(__VLS_22));
const { default: __VLS_26 } = __VLS_24.slots;
let __VLS_27;
/** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
elCard;
// @ts-ignore
const __VLS_28 = __VLS_asFunctionalComponent1(__VLS_27, new __VLS_27({
    shadow: "never",
}));
const __VLS_29 = __VLS_28({
    shadow: "never",
}, ...__VLS_functionalComponentArgsRest(__VLS_28));
const { default: __VLS_32 } = __VLS_30.slots;
{
    const { header: __VLS_33 } = __VLS_30.slots;
    // @ts-ignore
    [];
}
let __VLS_34;
/** @ts-ignore @type { | typeof __VLS_components.elTable | typeof __VLS_components.ElTable | typeof __VLS_components['el-table'] | typeof __VLS_components.elTable | typeof __VLS_components.ElTable | typeof __VLS_components['el-table']} */
elTable;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent1(__VLS_34, new __VLS_34({
    data: (__VLS_ctx.loans),
    stripe: true,
    size: "small",
    maxHeight: "420",
}));
const __VLS_36 = __VLS_35({
    data: (__VLS_ctx.loans),
    stripe: true,
    size: "small",
    maxHeight: "420",
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
__VLS_asFunctionalDirective(__VLS_directives.vLoading, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.loading) }, null, null);
const { default: __VLS_39 } = __VLS_37.slots;
let __VLS_40;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent1(__VLS_40, new __VLS_40({
    prop: "applicationNo",
    label: "编号",
    width: "160",
}));
const __VLS_42 = __VLS_41({
    prop: "applicationNo",
    label: "编号",
    width: "160",
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
let __VLS_45;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_46 = __VLS_asFunctionalComponent1(__VLS_45, new __VLS_45({
    prop: "companyName",
    label: "企业",
    minWidth: "120",
    showOverflowTooltip: true,
}));
const __VLS_47 = __VLS_46({
    prop: "companyName",
    label: "企业",
    minWidth: "120",
    showOverflowTooltip: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_46));
let __VLS_50;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_51 = __VLS_asFunctionalComponent1(__VLS_50, new __VLS_50({
    label: "金额",
    width: "110",
}));
const __VLS_52 = __VLS_51({
    label: "金额",
    width: "110",
}, ...__VLS_functionalComponentArgsRest(__VLS_51));
const { default: __VLS_55 } = __VLS_53.slots;
{
    const { default: __VLS_56 } = __VLS_53.slots;
    const [{ row }] = __VLS_vSlot(__VLS_56);
    (row.loanAmount);
    // @ts-ignore
    [loans, vLoading, loading,];
}
// @ts-ignore
[];
var __VLS_53;
let __VLS_57;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_58 = __VLS_asFunctionalComponent1(__VLS_57, new __VLS_57({
    label: "期限",
    width: "60",
}));
const __VLS_59 = __VLS_58({
    label: "期限",
    width: "60",
}, ...__VLS_functionalComponentArgsRest(__VLS_58));
const { default: __VLS_62 } = __VLS_60.slots;
{
    const { default: __VLS_63 } = __VLS_60.slots;
    const [{ row }] = __VLS_vSlot(__VLS_63);
    (row.loanTermMonths);
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_60;
let __VLS_64;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_65 = __VLS_asFunctionalComponent1(__VLS_64, new __VLS_64({
    label: "状态",
    width: "90",
}));
const __VLS_66 = __VLS_65({
    label: "状态",
    width: "90",
}, ...__VLS_functionalComponentArgsRest(__VLS_65));
const { default: __VLS_69 } = __VLS_67.slots;
{
    const { default: __VLS_70 } = __VLS_67.slots;
    const [{ row }] = __VLS_vSlot(__VLS_70);
    let __VLS_71;
    /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
    elTag;
    // @ts-ignore
    const __VLS_72 = __VLS_asFunctionalComponent1(__VLS_71, new __VLS_71({
        type: (__VLS_ctx.statusType[row.status] || 'info'),
        size: "small",
    }));
    const __VLS_73 = __VLS_72({
        type: (__VLS_ctx.statusType[row.status] || 'info'),
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_72));
    const { default: __VLS_76 } = __VLS_74.slots;
    (__VLS_ctx.statusMap[row.status] || row.status);
    // @ts-ignore
    [statusType, statusMap,];
    var __VLS_74;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_67;
let __VLS_77;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_78 = __VLS_asFunctionalComponent1(__VLS_77, new __VLS_77({
    prop: "reviewComment",
    label: "备注",
    minWidth: "100",
    showOverflowTooltip: true,
}));
const __VLS_79 = __VLS_78({
    prop: "reviewComment",
    label: "备注",
    minWidth: "100",
    showOverflowTooltip: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_78));
// @ts-ignore
[];
var __VLS_37;
// @ts-ignore
[];
var __VLS_30;
// @ts-ignore
[];
var __VLS_24;
let __VLS_82;
/** @ts-ignore @type { | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col'] | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col']} */
elCol;
// @ts-ignore
const __VLS_83 = __VLS_asFunctionalComponent1(__VLS_82, new __VLS_82({
    span: (8),
}));
const __VLS_84 = __VLS_83({
    span: (8),
}, ...__VLS_functionalComponentArgsRest(__VLS_83));
const { default: __VLS_87 } = __VLS_85.slots;
let __VLS_88;
/** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
elCard;
// @ts-ignore
const __VLS_89 = __VLS_asFunctionalComponent1(__VLS_88, new __VLS_88({
    shadow: "never",
}));
const __VLS_90 = __VLS_89({
    shadow: "never",
}, ...__VLS_functionalComponentArgsRest(__VLS_89));
const { default: __VLS_93 } = __VLS_91.slots;
{
    const { header: __VLS_94 } = __VLS_91.slots;
    // @ts-ignore
    [];
}
if (__VLS_ctx.recentEvals.length) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "alert-list" },
    });
    __VLS_asFunctionalDirective(__VLS_directives.vLoading, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.loading) }, null, null);
    /** @type {__VLS_StyleScopedClasses['alert-list']} */ ;
    for (const [e] of __VLS_vFor((__VLS_ctx.recentEvals))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            key: (e.id),
            ...{ class: "alert-item" },
        });
        /** @type {__VLS_StyleScopedClasses['alert-item']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "alert-header" },
        });
        /** @type {__VLS_StyleScopedClasses['alert-header']} */ ;
        let __VLS_95;
        /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
        elTag;
        // @ts-ignore
        const __VLS_96 = __VLS_asFunctionalComponent1(__VLS_95, new __VLS_95({
            type: (__VLS_ctx.riskLevelType[e.riskLevel] || 'info'),
            size: "small",
            effect: "dark",
        }));
        const __VLS_97 = __VLS_96({
            type: (__VLS_ctx.riskLevelType[e.riskLevel] || 'info'),
            size: "small",
            effect: "dark",
        }, ...__VLS_functionalComponentArgsRest(__VLS_96));
        const { default: __VLS_100 } = __VLS_98.slots;
        (e.riskLevel);
        // @ts-ignore
        [vLoading, loading, recentEvals, recentEvals, riskLevelType,];
        var __VLS_98;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "alert-score" },
            ...{ style: ({ color: __VLS_ctx.getScoreColor(e.riskScore) }) },
        });
        /** @type {__VLS_StyleScopedClasses['alert-score']} */ ;
        (e.riskScore);
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "alert-company" },
        });
        /** @type {__VLS_StyleScopedClasses['alert-company']} */ ;
        (e.companyName);
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "alert-time" },
        });
        /** @type {__VLS_StyleScopedClasses['alert-time']} */ ;
        (__VLS_ctx.formatTime(e.evaluateTime));
        // @ts-ignore
        [getScoreColor, formatTime,];
    }
}
else if (!__VLS_ctx.loading) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "alert-empty" },
    });
    /** @type {__VLS_StyleScopedClasses['alert-empty']} */ ;
}
// @ts-ignore
[loading,];
var __VLS_91;
let __VLS_101;
/** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
elCard;
// @ts-ignore
const __VLS_102 = __VLS_asFunctionalComponent1(__VLS_101, new __VLS_101({
    shadow: "never",
    ...{ style: {} },
}));
const __VLS_103 = __VLS_102({
    shadow: "never",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_102));
const { default: __VLS_106 } = __VLS_104.slots;
{
    const { header: __VLS_107 } = __VLS_104.slots;
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "overview-list" },
});
/** @type {__VLS_StyleScopedClasses['overview-list']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "overview-item" },
});
/** @type {__VLS_StyleScopedClasses['overview-item']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "ov-label" },
});
/** @type {__VLS_StyleScopedClasses['ov-label']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "ov-value" },
});
/** @type {__VLS_StyleScopedClasses['ov-value']} */ ;
(__VLS_ctx.loans.filter(l => l.status === 'APPROVED').reduce((s, l) => s + Number(l.loanAmount || 0), 0).toLocaleString());
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "overview-item" },
});
/** @type {__VLS_StyleScopedClasses['overview-item']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "ov-label" },
});
/** @type {__VLS_StyleScopedClasses['ov-label']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "ov-value" },
});
/** @type {__VLS_StyleScopedClasses['ov-value']} */ ;
(__VLS_ctx.loans.length ? Math.round(__VLS_ctx.evaluations.length / __VLS_ctx.loans.length * 100) : 0);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "overview-item" },
});
/** @type {__VLS_StyleScopedClasses['overview-item']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "ov-label" },
});
/** @type {__VLS_StyleScopedClasses['ov-label']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "ov-value" },
});
/** @type {__VLS_StyleScopedClasses['ov-value']} */ ;
(__VLS_ctx.loans.length ? Math.round(__VLS_ctx.approvedLoans / __VLS_ctx.loans.length * 100) : 0);
// @ts-ignore
[loans, loans, loans, loans, loans, evaluations, approvedLoans,];
var __VLS_104;
// @ts-ignore
[];
var __VLS_85;
// @ts-ignore
[];
var __VLS_18;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
