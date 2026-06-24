/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, onMounted } from 'vue';
import { getAllCompanies, searchCompanies, getCompanyByCreditCode, getCompanyFullInfo, getScoreBreakdown, batchEvaluate, generateReport } from '../../api/credit';
import { ElMessage } from 'element-plus';
import { Search, Refresh, Document, DataAnalysis, TrendCharts } from '@element-plus/icons-vue';
const searchMode = ref('name');
const searchKeyword = ref('');
const companies = ref([]);
const selectedCompany = ref(null);
const companyFullInfo = ref(null);
const scoreBreakdown = ref(null);
const loading = ref(false);
const evaluating = ref(false);
const generating = ref(false);
const showDetailDialog = ref(false);
const activeTab = ref('overview');
const breakdownDialog = ref(false);
const creditLevelMap = { AAA: '极好', AA: '优秀', A: '良好', BBB: '中等', BB: '关注', B: '预警', C: '高危' };
const creditLevelType = { AAA: 'success', AA: '', A: 'primary', BBB: 'warning', BB: 'warning', B: 'danger', C: 'danger' };
const riskLevelMap = { LOW: '低风险', MEDIUM: '中等风险', HIGH: '高风险' };
const riskLevelType = { LOW: 'success', MEDIUM: 'warning', HIGH: 'danger' };
onMounted(async () => {
    await loadCompanies();
});
async function loadCompanies() {
    loading.value = true;
    try {
        const res = await getAllCompanies();
        companies.value = res?.data || [];
    }
    catch {
        companies.value = [];
    }
    finally {
        loading.value = false;
    }
}
async function doSearch() {
    if (!searchKeyword.value.trim())
        return await loadCompanies();
    loading.value = true;
    try {
        if (searchMode.value === 'code') {
            const res = await getCompanyByCreditCode(searchKeyword.value.trim());
            companies.value = res?.data ? [res.data] : [];
        }
        else {
            const res = await searchCompanies(searchKeyword.value.trim());
            companies.value = res?.data || [];
        }
    }
    catch {
        companies.value = [];
    }
    finally {
        loading.value = false;
    }
}
async function viewCompanyDetail(company) {
    selectedCompany.value = company;
    showDetailDialog.value = true;
    activeTab.value = 'overview';
    companyFullInfo.value = null;
    scoreBreakdown.value = null;
    try {
        const infoRes = await getCompanyFullInfo(company.id);
        companyFullInfo.value = infoRes?.data || null;
    }
    catch {
        companyFullInfo.value = null;
    }
}
async function viewScoreBreakdown(companyId) {
    breakdownDialog.value = true;
    try {
        const res = await getScoreBreakdown(companyId);
        scoreBreakdown.value = res?.data || null;
    }
    catch {
        scoreBreakdown.value = null;
    }
}
async function handleGenerateReport(companyId) {
    try {
        generating.value = true;
        await generateReport(companyId, 'STANDARD', 'USER');
        ElMessage.success('征信报告生成成功');
    }
    catch (e) {
        ElMessage.error(e.message || '生成失败');
    }
}
async function handleBatchEvaluate() {
    evaluating.value = true;
    try {
        const ids = companies.value.map((c) => c.id);
        if (!ids.length) {
            ElMessage.warning('无企业数据');
            return;
        }
        await batchEvaluate(ids);
        ElMessage.success(`已完成 ${ids.length} 家企业的批量评分`);
    }
    catch (e) {
        ElMessage.error(e.message || '批量评估失败');
    }
    finally {
        evaluating.value = false;
    }
}
function getRiskColor(score) {
    if (score >= 80)
        return '#67C23A';
    if (score >= 60)
        return '#E6A23C';
    return '#F56C6C';
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-item']} */ ;
/** @type {__VLS_StyleScopedClasses['radar-section']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "credit-view" },
});
/** @type {__VLS_StyleScopedClasses['credit-view']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "page-header" },
});
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "header-actions" },
});
/** @type {__VLS_StyleScopedClasses['header-actions']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    icon: (__VLS_ctx.Refresh),
    loading: (__VLS_ctx.loading),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    icon: (__VLS_ctx.Refresh),
    loading: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = {
    /** @type {typeof __VLS_5.click} */
    onClick: (__VLS_ctx.loadCompanies),
};
const { default: __VLS_7 } = __VLS_3.slots;
// @ts-ignore
[Refresh, loading, loadCompanies,];
var __VLS_3;
var __VLS_4;
let __VLS_8;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent1(__VLS_8, new __VLS_8({
    ...{ 'onClick': {} },
    icon: (__VLS_ctx.DataAnalysis),
    loading: (__VLS_ctx.evaluating),
    type: "success",
    plain: true,
}));
const __VLS_10 = __VLS_9({
    ...{ 'onClick': {} },
    icon: (__VLS_ctx.DataAnalysis),
    loading: (__VLS_ctx.evaluating),
    type: "success",
    plain: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_13;
const __VLS_14 = {
    /** @type {typeof __VLS_13.click} */
    onClick: (__VLS_ctx.handleBatchEvaluate),
};
const { default: __VLS_15 } = __VLS_11.slots;
// @ts-ignore
[DataAnalysis, evaluating, handleBatchEvaluate,];
var __VLS_11;
var __VLS_12;
let __VLS_16;
/** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
elCard;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent1(__VLS_16, new __VLS_16({
    ...{ class: "search-card" },
}));
const __VLS_18 = __VLS_17({
    ...{ class: "search-card" },
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
/** @type {__VLS_StyleScopedClasses['search-card']} */ ;
const { default: __VLS_21 } = __VLS_19.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "search-bar" },
});
/** @type {__VLS_StyleScopedClasses['search-bar']} */ ;
let __VLS_22;
/** @ts-ignore @type { | typeof __VLS_components.elRadioGroup | typeof __VLS_components.ElRadioGroup | typeof __VLS_components['el-radio-group'] | typeof __VLS_components.elRadioGroup | typeof __VLS_components.ElRadioGroup | typeof __VLS_components['el-radio-group']} */
elRadioGroup;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent1(__VLS_22, new __VLS_22({
    modelValue: (__VLS_ctx.searchMode),
}));
const __VLS_24 = __VLS_23({
    modelValue: (__VLS_ctx.searchMode),
}, ...__VLS_functionalComponentArgsRest(__VLS_23));
const { default: __VLS_27 } = __VLS_25.slots;
let __VLS_28;
/** @ts-ignore @type { | typeof __VLS_components.elRadioButton | typeof __VLS_components.ElRadioButton | typeof __VLS_components['el-radio-button'] | typeof __VLS_components.elRadioButton | typeof __VLS_components.ElRadioButton | typeof __VLS_components['el-radio-button']} */
elRadioButton;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent1(__VLS_28, new __VLS_28({
    value: "name",
}));
const __VLS_30 = __VLS_29({
    value: "name",
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
const { default: __VLS_33 } = __VLS_31.slots;
// @ts-ignore
[searchMode,];
var __VLS_31;
let __VLS_34;
/** @ts-ignore @type { | typeof __VLS_components.elRadioButton | typeof __VLS_components.ElRadioButton | typeof __VLS_components['el-radio-button'] | typeof __VLS_components.elRadioButton | typeof __VLS_components.ElRadioButton | typeof __VLS_components['el-radio-button']} */
elRadioButton;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent1(__VLS_34, new __VLS_34({
    value: "code",
}));
const __VLS_36 = __VLS_35({
    value: "code",
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
const { default: __VLS_39 } = __VLS_37.slots;
// @ts-ignore
[];
var __VLS_37;
// @ts-ignore
[];
var __VLS_25;
let __VLS_40;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent1(__VLS_40, new __VLS_40({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.searchKeyword),
    placeholder: (__VLS_ctx.searchMode === 'name' ? '输入企业名称搜索' : '输入统一社会信用代码'),
    clearable: true,
    ...{ style: {} },
}));
const __VLS_42 = __VLS_41({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.searchKeyword),
    placeholder: (__VLS_ctx.searchMode === 'name' ? '输入企业名称搜索' : '输入统一社会信用代码'),
    clearable: true,
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
let __VLS_45;
const __VLS_46 = {
    /** @type {typeof __VLS_45.keyup} */
    onKeyup: (__VLS_ctx.doSearch),
};
var __VLS_43;
var __VLS_44;
let __VLS_47;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_48 = __VLS_asFunctionalComponent1(__VLS_47, new __VLS_47({
    ...{ 'onClick': {} },
    type: "primary",
    icon: (__VLS_ctx.Search),
}));
const __VLS_49 = __VLS_48({
    ...{ 'onClick': {} },
    type: "primary",
    icon: (__VLS_ctx.Search),
}, ...__VLS_functionalComponentArgsRest(__VLS_48));
let __VLS_52;
const __VLS_53 = {
    /** @type {typeof __VLS_52.click} */
    onClick: (__VLS_ctx.doSearch),
};
const { default: __VLS_54 } = __VLS_50.slots;
// @ts-ignore
[searchMode, searchKeyword, doSearch, doSearch, Search,];
var __VLS_50;
var __VLS_51;
// @ts-ignore
[];
var __VLS_19;
let __VLS_55;
/** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
elCard;
// @ts-ignore
const __VLS_56 = __VLS_asFunctionalComponent1(__VLS_55, new __VLS_55({
    ...{ class: "company-list" },
}));
const __VLS_57 = __VLS_56({
    ...{ class: "company-list" },
}, ...__VLS_functionalComponentArgsRest(__VLS_56));
/** @type {__VLS_StyleScopedClasses['company-list']} */ ;
const { default: __VLS_60 } = __VLS_58.slots;
{
    const { header: __VLS_61 } = __VLS_58.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "card-header" },
    });
    /** @type {__VLS_StyleScopedClasses['card-header']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    if (__VLS_ctx.companies.length) {
        let __VLS_62;
        /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
        elTag;
        // @ts-ignore
        const __VLS_63 = __VLS_asFunctionalComponent1(__VLS_62, new __VLS_62({
            type: "info",
        }));
        const __VLS_64 = __VLS_63({
            type: "info",
        }, ...__VLS_functionalComponentArgsRest(__VLS_63));
        const { default: __VLS_67 } = __VLS_65.slots;
        (__VLS_ctx.companies.length);
        // @ts-ignore
        [companies, companies,];
        var __VLS_65;
    }
    // @ts-ignore
    [];
}
let __VLS_68;
/** @ts-ignore @type { | typeof __VLS_components.elTable | typeof __VLS_components.ElTable | typeof __VLS_components['el-table'] | typeof __VLS_components.elTable | typeof __VLS_components.ElTable | typeof __VLS_components['el-table']} */
elTable;
// @ts-ignore
const __VLS_69 = __VLS_asFunctionalComponent1(__VLS_68, new __VLS_68({
    data: (__VLS_ctx.companies),
    stripe: true,
    ...{ style: {} },
}));
const __VLS_70 = __VLS_69({
    data: (__VLS_ctx.companies),
    stripe: true,
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_69));
__VLS_asFunctionalDirective(__VLS_directives.vLoading, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.loading) }, null, null);
const { default: __VLS_73 } = __VLS_71.slots;
let __VLS_74;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_75 = __VLS_asFunctionalComponent1(__VLS_74, new __VLS_74({
    prop: "companyName",
    label: "企业名称",
    minWidth: "160",
}));
const __VLS_76 = __VLS_75({
    prop: "companyName",
    label: "企业名称",
    minWidth: "160",
}, ...__VLS_functionalComponentArgsRest(__VLS_75));
let __VLS_79;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_80 = __VLS_asFunctionalComponent1(__VLS_79, new __VLS_79({
    prop: "legalPerson",
    label: "法定代表人",
    width: "120",
}));
const __VLS_81 = __VLS_80({
    prop: "legalPerson",
    label: "法定代表人",
    width: "120",
}, ...__VLS_functionalComponentArgsRest(__VLS_80));
let __VLS_84;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_85 = __VLS_asFunctionalComponent1(__VLS_84, new __VLS_84({
    prop: "industry",
    label: "行业",
    width: "140",
}));
const __VLS_86 = __VLS_85({
    prop: "industry",
    label: "行业",
    width: "140",
}, ...__VLS_functionalComponentArgsRest(__VLS_85));
let __VLS_89;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_90 = __VLS_asFunctionalComponent1(__VLS_89, new __VLS_89({
    label: "信用评分",
    width: "120",
    align: "center",
}));
const __VLS_91 = __VLS_90({
    label: "信用评分",
    width: "120",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_90));
const { default: __VLS_94 } = __VLS_92.slots;
{
    const { default: __VLS_95 } = __VLS_92.slots;
    const [{ row }] = __VLS_vSlot(__VLS_95);
    let __VLS_96;
    /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
    elTag;
    // @ts-ignore
    const __VLS_97 = __VLS_asFunctionalComponent1(__VLS_96, new __VLS_96({
        type: (row.creditScore >= 80 ? 'success' : row.creditScore >= 60 ? 'warning' : 'danger'),
        effect: "dark",
    }));
    const __VLS_98 = __VLS_97({
        type: (row.creditScore >= 80 ? 'success' : row.creditScore >= 60 ? 'warning' : 'danger'),
        effect: "dark",
    }, ...__VLS_functionalComponentArgsRest(__VLS_97));
    const { default: __VLS_101 } = __VLS_99.slots;
    (row.creditScore ?? '—');
    // @ts-ignore
    [loading, companies, vLoading,];
    var __VLS_99;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_92;
let __VLS_102;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_103 = __VLS_asFunctionalComponent1(__VLS_102, new __VLS_102({
    label: "信用等级",
    width: "100",
    align: "center",
}));
const __VLS_104 = __VLS_103({
    label: "信用等级",
    width: "100",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_103));
const { default: __VLS_107 } = __VLS_105.slots;
{
    const { default: __VLS_108 } = __VLS_105.slots;
    const [{ row }] = __VLS_vSlot(__VLS_108);
    let __VLS_109;
    /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
    elTag;
    // @ts-ignore
    const __VLS_110 = __VLS_asFunctionalComponent1(__VLS_109, new __VLS_109({
        type: (__VLS_ctx.creditLevelType[row.creditLevel] || 'info'),
        effect: "plain",
    }));
    const __VLS_111 = __VLS_110({
        type: (__VLS_ctx.creditLevelType[row.creditLevel] || 'info'),
        effect: "plain",
    }, ...__VLS_functionalComponentArgsRest(__VLS_110));
    const { default: __VLS_114 } = __VLS_112.slots;
    (row.creditLevel || '—');
    // @ts-ignore
    [creditLevelType,];
    var __VLS_112;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_105;
let __VLS_115;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_116 = __VLS_asFunctionalComponent1(__VLS_115, new __VLS_115({
    label: "风险等级",
    width: "110",
    align: "center",
}));
const __VLS_117 = __VLS_116({
    label: "风险等级",
    width: "110",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_116));
const { default: __VLS_120 } = __VLS_118.slots;
{
    const { default: __VLS_121 } = __VLS_118.slots;
    const [{ row }] = __VLS_vSlot(__VLS_121);
    let __VLS_122;
    /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
    elTag;
    // @ts-ignore
    const __VLS_123 = __VLS_asFunctionalComponent1(__VLS_122, new __VLS_122({
        type: (__VLS_ctx.riskLevelType[row.riskLevel] || 'info'),
        effect: "dark",
    }));
    const __VLS_124 = __VLS_123({
        type: (__VLS_ctx.riskLevelType[row.riskLevel] || 'info'),
        effect: "dark",
    }, ...__VLS_functionalComponentArgsRest(__VLS_123));
    const { default: __VLS_127 } = __VLS_125.slots;
    (__VLS_ctx.riskLevelMap[row.riskLevel] || row.riskLevel || '—');
    // @ts-ignore
    [riskLevelType, riskLevelMap,];
    var __VLS_125;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_118;
let __VLS_128;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_129 = __VLS_asFunctionalComponent1(__VLS_128, new __VLS_128({
    label: "成立日期",
    width: "110",
}));
const __VLS_130 = __VLS_129({
    label: "成立日期",
    width: "110",
}, ...__VLS_functionalComponentArgsRest(__VLS_129));
const { default: __VLS_133 } = __VLS_131.slots;
{
    const { default: __VLS_134 } = __VLS_131.slots;
    const [{ row }] = __VLS_vSlot(__VLS_134);
    (row.establishmentDate);
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_131;
let __VLS_135;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_136 = __VLS_asFunctionalComponent1(__VLS_135, new __VLS_135({
    label: "操作",
    width: "240",
    fixed: "right",
}));
const __VLS_137 = __VLS_136({
    label: "操作",
    width: "240",
    fixed: "right",
}, ...__VLS_functionalComponentArgsRest(__VLS_136));
const { default: __VLS_140 } = __VLS_138.slots;
{
    const { default: __VLS_141 } = __VLS_138.slots;
    const [{ row }] = __VLS_vSlot(__VLS_141);
    let __VLS_142;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_143 = __VLS_asFunctionalComponent1(__VLS_142, new __VLS_142({
        ...{ 'onClick': {} },
        size: "small",
        icon: (__VLS_ctx.Document),
    }));
    const __VLS_144 = __VLS_143({
        ...{ 'onClick': {} },
        size: "small",
        icon: (__VLS_ctx.Document),
    }, ...__VLS_functionalComponentArgsRest(__VLS_143));
    let __VLS_147;
    const __VLS_148 = {
        /** @type {typeof __VLS_147.click} */
        onClick: (...[$event]) => {
            __VLS_ctx.viewCompanyDetail(row);
            // @ts-ignore
            [Document, viewCompanyDetail,];
        },
    };
    const { default: __VLS_149 } = __VLS_145.slots;
    // @ts-ignore
    [];
    var __VLS_145;
    var __VLS_146;
    let __VLS_150;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_151 = __VLS_asFunctionalComponent1(__VLS_150, new __VLS_150({
        ...{ 'onClick': {} },
        size: "small",
        icon: (__VLS_ctx.TrendCharts),
    }));
    const __VLS_152 = __VLS_151({
        ...{ 'onClick': {} },
        size: "small",
        icon: (__VLS_ctx.TrendCharts),
    }, ...__VLS_functionalComponentArgsRest(__VLS_151));
    let __VLS_155;
    const __VLS_156 = {
        /** @type {typeof __VLS_155.click} */
        onClick: (...[$event]) => {
            __VLS_ctx.viewScoreBreakdown(row.id);
            // @ts-ignore
            [TrendCharts, viewScoreBreakdown,];
        },
    };
    const { default: __VLS_157 } = __VLS_153.slots;
    // @ts-ignore
    [];
    var __VLS_153;
    var __VLS_154;
    let __VLS_158;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_159 = __VLS_asFunctionalComponent1(__VLS_158, new __VLS_158({
        ...{ 'onClick': {} },
        size: "small",
        type: "primary",
    }));
    const __VLS_160 = __VLS_159({
        ...{ 'onClick': {} },
        size: "small",
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_159));
    let __VLS_163;
    const __VLS_164 = {
        /** @type {typeof __VLS_163.click} */
        onClick: (...[$event]) => {
            __VLS_ctx.handleGenerateReport(row.id);
            // @ts-ignore
            [handleGenerateReport,];
        },
    };
    const { default: __VLS_165 } = __VLS_161.slots;
    // @ts-ignore
    [];
    var __VLS_161;
    var __VLS_162;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_138;
// @ts-ignore
[];
var __VLS_71;
// @ts-ignore
[];
var __VLS_58;
let __VLS_166;
/** @ts-ignore @type { | typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog | typeof __VLS_components['el-dialog'] | typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog | typeof __VLS_components['el-dialog']} */
elDialog;
// @ts-ignore
const __VLS_167 = __VLS_asFunctionalComponent1(__VLS_166, new __VLS_166({
    modelValue: (__VLS_ctx.showDetailDialog),
    title: (__VLS_ctx.selectedCompany?.companyName),
    width: "800px",
    destroyOnClose: true,
}));
const __VLS_168 = __VLS_167({
    modelValue: (__VLS_ctx.showDetailDialog),
    title: (__VLS_ctx.selectedCompany?.companyName),
    width: "800px",
    destroyOnClose: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_167));
const { default: __VLS_171 } = __VLS_169.slots;
if (__VLS_ctx.companyFullInfo) {
    let __VLS_172;
    /** @ts-ignore @type { | typeof __VLS_components.elTabs | typeof __VLS_components.ElTabs | typeof __VLS_components['el-tabs'] | typeof __VLS_components.elTabs | typeof __VLS_components.ElTabs | typeof __VLS_components['el-tabs']} */
    elTabs;
    // @ts-ignore
    const __VLS_173 = __VLS_asFunctionalComponent1(__VLS_172, new __VLS_172({
        modelValue: (__VLS_ctx.activeTab),
    }));
    const __VLS_174 = __VLS_173({
        modelValue: (__VLS_ctx.activeTab),
    }, ...__VLS_functionalComponentArgsRest(__VLS_173));
    const { default: __VLS_177 } = __VLS_175.slots;
    let __VLS_178;
    /** @ts-ignore @type { | typeof __VLS_components.elTabPane | typeof __VLS_components.ElTabPane | typeof __VLS_components['el-tab-pane'] | typeof __VLS_components.elTabPane | typeof __VLS_components.ElTabPane | typeof __VLS_components['el-tab-pane']} */
    elTabPane;
    // @ts-ignore
    const __VLS_179 = __VLS_asFunctionalComponent1(__VLS_178, new __VLS_178({
        label: "评分概览",
        name: "overview",
    }));
    const __VLS_180 = __VLS_179({
        label: "评分概览",
        name: "overview",
    }, ...__VLS_functionalComponentArgsRest(__VLS_179));
    const { default: __VLS_183 } = __VLS_181.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "score-overview" },
    });
    /** @type {__VLS_StyleScopedClasses['score-overview']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "main-score" },
    });
    /** @type {__VLS_StyleScopedClasses['main-score']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "score-circle" },
        ...{ style: ({ borderColor: __VLS_ctx.getRiskColor(__VLS_ctx.companyFullInfo.creditScore || 0) }) },
    });
    /** @type {__VLS_StyleScopedClasses['score-circle']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "score-value" },
    });
    /** @type {__VLS_StyleScopedClasses['score-value']} */ ;
    (__VLS_ctx.companyFullInfo.creditScore || '—');
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "score-label" },
    });
    /** @type {__VLS_StyleScopedClasses['score-label']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "score-detail" },
    });
    /** @type {__VLS_StyleScopedClasses['score-detail']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "detail-item" },
    });
    /** @type {__VLS_StyleScopedClasses['detail-item']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({});
    let __VLS_184;
    /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
    elTag;
    // @ts-ignore
    const __VLS_185 = __VLS_asFunctionalComponent1(__VLS_184, new __VLS_184({
        type: (__VLS_ctx.creditLevelType[__VLS_ctx.companyFullInfo.creditLevel] || 'info'),
        size: "large",
    }));
    const __VLS_186 = __VLS_185({
        type: (__VLS_ctx.creditLevelType[__VLS_ctx.companyFullInfo.creditLevel] || 'info'),
        size: "large",
    }, ...__VLS_functionalComponentArgsRest(__VLS_185));
    const { default: __VLS_189 } = __VLS_187.slots;
    (__VLS_ctx.companyFullInfo.creditLevel);
    (__VLS_ctx.creditLevelMap[__VLS_ctx.companyFullInfo.creditLevel] || '');
    // @ts-ignore
    [creditLevelType, showDetailDialog, selectedCompany, companyFullInfo, companyFullInfo, companyFullInfo, companyFullInfo, companyFullInfo, companyFullInfo, activeTab, getRiskColor, creditLevelMap,];
    var __VLS_187;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "detail-item" },
    });
    /** @type {__VLS_StyleScopedClasses['detail-item']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({});
    let __VLS_190;
    /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
    elTag;
    // @ts-ignore
    const __VLS_191 = __VLS_asFunctionalComponent1(__VLS_190, new __VLS_190({
        type: (__VLS_ctx.riskLevelType[__VLS_ctx.companyFullInfo.riskLevel] || 'info'),
        size: "large",
    }));
    const __VLS_192 = __VLS_191({
        type: (__VLS_ctx.riskLevelType[__VLS_ctx.companyFullInfo.riskLevel] || 'info'),
        size: "large",
    }, ...__VLS_functionalComponentArgsRest(__VLS_191));
    const { default: __VLS_195 } = __VLS_193.slots;
    (__VLS_ctx.riskLevelMap[__VLS_ctx.companyFullInfo.riskLevel] || __VLS_ctx.companyFullInfo.riskLevel);
    // @ts-ignore
    [riskLevelType, riskLevelMap, companyFullInfo, companyFullInfo, companyFullInfo,];
    var __VLS_193;
    if (__VLS_ctx.companyFullInfo.scoreBreakdown?.dimensions) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "radar-section" },
        });
        /** @type {__VLS_StyleScopedClasses['radar-section']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.h4, __VLS_intrinsics.h4)({});
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "dimension-grid" },
        });
        /** @type {__VLS_StyleScopedClasses['dimension-grid']} */ ;
        for (const [dim, key] of __VLS_vFor((__VLS_ctx.companyFullInfo.scoreBreakdown.dimensions))) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                key: (key),
                ...{ class: "dim-item" },
            });
            /** @type {__VLS_StyleScopedClasses['dim-item']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "dim-header" },
            });
            /** @type {__VLS_StyleScopedClasses['dim-header']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "dim-name" },
            });
            /** @type {__VLS_StyleScopedClasses['dim-name']} */ ;
            (dim.name);
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "dim-score" },
                ...{ style: ({ color: __VLS_ctx.getRiskColor(dim.score) }) },
            });
            /** @type {__VLS_StyleScopedClasses['dim-score']} */ ;
            (dim.score);
            let __VLS_196;
            /** @ts-ignore @type { | typeof __VLS_components.elProgress | typeof __VLS_components.ElProgress | typeof __VLS_components['el-progress']} */
            elProgress;
            // @ts-ignore
            const __VLS_197 = __VLS_asFunctionalComponent1(__VLS_196, new __VLS_196({
                percentage: (dim.score),
                color: (__VLS_ctx.getRiskColor(dim.score)),
                strokeWidth: (12),
            }));
            const __VLS_198 = __VLS_197({
                percentage: (dim.score),
                color: (__VLS_ctx.getRiskColor(dim.score)),
                strokeWidth: (12),
            }, ...__VLS_functionalComponentArgsRest(__VLS_197));
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "dim-info" },
            });
            /** @type {__VLS_StyleScopedClasses['dim-info']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
            (dim.weight);
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "dim-desc" },
            });
            /** @type {__VLS_StyleScopedClasses['dim-desc']} */ ;
            (dim.description);
            // @ts-ignore
            [companyFullInfo, companyFullInfo, getRiskColor, getRiskColor,];
        }
    }
    // @ts-ignore
    [];
    var __VLS_181;
    if (__VLS_ctx.companyFullInfo?.company) {
        let __VLS_201;
        /** @ts-ignore @type { | typeof __VLS_components.elTabPane | typeof __VLS_components.ElTabPane | typeof __VLS_components['el-tab-pane'] | typeof __VLS_components.elTabPane | typeof __VLS_components.ElTabPane | typeof __VLS_components['el-tab-pane']} */
        elTabPane;
        // @ts-ignore
        const __VLS_202 = __VLS_asFunctionalComponent1(__VLS_201, new __VLS_201({
            label: "企业信息",
            name: "info",
        }));
        const __VLS_203 = __VLS_202({
            label: "企业信息",
            name: "info",
        }, ...__VLS_functionalComponentArgsRest(__VLS_202));
        const { default: __VLS_206 } = __VLS_204.slots;
        let __VLS_207;
        /** @ts-ignore @type { | typeof __VLS_components.elDescriptions | typeof __VLS_components.ElDescriptions | typeof __VLS_components['el-descriptions'] | typeof __VLS_components.elDescriptions | typeof __VLS_components.ElDescriptions | typeof __VLS_components['el-descriptions']} */
        elDescriptions;
        // @ts-ignore
        const __VLS_208 = __VLS_asFunctionalComponent1(__VLS_207, new __VLS_207({
            column: (2),
            border: true,
        }));
        const __VLS_209 = __VLS_208({
            column: (2),
            border: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_208));
        const { default: __VLS_212 } = __VLS_210.slots;
        let __VLS_213;
        /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
        elDescriptionsItem;
        // @ts-ignore
        const __VLS_214 = __VLS_asFunctionalComponent1(__VLS_213, new __VLS_213({
            label: "企业名称",
        }));
        const __VLS_215 = __VLS_214({
            label: "企业名称",
        }, ...__VLS_functionalComponentArgsRest(__VLS_214));
        const { default: __VLS_218 } = __VLS_216.slots;
        (__VLS_ctx.companyFullInfo.company.companyName);
        // @ts-ignore
        [companyFullInfo, companyFullInfo,];
        var __VLS_216;
        let __VLS_219;
        /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
        elDescriptionsItem;
        // @ts-ignore
        const __VLS_220 = __VLS_asFunctionalComponent1(__VLS_219, new __VLS_219({
            label: "信用代码",
        }));
        const __VLS_221 = __VLS_220({
            label: "信用代码",
        }, ...__VLS_functionalComponentArgsRest(__VLS_220));
        const { default: __VLS_224 } = __VLS_222.slots;
        (__VLS_ctx.companyFullInfo.company.creditCode);
        // @ts-ignore
        [companyFullInfo,];
        var __VLS_222;
        let __VLS_225;
        /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
        elDescriptionsItem;
        // @ts-ignore
        const __VLS_226 = __VLS_asFunctionalComponent1(__VLS_225, new __VLS_225({
            label: "法定代表人",
        }));
        const __VLS_227 = __VLS_226({
            label: "法定代表人",
        }, ...__VLS_functionalComponentArgsRest(__VLS_226));
        const { default: __VLS_230 } = __VLS_228.slots;
        (__VLS_ctx.companyFullInfo.company.legalPerson);
        // @ts-ignore
        [companyFullInfo,];
        var __VLS_228;
        let __VLS_231;
        /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
        elDescriptionsItem;
        // @ts-ignore
        const __VLS_232 = __VLS_asFunctionalComponent1(__VLS_231, new __VLS_231({
            label: "注册资本",
        }));
        const __VLS_233 = __VLS_232({
            label: "注册资本",
        }, ...__VLS_functionalComponentArgsRest(__VLS_232));
        const { default: __VLS_236 } = __VLS_234.slots;
        (__VLS_ctx.companyFullInfo.company.registeredCapital);
        // @ts-ignore
        [companyFullInfo,];
        var __VLS_234;
        let __VLS_237;
        /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
        elDescriptionsItem;
        // @ts-ignore
        const __VLS_238 = __VLS_asFunctionalComponent1(__VLS_237, new __VLS_237({
            label: "成立日期",
        }));
        const __VLS_239 = __VLS_238({
            label: "成立日期",
        }, ...__VLS_functionalComponentArgsRest(__VLS_238));
        const { default: __VLS_242 } = __VLS_240.slots;
        (__VLS_ctx.companyFullInfo.company.establishmentDate);
        // @ts-ignore
        [companyFullInfo,];
        var __VLS_240;
        let __VLS_243;
        /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
        elDescriptionsItem;
        // @ts-ignore
        const __VLS_244 = __VLS_asFunctionalComponent1(__VLS_243, new __VLS_243({
            label: "经营状态",
        }));
        const __VLS_245 = __VLS_244({
            label: "经营状态",
        }, ...__VLS_functionalComponentArgsRest(__VLS_244));
        const { default: __VLS_248 } = __VLS_246.slots;
        (__VLS_ctx.companyFullInfo.company.businessStatus);
        // @ts-ignore
        [companyFullInfo,];
        var __VLS_246;
        let __VLS_249;
        /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
        elDescriptionsItem;
        // @ts-ignore
        const __VLS_250 = __VLS_asFunctionalComponent1(__VLS_249, new __VLS_249({
            label: "所属行业",
        }));
        const __VLS_251 = __VLS_250({
            label: "所属行业",
        }, ...__VLS_functionalComponentArgsRest(__VLS_250));
        const { default: __VLS_254 } = __VLS_252.slots;
        (__VLS_ctx.companyFullInfo.company.industry);
        // @ts-ignore
        [companyFullInfo,];
        var __VLS_252;
        let __VLS_255;
        /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
        elDescriptionsItem;
        // @ts-ignore
        const __VLS_256 = __VLS_asFunctionalComponent1(__VLS_255, new __VLS_255({
            label: "员工人数",
        }));
        const __VLS_257 = __VLS_256({
            label: "员工人数",
        }, ...__VLS_functionalComponentArgsRest(__VLS_256));
        const { default: __VLS_260 } = __VLS_258.slots;
        (__VLS_ctx.companyFullInfo.company.employeeCount || '未知');
        // @ts-ignore
        [companyFullInfo,];
        var __VLS_258;
        let __VLS_261;
        /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
        elDescriptionsItem;
        // @ts-ignore
        const __VLS_262 = __VLS_asFunctionalComponent1(__VLS_261, new __VLS_261({
            label: "年营收",
        }));
        const __VLS_263 = __VLS_262({
            label: "年营收",
        }, ...__VLS_functionalComponentArgsRest(__VLS_262));
        const { default: __VLS_266 } = __VLS_264.slots;
        (__VLS_ctx.companyFullInfo.company.annualRevenue);
        // @ts-ignore
        [companyFullInfo,];
        var __VLS_264;
        let __VLS_267;
        /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
        elDescriptionsItem;
        // @ts-ignore
        const __VLS_268 = __VLS_asFunctionalComponent1(__VLS_267, new __VLS_267({
            label: "数据来源",
        }));
        const __VLS_269 = __VLS_268({
            label: "数据来源",
        }, ...__VLS_functionalComponentArgsRest(__VLS_268));
        const { default: __VLS_272 } = __VLS_270.slots;
        (__VLS_ctx.companyFullInfo.company.dataSource || '工商登记');
        // @ts-ignore
        [companyFullInfo,];
        var __VLS_270;
        // @ts-ignore
        [];
        var __VLS_210;
        // @ts-ignore
        [];
        var __VLS_204;
    }
    let __VLS_273;
    /** @ts-ignore @type { | typeof __VLS_components.elTabPane | typeof __VLS_components.ElTabPane | typeof __VLS_components['el-tab-pane'] | typeof __VLS_components.elTabPane | typeof __VLS_components.ElTabPane | typeof __VLS_components['el-tab-pane']} */
    elTabPane;
    // @ts-ignore
    const __VLS_274 = __VLS_asFunctionalComponent1(__VLS_273, new __VLS_273({
        label: "征信报告",
        name: "reports",
    }));
    const __VLS_275 = __VLS_274({
        label: "征信报告",
        name: "reports",
    }, ...__VLS_functionalComponentArgsRest(__VLS_274));
    const { default: __VLS_278 } = __VLS_276.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "report-actions" },
    });
    /** @type {__VLS_StyleScopedClasses['report-actions']} */ ;
    let __VLS_279;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_280 = __VLS_asFunctionalComponent1(__VLS_279, new __VLS_279({
        ...{ 'onClick': {} },
        type: "primary",
        loading: (__VLS_ctx.generating),
    }));
    const __VLS_281 = __VLS_280({
        ...{ 'onClick': {} },
        type: "primary",
        loading: (__VLS_ctx.generating),
    }, ...__VLS_functionalComponentArgsRest(__VLS_280));
    let __VLS_284;
    const __VLS_285 = {
        /** @type {typeof __VLS_284.click} */
        onClick: (...[$event]) => {
            if (!(__VLS_ctx.companyFullInfo))
                return;
            __VLS_ctx.handleGenerateReport(__VLS_ctx.selectedCompany?.id);
            // @ts-ignore
            [handleGenerateReport, selectedCompany, generating,];
        },
    };
    const { default: __VLS_286 } = __VLS_282.slots;
    // @ts-ignore
    [];
    var __VLS_282;
    var __VLS_283;
    // @ts-ignore
    [];
    var __VLS_276;
    // @ts-ignore
    [];
    var __VLS_175;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "loading-hint" },
    });
    /** @type {__VLS_StyleScopedClasses['loading-hint']} */ ;
    let __VLS_287;
    /** @ts-ignore @type { | typeof __VLS_components.elSkeleton | typeof __VLS_components.ElSkeleton | typeof __VLS_components['el-skeleton']} */
    elSkeleton;
    // @ts-ignore
    const __VLS_288 = __VLS_asFunctionalComponent1(__VLS_287, new __VLS_287({
        rows: (5),
        animated: true,
    }));
    const __VLS_289 = __VLS_288({
        rows: (5),
        animated: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_288));
}
// @ts-ignore
[];
var __VLS_169;
let __VLS_292;
/** @ts-ignore @type { | typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog | typeof __VLS_components['el-dialog'] | typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog | typeof __VLS_components['el-dialog']} */
elDialog;
// @ts-ignore
const __VLS_293 = __VLS_asFunctionalComponent1(__VLS_292, new __VLS_292({
    modelValue: (__VLS_ctx.breakdownDialog),
    title: "5维度评分明细",
    width: "650px",
    destroyOnClose: true,
}));
const __VLS_294 = __VLS_293({
    modelValue: (__VLS_ctx.breakdownDialog),
    title: "5维度评分明细",
    width: "650px",
    destroyOnClose: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_293));
const { default: __VLS_297 } = __VLS_295.slots;
if (__VLS_ctx.scoreBreakdown) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "breakdown-content" },
    });
    /** @type {__VLS_StyleScopedClasses['breakdown-content']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "breakdown-header" },
    });
    /** @type {__VLS_StyleScopedClasses['breakdown-header']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "total-score" },
        ...{ style: ({ color: __VLS_ctx.getRiskColor(__VLS_ctx.scoreBreakdown.total) }) },
    });
    /** @type {__VLS_StyleScopedClasses['total-score']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "big-score" },
    });
    /** @type {__VLS_StyleScopedClasses['big-score']} */ ;
    (__VLS_ctx.scoreBreakdown.total);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "level-tag" },
    });
    /** @type {__VLS_StyleScopedClasses['level-tag']} */ ;
    let __VLS_298;
    /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
    elTag;
    // @ts-ignore
    const __VLS_299 = __VLS_asFunctionalComponent1(__VLS_298, new __VLS_298({
        type: (__VLS_ctx.creditLevelType[__VLS_ctx.scoreBreakdown.creditLevel] || 'info'),
        size: "large",
    }));
    const __VLS_300 = __VLS_299({
        type: (__VLS_ctx.creditLevelType[__VLS_ctx.scoreBreakdown.creditLevel] || 'info'),
        size: "large",
    }, ...__VLS_functionalComponentArgsRest(__VLS_299));
    const { default: __VLS_303 } = __VLS_301.slots;
    (__VLS_ctx.scoreBreakdown.creditLevel);
    // @ts-ignore
    [creditLevelType, getRiskColor, breakdownDialog, scoreBreakdown, scoreBreakdown, scoreBreakdown, scoreBreakdown, scoreBreakdown,];
    var __VLS_301;
    let __VLS_304;
    /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
    elTag;
    // @ts-ignore
    const __VLS_305 = __VLS_asFunctionalComponent1(__VLS_304, new __VLS_304({
        type: (__VLS_ctx.riskLevelType[__VLS_ctx.scoreBreakdown.riskLevel] || 'info'),
        size: "large",
        ...{ style: {} },
    }));
    const __VLS_306 = __VLS_305({
        type: (__VLS_ctx.riskLevelType[__VLS_ctx.scoreBreakdown.riskLevel] || 'info'),
        size: "large",
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_305));
    const { default: __VLS_309 } = __VLS_307.slots;
    (__VLS_ctx.riskLevelMap[__VLS_ctx.scoreBreakdown.riskLevel]);
    // @ts-ignore
    [riskLevelType, riskLevelMap, scoreBreakdown, scoreBreakdown,];
    var __VLS_307;
    let __VLS_310;
    /** @ts-ignore @type { | typeof __VLS_components.elDivider | typeof __VLS_components.ElDivider | typeof __VLS_components['el-divider']} */
    elDivider;
    // @ts-ignore
    const __VLS_311 = __VLS_asFunctionalComponent1(__VLS_310, new __VLS_310({}));
    const __VLS_312 = __VLS_311({}, ...__VLS_functionalComponentArgsRest(__VLS_311));
    if (__VLS_ctx.scoreBreakdown.dimensions) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "dimension-list" },
        });
        /** @type {__VLS_StyleScopedClasses['dimension-list']} */ ;
        for (const [dim, key] of __VLS_vFor((__VLS_ctx.scoreBreakdown.dimensions))) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                key: (key),
                ...{ class: "dimension-row" },
            });
            /** @type {__VLS_StyleScopedClasses['dimension-row']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "dim-left" },
            });
            /** @type {__VLS_StyleScopedClasses['dim-left']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "dim-name" },
            });
            /** @type {__VLS_StyleScopedClasses['dim-name']} */ ;
            (dim.name);
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "dim-weight" },
            });
            /** @type {__VLS_StyleScopedClasses['dim-weight']} */ ;
            (dim.weight);
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "dim-bar" },
            });
            /** @type {__VLS_StyleScopedClasses['dim-bar']} */ ;
            let __VLS_315;
            /** @ts-ignore @type { | typeof __VLS_components.elProgress | typeof __VLS_components.ElProgress | typeof __VLS_components['el-progress'] | typeof __VLS_components.elProgress | typeof __VLS_components.ElProgress | typeof __VLS_components['el-progress']} */
            elProgress;
            // @ts-ignore
            const __VLS_316 = __VLS_asFunctionalComponent1(__VLS_315, new __VLS_315({
                percentage: (dim.score),
                color: (__VLS_ctx.getRiskColor(dim.score)),
                strokeWidth: (18),
                textInside: (true),
            }));
            const __VLS_317 = __VLS_316({
                percentage: (dim.score),
                color: (__VLS_ctx.getRiskColor(dim.score)),
                strokeWidth: (18),
                textInside: (true),
            }, ...__VLS_functionalComponentArgsRest(__VLS_316));
            const { default: __VLS_320 } = __VLS_318.slots;
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
            (dim.score);
            // @ts-ignore
            [getRiskColor, scoreBreakdown, scoreBreakdown,];
            var __VLS_318;
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "dim-desc-text" },
            });
            /** @type {__VLS_StyleScopedClasses['dim-desc-text']} */ ;
            (dim.description);
            // @ts-ignore
            [];
        }
    }
}
// @ts-ignore
[];
var __VLS_295;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
