/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, onMounted } from 'vue';
import { getEvaluations, evaluateCompany, evaluateApplication, getRiskReport } from '../../api/risk';
import { getAllCompanies } from '../../api/credit';
import { getAllLoans } from '../../api/loan';
import { ElMessage } from 'element-plus';
import { Refresh, Plus, Document } from '@element-plus/icons-vue';
const evaluations = ref([]);
const companies = ref([]);
const loans = ref([]);
const loading = ref(false);
const evaluating = ref(false);
const showReportDialog = ref(false);
const reportDetail = ref(null);
const reportTab = ref('dimensions');
const riskLevelMap = {
    AAA: '极低', AA: '很低', A: '较低', BBB: '中等', BB: '较高', B: '很高', C: '极高',
};
const riskLevelType = {
    AAA: 'success', AA: '', A: 'primary', BBB: 'warning', BB: 'warning', B: 'danger', C: 'danger',
};
const evaluationTypeMap = { COMPANY: '企业评估', APPLICATION: '贷款申请评估' };
onMounted(async () => { await loadData(); });
async function loadData() {
    loading.value = true;
    try {
        const [evRes, coRes, loRes] = await Promise.all([
            getEvaluations(),
            getAllCompanies(),
            getAllLoans(),
        ]);
        if (evRes?.code === 200)
            evaluations.value = evRes.data || [];
        if (coRes?.code === 200)
            companies.value = coRes.data || [];
        if (loRes?.code === 200)
            loans.value = loRes.data || [];
    }
    catch { /* ignore */ }
    loading.value = false;
}
async function handleEvaluateCompany() {
    if (!companies.value.length) {
        ElMessage.warning('暂无企业数据');
        return;
    }
    evaluating.value = true;
    try {
        const res = await evaluateCompany(companies.value[0].id);
        if (res?.code === 200) {
            ElMessage.success(`评估完成: ${res.data.riskLevel}`);
            await loadData();
        }
        else {
            ElMessage.error(res?.message || '评估失败');
        }
    }
    catch {
        ElMessage.error('评估失败');
    }
    evaluating.value = false;
}
async function handleEvaluateApplication() {
    const pending = loans.value.filter((l) => l.status === 'PENDING' || l.status === 'SUBMITTED');
    if (!pending.length) {
        ElMessage.warning('暂无待审核贷款申请');
        return;
    }
    evaluating.value = true;
    try {
        const res = await evaluateApplication(pending[0].id);
        if (res?.code === 200) {
            ElMessage.success(`评估完成: ${res.data.riskLevel}`);
            await loadData();
        }
        else {
            ElMessage.error(res?.message || '评估失败');
        }
    }
    catch {
        ElMessage.error('评估失败');
    }
    evaluating.value = false;
}
async function viewReport(evaluation) {
    try {
        const res = await getRiskReport(evaluation.id);
        if (res?.code === 200) {
            reportDetail.value = res.data;
            showReportDialog.value = true;
        }
    }
    catch {
        ElMessage.error('获取报告失败');
    }
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
function formatTime(t) {
    if (!t)
        return '-';
    return t.substring(0, 19).replace('T', ' ');
}
function parseRiskReport(report) {
    if (!report?.riskReport)
        return null;
    try {
        return JSON.parse(report.riskReport);
    }
    catch {
        return null;
    }
}
const showEvalDialog = ref(false);
const evalTarget = ref('company');
function openEvalDialog(type) {
    evalTarget.value = type;
    showEvalDialog.value = true;
}
async function confirmEvaluate() {
    showEvalDialog.value = false;
    if (evalTarget.value === 'company')
        await handleEvaluateCompany();
    else
        await handleEvaluateApplication();
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "risk-view" },
});
/** @type {__VLS_StyleScopedClasses['risk-view']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
elCard;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    shadow: "never",
}));
const __VLS_2 = __VLS_1({
    shadow: "never",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
{
    const { header: __VLS_6 } = __VLS_3.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "header-bar" },
    });
    /** @type {__VLS_StyleScopedClasses['header-bar']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "header-actions" },
    });
    /** @type {__VLS_StyleScopedClasses['header-actions']} */ ;
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
    let __VLS_15;
    /** @ts-ignore @type { | typeof __VLS_components.elDropdown | typeof __VLS_components.ElDropdown | typeof __VLS_components['el-dropdown'] | typeof __VLS_components.elDropdown | typeof __VLS_components.ElDropdown | typeof __VLS_components['el-dropdown']} */
    elDropdown;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent1(__VLS_15, new __VLS_15({
        ...{ 'onCommand': {} },
        trigger: "click",
    }));
    const __VLS_17 = __VLS_16({
        ...{ 'onCommand': {} },
        trigger: "click",
    }, ...__VLS_functionalComponentArgsRest(__VLS_16));
    let __VLS_20;
    const __VLS_21 = {
        /** @type {typeof __VLS_20.command} */
        onCommand: (__VLS_ctx.openEvalDialog),
    };
    const { default: __VLS_22 } = __VLS_18.slots;
    let __VLS_23;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_24 = __VLS_asFunctionalComponent1(__VLS_23, new __VLS_23({
        type: "primary",
        size: "small",
        icon: (__VLS_ctx.Plus),
        loading: (__VLS_ctx.evaluating),
    }));
    const __VLS_25 = __VLS_24({
        type: "primary",
        size: "small",
        icon: (__VLS_ctx.Plus),
        loading: (__VLS_ctx.evaluating),
    }, ...__VLS_functionalComponentArgsRest(__VLS_24));
    const { default: __VLS_28 } = __VLS_26.slots;
    // @ts-ignore
    [openEvalDialog, Plus, evaluating,];
    var __VLS_26;
    {
        const { dropdown: __VLS_29 } = __VLS_18.slots;
        let __VLS_30;
        /** @ts-ignore @type { | typeof __VLS_components.elDropdownMenu | typeof __VLS_components.ElDropdownMenu | typeof __VLS_components['el-dropdown-menu'] | typeof __VLS_components.elDropdownMenu | typeof __VLS_components.ElDropdownMenu | typeof __VLS_components['el-dropdown-menu']} */
        elDropdownMenu;
        // @ts-ignore
        const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({}));
        const __VLS_32 = __VLS_31({}, ...__VLS_functionalComponentArgsRest(__VLS_31));
        const { default: __VLS_35 } = __VLS_33.slots;
        let __VLS_36;
        /** @ts-ignore @type { | typeof __VLS_components.elDropdownItem | typeof __VLS_components.ElDropdownItem | typeof __VLS_components['el-dropdown-item'] | typeof __VLS_components.elDropdownItem | typeof __VLS_components.ElDropdownItem | typeof __VLS_components['el-dropdown-item']} */
        elDropdownItem;
        // @ts-ignore
        const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({
            command: "company",
        }));
        const __VLS_38 = __VLS_37({
            command: "company",
        }, ...__VLS_functionalComponentArgsRest(__VLS_37));
        const { default: __VLS_41 } = __VLS_39.slots;
        // @ts-ignore
        [];
        var __VLS_39;
        let __VLS_42;
        /** @ts-ignore @type { | typeof __VLS_components.elDropdownItem | typeof __VLS_components.ElDropdownItem | typeof __VLS_components['el-dropdown-item'] | typeof __VLS_components.elDropdownItem | typeof __VLS_components.ElDropdownItem | typeof __VLS_components['el-dropdown-item']} */
        elDropdownItem;
        // @ts-ignore
        const __VLS_43 = __VLS_asFunctionalComponent1(__VLS_42, new __VLS_42({
            command: "application",
        }));
        const __VLS_44 = __VLS_43({
            command: "application",
        }, ...__VLS_functionalComponentArgsRest(__VLS_43));
        const { default: __VLS_47 } = __VLS_45.slots;
        // @ts-ignore
        [];
        var __VLS_45;
        // @ts-ignore
        [];
        var __VLS_33;
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    var __VLS_18;
    var __VLS_19;
    // @ts-ignore
    [];
}
let __VLS_48;
/** @ts-ignore @type { | typeof __VLS_components.elTable | typeof __VLS_components.ElTable | typeof __VLS_components['el-table'] | typeof __VLS_components.elTable | typeof __VLS_components.ElTable | typeof __VLS_components['el-table']} */
elTable;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent1(__VLS_48, new __VLS_48({
    data: (__VLS_ctx.evaluations),
    stripe: true,
    size: "small",
    defaultExpandAll: true,
}));
const __VLS_50 = __VLS_49({
    data: (__VLS_ctx.evaluations),
    stripe: true,
    size: "small",
    defaultExpandAll: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_49));
__VLS_asFunctionalDirective(__VLS_directives.vLoading, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.loading) }, null, null);
const { default: __VLS_53 } = __VLS_51.slots;
let __VLS_54;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_55 = __VLS_asFunctionalComponent1(__VLS_54, new __VLS_54({
    type: "expand",
}));
const __VLS_56 = __VLS_55({
    type: "expand",
}, ...__VLS_functionalComponentArgsRest(__VLS_55));
const { default: __VLS_59 } = __VLS_57.slots;
{
    const { default: __VLS_60 } = __VLS_57.slots;
    const [{ row }] = __VLS_vSlot(__VLS_60);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "expand-row" },
    });
    /** @type {__VLS_StyleScopedClasses['expand-row']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "dimension-cards" },
    });
    /** @type {__VLS_StyleScopedClasses['dimension-cards']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "dimension-item" },
    });
    /** @type {__VLS_StyleScopedClasses['dimension-item']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "dim-label" },
    });
    /** @type {__VLS_StyleScopedClasses['dim-label']} */ ;
    let __VLS_61;
    /** @ts-ignore @type { | typeof __VLS_components.elProgress | typeof __VLS_components.ElProgress | typeof __VLS_components['el-progress']} */
    elProgress;
    // @ts-ignore
    const __VLS_62 = __VLS_asFunctionalComponent1(__VLS_61, new __VLS_61({
        type: "circle",
        percentage: (row.basicQualificationScore || 0),
        width: (60),
        strokeWidth: (6),
        color: (__VLS_ctx.getScoreColor(row.basicQualificationScore)),
    }));
    const __VLS_63 = __VLS_62({
        type: "circle",
        percentage: (row.basicQualificationScore || 0),
        width: (60),
        strokeWidth: (6),
        color: (__VLS_ctx.getScoreColor(row.basicQualificationScore)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_62));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "dimension-item" },
    });
    /** @type {__VLS_StyleScopedClasses['dimension-item']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "dim-label" },
    });
    /** @type {__VLS_StyleScopedClasses['dim-label']} */ ;
    let __VLS_66;
    /** @ts-ignore @type { | typeof __VLS_components.elProgress | typeof __VLS_components.ElProgress | typeof __VLS_components['el-progress']} */
    elProgress;
    // @ts-ignore
    const __VLS_67 = __VLS_asFunctionalComponent1(__VLS_66, new __VLS_66({
        type: "circle",
        percentage: (row.creditRecordScore || 0),
        width: (60),
        strokeWidth: (6),
        color: (__VLS_ctx.getScoreColor(row.creditRecordScore)),
    }));
    const __VLS_68 = __VLS_67({
        type: "circle",
        percentage: (row.creditRecordScore || 0),
        width: (60),
        strokeWidth: (6),
        color: (__VLS_ctx.getScoreColor(row.creditRecordScore)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_67));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "dimension-item" },
    });
    /** @type {__VLS_StyleScopedClasses['dimension-item']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "dim-label" },
    });
    /** @type {__VLS_StyleScopedClasses['dim-label']} */ ;
    let __VLS_71;
    /** @ts-ignore @type { | typeof __VLS_components.elProgress | typeof __VLS_components.ElProgress | typeof __VLS_components['el-progress']} */
    elProgress;
    // @ts-ignore
    const __VLS_72 = __VLS_asFunctionalComponent1(__VLS_71, new __VLS_71({
        type: "circle",
        percentage: (row.financialStatusScore || 0),
        width: (60),
        strokeWidth: (6),
        color: (__VLS_ctx.getScoreColor(row.financialStatusScore)),
    }));
    const __VLS_73 = __VLS_72({
        type: "circle",
        percentage: (row.financialStatusScore || 0),
        width: (60),
        strokeWidth: (6),
        color: (__VLS_ctx.getScoreColor(row.financialStatusScore)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_72));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "dimension-item" },
    });
    /** @type {__VLS_StyleScopedClasses['dimension-item']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "dim-label" },
    });
    /** @type {__VLS_StyleScopedClasses['dim-label']} */ ;
    let __VLS_76;
    /** @ts-ignore @type { | typeof __VLS_components.elProgress | typeof __VLS_components.ElProgress | typeof __VLS_components['el-progress']} */
    elProgress;
    // @ts-ignore
    const __VLS_77 = __VLS_asFunctionalComponent1(__VLS_76, new __VLS_76({
        type: "circle",
        percentage: (row.industryRiskScore || 0),
        width: (60),
        strokeWidth: (6),
        color: (__VLS_ctx.getScoreColor(row.industryRiskScore)),
    }));
    const __VLS_78 = __VLS_77({
        type: "circle",
        percentage: (row.industryRiskScore || 0),
        width: (60),
        strokeWidth: (6),
        color: (__VLS_ctx.getScoreColor(row.industryRiskScore)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_77));
    if (row.suggestion) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "suggestion-text" },
        });
        /** @type {__VLS_StyleScopedClasses['suggestion-text']} */ ;
        (row.suggestion);
    }
    // @ts-ignore
    [evaluations, vLoading, loading, getScoreColor, getScoreColor, getScoreColor, getScoreColor,];
}
// @ts-ignore
[];
var __VLS_57;
let __VLS_81;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_82 = __VLS_asFunctionalComponent1(__VLS_81, new __VLS_81({
    prop: "evaluationNo",
    label: "评估编号",
    width: "180",
}));
const __VLS_83 = __VLS_82({
    prop: "evaluationNo",
    label: "评估编号",
    width: "180",
}, ...__VLS_functionalComponentArgsRest(__VLS_82));
let __VLS_86;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_87 = __VLS_asFunctionalComponent1(__VLS_86, new __VLS_86({
    label: "评估类型",
    width: "110",
}));
const __VLS_88 = __VLS_87({
    label: "评估类型",
    width: "110",
}, ...__VLS_functionalComponentArgsRest(__VLS_87));
const { default: __VLS_91 } = __VLS_89.slots;
{
    const { default: __VLS_92 } = __VLS_89.slots;
    const [{ row }] = __VLS_vSlot(__VLS_92);
    (__VLS_ctx.evaluationTypeMap[row.evaluationType] || row.evaluationType);
    // @ts-ignore
    [evaluationTypeMap,];
}
// @ts-ignore
[];
var __VLS_89;
let __VLS_93;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_94 = __VLS_asFunctionalComponent1(__VLS_93, new __VLS_93({
    prop: "companyName",
    label: "企业名称",
    minWidth: "140",
    showOverflowTooltip: true,
}));
const __VLS_95 = __VLS_94({
    prop: "companyName",
    label: "企业名称",
    minWidth: "140",
    showOverflowTooltip: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_94));
let __VLS_98;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_99 = __VLS_asFunctionalComponent1(__VLS_98, new __VLS_98({
    label: "风险评分",
    width: "100",
}));
const __VLS_100 = __VLS_99({
    label: "风险评分",
    width: "100",
}, ...__VLS_functionalComponentArgsRest(__VLS_99));
const { default: __VLS_103 } = __VLS_101.slots;
{
    const { default: __VLS_104 } = __VLS_101.slots;
    const [{ row }] = __VLS_vSlot(__VLS_104);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ style: ({ color: __VLS_ctx.getScoreColor(row.riskScore), fontWeight: 'bold', fontSize: '16px' }) },
    });
    (row.riskScore);
    // @ts-ignore
    [getScoreColor,];
}
// @ts-ignore
[];
var __VLS_101;
let __VLS_105;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_106 = __VLS_asFunctionalComponent1(__VLS_105, new __VLS_105({
    label: "风险等级",
    width: "90",
}));
const __VLS_107 = __VLS_106({
    label: "风险等级",
    width: "90",
}, ...__VLS_functionalComponentArgsRest(__VLS_106));
const { default: __VLS_110 } = __VLS_108.slots;
{
    const { default: __VLS_111 } = __VLS_108.slots;
    const [{ row }] = __VLS_vSlot(__VLS_111);
    let __VLS_112;
    /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
    elTag;
    // @ts-ignore
    const __VLS_113 = __VLS_asFunctionalComponent1(__VLS_112, new __VLS_112({
        type: (__VLS_ctx.riskLevelType[row.riskLevel] || 'info'),
        size: "small",
    }));
    const __VLS_114 = __VLS_113({
        type: (__VLS_ctx.riskLevelType[row.riskLevel] || 'info'),
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_113));
    const { default: __VLS_117 } = __VLS_115.slots;
    (row.riskLevel);
    (__VLS_ctx.riskLevelMap[row.riskLevel] || '');
    // @ts-ignore
    [riskLevelType, riskLevelMap,];
    var __VLS_115;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_108;
let __VLS_118;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_119 = __VLS_asFunctionalComponent1(__VLS_118, new __VLS_118({
    label: "评估时间",
    width: "150",
}));
const __VLS_120 = __VLS_119({
    label: "评估时间",
    width: "150",
}, ...__VLS_functionalComponentArgsRest(__VLS_119));
const { default: __VLS_123 } = __VLS_121.slots;
{
    const { default: __VLS_124 } = __VLS_121.slots;
    const [{ row }] = __VLS_vSlot(__VLS_124);
    (__VLS_ctx.formatTime(row.evaluateTime));
    // @ts-ignore
    [formatTime,];
}
// @ts-ignore
[];
var __VLS_121;
let __VLS_125;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_126 = __VLS_asFunctionalComponent1(__VLS_125, new __VLS_125({
    label: "操作",
    width: "80",
    fixed: "right",
}));
const __VLS_127 = __VLS_126({
    label: "操作",
    width: "80",
    fixed: "right",
}, ...__VLS_functionalComponentArgsRest(__VLS_126));
const { default: __VLS_130 } = __VLS_128.slots;
{
    const { default: __VLS_131 } = __VLS_128.slots;
    const [{ row }] = __VLS_vSlot(__VLS_131);
    let __VLS_132;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_133 = __VLS_asFunctionalComponent1(__VLS_132, new __VLS_132({
        ...{ 'onClick': {} },
        size: "small",
        icon: (__VLS_ctx.Document),
        circle: true,
    }));
    const __VLS_134 = __VLS_133({
        ...{ 'onClick': {} },
        size: "small",
        icon: (__VLS_ctx.Document),
        circle: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_133));
    let __VLS_137;
    const __VLS_138 = {
        /** @type {typeof __VLS_137.click} */
        onClick: (...[$event]) => {
            __VLS_ctx.viewReport(row);
            // @ts-ignore
            [Document, viewReport,];
        },
    };
    var __VLS_135;
    var __VLS_136;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_128;
// @ts-ignore
[];
var __VLS_51;
if (!__VLS_ctx.evaluations.length && !__VLS_ctx.loading) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ style: {} },
    });
}
// @ts-ignore
[evaluations, loading,];
var __VLS_3;
let __VLS_139;
/** @ts-ignore @type { | typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog | typeof __VLS_components['el-dialog'] | typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog | typeof __VLS_components['el-dialog']} */
elDialog;
// @ts-ignore
const __VLS_140 = __VLS_asFunctionalComponent1(__VLS_139, new __VLS_139({
    modelValue: (__VLS_ctx.showEvalDialog),
    title: (__VLS_ctx.evalTarget === 'company' ? '企业风险评估' : '贷款申请风险评估'),
    width: "400px",
}));
const __VLS_141 = __VLS_140({
    modelValue: (__VLS_ctx.showEvalDialog),
    title: (__VLS_ctx.evalTarget === 'company' ? '企业风险评估' : '贷款申请风险评估'),
    width: "400px",
}, ...__VLS_functionalComponentArgsRest(__VLS_140));
const { default: __VLS_144 } = __VLS_142.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
(__VLS_ctx.evalTarget === 'company' ? `将对 ${__VLS_ctx.companies.length} 家企业进行风险评估` : `将对 ${__VLS_ctx.loans.filter(l => l.status === 'PENDING' || l.status === 'SUBMITTED').length} 笔待审核贷款申请进行风险评估`);
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ style: {} },
});
{
    const { footer: __VLS_145 } = __VLS_142.slots;
    let __VLS_146;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_147 = __VLS_asFunctionalComponent1(__VLS_146, new __VLS_146({
        ...{ 'onClick': {} },
    }));
    const __VLS_148 = __VLS_147({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_147));
    let __VLS_151;
    const __VLS_152 = {
        /** @type {typeof __VLS_151.click} */
        onClick: (...[$event]) => {
            __VLS_ctx.showEvalDialog = false;
            // @ts-ignore
            [showEvalDialog, showEvalDialog, evalTarget, evalTarget, companies, loans,];
        },
    };
    const { default: __VLS_153 } = __VLS_149.slots;
    // @ts-ignore
    [];
    var __VLS_149;
    var __VLS_150;
    let __VLS_154;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_155 = __VLS_asFunctionalComponent1(__VLS_154, new __VLS_154({
        ...{ 'onClick': {} },
        type: "primary",
        loading: (__VLS_ctx.evaluating),
    }));
    const __VLS_156 = __VLS_155({
        ...{ 'onClick': {} },
        type: "primary",
        loading: (__VLS_ctx.evaluating),
    }, ...__VLS_functionalComponentArgsRest(__VLS_155));
    let __VLS_159;
    const __VLS_160 = {
        /** @type {typeof __VLS_159.click} */
        onClick: (__VLS_ctx.confirmEvaluate),
    };
    const { default: __VLS_161 } = __VLS_157.slots;
    // @ts-ignore
    [evaluating, confirmEvaluate,];
    var __VLS_157;
    var __VLS_158;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_142;
let __VLS_162;
/** @ts-ignore @type { | typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog | typeof __VLS_components['el-dialog'] | typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog | typeof __VLS_components['el-dialog']} */
elDialog;
// @ts-ignore
const __VLS_163 = __VLS_asFunctionalComponent1(__VLS_162, new __VLS_162({
    modelValue: (__VLS_ctx.showReportDialog),
    title: "风险报告详情",
    width: "750px",
    top: "5vh",
}));
const __VLS_164 = __VLS_163({
    modelValue: (__VLS_ctx.showReportDialog),
    title: "风险报告详情",
    width: "750px",
    top: "5vh",
}, ...__VLS_functionalComponentArgsRest(__VLS_163));
const { default: __VLS_167 } = __VLS_165.slots;
if (__VLS_ctx.reportDetail) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "report-detail" },
    });
    /** @type {__VLS_StyleScopedClasses['report-detail']} */ ;
    let __VLS_168;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptions | typeof __VLS_components.ElDescriptions | typeof __VLS_components['el-descriptions'] | typeof __VLS_components.elDescriptions | typeof __VLS_components.ElDescriptions | typeof __VLS_components['el-descriptions']} */
    elDescriptions;
    // @ts-ignore
    const __VLS_169 = __VLS_asFunctionalComponent1(__VLS_168, new __VLS_168({
        column: (2),
        border: true,
        size: "small",
    }));
    const __VLS_170 = __VLS_169({
        column: (2),
        border: true,
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_169));
    const { default: __VLS_173 } = __VLS_171.slots;
    let __VLS_174;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_175 = __VLS_asFunctionalComponent1(__VLS_174, new __VLS_174({
        label: "评估编号",
    }));
    const __VLS_176 = __VLS_175({
        label: "评估编号",
    }, ...__VLS_functionalComponentArgsRest(__VLS_175));
    const { default: __VLS_179 } = __VLS_177.slots;
    (__VLS_ctx.reportDetail.evaluationNo);
    // @ts-ignore
    [showReportDialog, reportDetail, reportDetail,];
    var __VLS_177;
    let __VLS_180;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_181 = __VLS_asFunctionalComponent1(__VLS_180, new __VLS_180({
        label: "评估类型",
    }));
    const __VLS_182 = __VLS_181({
        label: "评估类型",
    }, ...__VLS_functionalComponentArgsRest(__VLS_181));
    const { default: __VLS_185 } = __VLS_183.slots;
    (__VLS_ctx.evaluationTypeMap[__VLS_ctx.reportDetail.evaluationType]);
    // @ts-ignore
    [evaluationTypeMap, reportDetail,];
    var __VLS_183;
    let __VLS_186;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_187 = __VLS_asFunctionalComponent1(__VLS_186, new __VLS_186({
        label: "企业名称",
    }));
    const __VLS_188 = __VLS_187({
        label: "企业名称",
    }, ...__VLS_functionalComponentArgsRest(__VLS_187));
    const { default: __VLS_191 } = __VLS_189.slots;
    (__VLS_ctx.reportDetail.companyName);
    // @ts-ignore
    [reportDetail,];
    var __VLS_189;
    let __VLS_192;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_193 = __VLS_asFunctionalComponent1(__VLS_192, new __VLS_192({
        label: "信用代码",
    }));
    const __VLS_194 = __VLS_193({
        label: "信用代码",
    }, ...__VLS_functionalComponentArgsRest(__VLS_193));
    const { default: __VLS_197 } = __VLS_195.slots;
    (__VLS_ctx.reportDetail.creditCode);
    // @ts-ignore
    [reportDetail,];
    var __VLS_195;
    let __VLS_198;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_199 = __VLS_asFunctionalComponent1(__VLS_198, new __VLS_198({
        label: "风险评分",
    }));
    const __VLS_200 = __VLS_199({
        label: "风险评分",
    }, ...__VLS_functionalComponentArgsRest(__VLS_199));
    const { default: __VLS_203 } = __VLS_201.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ style: ({ color: __VLS_ctx.getScoreColor(__VLS_ctx.reportDetail.riskScore), fontWeight: 'bold', fontSize: '18px' }) },
    });
    (__VLS_ctx.reportDetail.riskScore);
    // @ts-ignore
    [getScoreColor, reportDetail, reportDetail,];
    var __VLS_201;
    let __VLS_204;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_205 = __VLS_asFunctionalComponent1(__VLS_204, new __VLS_204({
        label: "风险等级",
    }));
    const __VLS_206 = __VLS_205({
        label: "风险等级",
    }, ...__VLS_functionalComponentArgsRest(__VLS_205));
    const { default: __VLS_209 } = __VLS_207.slots;
    let __VLS_210;
    /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
    elTag;
    // @ts-ignore
    const __VLS_211 = __VLS_asFunctionalComponent1(__VLS_210, new __VLS_210({
        type: (__VLS_ctx.riskLevelType[__VLS_ctx.reportDetail.riskLevel]),
    }));
    const __VLS_212 = __VLS_211({
        type: (__VLS_ctx.riskLevelType[__VLS_ctx.reportDetail.riskLevel]),
    }, ...__VLS_functionalComponentArgsRest(__VLS_211));
    const { default: __VLS_215 } = __VLS_213.slots;
    (__VLS_ctx.reportDetail.riskLevel);
    // @ts-ignore
    [riskLevelType, reportDetail, reportDetail,];
    var __VLS_213;
    // @ts-ignore
    [];
    var __VLS_207;
    let __VLS_216;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_217 = __VLS_asFunctionalComponent1(__VLS_216, new __VLS_216({
        label: "评估时间",
    }));
    const __VLS_218 = __VLS_217({
        label: "评估时间",
    }, ...__VLS_functionalComponentArgsRest(__VLS_217));
    const { default: __VLS_221 } = __VLS_219.slots;
    (__VLS_ctx.formatTime(__VLS_ctx.reportDetail.evaluateTime));
    // @ts-ignore
    [formatTime, reportDetail,];
    var __VLS_219;
    let __VLS_222;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_223 = __VLS_asFunctionalComponent1(__VLS_222, new __VLS_222({
        label: "评估人",
    }));
    const __VLS_224 = __VLS_223({
        label: "评估人",
    }, ...__VLS_functionalComponentArgsRest(__VLS_223));
    const { default: __VLS_227 } = __VLS_225.slots;
    (__VLS_ctx.reportDetail.evaluator || '-');
    // @ts-ignore
    [reportDetail,];
    var __VLS_225;
    // @ts-ignore
    [];
    var __VLS_171;
    let __VLS_228;
    /** @ts-ignore @type { | typeof __VLS_components.elTabs | typeof __VLS_components.ElTabs | typeof __VLS_components['el-tabs'] | typeof __VLS_components.elTabs | typeof __VLS_components.ElTabs | typeof __VLS_components['el-tabs']} */
    elTabs;
    // @ts-ignore
    const __VLS_229 = __VLS_asFunctionalComponent1(__VLS_228, new __VLS_228({
        modelValue: (__VLS_ctx.reportTab),
        ...{ style: {} },
    }));
    const __VLS_230 = __VLS_229({
        modelValue: (__VLS_ctx.reportTab),
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_229));
    const { default: __VLS_233 } = __VLS_231.slots;
    let __VLS_234;
    /** @ts-ignore @type { | typeof __VLS_components.elTabPane | typeof __VLS_components.ElTabPane | typeof __VLS_components['el-tab-pane'] | typeof __VLS_components.elTabPane | typeof __VLS_components.ElTabPane | typeof __VLS_components['el-tab-pane']} */
    elTabPane;
    // @ts-ignore
    const __VLS_235 = __VLS_asFunctionalComponent1(__VLS_234, new __VLS_234({
        label: "维度评分",
        name: "dimensions",
    }));
    const __VLS_236 = __VLS_235({
        label: "维度评分",
        name: "dimensions",
    }, ...__VLS_functionalComponentArgsRest(__VLS_235));
    const { default: __VLS_239 } = __VLS_237.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "report-dimensions" },
    });
    /** @type {__VLS_StyleScopedClasses['report-dimensions']} */ ;
    for (const [d] of __VLS_vFor(([
        { label: '基础资质', score: __VLS_ctx.reportDetail.basicQualificationScore, weight: '30%', desc: '成立年限/注册资本/经营状态' },
        { label: '信用记录', score: __VLS_ctx.reportDetail.creditRecordScore, weight: '35%', desc: '信用评分/历史逾期/诉讼记录' },
        { label: '财务状况', score: __VLS_ctx.reportDetail.financialStatusScore, weight: '25%', desc: '营收规模/资产负债/现金流' },
        { label: '行业风险', score: __VLS_ctx.reportDetail.industryRiskScore, weight: '10%', desc: '行业周期/政策影响' },
    ]))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            key: (d.label),
            ...{ class: "report-dim-row" },
        });
        /** @type {__VLS_StyleScopedClasses['report-dim-row']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "dim-header" },
        });
        /** @type {__VLS_StyleScopedClasses['dim-header']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "dim-name" },
        });
        /** @type {__VLS_StyleScopedClasses['dim-name']} */ ;
        (d.label);
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "dim-weight" },
        });
        /** @type {__VLS_StyleScopedClasses['dim-weight']} */ ;
        (d.weight);
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "dim-score" },
            ...{ style: ({ color: __VLS_ctx.getScoreColor(d.score) }) },
        });
        /** @type {__VLS_StyleScopedClasses['dim-score']} */ ;
        (d.score);
        let __VLS_240;
        /** @ts-ignore @type { | typeof __VLS_components.elProgress | typeof __VLS_components.ElProgress | typeof __VLS_components['el-progress']} */
        elProgress;
        // @ts-ignore
        const __VLS_241 = __VLS_asFunctionalComponent1(__VLS_240, new __VLS_240({
            percentage: (d.score || 0),
            strokeWidth: (14),
            color: (__VLS_ctx.getScoreColor(d.score)),
        }));
        const __VLS_242 = __VLS_241({
            percentage: (d.score || 0),
            strokeWidth: (14),
            color: (__VLS_ctx.getScoreColor(d.score)),
        }, ...__VLS_functionalComponentArgsRest(__VLS_241));
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "dim-desc" },
        });
        /** @type {__VLS_StyleScopedClasses['dim-desc']} */ ;
        (d.desc);
        // @ts-ignore
        [getScoreColor, getScoreColor, reportDetail, reportDetail, reportDetail, reportDetail, reportTab,];
    }
    // @ts-ignore
    [];
    var __VLS_237;
    let __VLS_245;
    /** @ts-ignore @type { | typeof __VLS_components.elTabPane | typeof __VLS_components.ElTabPane | typeof __VLS_components['el-tab-pane'] | typeof __VLS_components.elTabPane | typeof __VLS_components.ElTabPane | typeof __VLS_components['el-tab-pane']} */
    elTabPane;
    // @ts-ignore
    const __VLS_246 = __VLS_asFunctionalComponent1(__VLS_245, new __VLS_245({
        label: "详细信息",
        name: "details",
    }));
    const __VLS_247 = __VLS_246({
        label: "详细信息",
        name: "details",
    }, ...__VLS_functionalComponentArgsRest(__VLS_246));
    const { default: __VLS_250 } = __VLS_248.slots;
    let __VLS_251;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptions | typeof __VLS_components.ElDescriptions | typeof __VLS_components['el-descriptions'] | typeof __VLS_components.elDescriptions | typeof __VLS_components.ElDescriptions | typeof __VLS_components['el-descriptions']} */
    elDescriptions;
    // @ts-ignore
    const __VLS_252 = __VLS_asFunctionalComponent1(__VLS_251, new __VLS_251({
        column: (2),
        border: true,
        size: "small",
    }));
    const __VLS_253 = __VLS_252({
        column: (2),
        border: true,
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_252));
    const { default: __VLS_256 } = __VLS_254.slots;
    let __VLS_257;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_258 = __VLS_asFunctionalComponent1(__VLS_257, new __VLS_257({
        label: "成立年限",
    }));
    const __VLS_259 = __VLS_258({
        label: "成立年限",
    }, ...__VLS_functionalComponentArgsRest(__VLS_258));
    const { default: __VLS_262 } = __VLS_260.slots;
    (__VLS_ctx.reportDetail.establishmentYears ?? '-');
    // @ts-ignore
    [reportDetail,];
    var __VLS_260;
    let __VLS_263;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_264 = __VLS_asFunctionalComponent1(__VLS_263, new __VLS_263({
        label: "注册资本",
    }));
    const __VLS_265 = __VLS_264({
        label: "注册资本",
    }, ...__VLS_functionalComponentArgsRest(__VLS_264));
    const { default: __VLS_268 } = __VLS_266.slots;
    (__VLS_ctx.reportDetail.registeredCapital ? '¥' + __VLS_ctx.reportDetail.registeredCapital : '-');
    // @ts-ignore
    [reportDetail, reportDetail,];
    var __VLS_266;
    let __VLS_269;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_270 = __VLS_asFunctionalComponent1(__VLS_269, new __VLS_269({
        label: "经营状态",
    }));
    const __VLS_271 = __VLS_270({
        label: "经营状态",
    }, ...__VLS_functionalComponentArgsRest(__VLS_270));
    const { default: __VLS_274 } = __VLS_272.slots;
    (__VLS_ctx.reportDetail.businessStatus || '-');
    // @ts-ignore
    [reportDetail,];
    var __VLS_272;
    let __VLS_275;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_276 = __VLS_asFunctionalComponent1(__VLS_275, new __VLS_275({
        label: "信用评分",
    }));
    const __VLS_277 = __VLS_276({
        label: "信用评分",
    }, ...__VLS_functionalComponentArgsRest(__VLS_276));
    const { default: __VLS_280 } = __VLS_278.slots;
    (__VLS_ctx.reportDetail.creditScore ?? '-');
    // @ts-ignore
    [reportDetail,];
    var __VLS_278;
    let __VLS_281;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_282 = __VLS_asFunctionalComponent1(__VLS_281, new __VLS_281({
        label: "所属行业",
    }));
    const __VLS_283 = __VLS_282({
        label: "所属行业",
    }, ...__VLS_functionalComponentArgsRest(__VLS_282));
    const { default: __VLS_286 } = __VLS_284.slots;
    (__VLS_ctx.reportDetail.industry || '-');
    // @ts-ignore
    [reportDetail,];
    var __VLS_284;
    let __VLS_287;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_288 = __VLS_asFunctionalComponent1(__VLS_287, new __VLS_287({
        label: "年营收",
    }));
    const __VLS_289 = __VLS_288({
        label: "年营收",
    }, ...__VLS_functionalComponentArgsRest(__VLS_288));
    const { default: __VLS_292 } = __VLS_290.slots;
    (__VLS_ctx.reportDetail.annualRevenue ? '¥' + __VLS_ctx.reportDetail.annualRevenue : '-');
    // @ts-ignore
    [reportDetail, reportDetail,];
    var __VLS_290;
    // @ts-ignore
    [];
    var __VLS_254;
    // @ts-ignore
    [];
    var __VLS_248;
    let __VLS_293;
    /** @ts-ignore @type { | typeof __VLS_components.elTabPane | typeof __VLS_components.ElTabPane | typeof __VLS_components['el-tab-pane'] | typeof __VLS_components.elTabPane | typeof __VLS_components.ElTabPane | typeof __VLS_components['el-tab-pane']} */
    elTabPane;
    // @ts-ignore
    const __VLS_294 = __VLS_asFunctionalComponent1(__VLS_293, new __VLS_293({
        label: "评估建议",
        name: "suggestion",
    }));
    const __VLS_295 = __VLS_294({
        label: "评估建议",
        name: "suggestion",
    }, ...__VLS_functionalComponentArgsRest(__VLS_294));
    const { default: __VLS_298 } = __VLS_296.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "suggestion-box" },
    });
    /** @type {__VLS_StyleScopedClasses['suggestion-box']} */ ;
    (__VLS_ctx.reportDetail.suggestion || '暂无建议');
    // @ts-ignore
    [reportDetail,];
    var __VLS_296;
    let __VLS_299;
    /** @ts-ignore @type { | typeof __VLS_components.elTabPane | typeof __VLS_components.ElTabPane | typeof __VLS_components['el-tab-pane'] | typeof __VLS_components.elTabPane | typeof __VLS_components.ElTabPane | typeof __VLS_components['el-tab-pane']} */
    elTabPane;
    // @ts-ignore
    const __VLS_300 = __VLS_asFunctionalComponent1(__VLS_299, new __VLS_299({
        label: "原始报告",
        name: "raw",
    }));
    const __VLS_301 = __VLS_300({
        label: "原始报告",
        name: "raw",
    }, ...__VLS_functionalComponentArgsRest(__VLS_300));
    const { default: __VLS_304 } = __VLS_302.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.pre, __VLS_intrinsics.pre)({
        ...{ class: "raw-report" },
    });
    /** @type {__VLS_StyleScopedClasses['raw-report']} */ ;
    (__VLS_ctx.parseRiskReport(__VLS_ctx.reportDetail) ? JSON.stringify(__VLS_ctx.parseRiskReport(__VLS_ctx.reportDetail), null, 2) : __VLS_ctx.reportDetail.riskReport || '无');
    // @ts-ignore
    [reportDetail, reportDetail, reportDetail, parseRiskReport, parseRiskReport,];
    var __VLS_302;
    // @ts-ignore
    [];
    var __VLS_231;
}
{
    const { footer: __VLS_305 } = __VLS_165.slots;
    let __VLS_306;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_307 = __VLS_asFunctionalComponent1(__VLS_306, new __VLS_306({
        ...{ 'onClick': {} },
    }));
    const __VLS_308 = __VLS_307({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_307));
    let __VLS_311;
    const __VLS_312 = {
        /** @type {typeof __VLS_311.click} */
        onClick: (...[$event]) => {
            __VLS_ctx.showReportDialog = false;
            // @ts-ignore
            [showReportDialog,];
        },
    };
    const { default: __VLS_313 } = __VLS_309.slots;
    // @ts-ignore
    [];
    var __VLS_309;
    var __VLS_310;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_165;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
