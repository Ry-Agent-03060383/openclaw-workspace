/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, onMounted, computed } from 'vue';
import { useUserStore } from '../../store/user';
import { getApprovalHistory, reviewApplication, triggerRules } from '../../api/approval';
import { ElMessage, ElMessageBox } from 'element-plus';
import { View, MagicStick } from '@element-plus/icons-vue';
const userStore = useUserStore();
const isAdmin = computed(() => userStore.userType === 'ADMIN');
const isRisk = computed(() => userStore.userType === 'RISK_MANAGER');
const canManage = computed(() => isAdmin.value || isRisk.value);
const approvals = ref([]);
const loading = ref(false);
const total = ref(0);
const page = ref(1);
const pageSize = ref(10);
const showDetailDialog = ref(false);
const detailData = ref(null);
const searchKeyword = ref('');
const resultMap = {
    PASS: '通过',
    REJECT: '拒绝',
    REVIEWING: '审核中',
};
const resultType = {
    PASS: 'success',
    REJECT: 'danger',
    REVIEWING: 'warning',
};
onMounted(async () => { await loadData(); });
async function loadData() {
    loading.value = true;
    try {
        // 获取所有审批记录 - 如果后端没有统一列表，尝试从第一个可用的查询
        const res = await getApprovalHistory(0);
        if (res?.code === 200) {
            approvals.value = Array.isArray(res.data) ? res.data : (res.data?.records || []);
            total.value = approvals.value.length;
        }
    }
    catch {
        approvals.value = [];
        total.value = 0;
    }
    loading.value = false;
}
const filteredList = computed(() => {
    if (!searchKeyword.value)
        return approvals.value;
    const kw = searchKeyword.value.toLowerCase();
    return approvals.value.filter((a) => (a.applicationNo && a.applicationNo.toLowerCase().includes(kw)) ||
        (a.approverName && a.approverName.toLowerCase().includes(kw)));
});
const pagedList = computed(() => {
    const start = (page.value - 1) * pageSize.value;
    return filteredList.value.slice(start, start + pageSize.value);
});
async function showDetail(row) {
    detailData.value = row;
    showDetailDialog.value = true;
}
async function handleReview(row, approved) {
    try {
        const comment = approved
            ? ''
            : (await ElMessageBox.prompt('请输入拒绝原因', '拒绝申请').catch(() => ({ value: null })))?.value || '';
        if (!approved && !comment)
            return;
        const res = await reviewApplication(row.applicationId || row.id, { approved, comment });
        if (res?.code === 200) {
            ElMessage.success(approved ? '已通过' : '已拒绝');
            await loadData();
        }
        else {
            ElMessage.error(res?.message || '操作失败');
        }
    }
    catch { /* cancel */ }
}
async function handleTriggerRules(row) {
    try {
        const res = await triggerRules(row.applicationId || row.id);
        if (res?.code === 200) {
            ElMessage.success('规则引擎已触发');
            await loadData();
        }
        else {
            ElMessage.error(res?.message || '操作失败');
        }
    }
    catch {
        ElMessage.error('操作失败');
    }
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
elCard;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
{
    const { header: __VLS_6 } = __VLS_3.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ style: {} },
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    let __VLS_7;
    /** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
    elInput;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
        ...{ 'onInput': {} },
        modelValue: (__VLS_ctx.searchKeyword),
        placeholder: "搜索申请ID/审批人...",
        clearable: true,
        size: "small",
        ...{ style: {} },
    }));
    const __VLS_9 = __VLS_8({
        ...{ 'onInput': {} },
        modelValue: (__VLS_ctx.searchKeyword),
        placeholder: "搜索申请ID/审批人...",
        clearable: true,
        size: "small",
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    let __VLS_12;
    const __VLS_13 = {
        /** @type {typeof __VLS_12.input} */
        onInput: (...[$event]) => {
            __VLS_ctx.page = 1;
            // @ts-ignore
            [searchKeyword, page,];
        },
    };
    var __VLS_10;
    var __VLS_11;
    let __VLS_14;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_15 = __VLS_asFunctionalComponent1(__VLS_14, new __VLS_14({
        ...{ 'onClick': {} },
        size: "small",
    }));
    const __VLS_16 = __VLS_15({
        ...{ 'onClick': {} },
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_15));
    let __VLS_19;
    const __VLS_20 = {
        /** @type {typeof __VLS_19.click} */
        onClick: (__VLS_ctx.loadData),
    };
    const { default: __VLS_21 } = __VLS_17.slots;
    // @ts-ignore
    [loadData,];
    var __VLS_17;
    var __VLS_18;
    // @ts-ignore
    [];
}
let __VLS_22;
/** @ts-ignore @type { | typeof __VLS_components.elTable | typeof __VLS_components.ElTable | typeof __VLS_components['el-table'] | typeof __VLS_components.elTable | typeof __VLS_components.ElTable | typeof __VLS_components['el-table']} */
elTable;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent1(__VLS_22, new __VLS_22({
    data: (__VLS_ctx.pagedList),
    stripe: true,
    size: "small",
}));
const __VLS_24 = __VLS_23({
    data: (__VLS_ctx.pagedList),
    stripe: true,
    size: "small",
}, ...__VLS_functionalComponentArgsRest(__VLS_23));
__VLS_asFunctionalDirective(__VLS_directives.vLoading, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.loading) }, null, null);
const { default: __VLS_27 } = __VLS_25.slots;
let __VLS_28;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent1(__VLS_28, new __VLS_28({
    prop: "applicationNo",
    label: "申请ID",
    width: "160",
}));
const __VLS_30 = __VLS_29({
    prop: "applicationNo",
    label: "申请ID",
    width: "160",
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
let __VLS_33;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_34 = __VLS_asFunctionalComponent1(__VLS_33, new __VLS_33({
    prop: "loanId",
    label: "关联贷款",
    width: "100",
}));
const __VLS_35 = __VLS_34({
    prop: "loanId",
    label: "关联贷款",
    width: "100",
}, ...__VLS_functionalComponentArgsRest(__VLS_34));
let __VLS_38;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_39 = __VLS_asFunctionalComponent1(__VLS_38, new __VLS_38({
    prop: "approverName",
    label: "审批人",
    minWidth: "120",
}));
const __VLS_40 = __VLS_39({
    prop: "approverName",
    label: "审批人",
    minWidth: "120",
}, ...__VLS_functionalComponentArgsRest(__VLS_39));
let __VLS_43;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_44 = __VLS_asFunctionalComponent1(__VLS_43, new __VLS_43({
    label: "审批结果",
    width: "110",
}));
const __VLS_45 = __VLS_44({
    label: "审批结果",
    width: "110",
}, ...__VLS_functionalComponentArgsRest(__VLS_44));
const { default: __VLS_48 } = __VLS_46.slots;
{
    const { default: __VLS_49 } = __VLS_46.slots;
    const [{ row }] = __VLS_vSlot(__VLS_49);
    let __VLS_50;
    /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
    elTag;
    // @ts-ignore
    const __VLS_51 = __VLS_asFunctionalComponent1(__VLS_50, new __VLS_50({
        type: (__VLS_ctx.resultType[row.result] || 'info'),
        size: "small",
    }));
    const __VLS_52 = __VLS_51({
        type: (__VLS_ctx.resultType[row.result] || 'info'),
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_51));
    const { default: __VLS_55 } = __VLS_53.slots;
    (__VLS_ctx.resultMap[row.result] || row.result || '-');
    // @ts-ignore
    [pagedList, vLoading, loading, resultType, resultMap,];
    var __VLS_53;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_46;
let __VLS_56;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent1(__VLS_56, new __VLS_56({
    label: "审批时间",
    width: "110",
}));
const __VLS_58 = __VLS_57({
    label: "审批时间",
    width: "110",
}, ...__VLS_functionalComponentArgsRest(__VLS_57));
const { default: __VLS_61 } = __VLS_59.slots;
{
    const { default: __VLS_62 } = __VLS_59.slots;
    const [{ row }] = __VLS_vSlot(__VLS_62);
    (row.reviewedAt ? row.reviewedAt.slice(0, 10) : '-');
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_59;
let __VLS_63;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_64 = __VLS_asFunctionalComponent1(__VLS_63, new __VLS_63({
    prop: "comment",
    label: "备注",
    showOverflowTooltip: true,
    minWidth: "160",
}));
const __VLS_65 = __VLS_64({
    prop: "comment",
    label: "备注",
    showOverflowTooltip: true,
    minWidth: "160",
}, ...__VLS_functionalComponentArgsRest(__VLS_64));
let __VLS_68;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_69 = __VLS_asFunctionalComponent1(__VLS_68, new __VLS_68({
    label: "操作",
    width: "200",
    fixed: "right",
}));
const __VLS_70 = __VLS_69({
    label: "操作",
    width: "200",
    fixed: "right",
}, ...__VLS_functionalComponentArgsRest(__VLS_69));
const { default: __VLS_73 } = __VLS_71.slots;
{
    const { default: __VLS_74 } = __VLS_71.slots;
    const [{ row }] = __VLS_vSlot(__VLS_74);
    let __VLS_75;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_76 = __VLS_asFunctionalComponent1(__VLS_75, new __VLS_75({
        ...{ 'onClick': {} },
        size: "small",
        icon: (__VLS_ctx.View),
    }));
    const __VLS_77 = __VLS_76({
        ...{ 'onClick': {} },
        size: "small",
        icon: (__VLS_ctx.View),
    }, ...__VLS_functionalComponentArgsRest(__VLS_76));
    let __VLS_80;
    const __VLS_81 = {
        /** @type {typeof __VLS_80.click} */
        onClick: (...[$event]) => {
            __VLS_ctx.showDetail(row);
            // @ts-ignore
            [View, showDetail,];
        },
    };
    const { default: __VLS_82 } = __VLS_78.slots;
    // @ts-ignore
    [];
    var __VLS_78;
    var __VLS_79;
    if (__VLS_ctx.canManage && (!row.result || row.result === 'REVIEWING')) {
        let __VLS_83;
        /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
        elButton;
        // @ts-ignore
        const __VLS_84 = __VLS_asFunctionalComponent1(__VLS_83, new __VLS_83({
            ...{ 'onClick': {} },
            size: "small",
            type: "success",
        }));
        const __VLS_85 = __VLS_84({
            ...{ 'onClick': {} },
            size: "small",
            type: "success",
        }, ...__VLS_functionalComponentArgsRest(__VLS_84));
        let __VLS_88;
        const __VLS_89 = {
            /** @type {typeof __VLS_88.click} */
            onClick: (...[$event]) => {
                if (!(__VLS_ctx.canManage && (!row.result || row.result === 'REVIEWING')))
                    return;
                __VLS_ctx.handleReview(row, true);
                // @ts-ignore
                [canManage, handleReview,];
            },
        };
        const { default: __VLS_90 } = __VLS_86.slots;
        // @ts-ignore
        [];
        var __VLS_86;
        var __VLS_87;
    }
    if (__VLS_ctx.canManage && (!row.result || row.result === 'REVIEWING')) {
        let __VLS_91;
        /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
        elButton;
        // @ts-ignore
        const __VLS_92 = __VLS_asFunctionalComponent1(__VLS_91, new __VLS_91({
            ...{ 'onClick': {} },
            size: "small",
            type: "danger",
        }));
        const __VLS_93 = __VLS_92({
            ...{ 'onClick': {} },
            size: "small",
            type: "danger",
        }, ...__VLS_functionalComponentArgsRest(__VLS_92));
        let __VLS_96;
        const __VLS_97 = {
            /** @type {typeof __VLS_96.click} */
            onClick: (...[$event]) => {
                if (!(__VLS_ctx.canManage && (!row.result || row.result === 'REVIEWING')))
                    return;
                __VLS_ctx.handleReview(row, false);
                // @ts-ignore
                [canManage, handleReview,];
            },
        };
        const { default: __VLS_98 } = __VLS_94.slots;
        // @ts-ignore
        [];
        var __VLS_94;
        var __VLS_95;
    }
    if (__VLS_ctx.canManage) {
        let __VLS_99;
        /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
        elButton;
        // @ts-ignore
        const __VLS_100 = __VLS_asFunctionalComponent1(__VLS_99, new __VLS_99({
            ...{ 'onClick': {} },
            size: "small",
            type: "warning",
            icon: (__VLS_ctx.MagicStick),
        }));
        const __VLS_101 = __VLS_100({
            ...{ 'onClick': {} },
            size: "small",
            type: "warning",
            icon: (__VLS_ctx.MagicStick),
        }, ...__VLS_functionalComponentArgsRest(__VLS_100));
        let __VLS_104;
        const __VLS_105 = {
            /** @type {typeof __VLS_104.click} */
            onClick: (...[$event]) => {
                if (!(__VLS_ctx.canManage))
                    return;
                __VLS_ctx.handleTriggerRules(row);
                // @ts-ignore
                [canManage, MagicStick, handleTriggerRules,];
            },
        };
        const { default: __VLS_106 } = __VLS_102.slots;
        // @ts-ignore
        [];
        var __VLS_102;
        var __VLS_103;
    }
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_71;
// @ts-ignore
[];
var __VLS_25;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ style: {} },
});
let __VLS_107;
/** @ts-ignore @type { | typeof __VLS_components.elPagination | typeof __VLS_components.ElPagination | typeof __VLS_components['el-pagination']} */
elPagination;
// @ts-ignore
const __VLS_108 = __VLS_asFunctionalComponent1(__VLS_107, new __VLS_107({
    currentPage: (__VLS_ctx.page),
    pageSize: (__VLS_ctx.pageSize),
    total: (__VLS_ctx.filteredList.length),
    layout: "prev, pager, next, total",
    small: true,
}));
const __VLS_109 = __VLS_108({
    currentPage: (__VLS_ctx.page),
    pageSize: (__VLS_ctx.pageSize),
    total: (__VLS_ctx.filteredList.length),
    layout: "prev, pager, next, total",
    small: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_108));
if (!__VLS_ctx.filteredList.length && !__VLS_ctx.loading) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ style: {} },
    });
}
// @ts-ignore
[page, loading, pageSize, filteredList, filteredList,];
var __VLS_3;
let __VLS_112;
/** @ts-ignore @type { | typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog | typeof __VLS_components['el-dialog'] | typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog | typeof __VLS_components['el-dialog']} */
elDialog;
// @ts-ignore
const __VLS_113 = __VLS_asFunctionalComponent1(__VLS_112, new __VLS_112({
    modelValue: (__VLS_ctx.showDetailDialog),
    title: "审批详情",
    width: "550px",
}));
const __VLS_114 = __VLS_113({
    modelValue: (__VLS_ctx.showDetailDialog),
    title: "审批详情",
    width: "550px",
}, ...__VLS_functionalComponentArgsRest(__VLS_113));
const { default: __VLS_117 } = __VLS_115.slots;
if (__VLS_ctx.detailData) {
    let __VLS_118;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptions | typeof __VLS_components.ElDescriptions | typeof __VLS_components['el-descriptions'] | typeof __VLS_components.elDescriptions | typeof __VLS_components.ElDescriptions | typeof __VLS_components['el-descriptions']} */
    elDescriptions;
    // @ts-ignore
    const __VLS_119 = __VLS_asFunctionalComponent1(__VLS_118, new __VLS_118({
        column: (2),
        border: true,
    }));
    const __VLS_120 = __VLS_119({
        column: (2),
        border: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_119));
    const { default: __VLS_123 } = __VLS_121.slots;
    let __VLS_124;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_125 = __VLS_asFunctionalComponent1(__VLS_124, new __VLS_124({
        label: "申请ID",
    }));
    const __VLS_126 = __VLS_125({
        label: "申请ID",
    }, ...__VLS_functionalComponentArgsRest(__VLS_125));
    const { default: __VLS_129 } = __VLS_127.slots;
    (__VLS_ctx.detailData.applicationNo || __VLS_ctx.detailData.id);
    // @ts-ignore
    [showDetailDialog, detailData, detailData, detailData,];
    var __VLS_127;
    let __VLS_130;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_131 = __VLS_asFunctionalComponent1(__VLS_130, new __VLS_130({
        label: "关联贷款",
    }));
    const __VLS_132 = __VLS_131({
        label: "关联贷款",
    }, ...__VLS_functionalComponentArgsRest(__VLS_131));
    const { default: __VLS_135 } = __VLS_133.slots;
    (__VLS_ctx.detailData.loanId);
    // @ts-ignore
    [detailData,];
    var __VLS_133;
    let __VLS_136;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_137 = __VLS_asFunctionalComponent1(__VLS_136, new __VLS_136({
        label: "审批人",
    }));
    const __VLS_138 = __VLS_137({
        label: "审批人",
    }, ...__VLS_functionalComponentArgsRest(__VLS_137));
    const { default: __VLS_141 } = __VLS_139.slots;
    (__VLS_ctx.detailData.approverName || '-');
    // @ts-ignore
    [detailData,];
    var __VLS_139;
    let __VLS_142;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_143 = __VLS_asFunctionalComponent1(__VLS_142, new __VLS_142({
        label: "审批结果",
    }));
    const __VLS_144 = __VLS_143({
        label: "审批结果",
    }, ...__VLS_functionalComponentArgsRest(__VLS_143));
    const { default: __VLS_147 } = __VLS_145.slots;
    let __VLS_148;
    /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
    elTag;
    // @ts-ignore
    const __VLS_149 = __VLS_asFunctionalComponent1(__VLS_148, new __VLS_148({
        type: (__VLS_ctx.resultType[__VLS_ctx.detailData.result] || 'info'),
        size: "small",
    }));
    const __VLS_150 = __VLS_149({
        type: (__VLS_ctx.resultType[__VLS_ctx.detailData.result] || 'info'),
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_149));
    const { default: __VLS_153 } = __VLS_151.slots;
    (__VLS_ctx.resultMap[__VLS_ctx.detailData.result] || __VLS_ctx.detailData.result || '-');
    // @ts-ignore
    [resultType, resultMap, detailData, detailData, detailData,];
    var __VLS_151;
    // @ts-ignore
    [];
    var __VLS_145;
    let __VLS_154;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_155 = __VLS_asFunctionalComponent1(__VLS_154, new __VLS_154({
        label: "审批时间",
    }));
    const __VLS_156 = __VLS_155({
        label: "审批时间",
    }, ...__VLS_functionalComponentArgsRest(__VLS_155));
    const { default: __VLS_159 } = __VLS_157.slots;
    (__VLS_ctx.detailData.reviewedAt || '-');
    // @ts-ignore
    [detailData,];
    var __VLS_157;
    let __VLS_160;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_161 = __VLS_asFunctionalComponent1(__VLS_160, new __VLS_160({
        label: "申请时间",
    }));
    const __VLS_162 = __VLS_161({
        label: "申请时间",
    }, ...__VLS_functionalComponentArgsRest(__VLS_161));
    const { default: __VLS_165 } = __VLS_163.slots;
    (__VLS_ctx.detailData.createdAt || '-');
    // @ts-ignore
    [detailData,];
    var __VLS_163;
    let __VLS_166;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_167 = __VLS_asFunctionalComponent1(__VLS_166, new __VLS_166({
        label: "备注",
        span: (2),
    }));
    const __VLS_168 = __VLS_167({
        label: "备注",
        span: (2),
    }, ...__VLS_functionalComponentArgsRest(__VLS_167));
    const { default: __VLS_171 } = __VLS_169.slots;
    (__VLS_ctx.detailData.comment || '-');
    // @ts-ignore
    [detailData,];
    var __VLS_169;
    // @ts-ignore
    [];
    var __VLS_121;
}
// @ts-ignore
[];
var __VLS_115;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
