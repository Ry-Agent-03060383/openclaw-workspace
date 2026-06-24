/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, onMounted, computed } from 'vue';
import { useUserStore } from '../../store/user';
import { getMyLoans, getAllLoans, getPendingLoans, applyLoan, approveLoan, rejectLoan } from '../../api/loan';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Plus, CircleCheck } from '@element-plus/icons-vue';
const userStore = useUserStore();
const isSME = computed(() => userStore.userType === 'SME' || userStore.userType === 'FARMER');
const isBank = computed(() => userStore.userType === 'FINANCIAL_INSTITUTION');
const isAdmin = computed(() => userStore.userType === 'ADMIN');
const isRisk = computed(() => userStore.userType === 'RISK_MANAGER');
const loans = ref([]);
const loading = ref(true);
const showApplyDialog = ref(false);
const products = [
    { id: 1, name: '企业经营贷款', desc: 'AI智能评估，快速审批，无需抵押' },
    { id: 2, name: '科技企业专项贷', desc: '政府贴息，额度高，放款快' },
    { id: 3, name: '个人经营贷款', desc: '无需抵押，线上申请，快速审批' },
    { id: 4, name: '农户专项贷款', desc: '专项扶持，手续简便，利率优惠' },
    { id: 5, name: '农业产业链贷款', desc: '支持农业发展，绿色通道' },
];
const applyForm = ref({
    productId: 1,
    companyName: '',
    creditCode: '',
    loanAmount: 0,
    loanTermMonths: 12,
    loanPurpose: '',
    companyId: 1,
    repaymentMethod: '等额本息',
});
const statusMap = {
    DRAFT: '草稿', SUBMITTED: '已提交', PENDING: '待审核',
    APPROVING: '审批中', APPROVED: '已通过', REJECTED: '已驳回', NEEDS_MANUAL: '需人工',
};
const statusType = {
    DRAFT: 'info', SUBMITTED: 'primary', PENDING: 'warning',
    APPROVING: 'warning', APPROVED: 'success', REJECTED: 'danger', NEEDS_MANUAL: 'danger',
};
onMounted(async () => { await loadData(); });
async function loadData() {
    loading.value = true;
    try {
        let res;
        if (isBank.value)
            res = await getPendingLoans();
        else if (isAdmin.value || isRisk.value)
            res = await getAllLoans();
        else
            res = await getMyLoans();
        if (res?.code === 200)
            loans.value = res.data || [];
    }
    catch { /* ignore */ }
    loading.value = false;
}
async function handleApply() {
    try {
        const res = await applyLoan(applyForm.value);
        if (res?.code === 200) {
            ElMessage.success('申请已提交');
            showApplyDialog.value = false;
            applyForm.value = { productId: 1, companyName: '', creditCode: '', loanAmount: 0, loanTermMonths: 12, loanPurpose: '', companyId: 1, repaymentMethod: '等额本息' };
            await loadData();
        }
        else {
            ElMessage.error(res?.message || '提交失败');
        }
    }
    catch {
        ElMessage.error('提交失败');
    }
}
async function handleApprove(id) {
    try {
        const res = await approveLoan(id);
        if (res?.code === 200) {
            ElMessage.success('已批准');
            await loadData();
        }
    }
    catch {
        ElMessage.error('操作失败');
    }
}
async function handleReject(id) {
    try {
        const { value } = await ElMessageBox.prompt('请输入驳回原因', '驳回申请');
        if (value) {
            const res = await rejectLoan(id, value);
            if (res?.code === 200) {
                ElMessage.success('已驳回');
                await loadData();
            }
        }
    }
    catch { /* cancel */ }
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
    (__VLS_ctx.isBank ? '贷款审核' : __VLS_ctx.isAdmin ? '贷款管理' : '我的贷款');
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    let __VLS_7;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
        ...{ 'onClick': {} },
        size: "small",
    }));
    const __VLS_9 = __VLS_8({
        ...{ 'onClick': {} },
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    let __VLS_12;
    const __VLS_13 = {
        /** @type {typeof __VLS_12.click} */
        onClick: (__VLS_ctx.loadData),
    };
    const { default: __VLS_14 } = __VLS_10.slots;
    // @ts-ignore
    [isBank, isAdmin, loadData,];
    var __VLS_10;
    var __VLS_11;
    if (__VLS_ctx.isSME) {
        let __VLS_15;
        /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
        elButton;
        // @ts-ignore
        const __VLS_16 = __VLS_asFunctionalComponent1(__VLS_15, new __VLS_15({
            ...{ 'onClick': {} },
            type: "primary",
            size: "small",
            icon: (__VLS_ctx.Plus),
        }));
        const __VLS_17 = __VLS_16({
            ...{ 'onClick': {} },
            type: "primary",
            size: "small",
            icon: (__VLS_ctx.Plus),
        }, ...__VLS_functionalComponentArgsRest(__VLS_16));
        let __VLS_20;
        const __VLS_21 = {
            /** @type {typeof __VLS_20.click} */
            onClick: (...[$event]) => {
                if (!(__VLS_ctx.isSME))
                    return;
                __VLS_ctx.showApplyDialog = true;
                // @ts-ignore
                [isSME, Plus, showApplyDialog,];
            },
        };
        const { default: __VLS_22 } = __VLS_18.slots;
        // @ts-ignore
        [];
        var __VLS_18;
        var __VLS_19;
    }
    // @ts-ignore
    [];
}
let __VLS_23;
/** @ts-ignore @type { | typeof __VLS_components.elTable | typeof __VLS_components.ElTable | typeof __VLS_components['el-table'] | typeof __VLS_components.elTable | typeof __VLS_components.ElTable | typeof __VLS_components['el-table']} */
elTable;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent1(__VLS_23, new __VLS_23({
    data: (__VLS_ctx.loans),
    stripe: true,
    size: "small",
}));
const __VLS_25 = __VLS_24({
    data: (__VLS_ctx.loans),
    stripe: true,
    size: "small",
}, ...__VLS_functionalComponentArgsRest(__VLS_24));
__VLS_asFunctionalDirective(__VLS_directives.vLoading, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.loading) }, null, null);
const { default: __VLS_28 } = __VLS_26.slots;
let __VLS_29;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent1(__VLS_29, new __VLS_29({
    prop: "applicationNo",
    label: "申请编号",
    width: "160",
}));
const __VLS_31 = __VLS_30({
    prop: "applicationNo",
    label: "申请编号",
    width: "160",
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
let __VLS_34;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent1(__VLS_34, new __VLS_34({
    prop: "companyName",
    label: "企业/姓名",
    minWidth: "140",
}));
const __VLS_36 = __VLS_35({
    prop: "companyName",
    label: "企业/姓名",
    minWidth: "140",
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
let __VLS_39;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_40 = __VLS_asFunctionalComponent1(__VLS_39, new __VLS_39({
    label: "金额",
    width: "120",
}));
const __VLS_41 = __VLS_40({
    label: "金额",
    width: "120",
}, ...__VLS_functionalComponentArgsRest(__VLS_40));
const { default: __VLS_44 } = __VLS_42.slots;
{
    const { default: __VLS_45 } = __VLS_42.slots;
    const [{ row }] = __VLS_vSlot(__VLS_45);
    (row.loanAmount);
    // @ts-ignore
    [loans, vLoading, loading,];
}
// @ts-ignore
[];
var __VLS_42;
let __VLS_46;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_47 = __VLS_asFunctionalComponent1(__VLS_46, new __VLS_46({
    prop: "loanTermMonths",
    label: "期限",
    width: "60",
}));
const __VLS_48 = __VLS_47({
    prop: "loanTermMonths",
    label: "期限",
    width: "60",
}, ...__VLS_functionalComponentArgsRest(__VLS_47));
const { default: __VLS_51 } = __VLS_49.slots;
{
    const { default: __VLS_52 } = __VLS_49.slots;
    const [{ row }] = __VLS_vSlot(__VLS_52);
    (row.loanTermMonths);
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_49;
let __VLS_53;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_54 = __VLS_asFunctionalComponent1(__VLS_53, new __VLS_53({
    prop: "loanPurpose",
    label: "用途",
    showOverflowTooltip: true,
    minWidth: "140",
}));
const __VLS_55 = __VLS_54({
    prop: "loanPurpose",
    label: "用途",
    showOverflowTooltip: true,
    minWidth: "140",
}, ...__VLS_functionalComponentArgsRest(__VLS_54));
let __VLS_58;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_59 = __VLS_asFunctionalComponent1(__VLS_58, new __VLS_58({
    prop: "repaymentMethod",
    label: "还款方式",
    width: "100",
}));
const __VLS_60 = __VLS_59({
    prop: "repaymentMethod",
    label: "还款方式",
    width: "100",
}, ...__VLS_functionalComponentArgsRest(__VLS_59));
let __VLS_63;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_64 = __VLS_asFunctionalComponent1(__VLS_63, new __VLS_63({
    label: "状态",
    width: "100",
}));
const __VLS_65 = __VLS_64({
    label: "状态",
    width: "100",
}, ...__VLS_functionalComponentArgsRest(__VLS_64));
const { default: __VLS_68 } = __VLS_66.slots;
{
    const { default: __VLS_69 } = __VLS_66.slots;
    const [{ row }] = __VLS_vSlot(__VLS_69);
    let __VLS_70;
    /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
    elTag;
    // @ts-ignore
    const __VLS_71 = __VLS_asFunctionalComponent1(__VLS_70, new __VLS_70({
        type: (__VLS_ctx.statusType[row.status] || 'info'),
        size: "small",
    }));
    const __VLS_72 = __VLS_71({
        type: (__VLS_ctx.statusType[row.status] || 'info'),
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_71));
    const { default: __VLS_75 } = __VLS_73.slots;
    (__VLS_ctx.statusMap[row.status] || row.status);
    // @ts-ignore
    [statusType, statusMap,];
    var __VLS_73;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_66;
if (__VLS_ctx.isBank) {
    let __VLS_76;
    /** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
    elTableColumn;
    // @ts-ignore
    const __VLS_77 = __VLS_asFunctionalComponent1(__VLS_76, new __VLS_76({
        label: "操作",
        width: "160",
        fixed: "right",
    }));
    const __VLS_78 = __VLS_77({
        label: "操作",
        width: "160",
        fixed: "right",
    }, ...__VLS_functionalComponentArgsRest(__VLS_77));
    const { default: __VLS_81 } = __VLS_79.slots;
    {
        const { default: __VLS_82 } = __VLS_79.slots;
        const [{ row }] = __VLS_vSlot(__VLS_82);
        if (row.status === 'PENDING') {
            let __VLS_83;
            /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
            elButton;
            // @ts-ignore
            const __VLS_84 = __VLS_asFunctionalComponent1(__VLS_83, new __VLS_83({
                ...{ 'onClick': {} },
                type: "success",
                size: "small",
                icon: (__VLS_ctx.CircleCheck),
            }));
            const __VLS_85 = __VLS_84({
                ...{ 'onClick': {} },
                type: "success",
                size: "small",
                icon: (__VLS_ctx.CircleCheck),
            }, ...__VLS_functionalComponentArgsRest(__VLS_84));
            let __VLS_88;
            const __VLS_89 = {
                /** @type {typeof __VLS_88.click} */
                onClick: (...[$event]) => {
                    if (!(__VLS_ctx.isBank))
                        return;
                    if (!(row.status === 'PENDING'))
                        return;
                    __VLS_ctx.handleApprove(row.id);
                    // @ts-ignore
                    [isBank, CircleCheck, handleApprove,];
                },
            };
            const { default: __VLS_90 } = __VLS_86.slots;
            // @ts-ignore
            [];
            var __VLS_86;
            var __VLS_87;
        }
        if (row.status === 'PENDING') {
            let __VLS_91;
            /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
            elButton;
            // @ts-ignore
            const __VLS_92 = __VLS_asFunctionalComponent1(__VLS_91, new __VLS_91({
                ...{ 'onClick': {} },
                type: "danger",
                size: "small",
            }));
            const __VLS_93 = __VLS_92({
                ...{ 'onClick': {} },
                type: "danger",
                size: "small",
            }, ...__VLS_functionalComponentArgsRest(__VLS_92));
            let __VLS_96;
            const __VLS_97 = {
                /** @type {typeof __VLS_96.click} */
                onClick: (...[$event]) => {
                    if (!(__VLS_ctx.isBank))
                        return;
                    if (!(row.status === 'PENDING'))
                        return;
                    __VLS_ctx.handleReject(row.id);
                    // @ts-ignore
                    [handleReject,];
                },
            };
            const { default: __VLS_98 } = __VLS_94.slots;
            // @ts-ignore
            [];
            var __VLS_94;
            var __VLS_95;
        }
        else {
            let __VLS_99;
            /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
            elTag;
            // @ts-ignore
            const __VLS_100 = __VLS_asFunctionalComponent1(__VLS_99, new __VLS_99({
                size: "small",
                disableTransitions: true,
            }));
            const __VLS_101 = __VLS_100({
                size: "small",
                disableTransitions: true,
            }, ...__VLS_functionalComponentArgsRest(__VLS_100));
            const { default: __VLS_104 } = __VLS_102.slots;
            // @ts-ignore
            [];
            var __VLS_102;
        }
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    var __VLS_79;
}
// @ts-ignore
[];
var __VLS_26;
if (!__VLS_ctx.loans.length && !__VLS_ctx.loading) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ style: {} },
    });
}
// @ts-ignore
[loans, loading,];
var __VLS_3;
let __VLS_105;
/** @ts-ignore @type { | typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog | typeof __VLS_components['el-dialog'] | typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog | typeof __VLS_components['el-dialog']} */
elDialog;
// @ts-ignore
const __VLS_106 = __VLS_asFunctionalComponent1(__VLS_105, new __VLS_105({
    modelValue: (__VLS_ctx.showApplyDialog),
    title: "申请贷款",
    width: "500px",
}));
const __VLS_107 = __VLS_106({
    modelValue: (__VLS_ctx.showApplyDialog),
    title: "申请贷款",
    width: "500px",
}, ...__VLS_functionalComponentArgsRest(__VLS_106));
const { default: __VLS_110 } = __VLS_108.slots;
let __VLS_111;
/** @ts-ignore @type { | typeof __VLS_components.elForm | typeof __VLS_components.ElForm | typeof __VLS_components['el-form'] | typeof __VLS_components.elForm | typeof __VLS_components.ElForm | typeof __VLS_components['el-form']} */
elForm;
// @ts-ignore
const __VLS_112 = __VLS_asFunctionalComponent1(__VLS_111, new __VLS_111({
    model: (__VLS_ctx.applyForm),
    labelWidth: "100px",
}));
const __VLS_113 = __VLS_112({
    model: (__VLS_ctx.applyForm),
    labelWidth: "100px",
}, ...__VLS_functionalComponentArgsRest(__VLS_112));
const { default: __VLS_116 } = __VLS_114.slots;
let __VLS_117;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_118 = __VLS_asFunctionalComponent1(__VLS_117, new __VLS_117({
    label: "贷款产品",
    required: true,
}));
const __VLS_119 = __VLS_118({
    label: "贷款产品",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_118));
const { default: __VLS_122 } = __VLS_120.slots;
let __VLS_123;
/** @ts-ignore @type { | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select'] | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select']} */
elSelect;
// @ts-ignore
const __VLS_124 = __VLS_asFunctionalComponent1(__VLS_123, new __VLS_123({
    modelValue: (__VLS_ctx.applyForm.productId),
    ...{ style: {} },
}));
const __VLS_125 = __VLS_124({
    modelValue: (__VLS_ctx.applyForm.productId),
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_124));
const { default: __VLS_128 } = __VLS_126.slots;
for (const [p] of __VLS_vFor((__VLS_ctx.products))) {
    let __VLS_129;
    /** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option'] | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
    elOption;
    // @ts-ignore
    const __VLS_130 = __VLS_asFunctionalComponent1(__VLS_129, new __VLS_129({
        key: (p.id),
        label: (p.name),
        value: (p.id),
    }));
    const __VLS_131 = __VLS_130({
        key: (p.id),
        label: (p.name),
        value: (p.id),
    }, ...__VLS_functionalComponentArgsRest(__VLS_130));
    const { default: __VLS_134 } = __VLS_132.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (p.name);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ style: {} },
    });
    (p.desc);
    // @ts-ignore
    [showApplyDialog, applyForm, applyForm, products,];
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
let __VLS_135;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_136 = __VLS_asFunctionalComponent1(__VLS_135, new __VLS_135({
    label: "企业名称",
    required: true,
}));
const __VLS_137 = __VLS_136({
    label: "企业名称",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_136));
const { default: __VLS_140 } = __VLS_138.slots;
let __VLS_141;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_142 = __VLS_asFunctionalComponent1(__VLS_141, new __VLS_141({
    modelValue: (__VLS_ctx.applyForm.companyName),
    placeholder: "请输入企业名称",
}));
const __VLS_143 = __VLS_142({
    modelValue: (__VLS_ctx.applyForm.companyName),
    placeholder: "请输入企业名称",
}, ...__VLS_functionalComponentArgsRest(__VLS_142));
// @ts-ignore
[applyForm,];
var __VLS_138;
let __VLS_146;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_147 = __VLS_asFunctionalComponent1(__VLS_146, new __VLS_146({
    label: "信用代码",
    required: true,
}));
const __VLS_148 = __VLS_147({
    label: "信用代码",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_147));
const { default: __VLS_151 } = __VLS_149.slots;
let __VLS_152;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_153 = __VLS_asFunctionalComponent1(__VLS_152, new __VLS_152({
    modelValue: (__VLS_ctx.applyForm.creditCode),
    placeholder: "统一社会信用代码",
}));
const __VLS_154 = __VLS_153({
    modelValue: (__VLS_ctx.applyForm.creditCode),
    placeholder: "统一社会信用代码",
}, ...__VLS_functionalComponentArgsRest(__VLS_153));
// @ts-ignore
[applyForm,];
var __VLS_149;
let __VLS_157;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_158 = __VLS_asFunctionalComponent1(__VLS_157, new __VLS_157({
    label: "贷款金额",
    required: true,
}));
const __VLS_159 = __VLS_158({
    label: "贷款金额",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_158));
const { default: __VLS_162 } = __VLS_160.slots;
let __VLS_163;
/** @ts-ignore @type { | typeof __VLS_components.elInputNumber | typeof __VLS_components.ElInputNumber | typeof __VLS_components['el-input-number']} */
elInputNumber;
// @ts-ignore
const __VLS_164 = __VLS_asFunctionalComponent1(__VLS_163, new __VLS_163({
    modelValue: (__VLS_ctx.applyForm.loanAmount),
    min: (10000),
    step: (50000),
    ...{ style: {} },
}));
const __VLS_165 = __VLS_164({
    modelValue: (__VLS_ctx.applyForm.loanAmount),
    min: (10000),
    step: (50000),
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_164));
// @ts-ignore
[applyForm,];
var __VLS_160;
let __VLS_168;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_169 = __VLS_asFunctionalComponent1(__VLS_168, new __VLS_168({
    label: "贷款期限",
}));
const __VLS_170 = __VLS_169({
    label: "贷款期限",
}, ...__VLS_functionalComponentArgsRest(__VLS_169));
const { default: __VLS_173 } = __VLS_171.slots;
let __VLS_174;
/** @ts-ignore @type { | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select'] | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select']} */
elSelect;
// @ts-ignore
const __VLS_175 = __VLS_asFunctionalComponent1(__VLS_174, new __VLS_174({
    modelValue: (__VLS_ctx.applyForm.loanTermMonths),
    ...{ style: {} },
}));
const __VLS_176 = __VLS_175({
    modelValue: (__VLS_ctx.applyForm.loanTermMonths),
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_175));
const { default: __VLS_179 } = __VLS_177.slots;
let __VLS_180;
/** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
elOption;
// @ts-ignore
const __VLS_181 = __VLS_asFunctionalComponent1(__VLS_180, new __VLS_180({
    label: "6个月",
    value: (6),
}));
const __VLS_182 = __VLS_181({
    label: "6个月",
    value: (6),
}, ...__VLS_functionalComponentArgsRest(__VLS_181));
let __VLS_185;
/** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
elOption;
// @ts-ignore
const __VLS_186 = __VLS_asFunctionalComponent1(__VLS_185, new __VLS_185({
    label: "12个月",
    value: (12),
}));
const __VLS_187 = __VLS_186({
    label: "12个月",
    value: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_186));
let __VLS_190;
/** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
elOption;
// @ts-ignore
const __VLS_191 = __VLS_asFunctionalComponent1(__VLS_190, new __VLS_190({
    label: "24个月",
    value: (24),
}));
const __VLS_192 = __VLS_191({
    label: "24个月",
    value: (24),
}, ...__VLS_functionalComponentArgsRest(__VLS_191));
let __VLS_195;
/** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
elOption;
// @ts-ignore
const __VLS_196 = __VLS_asFunctionalComponent1(__VLS_195, new __VLS_195({
    label: "36个月",
    value: (36),
}));
const __VLS_197 = __VLS_196({
    label: "36个月",
    value: (36),
}, ...__VLS_functionalComponentArgsRest(__VLS_196));
// @ts-ignore
[applyForm,];
var __VLS_177;
// @ts-ignore
[];
var __VLS_171;
let __VLS_200;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_201 = __VLS_asFunctionalComponent1(__VLS_200, new __VLS_200({
    label: "还款方式",
}));
const __VLS_202 = __VLS_201({
    label: "还款方式",
}, ...__VLS_functionalComponentArgsRest(__VLS_201));
const { default: __VLS_205 } = __VLS_203.slots;
let __VLS_206;
/** @ts-ignore @type { | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select'] | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select']} */
elSelect;
// @ts-ignore
const __VLS_207 = __VLS_asFunctionalComponent1(__VLS_206, new __VLS_206({
    modelValue: (__VLS_ctx.applyForm.repaymentMethod),
    ...{ style: {} },
}));
const __VLS_208 = __VLS_207({
    modelValue: (__VLS_ctx.applyForm.repaymentMethod),
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_207));
const { default: __VLS_211 } = __VLS_209.slots;
let __VLS_212;
/** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
elOption;
// @ts-ignore
const __VLS_213 = __VLS_asFunctionalComponent1(__VLS_212, new __VLS_212({
    label: "等额本息",
    value: "等额本息",
}));
const __VLS_214 = __VLS_213({
    label: "等额本息",
    value: "等额本息",
}, ...__VLS_functionalComponentArgsRest(__VLS_213));
let __VLS_217;
/** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
elOption;
// @ts-ignore
const __VLS_218 = __VLS_asFunctionalComponent1(__VLS_217, new __VLS_217({
    label: "等额本金",
    value: "等额本金",
}));
const __VLS_219 = __VLS_218({
    label: "等额本金",
    value: "等额本金",
}, ...__VLS_functionalComponentArgsRest(__VLS_218));
let __VLS_222;
/** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
elOption;
// @ts-ignore
const __VLS_223 = __VLS_asFunctionalComponent1(__VLS_222, new __VLS_222({
    label: "先息后本",
    value: "先息后本",
}));
const __VLS_224 = __VLS_223({
    label: "先息后本",
    value: "先息后本",
}, ...__VLS_functionalComponentArgsRest(__VLS_223));
// @ts-ignore
[applyForm,];
var __VLS_209;
// @ts-ignore
[];
var __VLS_203;
let __VLS_227;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_228 = __VLS_asFunctionalComponent1(__VLS_227, new __VLS_227({
    label: "贷款用途",
    required: true,
}));
const __VLS_229 = __VLS_228({
    label: "贷款用途",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_228));
const { default: __VLS_232 } = __VLS_230.slots;
let __VLS_233;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_234 = __VLS_asFunctionalComponent1(__VLS_233, new __VLS_233({
    modelValue: (__VLS_ctx.applyForm.loanPurpose),
    type: "textarea",
    rows: (2),
    placeholder: "请说明贷款用途",
}));
const __VLS_235 = __VLS_234({
    modelValue: (__VLS_ctx.applyForm.loanPurpose),
    type: "textarea",
    rows: (2),
    placeholder: "请说明贷款用途",
}, ...__VLS_functionalComponentArgsRest(__VLS_234));
// @ts-ignore
[applyForm,];
var __VLS_230;
// @ts-ignore
[];
var __VLS_114;
{
    const { footer: __VLS_238 } = __VLS_108.slots;
    let __VLS_239;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_240 = __VLS_asFunctionalComponent1(__VLS_239, new __VLS_239({
        ...{ 'onClick': {} },
    }));
    const __VLS_241 = __VLS_240({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_240));
    let __VLS_244;
    const __VLS_245 = {
        /** @type {typeof __VLS_244.click} */
        onClick: (...[$event]) => {
            __VLS_ctx.showApplyDialog = false;
            // @ts-ignore
            [showApplyDialog,];
        },
    };
    const { default: __VLS_246 } = __VLS_242.slots;
    // @ts-ignore
    [];
    var __VLS_242;
    var __VLS_243;
    let __VLS_247;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_248 = __VLS_asFunctionalComponent1(__VLS_247, new __VLS_247({
        ...{ 'onClick': {} },
        type: "primary",
    }));
    const __VLS_249 = __VLS_248({
        ...{ 'onClick': {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_248));
    let __VLS_252;
    const __VLS_253 = {
        /** @type {typeof __VLS_252.click} */
        onClick: (__VLS_ctx.handleApply),
    };
    const { default: __VLS_254 } = __VLS_250.slots;
    // @ts-ignore
    [handleApply,];
    var __VLS_250;
    var __VLS_251;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_108;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
