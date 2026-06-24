/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, onMounted, computed } from 'vue';
import { useUserStore } from '../../store/user';
import { getApplicationList, getApplicationById, createApplication, submitApplication, reviewApplication, getGuaranteeList, getGuaranteeById, signGuarantee, registerCounterGuarantee, payGuaranteeFee, releaseGuarantee, calculateFee, } from '../../api/guarantee';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Plus, View, Edit, CircleCheck, Remove, Upload, Coin } from '@element-plus/icons-vue';
const userStore = useUserStore();
const isAdmin = computed(() => userStore.userType === 'ADMIN');
const isBank = computed(() => userStore.userType === 'FINANCIAL_INSTITUTION');
const isGuarantee = computed(() => userStore.userType === 'GUARANTEE_INSTITUTION');
const activeTab = ref('application');
// ═══ 担保申请 ═══
const apps = ref([]);
const appsLoading = ref(false);
const appsTotal = ref(0);
const appsPage = ref(0);
const appsSize = ref(10);
const appQuery = ref({ appNo: '', applicantName: '', status: '' });
const showAppCreateDialog = ref(false);
const showAppDetailDialog = ref(false);
const appDetail = ref(null);
const appForm = ref({
    loanApplicationId: 0, applicantName: '', guaranteeType: '保证担保',
    requestAmount: 0, purpose: ''
});
// ═══ 担保列表 ═══
const guarantees = ref([]);
const gLoading = ref(false);
const gTotal = ref(0);
const gPage = ref(0);
const gSize = ref(10);
const gQuery = ref({ guaranteeNo: '', guarantorName: '', status: '' });
const showGDetailDialog = ref(false);
const gDetail = ref(null);
const showSignDialog = ref(false);
const signContractNo = ref('');
const signTargetId = ref(0);
const showCounterDialog = ref(false);
const counterForm = ref({ counterGuaranteeType: '抵押', counterGuaranteeDesc: '', counterGuaranteeValue: 0 });
const counterTargetId = ref(0);
const showFeeDialog = ref(false);
const feeAmount = ref(0);
const feeTargetId = ref(0);
const feeCalcResult = ref(0);
const showReleaseDialog = ref(false);
const releaseReason = ref('');
const releaseTargetId = ref(0);
// ═══ 状态映射 ═══
const appStatusMap = {
    DRAFT: '草稿', SUBMITTED: '待审核', APPROVED: '已通过', REJECTED: '已拒绝'
};
const appStatusType = {
    DRAFT: 'info', SUBMITTED: 'warning', APPROVED: 'success', REJECTED: 'danger'
};
const gStatusMap = {
    PENDING_SIGN: '待签约', ACTIVE: '已生效', EXPIRED: '已到期', RELEASED: '已解除', TERMINATED: '已终止'
};
const gStatusType = {
    PENDING_SIGN: 'warning', ACTIVE: 'success', EXPIRED: 'info', RELEASED: 'default', TERMINATED: 'danger'
};
const cgStatusMap = { PENDING: '待登记', REGISTERED: '已登记', RELEASED: '已解除' };
const cgStatusType = { PENDING: 'info', REGISTERED: 'success', RELEASED: 'default' };
const feeStatusMap = { UNPAID: '未支付', PAID: '已支付', REFUNDED: '已退款' };
const feeStatusType = { UNPAID: 'danger', PAID: 'success', REFUNDED: 'info' };
const gtypeOptions = ['保证担保', '抵押担保', '质押担保', '信用担保', '联合担保'];
const cgtypeOptions = ['抵押', '质押', '保证'];
onMounted(async () => { await loadApps(); });
// ═══ 担保申请 ═══
async function loadApps() {
    appsLoading.value = true;
    try {
        const params = { page: appsPage.value, size: appsSize.value };
        if (appQuery.value.status)
            params.status = appQuery.value.status;
        if (isGuarantee.value)
            params.applicantId = String(userStore.userId || '');
        const res = await getApplicationList(params);
        if (res?.code === 200) {
            const d = res.data;
            apps.value = d.content || [];
            appsTotal.value = d.totalElements || 0;
        }
        else {
            apps.value = [];
            appsTotal.value = 0;
        }
    }
    catch {
        apps.value = [];
        appsTotal.value = 0;
    }
    finally {
        appsLoading.value = false;
    }
}
async function handleCreateApp() {
    try {
        const res = await createApplication(appForm.value);
        if (res?.code === 200) {
            ElMessage.success('创建成功');
            showAppCreateDialog.value = false;
            appForm.value = { loanApplicationId: 0, applicantName: '', guaranteeType: '保证担保', requestAmount: 0, purpose: '' };
            await loadApps();
        }
        else {
            ElMessage.error(res?.message || '创建失败');
        }
    }
    catch {
        ElMessage.error('创建失败');
    }
}
async function handleSubmitApp(id) {
    try {
        const res = await submitApplication(id);
        if (res?.code === 200) {
            ElMessage.success('已提交');
            await loadApps();
        }
        else {
            ElMessage.error(res?.message || '提交失败');
        }
    }
    catch {
        ElMessage.error('提交失败');
    }
}
async function handleReviewApp(row, approved) {
    try {
        const { value } = await ElMessageBox.prompt(approved ? '请输入审核意见' : '请输入拒绝原因', approved ? '审核通过' : '拒绝');
        if (value !== null) {
            const res = await reviewApplication(row.id, approved, value);
            if (res?.code === 200) {
                ElMessage.success(approved ? '审核通过' : '已拒绝');
                await loadApps();
            }
            else {
                ElMessage.error(res?.message || '操作失败');
            }
        }
    }
    catch { /* cancel */ }
}
async function showAppDetail(row) {
    try {
        const res = await getApplicationById(row.id);
        appDetail.value = res?.code === 200 ? res.data : row;
    }
    catch {
        appDetail.value = row;
    }
    showAppDetailDialog.value = true;
}
// ═══ 担保列表 ═══
async function loadGuarantees() {
    gLoading.value = true;
    try {
        const params = { page: gPage.value, size: gSize.value };
        if (gQuery.value.status)
            params.status = gQuery.value.status;
        if (isGuarantee.value)
            params.guarantorId = String(userStore.userId || '');
        const res = await getGuaranteeList(params);
        if (res?.code === 200) {
            const d = res.data;
            guarantees.value = d.content || [];
            gTotal.value = d.totalElements || 0;
        }
        else {
            guarantees.value = [];
            gTotal.value = 0;
        }
    }
    catch {
        guarantees.value = [];
        gTotal.value = 0;
    }
    finally {
        gLoading.value = false;
    }
}
async function handleSign(g) {
    signTargetId.value = g.id;
    signContractNo.value = '';
    showSignDialog.value = true;
}
async function confirmSign() {
    if (!signContractNo.value.trim()) {
        ElMessage.warning('请输入合同编号');
        return;
    }
    try {
        const res = await signGuarantee(signTargetId.value, signContractNo.value.trim());
        if (res?.code === 200) {
            ElMessage.success('签约成功');
            showSignDialog.value = false;
            await loadGuarantees();
        }
        else {
            ElMessage.error(res?.message || '签约失败');
        }
    }
    catch {
        ElMessage.error('签约失败');
    }
}
async function handleCounter(g) {
    counterTargetId.value = g.id;
    counterForm.value = { counterGuaranteeType: '抵押', counterGuaranteeDesc: '', counterGuaranteeValue: 0 };
    showCounterDialog.value = true;
}
async function confirmCounter() {
    try {
        const res = await registerCounterGuarantee(counterTargetId.value, counterForm.value);
        if (res?.code === 200) {
            ElMessage.success('反担保已登记');
            showCounterDialog.value = false;
            await loadGuarantees();
        }
        else {
            ElMessage.error(res?.message || '登记失败');
        }
    }
    catch {
        ElMessage.error('登记失败');
    }
}
async function handleFee(g) {
    feeTargetId.value = g.id;
    feeAmount.value = g.feeAmount || 0;
    // 计算费用
    try {
        const res = await calculateFee(g.guaranteeAmount || 0, g.feeRate || 1.5, 12);
        feeCalcResult.value = res?.data || res || 0;
        if (!feeAmount.value)
            feeAmount.value = feeCalcResult.value;
    }
    catch {
        feeCalcResult.value = 0;
    }
    showFeeDialog.value = true;
}
async function confirmFee() {
    if (!feeAmount.value || feeAmount.value <= 0) {
        ElMessage.warning('请输入有效金额');
        return;
    }
    try {
        const res = await payGuaranteeFee(feeTargetId.value, feeAmount.value);
        if (res?.code === 200) {
            ElMessage.success('担保费已支付');
            showFeeDialog.value = false;
            await loadGuarantees();
        }
        else {
            ElMessage.error(res?.message || '支付失败');
        }
    }
    catch {
        ElMessage.error('支付失败');
    }
}
async function handleRelease(g) {
    releaseTargetId.value = g.id;
    releaseReason.value = '';
    showReleaseDialog.value = true;
}
async function confirmRelease() {
    try {
        const res = await releaseGuarantee(releaseTargetId.value, releaseReason.value);
        if (res?.code === 200) {
            ElMessage.success('担保已释放');
            showReleaseDialog.value = false;
            await loadGuarantees();
        }
        else {
            ElMessage.error(res?.message || '释放失败');
        }
    }
    catch {
        ElMessage.error('释放失败');
    }
}
async function showGDetail(row) {
    try {
        const res = await getGuaranteeById(row.id);
        gDetail.value = res?.code === 200 ? res.data : row;
    }
    catch {
        gDetail.value = row;
    }
    showGDetailDialog.value = true;
}
function onTabChange(tab) {
    if (tab === 'guarantee' && guarantees.value.length === 0)
        loadGuarantees();
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "guarantee-view" },
});
/** @type {__VLS_StyleScopedClasses['guarantee-view']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "page-header" },
});
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.elTabs | typeof __VLS_components.ElTabs | typeof __VLS_components['el-tabs'] | typeof __VLS_components.elTabs | typeof __VLS_components.ElTabs | typeof __VLS_components['el-tabs']} */
elTabs;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onTabChange': {} },
    modelValue: (__VLS_ctx.activeTab),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onTabChange': {} },
    modelValue: (__VLS_ctx.activeTab),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = {
    /** @type {typeof __VLS_5.tabChange} */
    onTabChange: (__VLS_ctx.onTabChange),
};
const { default: __VLS_7 } = __VLS_3.slots;
let __VLS_8;
/** @ts-ignore @type { | typeof __VLS_components.elTabPane | typeof __VLS_components.ElTabPane | typeof __VLS_components['el-tab-pane'] | typeof __VLS_components.elTabPane | typeof __VLS_components.ElTabPane | typeof __VLS_components['el-tab-pane']} */
elTabPane;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent1(__VLS_8, new __VLS_8({
    label: "担保申请",
    name: "application",
}));
const __VLS_10 = __VLS_9({
    label: "担保申请",
    name: "application",
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
const { default: __VLS_13 } = __VLS_11.slots;
let __VLS_14;
/** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
elCard;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent1(__VLS_14, new __VLS_14({
    ...{ class: "search-card" },
}));
const __VLS_16 = __VLS_15({
    ...{ class: "search-card" },
}, ...__VLS_functionalComponentArgsRest(__VLS_15));
/** @type {__VLS_StyleScopedClasses['search-card']} */ ;
const { default: __VLS_19 } = __VLS_17.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "search-bar" },
});
/** @type {__VLS_StyleScopedClasses['search-bar']} */ ;
let __VLS_20;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent1(__VLS_20, new __VLS_20({
    modelValue: (__VLS_ctx.appQuery.appNo),
    placeholder: "申请编号",
    clearable: true,
    ...{ style: {} },
}));
const __VLS_22 = __VLS_21({
    modelValue: (__VLS_ctx.appQuery.appNo),
    placeholder: "申请编号",
    clearable: true,
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
let __VLS_25;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({
    modelValue: (__VLS_ctx.appQuery.applicantName),
    placeholder: "申请人",
    clearable: true,
    ...{ style: {} },
}));
const __VLS_27 = __VLS_26({
    modelValue: (__VLS_ctx.appQuery.applicantName),
    placeholder: "申请人",
    clearable: true,
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
let __VLS_30;
/** @ts-ignore @type { | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select'] | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select']} */
elSelect;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({
    modelValue: (__VLS_ctx.appQuery.status),
    placeholder: "状态",
    clearable: true,
    ...{ style: {} },
}));
const __VLS_32 = __VLS_31({
    modelValue: (__VLS_ctx.appQuery.status),
    placeholder: "状态",
    clearable: true,
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
const { default: __VLS_35 } = __VLS_33.slots;
let __VLS_36;
/** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
elOption;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({
    label: "草稿",
    value: "DRAFT",
}));
const __VLS_38 = __VLS_37({
    label: "草稿",
    value: "DRAFT",
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
let __VLS_41;
/** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
elOption;
// @ts-ignore
const __VLS_42 = __VLS_asFunctionalComponent1(__VLS_41, new __VLS_41({
    label: "待审核",
    value: "SUBMITTED",
}));
const __VLS_43 = __VLS_42({
    label: "待审核",
    value: "SUBMITTED",
}, ...__VLS_functionalComponentArgsRest(__VLS_42));
let __VLS_46;
/** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
elOption;
// @ts-ignore
const __VLS_47 = __VLS_asFunctionalComponent1(__VLS_46, new __VLS_46({
    label: "已通过",
    value: "APPROVED",
}));
const __VLS_48 = __VLS_47({
    label: "已通过",
    value: "APPROVED",
}, ...__VLS_functionalComponentArgsRest(__VLS_47));
let __VLS_51;
/** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
elOption;
// @ts-ignore
const __VLS_52 = __VLS_asFunctionalComponent1(__VLS_51, new __VLS_51({
    label: "已拒绝",
    value: "REJECTED",
}));
const __VLS_53 = __VLS_52({
    label: "已拒绝",
    value: "REJECTED",
}, ...__VLS_functionalComponentArgsRest(__VLS_52));
// @ts-ignore
[activeTab, onTabChange, appQuery, appQuery, appQuery,];
var __VLS_33;
let __VLS_56;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent1(__VLS_56, new __VLS_56({
    ...{ 'onClick': {} },
    type: "primary",
}));
const __VLS_58 = __VLS_57({
    ...{ 'onClick': {} },
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_57));
let __VLS_61;
const __VLS_62 = {
    /** @type {typeof __VLS_61.click} */
    onClick: (__VLS_ctx.loadApps),
};
const { default: __VLS_63 } = __VLS_59.slots;
// @ts-ignore
[loadApps,];
var __VLS_59;
var __VLS_60;
if (!__VLS_ctx.isGuarantee) {
    let __VLS_64;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_65 = __VLS_asFunctionalComponent1(__VLS_64, new __VLS_64({
        ...{ 'onClick': {} },
        type: "success",
        icon: (__VLS_ctx.Plus),
    }));
    const __VLS_66 = __VLS_65({
        ...{ 'onClick': {} },
        type: "success",
        icon: (__VLS_ctx.Plus),
    }, ...__VLS_functionalComponentArgsRest(__VLS_65));
    let __VLS_69;
    const __VLS_70 = {
        /** @type {typeof __VLS_69.click} */
        onClick: (...[$event]) => {
            if (!(!__VLS_ctx.isGuarantee))
                return;
            __VLS_ctx.showAppCreateDialog = true;
            // @ts-ignore
            [isGuarantee, Plus, showAppCreateDialog,];
        },
    };
    const { default: __VLS_71 } = __VLS_67.slots;
    // @ts-ignore
    [];
    var __VLS_67;
    var __VLS_68;
}
// @ts-ignore
[];
var __VLS_17;
let __VLS_72;
/** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
elCard;
// @ts-ignore
const __VLS_73 = __VLS_asFunctionalComponent1(__VLS_72, new __VLS_72({}));
const __VLS_74 = __VLS_73({}, ...__VLS_functionalComponentArgsRest(__VLS_73));
const { default: __VLS_77 } = __VLS_75.slots;
let __VLS_78;
/** @ts-ignore @type { | typeof __VLS_components.elTable | typeof __VLS_components.ElTable | typeof __VLS_components['el-table'] | typeof __VLS_components.elTable | typeof __VLS_components.ElTable | typeof __VLS_components['el-table']} */
elTable;
// @ts-ignore
const __VLS_79 = __VLS_asFunctionalComponent1(__VLS_78, new __VLS_78({
    data: (__VLS_ctx.apps),
    stripe: true,
    size: "small",
}));
const __VLS_80 = __VLS_79({
    data: (__VLS_ctx.apps),
    stripe: true,
    size: "small",
}, ...__VLS_functionalComponentArgsRest(__VLS_79));
__VLS_asFunctionalDirective(__VLS_directives.vLoading, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.appsLoading) }, null, null);
const { default: __VLS_83 } = __VLS_81.slots;
let __VLS_84;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_85 = __VLS_asFunctionalComponent1(__VLS_84, new __VLS_84({
    prop: "appNo",
    label: "申请编号",
    width: "170",
}));
const __VLS_86 = __VLS_85({
    prop: "appNo",
    label: "申请编号",
    width: "170",
}, ...__VLS_functionalComponentArgsRest(__VLS_85));
let __VLS_89;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_90 = __VLS_asFunctionalComponent1(__VLS_89, new __VLS_89({
    prop: "applicantName",
    label: "申请人",
    width: "120",
}));
const __VLS_91 = __VLS_90({
    prop: "applicantName",
    label: "申请人",
    width: "120",
}, ...__VLS_functionalComponentArgsRest(__VLS_90));
let __VLS_94;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_95 = __VLS_asFunctionalComponent1(__VLS_94, new __VLS_94({
    prop: "loanApplicationId",
    label: "关联贷款",
    width: "90",
}));
const __VLS_96 = __VLS_95({
    prop: "loanApplicationId",
    label: "关联贷款",
    width: "90",
}, ...__VLS_functionalComponentArgsRest(__VLS_95));
let __VLS_99;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_100 = __VLS_asFunctionalComponent1(__VLS_99, new __VLS_99({
    label: "担保金额",
    width: "130",
}));
const __VLS_101 = __VLS_100({
    label: "担保金额",
    width: "130",
}, ...__VLS_functionalComponentArgsRest(__VLS_100));
const { default: __VLS_104 } = __VLS_102.slots;
{
    const { default: __VLS_105 } = __VLS_102.slots;
    const [{ row }] = __VLS_vSlot(__VLS_105);
    (row.requestAmount?.toLocaleString() || 0);
    // @ts-ignore
    [apps, vLoading, appsLoading,];
}
// @ts-ignore
[];
var __VLS_102;
let __VLS_106;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_107 = __VLS_asFunctionalComponent1(__VLS_106, new __VLS_106({
    prop: "guaranteeType",
    label: "担保类型",
    width: "110",
}));
const __VLS_108 = __VLS_107({
    prop: "guaranteeType",
    label: "担保类型",
    width: "110",
}, ...__VLS_functionalComponentArgsRest(__VLS_107));
let __VLS_111;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_112 = __VLS_asFunctionalComponent1(__VLS_111, new __VLS_111({
    label: "状态",
    width: "100",
}));
const __VLS_113 = __VLS_112({
    label: "状态",
    width: "100",
}, ...__VLS_functionalComponentArgsRest(__VLS_112));
const { default: __VLS_116 } = __VLS_114.slots;
{
    const { default: __VLS_117 } = __VLS_114.slots;
    const [{ row }] = __VLS_vSlot(__VLS_117);
    let __VLS_118;
    /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
    elTag;
    // @ts-ignore
    const __VLS_119 = __VLS_asFunctionalComponent1(__VLS_118, new __VLS_118({
        type: (__VLS_ctx.appStatusType[row.status] || 'info'),
        size: "small",
    }));
    const __VLS_120 = __VLS_119({
        type: (__VLS_ctx.appStatusType[row.status] || 'info'),
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_119));
    const { default: __VLS_123 } = __VLS_121.slots;
    (__VLS_ctx.appStatusMap[row.status] || row.status);
    // @ts-ignore
    [appStatusType, appStatusMap,];
    var __VLS_121;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_114;
let __VLS_124;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_125 = __VLS_asFunctionalComponent1(__VLS_124, new __VLS_124({
    prop: "submitTime",
    label: "提交时间",
    width: "110",
}));
const __VLS_126 = __VLS_125({
    prop: "submitTime",
    label: "提交时间",
    width: "110",
}, ...__VLS_functionalComponentArgsRest(__VLS_125));
const { default: __VLS_129 } = __VLS_127.slots;
{
    const { default: __VLS_130 } = __VLS_127.slots;
    const [{ row }] = __VLS_vSlot(__VLS_130);
    (row.submitTime ? row.submitTime.slice(0, 10) : '-');
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_127;
let __VLS_131;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_132 = __VLS_asFunctionalComponent1(__VLS_131, new __VLS_131({
    label: "操作",
    width: "220",
    fixed: "right",
}));
const __VLS_133 = __VLS_132({
    label: "操作",
    width: "220",
    fixed: "right",
}, ...__VLS_functionalComponentArgsRest(__VLS_132));
const { default: __VLS_136 } = __VLS_134.slots;
{
    const { default: __VLS_137 } = __VLS_134.slots;
    const [{ row }] = __VLS_vSlot(__VLS_137);
    let __VLS_138;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_139 = __VLS_asFunctionalComponent1(__VLS_138, new __VLS_138({
        ...{ 'onClick': {} },
        size: "small",
        icon: (__VLS_ctx.View),
    }));
    const __VLS_140 = __VLS_139({
        ...{ 'onClick': {} },
        size: "small",
        icon: (__VLS_ctx.View),
    }, ...__VLS_functionalComponentArgsRest(__VLS_139));
    let __VLS_143;
    const __VLS_144 = {
        /** @type {typeof __VLS_143.click} */
        onClick: (...[$event]) => {
            __VLS_ctx.showAppDetail(row);
            // @ts-ignore
            [View, showAppDetail,];
        },
    };
    const { default: __VLS_145 } = __VLS_141.slots;
    // @ts-ignore
    [];
    var __VLS_141;
    var __VLS_142;
    if (row.status === 'DRAFT') {
        let __VLS_146;
        /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
        elButton;
        // @ts-ignore
        const __VLS_147 = __VLS_asFunctionalComponent1(__VLS_146, new __VLS_146({
            ...{ 'onClick': {} },
            size: "small",
            type: "primary",
            icon: (__VLS_ctx.Upload),
        }));
        const __VLS_148 = __VLS_147({
            ...{ 'onClick': {} },
            size: "small",
            type: "primary",
            icon: (__VLS_ctx.Upload),
        }, ...__VLS_functionalComponentArgsRest(__VLS_147));
        let __VLS_151;
        const __VLS_152 = {
            /** @type {typeof __VLS_151.click} */
            onClick: (...[$event]) => {
                if (!(row.status === 'DRAFT'))
                    return;
                __VLS_ctx.handleSubmitApp(row.id);
                // @ts-ignore
                [Upload, handleSubmitApp,];
            },
        };
        const { default: __VLS_153 } = __VLS_149.slots;
        // @ts-ignore
        [];
        var __VLS_149;
        var __VLS_150;
    }
    if (row.status === 'SUBMITTED' && (__VLS_ctx.isAdmin || __VLS_ctx.isBank)) {
        let __VLS_154;
        /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
        elButton;
        // @ts-ignore
        const __VLS_155 = __VLS_asFunctionalComponent1(__VLS_154, new __VLS_154({
            ...{ 'onClick': {} },
            size: "small",
            type: "success",
            icon: (__VLS_ctx.CircleCheck),
        }));
        const __VLS_156 = __VLS_155({
            ...{ 'onClick': {} },
            size: "small",
            type: "success",
            icon: (__VLS_ctx.CircleCheck),
        }, ...__VLS_functionalComponentArgsRest(__VLS_155));
        let __VLS_159;
        const __VLS_160 = {
            /** @type {typeof __VLS_159.click} */
            onClick: (...[$event]) => {
                if (!(row.status === 'SUBMITTED' && (__VLS_ctx.isAdmin || __VLS_ctx.isBank)))
                    return;
                __VLS_ctx.handleReviewApp(row, true);
                // @ts-ignore
                [isAdmin, isBank, CircleCheck, handleReviewApp,];
            },
        };
        const { default: __VLS_161 } = __VLS_157.slots;
        // @ts-ignore
        [];
        var __VLS_157;
        var __VLS_158;
    }
    if (row.status === 'SUBMITTED' && (__VLS_ctx.isAdmin || __VLS_ctx.isBank)) {
        let __VLS_162;
        /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
        elButton;
        // @ts-ignore
        const __VLS_163 = __VLS_asFunctionalComponent1(__VLS_162, new __VLS_162({
            ...{ 'onClick': {} },
            size: "small",
            type: "danger",
            icon: (__VLS_ctx.Remove),
        }));
        const __VLS_164 = __VLS_163({
            ...{ 'onClick': {} },
            size: "small",
            type: "danger",
            icon: (__VLS_ctx.Remove),
        }, ...__VLS_functionalComponentArgsRest(__VLS_163));
        let __VLS_167;
        const __VLS_168 = {
            /** @type {typeof __VLS_167.click} */
            onClick: (...[$event]) => {
                if (!(row.status === 'SUBMITTED' && (__VLS_ctx.isAdmin || __VLS_ctx.isBank)))
                    return;
                __VLS_ctx.handleReviewApp(row, false);
                // @ts-ignore
                [isAdmin, isBank, handleReviewApp, Remove,];
            },
        };
        const { default: __VLS_169 } = __VLS_165.slots;
        // @ts-ignore
        [];
        var __VLS_165;
        var __VLS_166;
    }
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_134;
// @ts-ignore
[];
var __VLS_81;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "pagination-wrap" },
});
/** @type {__VLS_StyleScopedClasses['pagination-wrap']} */ ;
let __VLS_170;
/** @ts-ignore @type { | typeof __VLS_components.elPagination | typeof __VLS_components.ElPagination | typeof __VLS_components['el-pagination']} */
elPagination;
// @ts-ignore
const __VLS_171 = __VLS_asFunctionalComponent1(__VLS_170, new __VLS_170({
    ...{ 'onCurrentChange': {} },
    currentPage: (__VLS_ctx.appsPage),
    pageSize: (__VLS_ctx.appsSize),
    total: (__VLS_ctx.appsTotal),
    layout: "total, prev, pager, next",
    small: true,
}));
const __VLS_172 = __VLS_171({
    ...{ 'onCurrentChange': {} },
    currentPage: (__VLS_ctx.appsPage),
    pageSize: (__VLS_ctx.appsSize),
    total: (__VLS_ctx.appsTotal),
    layout: "total, prev, pager, next",
    small: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_171));
let __VLS_175;
const __VLS_176 = {
    /** @type {typeof __VLS_175.currentChange} */
    onCurrentChange: (__VLS_ctx.loadApps),
};
var __VLS_173;
var __VLS_174;
// @ts-ignore
[loadApps, appsPage, appsSize, appsTotal,];
var __VLS_75;
// @ts-ignore
[];
var __VLS_11;
let __VLS_177;
/** @ts-ignore @type { | typeof __VLS_components.elTabPane | typeof __VLS_components.ElTabPane | typeof __VLS_components['el-tab-pane'] | typeof __VLS_components.elTabPane | typeof __VLS_components.ElTabPane | typeof __VLS_components['el-tab-pane']} */
elTabPane;
// @ts-ignore
const __VLS_178 = __VLS_asFunctionalComponent1(__VLS_177, new __VLS_177({
    label: "担保列表",
    name: "guarantee",
}));
const __VLS_179 = __VLS_178({
    label: "担保列表",
    name: "guarantee",
}, ...__VLS_functionalComponentArgsRest(__VLS_178));
const { default: __VLS_182 } = __VLS_180.slots;
let __VLS_183;
/** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
elCard;
// @ts-ignore
const __VLS_184 = __VLS_asFunctionalComponent1(__VLS_183, new __VLS_183({
    ...{ class: "search-card" },
}));
const __VLS_185 = __VLS_184({
    ...{ class: "search-card" },
}, ...__VLS_functionalComponentArgsRest(__VLS_184));
/** @type {__VLS_StyleScopedClasses['search-card']} */ ;
const { default: __VLS_188 } = __VLS_186.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "search-bar" },
});
/** @type {__VLS_StyleScopedClasses['search-bar']} */ ;
let __VLS_189;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_190 = __VLS_asFunctionalComponent1(__VLS_189, new __VLS_189({
    modelValue: (__VLS_ctx.gQuery.guaranteeNo),
    placeholder: "担保编号",
    clearable: true,
    ...{ style: {} },
}));
const __VLS_191 = __VLS_190({
    modelValue: (__VLS_ctx.gQuery.guaranteeNo),
    placeholder: "担保编号",
    clearable: true,
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_190));
let __VLS_194;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_195 = __VLS_asFunctionalComponent1(__VLS_194, new __VLS_194({
    modelValue: (__VLS_ctx.gQuery.guarantorName),
    placeholder: "担保人",
    clearable: true,
    ...{ style: {} },
}));
const __VLS_196 = __VLS_195({
    modelValue: (__VLS_ctx.gQuery.guarantorName),
    placeholder: "担保人",
    clearable: true,
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_195));
let __VLS_199;
/** @ts-ignore @type { | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select'] | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select']} */
elSelect;
// @ts-ignore
const __VLS_200 = __VLS_asFunctionalComponent1(__VLS_199, new __VLS_199({
    modelValue: (__VLS_ctx.gQuery.status),
    placeholder: "状态",
    clearable: true,
    ...{ style: {} },
}));
const __VLS_201 = __VLS_200({
    modelValue: (__VLS_ctx.gQuery.status),
    placeholder: "状态",
    clearable: true,
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_200));
const { default: __VLS_204 } = __VLS_202.slots;
let __VLS_205;
/** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
elOption;
// @ts-ignore
const __VLS_206 = __VLS_asFunctionalComponent1(__VLS_205, new __VLS_205({
    label: "待签约",
    value: "PENDING_SIGN",
}));
const __VLS_207 = __VLS_206({
    label: "待签约",
    value: "PENDING_SIGN",
}, ...__VLS_functionalComponentArgsRest(__VLS_206));
let __VLS_210;
/** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
elOption;
// @ts-ignore
const __VLS_211 = __VLS_asFunctionalComponent1(__VLS_210, new __VLS_210({
    label: "已生效",
    value: "ACTIVE",
}));
const __VLS_212 = __VLS_211({
    label: "已生效",
    value: "ACTIVE",
}, ...__VLS_functionalComponentArgsRest(__VLS_211));
let __VLS_215;
/** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
elOption;
// @ts-ignore
const __VLS_216 = __VLS_asFunctionalComponent1(__VLS_215, new __VLS_215({
    label: "已解除",
    value: "RELEASED",
}));
const __VLS_217 = __VLS_216({
    label: "已解除",
    value: "RELEASED",
}, ...__VLS_functionalComponentArgsRest(__VLS_216));
let __VLS_220;
/** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
elOption;
// @ts-ignore
const __VLS_221 = __VLS_asFunctionalComponent1(__VLS_220, new __VLS_220({
    label: "已终止",
    value: "TERMINATED",
}));
const __VLS_222 = __VLS_221({
    label: "已终止",
    value: "TERMINATED",
}, ...__VLS_functionalComponentArgsRest(__VLS_221));
// @ts-ignore
[gQuery, gQuery, gQuery,];
var __VLS_202;
let __VLS_225;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_226 = __VLS_asFunctionalComponent1(__VLS_225, new __VLS_225({
    ...{ 'onClick': {} },
    type: "primary",
}));
const __VLS_227 = __VLS_226({
    ...{ 'onClick': {} },
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_226));
let __VLS_230;
const __VLS_231 = {
    /** @type {typeof __VLS_230.click} */
    onClick: (__VLS_ctx.loadGuarantees),
};
const { default: __VLS_232 } = __VLS_228.slots;
// @ts-ignore
[loadGuarantees,];
var __VLS_228;
var __VLS_229;
// @ts-ignore
[];
var __VLS_186;
let __VLS_233;
/** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
elCard;
// @ts-ignore
const __VLS_234 = __VLS_asFunctionalComponent1(__VLS_233, new __VLS_233({}));
const __VLS_235 = __VLS_234({}, ...__VLS_functionalComponentArgsRest(__VLS_234));
const { default: __VLS_238 } = __VLS_236.slots;
let __VLS_239;
/** @ts-ignore @type { | typeof __VLS_components.elTable | typeof __VLS_components.ElTable | typeof __VLS_components['el-table'] | typeof __VLS_components.elTable | typeof __VLS_components.ElTable | typeof __VLS_components['el-table']} */
elTable;
// @ts-ignore
const __VLS_240 = __VLS_asFunctionalComponent1(__VLS_239, new __VLS_239({
    data: (__VLS_ctx.guarantees),
    stripe: true,
    size: "small",
}));
const __VLS_241 = __VLS_240({
    data: (__VLS_ctx.guarantees),
    stripe: true,
    size: "small",
}, ...__VLS_functionalComponentArgsRest(__VLS_240));
__VLS_asFunctionalDirective(__VLS_directives.vLoading, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.gLoading) }, null, null);
const { default: __VLS_244 } = __VLS_242.slots;
let __VLS_245;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_246 = __VLS_asFunctionalComponent1(__VLS_245, new __VLS_245({
    prop: "guaranteeNo",
    label: "担保编号",
    width: "160",
}));
const __VLS_247 = __VLS_246({
    prop: "guaranteeNo",
    label: "担保编号",
    width: "160",
}, ...__VLS_functionalComponentArgsRest(__VLS_246));
let __VLS_250;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_251 = __VLS_asFunctionalComponent1(__VLS_250, new __VLS_250({
    prop: "guarantorName",
    label: "担保人",
    width: "120",
}));
const __VLS_252 = __VLS_251({
    prop: "guarantorName",
    label: "担保人",
    width: "120",
}, ...__VLS_functionalComponentArgsRest(__VLS_251));
let __VLS_255;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_256 = __VLS_asFunctionalComponent1(__VLS_255, new __VLS_255({
    prop: "loanApplicationId",
    label: "关联贷款",
    width: "80",
}));
const __VLS_257 = __VLS_256({
    prop: "loanApplicationId",
    label: "关联贷款",
    width: "80",
}, ...__VLS_functionalComponentArgsRest(__VLS_256));
let __VLS_260;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_261 = __VLS_asFunctionalComponent1(__VLS_260, new __VLS_260({
    label: "担保金额",
    width: "120",
}));
const __VLS_262 = __VLS_261({
    label: "担保金额",
    width: "120",
}, ...__VLS_functionalComponentArgsRest(__VLS_261));
const { default: __VLS_265 } = __VLS_263.slots;
{
    const { default: __VLS_266 } = __VLS_263.slots;
    const [{ row }] = __VLS_vSlot(__VLS_266);
    (row.guaranteeAmount?.toLocaleString() || 0);
    // @ts-ignore
    [vLoading, guarantees, gLoading,];
}
// @ts-ignore
[];
var __VLS_263;
let __VLS_267;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_268 = __VLS_asFunctionalComponent1(__VLS_267, new __VLS_267({
    prop: "guaranteeRatio",
    label: "比例",
    width: "80",
}));
const __VLS_269 = __VLS_268({
    prop: "guaranteeRatio",
    label: "比例",
    width: "80",
}, ...__VLS_functionalComponentArgsRest(__VLS_268));
const { default: __VLS_272 } = __VLS_270.slots;
{
    const { default: __VLS_273 } = __VLS_270.slots;
    const [{ row }] = __VLS_vSlot(__VLS_273);
    (row.guaranteeRatio ? (row.guaranteeRatio * 100).toFixed(1) + '%' : '-');
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_270;
let __VLS_274;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_275 = __VLS_asFunctionalComponent1(__VLS_274, new __VLS_274({
    prop: "guaranteeType",
    label: "类型",
    width: "90",
}));
const __VLS_276 = __VLS_275({
    prop: "guaranteeType",
    label: "类型",
    width: "90",
}, ...__VLS_functionalComponentArgsRest(__VLS_275));
let __VLS_279;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_280 = __VLS_asFunctionalComponent1(__VLS_279, new __VLS_279({
    label: "反担保",
    width: "100",
}));
const __VLS_281 = __VLS_280({
    label: "反担保",
    width: "100",
}, ...__VLS_functionalComponentArgsRest(__VLS_280));
const { default: __VLS_284 } = __VLS_282.slots;
{
    const { default: __VLS_285 } = __VLS_282.slots;
    const [{ row }] = __VLS_vSlot(__VLS_285);
    let __VLS_286;
    /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
    elTag;
    // @ts-ignore
    const __VLS_287 = __VLS_asFunctionalComponent1(__VLS_286, new __VLS_286({
        type: (__VLS_ctx.cgStatusType[row.counterGuaranteeStatus] || 'info'),
        size: "small",
    }));
    const __VLS_288 = __VLS_287({
        type: (__VLS_ctx.cgStatusType[row.counterGuaranteeStatus] || 'info'),
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_287));
    const { default: __VLS_291 } = __VLS_289.slots;
    (__VLS_ctx.cgStatusMap[row.counterGuaranteeStatus] || '-');
    // @ts-ignore
    [cgStatusType, cgStatusMap,];
    var __VLS_289;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_282;
let __VLS_292;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_293 = __VLS_asFunctionalComponent1(__VLS_292, new __VLS_292({
    label: "担保费",
    width: "100",
}));
const __VLS_294 = __VLS_293({
    label: "担保费",
    width: "100",
}, ...__VLS_functionalComponentArgsRest(__VLS_293));
const { default: __VLS_297 } = __VLS_295.slots;
{
    const { default: __VLS_298 } = __VLS_295.slots;
    const [{ row }] = __VLS_vSlot(__VLS_298);
    let __VLS_299;
    /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
    elTag;
    // @ts-ignore
    const __VLS_300 = __VLS_asFunctionalComponent1(__VLS_299, new __VLS_299({
        type: (__VLS_ctx.feeStatusType[row.feeStatus] || 'info'),
        size: "small",
    }));
    const __VLS_301 = __VLS_300({
        type: (__VLS_ctx.feeStatusType[row.feeStatus] || 'info'),
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_300));
    const { default: __VLS_304 } = __VLS_302.slots;
    (__VLS_ctx.feeStatusMap[row.feeStatus] || '-');
    // @ts-ignore
    [feeStatusType, feeStatusMap,];
    var __VLS_302;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_295;
let __VLS_305;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_306 = __VLS_asFunctionalComponent1(__VLS_305, new __VLS_305({
    prop: "contractNo",
    label: "合同",
    width: "120",
}));
const __VLS_307 = __VLS_306({
    prop: "contractNo",
    label: "合同",
    width: "120",
}, ...__VLS_functionalComponentArgsRest(__VLS_306));
let __VLS_310;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_311 = __VLS_asFunctionalComponent1(__VLS_310, new __VLS_310({
    label: "状态",
    width: "90",
}));
const __VLS_312 = __VLS_311({
    label: "状态",
    width: "90",
}, ...__VLS_functionalComponentArgsRest(__VLS_311));
const { default: __VLS_315 } = __VLS_313.slots;
{
    const { default: __VLS_316 } = __VLS_313.slots;
    const [{ row }] = __VLS_vSlot(__VLS_316);
    let __VLS_317;
    /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
    elTag;
    // @ts-ignore
    const __VLS_318 = __VLS_asFunctionalComponent1(__VLS_317, new __VLS_317({
        type: (__VLS_ctx.gStatusType[row.status] || 'info'),
        size: "small",
    }));
    const __VLS_319 = __VLS_318({
        type: (__VLS_ctx.gStatusType[row.status] || 'info'),
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_318));
    const { default: __VLS_322 } = __VLS_320.slots;
    (__VLS_ctx.gStatusMap[row.status] || row.status);
    // @ts-ignore
    [gStatusType, gStatusMap,];
    var __VLS_320;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_313;
let __VLS_323;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_324 = __VLS_asFunctionalComponent1(__VLS_323, new __VLS_323({
    label: "有效期",
    width: "180",
}));
const __VLS_325 = __VLS_324({
    label: "有效期",
    width: "180",
}, ...__VLS_functionalComponentArgsRest(__VLS_324));
const { default: __VLS_328 } = __VLS_326.slots;
{
    const { default: __VLS_329 } = __VLS_326.slots;
    const [{ row }] = __VLS_vSlot(__VLS_329);
    (row.startDate || '-');
    (row.endDate || '-');
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_326;
let __VLS_330;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_331 = __VLS_asFunctionalComponent1(__VLS_330, new __VLS_330({
    label: "操作",
    width: "280",
    fixed: "right",
}));
const __VLS_332 = __VLS_331({
    label: "操作",
    width: "280",
    fixed: "right",
}, ...__VLS_functionalComponentArgsRest(__VLS_331));
const { default: __VLS_335 } = __VLS_333.slots;
{
    const { default: __VLS_336 } = __VLS_333.slots;
    const [{ row }] = __VLS_vSlot(__VLS_336);
    let __VLS_337;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_338 = __VLS_asFunctionalComponent1(__VLS_337, new __VLS_337({
        ...{ 'onClick': {} },
        size: "small",
        icon: (__VLS_ctx.View),
    }));
    const __VLS_339 = __VLS_338({
        ...{ 'onClick': {} },
        size: "small",
        icon: (__VLS_ctx.View),
    }, ...__VLS_functionalComponentArgsRest(__VLS_338));
    let __VLS_342;
    const __VLS_343 = {
        /** @type {typeof __VLS_342.click} */
        onClick: (...[$event]) => {
            __VLS_ctx.showGDetail(row);
            // @ts-ignore
            [View, showGDetail,];
        },
    };
    const { default: __VLS_344 } = __VLS_340.slots;
    // @ts-ignore
    [];
    var __VLS_340;
    var __VLS_341;
    if (row.status === 'PENDING_SIGN' && __VLS_ctx.isGuarantee) {
        let __VLS_345;
        /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
        elButton;
        // @ts-ignore
        const __VLS_346 = __VLS_asFunctionalComponent1(__VLS_345, new __VLS_345({
            ...{ 'onClick': {} },
            size: "small",
            type: "warning",
            icon: (__VLS_ctx.Edit),
        }));
        const __VLS_347 = __VLS_346({
            ...{ 'onClick': {} },
            size: "small",
            type: "warning",
            icon: (__VLS_ctx.Edit),
        }, ...__VLS_functionalComponentArgsRest(__VLS_346));
        let __VLS_350;
        const __VLS_351 = {
            /** @type {typeof __VLS_350.click} */
            onClick: (...[$event]) => {
                if (!(row.status === 'PENDING_SIGN' && __VLS_ctx.isGuarantee))
                    return;
                __VLS_ctx.handleSign(row);
                // @ts-ignore
                [isGuarantee, Edit, handleSign,];
            },
        };
        const { default: __VLS_352 } = __VLS_348.slots;
        // @ts-ignore
        [];
        var __VLS_348;
        var __VLS_349;
    }
    if (row.status === 'ACTIVE' && __VLS_ctx.isGuarantee) {
        let __VLS_353;
        /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
        elButton;
        // @ts-ignore
        const __VLS_354 = __VLS_asFunctionalComponent1(__VLS_353, new __VLS_353({
            ...{ 'onClick': {} },
            size: "small",
            type: "primary",
            icon: (__VLS_ctx.Coin),
        }));
        const __VLS_355 = __VLS_354({
            ...{ 'onClick': {} },
            size: "small",
            type: "primary",
            icon: (__VLS_ctx.Coin),
        }, ...__VLS_functionalComponentArgsRest(__VLS_354));
        let __VLS_358;
        const __VLS_359 = {
            /** @type {typeof __VLS_358.click} */
            onClick: (...[$event]) => {
                if (!(row.status === 'ACTIVE' && __VLS_ctx.isGuarantee))
                    return;
                __VLS_ctx.handleCounter(row);
                // @ts-ignore
                [isGuarantee, Coin, handleCounter,];
            },
        };
        const { default: __VLS_360 } = __VLS_356.slots;
        // @ts-ignore
        [];
        var __VLS_356;
        var __VLS_357;
    }
    if (row.status === 'ACTIVE' && __VLS_ctx.isGuarantee) {
        let __VLS_361;
        /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
        elButton;
        // @ts-ignore
        const __VLS_362 = __VLS_asFunctionalComponent1(__VLS_361, new __VLS_361({
            ...{ 'onClick': {} },
            size: "small",
            type: "success",
            icon: (__VLS_ctx.CircleCheck),
        }));
        const __VLS_363 = __VLS_362({
            ...{ 'onClick': {} },
            size: "small",
            type: "success",
            icon: (__VLS_ctx.CircleCheck),
        }, ...__VLS_functionalComponentArgsRest(__VLS_362));
        let __VLS_366;
        const __VLS_367 = {
            /** @type {typeof __VLS_366.click} */
            onClick: (...[$event]) => {
                if (!(row.status === 'ACTIVE' && __VLS_ctx.isGuarantee))
                    return;
                __VLS_ctx.handleFee(row);
                // @ts-ignore
                [isGuarantee, CircleCheck, handleFee,];
            },
        };
        const { default: __VLS_368 } = __VLS_364.slots;
        // @ts-ignore
        [];
        var __VLS_364;
        var __VLS_365;
    }
    if (row.status === 'ACTIVE' && __VLS_ctx.isGuarantee) {
        let __VLS_369;
        /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
        elButton;
        // @ts-ignore
        const __VLS_370 = __VLS_asFunctionalComponent1(__VLS_369, new __VLS_369({
            ...{ 'onClick': {} },
            size: "small",
            type: "info",
            icon: (__VLS_ctx.Remove),
        }));
        const __VLS_371 = __VLS_370({
            ...{ 'onClick': {} },
            size: "small",
            type: "info",
            icon: (__VLS_ctx.Remove),
        }, ...__VLS_functionalComponentArgsRest(__VLS_370));
        let __VLS_374;
        const __VLS_375 = {
            /** @type {typeof __VLS_374.click} */
            onClick: (...[$event]) => {
                if (!(row.status === 'ACTIVE' && __VLS_ctx.isGuarantee))
                    return;
                __VLS_ctx.handleRelease(row);
                // @ts-ignore
                [isGuarantee, Remove, handleRelease,];
            },
        };
        const { default: __VLS_376 } = __VLS_372.slots;
        // @ts-ignore
        [];
        var __VLS_372;
        var __VLS_373;
    }
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_333;
// @ts-ignore
[];
var __VLS_242;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "pagination-wrap" },
});
/** @type {__VLS_StyleScopedClasses['pagination-wrap']} */ ;
let __VLS_377;
/** @ts-ignore @type { | typeof __VLS_components.elPagination | typeof __VLS_components.ElPagination | typeof __VLS_components['el-pagination']} */
elPagination;
// @ts-ignore
const __VLS_378 = __VLS_asFunctionalComponent1(__VLS_377, new __VLS_377({
    ...{ 'onCurrentChange': {} },
    currentPage: (__VLS_ctx.gPage),
    pageSize: (__VLS_ctx.gSize),
    total: (__VLS_ctx.gTotal),
    layout: "total, prev, pager, next",
    small: true,
}));
const __VLS_379 = __VLS_378({
    ...{ 'onCurrentChange': {} },
    currentPage: (__VLS_ctx.gPage),
    pageSize: (__VLS_ctx.gSize),
    total: (__VLS_ctx.gTotal),
    layout: "total, prev, pager, next",
    small: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_378));
let __VLS_382;
const __VLS_383 = {
    /** @type {typeof __VLS_382.currentChange} */
    onCurrentChange: (__VLS_ctx.loadGuarantees),
};
var __VLS_380;
var __VLS_381;
// @ts-ignore
[loadGuarantees, gPage, gSize, gTotal,];
var __VLS_236;
// @ts-ignore
[];
var __VLS_180;
// @ts-ignore
[];
var __VLS_3;
var __VLS_4;
let __VLS_384;
/** @ts-ignore @type { | typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog | typeof __VLS_components['el-dialog'] | typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog | typeof __VLS_components['el-dialog']} */
elDialog;
// @ts-ignore
const __VLS_385 = __VLS_asFunctionalComponent1(__VLS_384, new __VLS_384({
    modelValue: (__VLS_ctx.showAppCreateDialog),
    title: "新建担保申请",
    width: "520px",
}));
const __VLS_386 = __VLS_385({
    modelValue: (__VLS_ctx.showAppCreateDialog),
    title: "新建担保申请",
    width: "520px",
}, ...__VLS_functionalComponentArgsRest(__VLS_385));
const { default: __VLS_389 } = __VLS_387.slots;
let __VLS_390;
/** @ts-ignore @type { | typeof __VLS_components.elForm | typeof __VLS_components.ElForm | typeof __VLS_components['el-form'] | typeof __VLS_components.elForm | typeof __VLS_components.ElForm | typeof __VLS_components['el-form']} */
elForm;
// @ts-ignore
const __VLS_391 = __VLS_asFunctionalComponent1(__VLS_390, new __VLS_390({
    model: (__VLS_ctx.appForm),
    labelWidth: "120px",
}));
const __VLS_392 = __VLS_391({
    model: (__VLS_ctx.appForm),
    labelWidth: "120px",
}, ...__VLS_functionalComponentArgsRest(__VLS_391));
const { default: __VLS_395 } = __VLS_393.slots;
let __VLS_396;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_397 = __VLS_asFunctionalComponent1(__VLS_396, new __VLS_396({
    label: "关联贷款ID",
    required: true,
}));
const __VLS_398 = __VLS_397({
    label: "关联贷款ID",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_397));
const { default: __VLS_401 } = __VLS_399.slots;
let __VLS_402;
/** @ts-ignore @type { | typeof __VLS_components.elInputNumber | typeof __VLS_components.ElInputNumber | typeof __VLS_components['el-input-number']} */
elInputNumber;
// @ts-ignore
const __VLS_403 = __VLS_asFunctionalComponent1(__VLS_402, new __VLS_402({
    modelValue: (__VLS_ctx.appForm.loanApplicationId),
    min: (1),
    ...{ style: {} },
}));
const __VLS_404 = __VLS_403({
    modelValue: (__VLS_ctx.appForm.loanApplicationId),
    min: (1),
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_403));
// @ts-ignore
[showAppCreateDialog, appForm, appForm,];
var __VLS_399;
let __VLS_407;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_408 = __VLS_asFunctionalComponent1(__VLS_407, new __VLS_407({
    label: "申请人名称",
    required: true,
}));
const __VLS_409 = __VLS_408({
    label: "申请人名称",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_408));
const { default: __VLS_412 } = __VLS_410.slots;
let __VLS_413;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_414 = __VLS_asFunctionalComponent1(__VLS_413, new __VLS_413({
    modelValue: (__VLS_ctx.appForm.applicantName),
    placeholder: "担保申请人名称",
}));
const __VLS_415 = __VLS_414({
    modelValue: (__VLS_ctx.appForm.applicantName),
    placeholder: "担保申请人名称",
}, ...__VLS_functionalComponentArgsRest(__VLS_414));
// @ts-ignore
[appForm,];
var __VLS_410;
let __VLS_418;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_419 = __VLS_asFunctionalComponent1(__VLS_418, new __VLS_418({
    label: "担保类型",
    required: true,
}));
const __VLS_420 = __VLS_419({
    label: "担保类型",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_419));
const { default: __VLS_423 } = __VLS_421.slots;
let __VLS_424;
/** @ts-ignore @type { | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select'] | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select']} */
elSelect;
// @ts-ignore
const __VLS_425 = __VLS_asFunctionalComponent1(__VLS_424, new __VLS_424({
    modelValue: (__VLS_ctx.appForm.guaranteeType),
    ...{ style: {} },
}));
const __VLS_426 = __VLS_425({
    modelValue: (__VLS_ctx.appForm.guaranteeType),
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_425));
const { default: __VLS_429 } = __VLS_427.slots;
for (const [t] of __VLS_vFor((__VLS_ctx.gtypeOptions))) {
    let __VLS_430;
    /** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
    elOption;
    // @ts-ignore
    const __VLS_431 = __VLS_asFunctionalComponent1(__VLS_430, new __VLS_430({
        key: (t),
        label: (t),
        value: (t),
    }));
    const __VLS_432 = __VLS_431({
        key: (t),
        label: (t),
        value: (t),
    }, ...__VLS_functionalComponentArgsRest(__VLS_431));
    // @ts-ignore
    [appForm, gtypeOptions,];
}
// @ts-ignore
[];
var __VLS_427;
// @ts-ignore
[];
var __VLS_421;
let __VLS_435;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_436 = __VLS_asFunctionalComponent1(__VLS_435, new __VLS_435({
    label: "申请金额(元)",
    required: true,
}));
const __VLS_437 = __VLS_436({
    label: "申请金额(元)",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_436));
const { default: __VLS_440 } = __VLS_438.slots;
let __VLS_441;
/** @ts-ignore @type { | typeof __VLS_components.elInputNumber | typeof __VLS_components.ElInputNumber | typeof __VLS_components['el-input-number']} */
elInputNumber;
// @ts-ignore
const __VLS_442 = __VLS_asFunctionalComponent1(__VLS_441, new __VLS_441({
    modelValue: (__VLS_ctx.appForm.requestAmount),
    min: (0),
    step: (10000),
    ...{ style: {} },
}));
const __VLS_443 = __VLS_442({
    modelValue: (__VLS_ctx.appForm.requestAmount),
    min: (0),
    step: (10000),
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_442));
// @ts-ignore
[appForm,];
var __VLS_438;
let __VLS_446;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_447 = __VLS_asFunctionalComponent1(__VLS_446, new __VLS_446({
    label: "担保用途",
}));
const __VLS_448 = __VLS_447({
    label: "担保用途",
}, ...__VLS_functionalComponentArgsRest(__VLS_447));
const { default: __VLS_451 } = __VLS_449.slots;
let __VLS_452;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_453 = __VLS_asFunctionalComponent1(__VLS_452, new __VLS_452({
    modelValue: (__VLS_ctx.appForm.purpose),
    type: "textarea",
    rows: (3),
    placeholder: "担保资金用途",
}));
const __VLS_454 = __VLS_453({
    modelValue: (__VLS_ctx.appForm.purpose),
    type: "textarea",
    rows: (3),
    placeholder: "担保资金用途",
}, ...__VLS_functionalComponentArgsRest(__VLS_453));
// @ts-ignore
[appForm,];
var __VLS_449;
// @ts-ignore
[];
var __VLS_393;
{
    const { footer: __VLS_457 } = __VLS_387.slots;
    let __VLS_458;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_459 = __VLS_asFunctionalComponent1(__VLS_458, new __VLS_458({
        ...{ 'onClick': {} },
    }));
    const __VLS_460 = __VLS_459({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_459));
    let __VLS_463;
    const __VLS_464 = {
        /** @type {typeof __VLS_463.click} */
        onClick: (...[$event]) => {
            __VLS_ctx.showAppCreateDialog = false;
            // @ts-ignore
            [showAppCreateDialog,];
        },
    };
    const { default: __VLS_465 } = __VLS_461.slots;
    // @ts-ignore
    [];
    var __VLS_461;
    var __VLS_462;
    let __VLS_466;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_467 = __VLS_asFunctionalComponent1(__VLS_466, new __VLS_466({
        ...{ 'onClick': {} },
        type: "primary",
    }));
    const __VLS_468 = __VLS_467({
        ...{ 'onClick': {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_467));
    let __VLS_471;
    const __VLS_472 = {
        /** @type {typeof __VLS_471.click} */
        onClick: (__VLS_ctx.handleCreateApp),
    };
    const { default: __VLS_473 } = __VLS_469.slots;
    // @ts-ignore
    [handleCreateApp,];
    var __VLS_469;
    var __VLS_470;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_387;
let __VLS_474;
/** @ts-ignore @type { | typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog | typeof __VLS_components['el-dialog'] | typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog | typeof __VLS_components['el-dialog']} */
elDialog;
// @ts-ignore
const __VLS_475 = __VLS_asFunctionalComponent1(__VLS_474, new __VLS_474({
    modelValue: (__VLS_ctx.showAppDetailDialog),
    title: "担保申请详情",
    width: "600px",
}));
const __VLS_476 = __VLS_475({
    modelValue: (__VLS_ctx.showAppDetailDialog),
    title: "担保申请详情",
    width: "600px",
}, ...__VLS_functionalComponentArgsRest(__VLS_475));
const { default: __VLS_479 } = __VLS_477.slots;
if (__VLS_ctx.appDetail) {
    let __VLS_480;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptions | typeof __VLS_components.ElDescriptions | typeof __VLS_components['el-descriptions'] | typeof __VLS_components.elDescriptions | typeof __VLS_components.ElDescriptions | typeof __VLS_components['el-descriptions']} */
    elDescriptions;
    // @ts-ignore
    const __VLS_481 = __VLS_asFunctionalComponent1(__VLS_480, new __VLS_480({
        column: (2),
        border: true,
    }));
    const __VLS_482 = __VLS_481({
        column: (2),
        border: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_481));
    const { default: __VLS_485 } = __VLS_483.slots;
    let __VLS_486;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_487 = __VLS_asFunctionalComponent1(__VLS_486, new __VLS_486({
        label: "申请编号",
    }));
    const __VLS_488 = __VLS_487({
        label: "申请编号",
    }, ...__VLS_functionalComponentArgsRest(__VLS_487));
    const { default: __VLS_491 } = __VLS_489.slots;
    (__VLS_ctx.appDetail.appNo);
    // @ts-ignore
    [showAppDetailDialog, appDetail, appDetail,];
    var __VLS_489;
    let __VLS_492;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_493 = __VLS_asFunctionalComponent1(__VLS_492, new __VLS_492({
        label: "关联贷款",
    }));
    const __VLS_494 = __VLS_493({
        label: "关联贷款",
    }, ...__VLS_functionalComponentArgsRest(__VLS_493));
    const { default: __VLS_497 } = __VLS_495.slots;
    (__VLS_ctx.appDetail.loanApplicationId);
    // @ts-ignore
    [appDetail,];
    var __VLS_495;
    let __VLS_498;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_499 = __VLS_asFunctionalComponent1(__VLS_498, new __VLS_498({
        label: "申请人",
    }));
    const __VLS_500 = __VLS_499({
        label: "申请人",
    }, ...__VLS_functionalComponentArgsRest(__VLS_499));
    const { default: __VLS_503 } = __VLS_501.slots;
    (__VLS_ctx.appDetail.applicantName);
    // @ts-ignore
    [appDetail,];
    var __VLS_501;
    let __VLS_504;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_505 = __VLS_asFunctionalComponent1(__VLS_504, new __VLS_504({
        label: "担保类型",
    }));
    const __VLS_506 = __VLS_505({
        label: "担保类型",
    }, ...__VLS_functionalComponentArgsRest(__VLS_505));
    const { default: __VLS_509 } = __VLS_507.slots;
    (__VLS_ctx.appDetail.guaranteeType);
    // @ts-ignore
    [appDetail,];
    var __VLS_507;
    let __VLS_510;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_511 = __VLS_asFunctionalComponent1(__VLS_510, new __VLS_510({
        label: "申请金额",
    }));
    const __VLS_512 = __VLS_511({
        label: "申请金额",
    }, ...__VLS_functionalComponentArgsRest(__VLS_511));
    const { default: __VLS_515 } = __VLS_513.slots;
    (__VLS_ctx.appDetail.requestAmount?.toLocaleString());
    // @ts-ignore
    [appDetail,];
    var __VLS_513;
    let __VLS_516;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_517 = __VLS_asFunctionalComponent1(__VLS_516, new __VLS_516({
        label: "状态",
    }));
    const __VLS_518 = __VLS_517({
        label: "状态",
    }, ...__VLS_functionalComponentArgsRest(__VLS_517));
    const { default: __VLS_521 } = __VLS_519.slots;
    let __VLS_522;
    /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
    elTag;
    // @ts-ignore
    const __VLS_523 = __VLS_asFunctionalComponent1(__VLS_522, new __VLS_522({
        type: (__VLS_ctx.appStatusType[__VLS_ctx.appDetail.status] || 'info'),
    }));
    const __VLS_524 = __VLS_523({
        type: (__VLS_ctx.appStatusType[__VLS_ctx.appDetail.status] || 'info'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_523));
    const { default: __VLS_527 } = __VLS_525.slots;
    (__VLS_ctx.appStatusMap[__VLS_ctx.appDetail.status] || __VLS_ctx.appDetail.status);
    // @ts-ignore
    [appStatusType, appStatusMap, appDetail, appDetail, appDetail,];
    var __VLS_525;
    // @ts-ignore
    [];
    var __VLS_519;
    let __VLS_528;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_529 = __VLS_asFunctionalComponent1(__VLS_528, new __VLS_528({
        label: "用途",
        span: (2),
    }));
    const __VLS_530 = __VLS_529({
        label: "用途",
        span: (2),
    }, ...__VLS_functionalComponentArgsRest(__VLS_529));
    const { default: __VLS_533 } = __VLS_531.slots;
    (__VLS_ctx.appDetail.purpose || '-');
    // @ts-ignore
    [appDetail,];
    var __VLS_531;
    let __VLS_534;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_535 = __VLS_asFunctionalComponent1(__VLS_534, new __VLS_534({
        label: "提交时间",
    }));
    const __VLS_536 = __VLS_535({
        label: "提交时间",
    }, ...__VLS_functionalComponentArgsRest(__VLS_535));
    const { default: __VLS_539 } = __VLS_537.slots;
    (__VLS_ctx.appDetail.submitTime || '-');
    // @ts-ignore
    [appDetail,];
    var __VLS_537;
    let __VLS_540;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_541 = __VLS_asFunctionalComponent1(__VLS_540, new __VLS_540({
        label: "审核时间",
    }));
    const __VLS_542 = __VLS_541({
        label: "审核时间",
    }, ...__VLS_functionalComponentArgsRest(__VLS_541));
    const { default: __VLS_545 } = __VLS_543.slots;
    (__VLS_ctx.appDetail.reviewTime || '-');
    // @ts-ignore
    [appDetail,];
    var __VLS_543;
    let __VLS_546;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_547 = __VLS_asFunctionalComponent1(__VLS_546, new __VLS_546({
        label: "审核意见",
        span: (2),
    }));
    const __VLS_548 = __VLS_547({
        label: "审核意见",
        span: (2),
    }, ...__VLS_functionalComponentArgsRest(__VLS_547));
    const { default: __VLS_551 } = __VLS_549.slots;
    (__VLS_ctx.appDetail.reviewComment || '-');
    // @ts-ignore
    [appDetail,];
    var __VLS_549;
    let __VLS_552;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_553 = __VLS_asFunctionalComponent1(__VLS_552, new __VLS_552({
        label: "拒绝原因",
        span: (2),
    }));
    const __VLS_554 = __VLS_553({
        label: "拒绝原因",
        span: (2),
    }, ...__VLS_functionalComponentArgsRest(__VLS_553));
    const { default: __VLS_557 } = __VLS_555.slots;
    (__VLS_ctx.appDetail.rejectionReason || '-');
    // @ts-ignore
    [appDetail,];
    var __VLS_555;
    // @ts-ignore
    [];
    var __VLS_483;
}
// @ts-ignore
[];
var __VLS_477;
let __VLS_558;
/** @ts-ignore @type { | typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog | typeof __VLS_components['el-dialog'] | typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog | typeof __VLS_components['el-dialog']} */
elDialog;
// @ts-ignore
const __VLS_559 = __VLS_asFunctionalComponent1(__VLS_558, new __VLS_558({
    modelValue: (__VLS_ctx.showSignDialog),
    title: "担保签约",
    width: "450px",
}));
const __VLS_560 = __VLS_559({
    modelValue: (__VLS_ctx.showSignDialog),
    title: "担保签约",
    width: "450px",
}, ...__VLS_functionalComponentArgsRest(__VLS_559));
const { default: __VLS_563 } = __VLS_561.slots;
let __VLS_564;
/** @ts-ignore @type { | typeof __VLS_components.elForm | typeof __VLS_components.ElForm | typeof __VLS_components['el-form'] | typeof __VLS_components.elForm | typeof __VLS_components.ElForm | typeof __VLS_components['el-form']} */
elForm;
// @ts-ignore
const __VLS_565 = __VLS_asFunctionalComponent1(__VLS_564, new __VLS_564({
    labelWidth: "120px",
}));
const __VLS_566 = __VLS_565({
    labelWidth: "120px",
}, ...__VLS_functionalComponentArgsRest(__VLS_565));
const { default: __VLS_569 } = __VLS_567.slots;
let __VLS_570;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_571 = __VLS_asFunctionalComponent1(__VLS_570, new __VLS_570({
    label: "合同编号",
    required: true,
}));
const __VLS_572 = __VLS_571({
    label: "合同编号",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_571));
const { default: __VLS_575 } = __VLS_573.slots;
let __VLS_576;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_577 = __VLS_asFunctionalComponent1(__VLS_576, new __VLS_576({
    modelValue: (__VLS_ctx.signContractNo),
    placeholder: "输入担保合同编号",
}));
const __VLS_578 = __VLS_577({
    modelValue: (__VLS_ctx.signContractNo),
    placeholder: "输入担保合同编号",
}, ...__VLS_functionalComponentArgsRest(__VLS_577));
// @ts-ignore
[showSignDialog, signContractNo,];
var __VLS_573;
// @ts-ignore
[];
var __VLS_567;
{
    const { footer: __VLS_581 } = __VLS_561.slots;
    let __VLS_582;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_583 = __VLS_asFunctionalComponent1(__VLS_582, new __VLS_582({
        ...{ 'onClick': {} },
    }));
    const __VLS_584 = __VLS_583({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_583));
    let __VLS_587;
    const __VLS_588 = {
        /** @type {typeof __VLS_587.click} */
        onClick: (...[$event]) => {
            __VLS_ctx.showSignDialog = false;
            // @ts-ignore
            [showSignDialog,];
        },
    };
    const { default: __VLS_589 } = __VLS_585.slots;
    // @ts-ignore
    [];
    var __VLS_585;
    var __VLS_586;
    let __VLS_590;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_591 = __VLS_asFunctionalComponent1(__VLS_590, new __VLS_590({
        ...{ 'onClick': {} },
        type: "primary",
    }));
    const __VLS_592 = __VLS_591({
        ...{ 'onClick': {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_591));
    let __VLS_595;
    const __VLS_596 = {
        /** @type {typeof __VLS_595.click} */
        onClick: (__VLS_ctx.confirmSign),
    };
    const { default: __VLS_597 } = __VLS_593.slots;
    // @ts-ignore
    [confirmSign,];
    var __VLS_593;
    var __VLS_594;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_561;
let __VLS_598;
/** @ts-ignore @type { | typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog | typeof __VLS_components['el-dialog'] | typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog | typeof __VLS_components['el-dialog']} */
elDialog;
// @ts-ignore
const __VLS_599 = __VLS_asFunctionalComponent1(__VLS_598, new __VLS_598({
    modelValue: (__VLS_ctx.showCounterDialog),
    title: "登记反担保",
    width: "450px",
}));
const __VLS_600 = __VLS_599({
    modelValue: (__VLS_ctx.showCounterDialog),
    title: "登记反担保",
    width: "450px",
}, ...__VLS_functionalComponentArgsRest(__VLS_599));
const { default: __VLS_603 } = __VLS_601.slots;
let __VLS_604;
/** @ts-ignore @type { | typeof __VLS_components.elForm | typeof __VLS_components.ElForm | typeof __VLS_components['el-form'] | typeof __VLS_components.elForm | typeof __VLS_components.ElForm | typeof __VLS_components['el-form']} */
elForm;
// @ts-ignore
const __VLS_605 = __VLS_asFunctionalComponent1(__VLS_604, new __VLS_604({
    model: (__VLS_ctx.counterForm),
    labelWidth: "120px",
}));
const __VLS_606 = __VLS_605({
    model: (__VLS_ctx.counterForm),
    labelWidth: "120px",
}, ...__VLS_functionalComponentArgsRest(__VLS_605));
const { default: __VLS_609 } = __VLS_607.slots;
let __VLS_610;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_611 = __VLS_asFunctionalComponent1(__VLS_610, new __VLS_610({
    label: "反担保类型",
    required: true,
}));
const __VLS_612 = __VLS_611({
    label: "反担保类型",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_611));
const { default: __VLS_615 } = __VLS_613.slots;
let __VLS_616;
/** @ts-ignore @type { | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select'] | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select']} */
elSelect;
// @ts-ignore
const __VLS_617 = __VLS_asFunctionalComponent1(__VLS_616, new __VLS_616({
    modelValue: (__VLS_ctx.counterForm.counterGuaranteeType),
    ...{ style: {} },
}));
const __VLS_618 = __VLS_617({
    modelValue: (__VLS_ctx.counterForm.counterGuaranteeType),
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_617));
const { default: __VLS_621 } = __VLS_619.slots;
for (const [t] of __VLS_vFor((__VLS_ctx.cgtypeOptions))) {
    let __VLS_622;
    /** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
    elOption;
    // @ts-ignore
    const __VLS_623 = __VLS_asFunctionalComponent1(__VLS_622, new __VLS_622({
        key: (t),
        label: (t),
        value: (t),
    }));
    const __VLS_624 = __VLS_623({
        key: (t),
        label: (t),
        value: (t),
    }, ...__VLS_functionalComponentArgsRest(__VLS_623));
    // @ts-ignore
    [showCounterDialog, counterForm, counterForm, cgtypeOptions,];
}
// @ts-ignore
[];
var __VLS_619;
// @ts-ignore
[];
var __VLS_613;
let __VLS_627;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_628 = __VLS_asFunctionalComponent1(__VLS_627, new __VLS_627({
    label: "描述",
    required: true,
}));
const __VLS_629 = __VLS_628({
    label: "描述",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_628));
const { default: __VLS_632 } = __VLS_630.slots;
let __VLS_633;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_634 = __VLS_asFunctionalComponent1(__VLS_633, new __VLS_633({
    modelValue: (__VLS_ctx.counterForm.counterGuaranteeDesc),
    type: "textarea",
    rows: (3),
    placeholder: "反担保资产描述",
}));
const __VLS_635 = __VLS_634({
    modelValue: (__VLS_ctx.counterForm.counterGuaranteeDesc),
    type: "textarea",
    rows: (3),
    placeholder: "反担保资产描述",
}, ...__VLS_functionalComponentArgsRest(__VLS_634));
// @ts-ignore
[counterForm,];
var __VLS_630;
let __VLS_638;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_639 = __VLS_asFunctionalComponent1(__VLS_638, new __VLS_638({
    label: "价值(元)",
    required: true,
}));
const __VLS_640 = __VLS_639({
    label: "价值(元)",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_639));
const { default: __VLS_643 } = __VLS_641.slots;
let __VLS_644;
/** @ts-ignore @type { | typeof __VLS_components.elInputNumber | typeof __VLS_components.ElInputNumber | typeof __VLS_components['el-input-number']} */
elInputNumber;
// @ts-ignore
const __VLS_645 = __VLS_asFunctionalComponent1(__VLS_644, new __VLS_644({
    modelValue: (__VLS_ctx.counterForm.counterGuaranteeValue),
    min: (0),
    step: (10000),
    ...{ style: {} },
}));
const __VLS_646 = __VLS_645({
    modelValue: (__VLS_ctx.counterForm.counterGuaranteeValue),
    min: (0),
    step: (10000),
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_645));
// @ts-ignore
[counterForm,];
var __VLS_641;
// @ts-ignore
[];
var __VLS_607;
{
    const { footer: __VLS_649 } = __VLS_601.slots;
    let __VLS_650;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_651 = __VLS_asFunctionalComponent1(__VLS_650, new __VLS_650({
        ...{ 'onClick': {} },
    }));
    const __VLS_652 = __VLS_651({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_651));
    let __VLS_655;
    const __VLS_656 = {
        /** @type {typeof __VLS_655.click} */
        onClick: (...[$event]) => {
            __VLS_ctx.showCounterDialog = false;
            // @ts-ignore
            [showCounterDialog,];
        },
    };
    const { default: __VLS_657 } = __VLS_653.slots;
    // @ts-ignore
    [];
    var __VLS_653;
    var __VLS_654;
    let __VLS_658;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_659 = __VLS_asFunctionalComponent1(__VLS_658, new __VLS_658({
        ...{ 'onClick': {} },
        type: "primary",
    }));
    const __VLS_660 = __VLS_659({
        ...{ 'onClick': {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_659));
    let __VLS_663;
    const __VLS_664 = {
        /** @type {typeof __VLS_663.click} */
        onClick: (__VLS_ctx.confirmCounter),
    };
    const { default: __VLS_665 } = __VLS_661.slots;
    // @ts-ignore
    [confirmCounter,];
    var __VLS_661;
    var __VLS_662;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_601;
let __VLS_666;
/** @ts-ignore @type { | typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog | typeof __VLS_components['el-dialog'] | typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog | typeof __VLS_components['el-dialog']} */
elDialog;
// @ts-ignore
const __VLS_667 = __VLS_asFunctionalComponent1(__VLS_666, new __VLS_666({
    modelValue: (__VLS_ctx.showFeeDialog),
    title: "支付担保费",
    width: "450px",
}));
const __VLS_668 = __VLS_667({
    modelValue: (__VLS_ctx.showFeeDialog),
    title: "支付担保费",
    width: "450px",
}, ...__VLS_functionalComponentArgsRest(__VLS_667));
const { default: __VLS_671 } = __VLS_669.slots;
if (__VLS_ctx.feeCalcResult > 0) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ style: {} },
    });
    (__VLS_ctx.feeCalcResult?.toLocaleString?.() || __VLS_ctx.feeCalcResult);
}
let __VLS_672;
/** @ts-ignore @type { | typeof __VLS_components.elForm | typeof __VLS_components.ElForm | typeof __VLS_components['el-form'] | typeof __VLS_components.elForm | typeof __VLS_components.ElForm | typeof __VLS_components['el-form']} */
elForm;
// @ts-ignore
const __VLS_673 = __VLS_asFunctionalComponent1(__VLS_672, new __VLS_672({
    labelWidth: "120px",
}));
const __VLS_674 = __VLS_673({
    labelWidth: "120px",
}, ...__VLS_functionalComponentArgsRest(__VLS_673));
const { default: __VLS_677 } = __VLS_675.slots;
let __VLS_678;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_679 = __VLS_asFunctionalComponent1(__VLS_678, new __VLS_678({
    label: "支付金额(元)",
    required: true,
}));
const __VLS_680 = __VLS_679({
    label: "支付金额(元)",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_679));
const { default: __VLS_683 } = __VLS_681.slots;
let __VLS_684;
/** @ts-ignore @type { | typeof __VLS_components.elInputNumber | typeof __VLS_components.ElInputNumber | typeof __VLS_components['el-input-number']} */
elInputNumber;
// @ts-ignore
const __VLS_685 = __VLS_asFunctionalComponent1(__VLS_684, new __VLS_684({
    modelValue: (__VLS_ctx.feeAmount),
    min: (0),
    step: (1000),
    ...{ style: {} },
}));
const __VLS_686 = __VLS_685({
    modelValue: (__VLS_ctx.feeAmount),
    min: (0),
    step: (1000),
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_685));
// @ts-ignore
[showFeeDialog, feeCalcResult, feeCalcResult, feeCalcResult, feeAmount,];
var __VLS_681;
// @ts-ignore
[];
var __VLS_675;
{
    const { footer: __VLS_689 } = __VLS_669.slots;
    let __VLS_690;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_691 = __VLS_asFunctionalComponent1(__VLS_690, new __VLS_690({
        ...{ 'onClick': {} },
    }));
    const __VLS_692 = __VLS_691({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_691));
    let __VLS_695;
    const __VLS_696 = {
        /** @type {typeof __VLS_695.click} */
        onClick: (...[$event]) => {
            __VLS_ctx.showFeeDialog = false;
            // @ts-ignore
            [showFeeDialog,];
        },
    };
    const { default: __VLS_697 } = __VLS_693.slots;
    // @ts-ignore
    [];
    var __VLS_693;
    var __VLS_694;
    let __VLS_698;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_699 = __VLS_asFunctionalComponent1(__VLS_698, new __VLS_698({
        ...{ 'onClick': {} },
        type: "primary",
    }));
    const __VLS_700 = __VLS_699({
        ...{ 'onClick': {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_699));
    let __VLS_703;
    const __VLS_704 = {
        /** @type {typeof __VLS_703.click} */
        onClick: (__VLS_ctx.confirmFee),
    };
    const { default: __VLS_705 } = __VLS_701.slots;
    // @ts-ignore
    [confirmFee,];
    var __VLS_701;
    var __VLS_702;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_669;
let __VLS_706;
/** @ts-ignore @type { | typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog | typeof __VLS_components['el-dialog'] | typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog | typeof __VLS_components['el-dialog']} */
elDialog;
// @ts-ignore
const __VLS_707 = __VLS_asFunctionalComponent1(__VLS_706, new __VLS_706({
    modelValue: (__VLS_ctx.showReleaseDialog),
    title: "释放担保",
    width: "450px",
}));
const __VLS_708 = __VLS_707({
    modelValue: (__VLS_ctx.showReleaseDialog),
    title: "释放担保",
    width: "450px",
}, ...__VLS_functionalComponentArgsRest(__VLS_707));
const { default: __VLS_711 } = __VLS_709.slots;
let __VLS_712;
/** @ts-ignore @type { | typeof __VLS_components.elForm | typeof __VLS_components.ElForm | typeof __VLS_components['el-form'] | typeof __VLS_components.elForm | typeof __VLS_components.ElForm | typeof __VLS_components['el-form']} */
elForm;
// @ts-ignore
const __VLS_713 = __VLS_asFunctionalComponent1(__VLS_712, new __VLS_712({
    labelWidth: "120px",
}));
const __VLS_714 = __VLS_713({
    labelWidth: "120px",
}, ...__VLS_functionalComponentArgsRest(__VLS_713));
const { default: __VLS_717 } = __VLS_715.slots;
let __VLS_718;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_719 = __VLS_asFunctionalComponent1(__VLS_718, new __VLS_718({
    label: "释放原因",
}));
const __VLS_720 = __VLS_719({
    label: "释放原因",
}, ...__VLS_functionalComponentArgsRest(__VLS_719));
const { default: __VLS_723 } = __VLS_721.slots;
let __VLS_724;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_725 = __VLS_asFunctionalComponent1(__VLS_724, new __VLS_724({
    modelValue: (__VLS_ctx.releaseReason),
    type: "textarea",
    rows: (3),
    placeholder: "输入释放原因",
}));
const __VLS_726 = __VLS_725({
    modelValue: (__VLS_ctx.releaseReason),
    type: "textarea",
    rows: (3),
    placeholder: "输入释放原因",
}, ...__VLS_functionalComponentArgsRest(__VLS_725));
// @ts-ignore
[showReleaseDialog, releaseReason,];
var __VLS_721;
// @ts-ignore
[];
var __VLS_715;
{
    const { footer: __VLS_729 } = __VLS_709.slots;
    let __VLS_730;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_731 = __VLS_asFunctionalComponent1(__VLS_730, new __VLS_730({
        ...{ 'onClick': {} },
    }));
    const __VLS_732 = __VLS_731({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_731));
    let __VLS_735;
    const __VLS_736 = {
        /** @type {typeof __VLS_735.click} */
        onClick: (...[$event]) => {
            __VLS_ctx.showReleaseDialog = false;
            // @ts-ignore
            [showReleaseDialog,];
        },
    };
    const { default: __VLS_737 } = __VLS_733.slots;
    // @ts-ignore
    [];
    var __VLS_733;
    var __VLS_734;
    let __VLS_738;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_739 = __VLS_asFunctionalComponent1(__VLS_738, new __VLS_738({
        ...{ 'onClick': {} },
        type: "primary",
    }));
    const __VLS_740 = __VLS_739({
        ...{ 'onClick': {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_739));
    let __VLS_743;
    const __VLS_744 = {
        /** @type {typeof __VLS_743.click} */
        onClick: (__VLS_ctx.confirmRelease),
    };
    const { default: __VLS_745 } = __VLS_741.slots;
    // @ts-ignore
    [confirmRelease,];
    var __VLS_741;
    var __VLS_742;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_709;
let __VLS_746;
/** @ts-ignore @type { | typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog | typeof __VLS_components['el-dialog'] | typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog | typeof __VLS_components['el-dialog']} */
elDialog;
// @ts-ignore
const __VLS_747 = __VLS_asFunctionalComponent1(__VLS_746, new __VLS_746({
    modelValue: (__VLS_ctx.showGDetailDialog),
    title: "担保详情",
    width: "700px",
}));
const __VLS_748 = __VLS_747({
    modelValue: (__VLS_ctx.showGDetailDialog),
    title: "担保详情",
    width: "700px",
}, ...__VLS_functionalComponentArgsRest(__VLS_747));
const { default: __VLS_751 } = __VLS_749.slots;
if (__VLS_ctx.gDetail) {
    let __VLS_752;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptions | typeof __VLS_components.ElDescriptions | typeof __VLS_components['el-descriptions'] | typeof __VLS_components.elDescriptions | typeof __VLS_components.ElDescriptions | typeof __VLS_components['el-descriptions']} */
    elDescriptions;
    // @ts-ignore
    const __VLS_753 = __VLS_asFunctionalComponent1(__VLS_752, new __VLS_752({
        column: (2),
        border: true,
        size: "small",
    }));
    const __VLS_754 = __VLS_753({
        column: (2),
        border: true,
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_753));
    const { default: __VLS_757 } = __VLS_755.slots;
    let __VLS_758;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_759 = __VLS_asFunctionalComponent1(__VLS_758, new __VLS_758({
        label: "担保编号",
    }));
    const __VLS_760 = __VLS_759({
        label: "担保编号",
    }, ...__VLS_functionalComponentArgsRest(__VLS_759));
    const { default: __VLS_763 } = __VLS_761.slots;
    (__VLS_ctx.gDetail.guaranteeNo);
    // @ts-ignore
    [showGDetailDialog, gDetail, gDetail,];
    var __VLS_761;
    let __VLS_764;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_765 = __VLS_asFunctionalComponent1(__VLS_764, new __VLS_764({
        label: "关联贷款",
    }));
    const __VLS_766 = __VLS_765({
        label: "关联贷款",
    }, ...__VLS_functionalComponentArgsRest(__VLS_765));
    const { default: __VLS_769 } = __VLS_767.slots;
    (__VLS_ctx.gDetail.loanApplicationId);
    // @ts-ignore
    [gDetail,];
    var __VLS_767;
    let __VLS_770;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_771 = __VLS_asFunctionalComponent1(__VLS_770, new __VLS_770({
        label: "担保人",
    }));
    const __VLS_772 = __VLS_771({
        label: "担保人",
    }, ...__VLS_functionalComponentArgsRest(__VLS_771));
    const { default: __VLS_775 } = __VLS_773.slots;
    (__VLS_ctx.gDetail.guarantorName);
    // @ts-ignore
    [gDetail,];
    var __VLS_773;
    let __VLS_776;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_777 = __VLS_asFunctionalComponent1(__VLS_776, new __VLS_776({
        label: "担保类型",
    }));
    const __VLS_778 = __VLS_777({
        label: "担保类型",
    }, ...__VLS_functionalComponentArgsRest(__VLS_777));
    const { default: __VLS_781 } = __VLS_779.slots;
    (__VLS_ctx.gDetail.guaranteeType);
    // @ts-ignore
    [gDetail,];
    var __VLS_779;
    let __VLS_782;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_783 = __VLS_asFunctionalComponent1(__VLS_782, new __VLS_782({
        label: "担保金额",
    }));
    const __VLS_784 = __VLS_783({
        label: "担保金额",
    }, ...__VLS_functionalComponentArgsRest(__VLS_783));
    const { default: __VLS_787 } = __VLS_785.slots;
    (__VLS_ctx.gDetail.guaranteeAmount?.toLocaleString());
    // @ts-ignore
    [gDetail,];
    var __VLS_785;
    let __VLS_788;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_789 = __VLS_asFunctionalComponent1(__VLS_788, new __VLS_788({
        label: "担保比例",
    }));
    const __VLS_790 = __VLS_789({
        label: "担保比例",
    }, ...__VLS_functionalComponentArgsRest(__VLS_789));
    const { default: __VLS_793 } = __VLS_791.slots;
    (__VLS_ctx.gDetail.guaranteeRatio ? (__VLS_ctx.gDetail.guaranteeRatio * 100).toFixed(1) + '%' : '-');
    // @ts-ignore
    [gDetail, gDetail,];
    var __VLS_791;
    let __VLS_794;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_795 = __VLS_asFunctionalComponent1(__VLS_794, new __VLS_794({
        label: "合同编号",
    }));
    const __VLS_796 = __VLS_795({
        label: "合同编号",
    }, ...__VLS_functionalComponentArgsRest(__VLS_795));
    const { default: __VLS_799 } = __VLS_797.slots;
    (__VLS_ctx.gDetail.contractNo || '-');
    // @ts-ignore
    [gDetail,];
    var __VLS_797;
    let __VLS_800;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_801 = __VLS_asFunctionalComponent1(__VLS_800, new __VLS_800({
        label: "签约日期",
    }));
    const __VLS_802 = __VLS_801({
        label: "签约日期",
    }, ...__VLS_functionalComponentArgsRest(__VLS_801));
    const { default: __VLS_805 } = __VLS_803.slots;
    (__VLS_ctx.gDetail.signedDate || '-');
    // @ts-ignore
    [gDetail,];
    var __VLS_803;
    let __VLS_806;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_807 = __VLS_asFunctionalComponent1(__VLS_806, new __VLS_806({
        label: "有效期",
    }));
    const __VLS_808 = __VLS_807({
        label: "有效期",
    }, ...__VLS_functionalComponentArgsRest(__VLS_807));
    const { default: __VLS_811 } = __VLS_809.slots;
    (__VLS_ctx.gDetail.startDate || '-');
    (__VLS_ctx.gDetail.endDate || '-');
    // @ts-ignore
    [gDetail, gDetail,];
    var __VLS_809;
    let __VLS_812;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_813 = __VLS_asFunctionalComponent1(__VLS_812, new __VLS_812({
        label: "状态",
    }));
    const __VLS_814 = __VLS_813({
        label: "状态",
    }, ...__VLS_functionalComponentArgsRest(__VLS_813));
    const { default: __VLS_817 } = __VLS_815.slots;
    let __VLS_818;
    /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
    elTag;
    // @ts-ignore
    const __VLS_819 = __VLS_asFunctionalComponent1(__VLS_818, new __VLS_818({
        type: (__VLS_ctx.gStatusType[__VLS_ctx.gDetail.status] || 'info'),
    }));
    const __VLS_820 = __VLS_819({
        type: (__VLS_ctx.gStatusType[__VLS_ctx.gDetail.status] || 'info'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_819));
    const { default: __VLS_823 } = __VLS_821.slots;
    (__VLS_ctx.gStatusMap[__VLS_ctx.gDetail.status] || __VLS_ctx.gDetail.status);
    // @ts-ignore
    [gStatusType, gStatusMap, gDetail, gDetail, gDetail,];
    var __VLS_821;
    // @ts-ignore
    [];
    var __VLS_815;
    let __VLS_824;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_825 = __VLS_asFunctionalComponent1(__VLS_824, new __VLS_824({
        label: "反担保类型",
    }));
    const __VLS_826 = __VLS_825({
        label: "反担保类型",
    }, ...__VLS_functionalComponentArgsRest(__VLS_825));
    const { default: __VLS_829 } = __VLS_827.slots;
    (__VLS_ctx.gDetail.counterGuaranteeType || '-');
    // @ts-ignore
    [gDetail,];
    var __VLS_827;
    let __VLS_830;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_831 = __VLS_asFunctionalComponent1(__VLS_830, new __VLS_830({
        label: "反担保价值",
    }));
    const __VLS_832 = __VLS_831({
        label: "反担保价值",
    }, ...__VLS_functionalComponentArgsRest(__VLS_831));
    const { default: __VLS_835 } = __VLS_833.slots;
    (__VLS_ctx.gDetail.counterGuaranteeValue?.toLocaleString() || '-');
    // @ts-ignore
    [gDetail,];
    var __VLS_833;
    let __VLS_836;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_837 = __VLS_asFunctionalComponent1(__VLS_836, new __VLS_836({
        label: "反担保状态",
    }));
    const __VLS_838 = __VLS_837({
        label: "反担保状态",
    }, ...__VLS_functionalComponentArgsRest(__VLS_837));
    const { default: __VLS_841 } = __VLS_839.slots;
    let __VLS_842;
    /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
    elTag;
    // @ts-ignore
    const __VLS_843 = __VLS_asFunctionalComponent1(__VLS_842, new __VLS_842({
        type: (__VLS_ctx.cgStatusType[__VLS_ctx.gDetail.counterGuaranteeStatus] || 'info'),
        size: "small",
    }));
    const __VLS_844 = __VLS_843({
        type: (__VLS_ctx.cgStatusType[__VLS_ctx.gDetail.counterGuaranteeStatus] || 'info'),
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_843));
    const { default: __VLS_847 } = __VLS_845.slots;
    (__VLS_ctx.cgStatusMap[__VLS_ctx.gDetail.counterGuaranteeStatus] || '-');
    // @ts-ignore
    [cgStatusType, cgStatusMap, gDetail, gDetail,];
    var __VLS_845;
    // @ts-ignore
    [];
    var __VLS_839;
    let __VLS_848;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_849 = __VLS_asFunctionalComponent1(__VLS_848, new __VLS_848({
        label: "担保费率",
    }));
    const __VLS_850 = __VLS_849({
        label: "担保费率",
    }, ...__VLS_functionalComponentArgsRest(__VLS_849));
    const { default: __VLS_853 } = __VLS_851.slots;
    (__VLS_ctx.gDetail.feeRate ? __VLS_ctx.gDetail.feeRate + '%' : '-');
    // @ts-ignore
    [gDetail, gDetail,];
    var __VLS_851;
    let __VLS_854;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_855 = __VLS_asFunctionalComponent1(__VLS_854, new __VLS_854({
        label: "担保费状态",
    }));
    const __VLS_856 = __VLS_855({
        label: "担保费状态",
    }, ...__VLS_functionalComponentArgsRest(__VLS_855));
    const { default: __VLS_859 } = __VLS_857.slots;
    let __VLS_860;
    /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
    elTag;
    // @ts-ignore
    const __VLS_861 = __VLS_asFunctionalComponent1(__VLS_860, new __VLS_860({
        type: (__VLS_ctx.feeStatusType[__VLS_ctx.gDetail.feeStatus] || 'info'),
        size: "small",
    }));
    const __VLS_862 = __VLS_861({
        type: (__VLS_ctx.feeStatusType[__VLS_ctx.gDetail.feeStatus] || 'info'),
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_861));
    const { default: __VLS_865 } = __VLS_863.slots;
    (__VLS_ctx.feeStatusMap[__VLS_ctx.gDetail.feeStatus] || '-');
    // @ts-ignore
    [feeStatusType, feeStatusMap, gDetail, gDetail,];
    var __VLS_863;
    // @ts-ignore
    [];
    var __VLS_857;
    let __VLS_866;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_867 = __VLS_asFunctionalComponent1(__VLS_866, new __VLS_866({
        label: "担保费金额",
    }));
    const __VLS_868 = __VLS_867({
        label: "担保费金额",
    }, ...__VLS_functionalComponentArgsRest(__VLS_867));
    const { default: __VLS_871 } = __VLS_869.slots;
    (__VLS_ctx.gDetail.feeAmount?.toLocaleString() || 0);
    // @ts-ignore
    [gDetail,];
    var __VLS_869;
    let __VLS_872;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_873 = __VLS_asFunctionalComponent1(__VLS_872, new __VLS_872({
        label: "已付金额",
    }));
    const __VLS_874 = __VLS_873({
        label: "已付金额",
    }, ...__VLS_functionalComponentArgsRest(__VLS_873));
    const { default: __VLS_877 } = __VLS_875.slots;
    (__VLS_ctx.gDetail.feePaid?.toLocaleString() || 0);
    // @ts-ignore
    [gDetail,];
    var __VLS_875;
    let __VLS_878;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_879 = __VLS_asFunctionalComponent1(__VLS_878, new __VLS_878({
        label: "风险等级",
    }));
    const __VLS_880 = __VLS_879({
        label: "风险等级",
    }, ...__VLS_functionalComponentArgsRest(__VLS_879));
    const { default: __VLS_883 } = __VLS_881.slots;
    (__VLS_ctx.gDetail.riskLevel || '-');
    // @ts-ignore
    [gDetail,];
    var __VLS_881;
    let __VLS_884;
    /** @ts-ignore @type { | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item'] | typeof __VLS_components.elDescriptionsItem | typeof __VLS_components.ElDescriptionsItem | typeof __VLS_components['el-descriptions-item']} */
    elDescriptionsItem;
    // @ts-ignore
    const __VLS_885 = __VLS_asFunctionalComponent1(__VLS_884, new __VLS_884({
        label: "备注",
        span: (2),
    }));
    const __VLS_886 = __VLS_885({
        label: "备注",
        span: (2),
    }, ...__VLS_functionalComponentArgsRest(__VLS_885));
    const { default: __VLS_889 } = __VLS_887.slots;
    (__VLS_ctx.gDetail.remark || '-');
    // @ts-ignore
    [gDetail,];
    var __VLS_887;
    // @ts-ignore
    [];
    var __VLS_755;
}
// @ts-ignore
[];
var __VLS_749;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
