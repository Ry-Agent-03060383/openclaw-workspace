/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, onMounted, computed } from 'vue';
import { useUserStore } from '../../store/user';
import { getServices, getUserSubscriptions, createSubscription, paySubscription, cancelSubscription, renewSubscription, createService, } from '../../api/subscription';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Plus, CreditCard, Delete, Refresh } from '@element-plus/icons-vue';
const userStore = useUserStore();
const isAdmin = computed(() => userStore.userType === 'ADMIN');
const activeTab = ref('market');
// 服务市场
const services = ref([]);
const servicesLoading = ref(false);
// 我的订阅
const subscriptions = ref([]);
const subsLoading = ref(false);
// 新建服务
const showCreateServiceDialog = ref(false);
const serviceForm = ref({
    name: '',
    description: '',
    price: 0,
    durationMonths: 1,
});
// 搜索
const searchKeyword = ref('');
const page = ref(1);
const pageSize = ref(10);
const statusMap = {
    ACTIVE: '已订阅',
    EXPIRED: '已过期',
    CANCELLED: '已取消',
    PENDING_PAYMENT: '待支付',
};
const statusType = {
    ACTIVE: 'success',
    EXPIRED: 'info',
    CANCELLED: 'danger',
    PENDING_PAYMENT: 'warning',
};
onMounted(async () => {
    await loadServices();
    await loadSubscriptions();
});
async function loadServices() {
    servicesLoading.value = true;
    try {
        const res = await getServices();
        if (res?.code === 200) {
            services.value = Array.isArray(res.data) ? res.data : (res.data?.records || []);
        }
    }
    catch {
        services.value = [];
    }
    servicesLoading.value = false;
}
async function loadSubscriptions() {
    subsLoading.value = true;
    try {
        const res = await getUserSubscriptions();
        if (res?.code === 200) {
            subscriptions.value = Array.isArray(res.data) ? res.data : (res.data?.records || []);
        }
    }
    catch {
        subscriptions.value = [];
    }
    subsLoading.value = false;
}
const filteredServices = computed(() => {
    if (!searchKeyword.value)
        return services.value;
    const kw = searchKeyword.value.toLowerCase();
    return services.value.filter((s) => (s.name && s.name.toLowerCase().includes(kw)) ||
        (s.description && s.description.toLowerCase().includes(kw)));
});
const pagedServices = computed(() => {
    const start = (page.value - 1) * pageSize.value;
    return filteredServices.value.slice(start, start + pageSize.value);
});
const filteredSubscriptions = computed(() => {
    if (!searchKeyword.value)
        return subscriptions.value;
    const kw = searchKeyword.value.toLowerCase();
    return subscriptions.value.filter((s) => (s.serviceName && s.serviceName.toLowerCase().includes(kw)) ||
        (s.name && s.name.toLowerCase().includes(kw)));
});
const pagedSubscriptions = computed(() => {
    const start = (page.value - 1) * pageSize.value;
    return filteredSubscriptions.value.slice(start, start + pageSize.value);
});
async function handleSubscribe(service) {
    try {
        const { value } = await ElMessageBox.prompt('请输入订阅时长（月）', '订阅服务', {
            inputValue: '1',
            inputPattern: /^\d+$/,
            inputErrorMessage: '请输入正整数',
        });
        if (value) {
            const res = await createSubscription(service.id, { durationMonths: parseInt(value) });
            if (res?.code === 200) {
                ElMessage.success('订阅成功');
                await loadSubscriptions();
            }
            else {
                ElMessage.error(res?.message || '订阅失败');
            }
        }
    }
    catch { /* cancel */ }
}
async function handlePay(sub) {
    try {
        const res = await paySubscription(sub.id);
        if (res?.code === 200) {
            ElMessage.success('支付成功');
            await loadSubscriptions();
        }
        else {
            ElMessage.error(res?.message || '支付失败');
        }
    }
    catch {
        ElMessage.error('支付失败');
    }
}
async function handleCancel(sub) {
    try {
        await ElMessageBox.confirm('确认取消该订阅？', '提示', { type: 'warning' });
        const res = await cancelSubscription(sub.id);
        if (res?.code === 200) {
            ElMessage.success('已取消');
            await loadSubscriptions();
        }
        else {
            ElMessage.error(res?.message || '操作失败');
        }
    }
    catch { /* cancel */ }
}
async function handleRenew(sub) {
    try {
        const { value } = await ElMessageBox.prompt('请输入续费时长（月）', '续费', {
            inputValue: '1',
            inputPattern: /^\d+$/,
            inputErrorMessage: '请输入正整数',
        });
        if (value) {
            const res = await renewSubscription(sub.id);
            if (res?.code === 200) {
                ElMessage.success('续费成功');
                await loadSubscriptions();
            }
            else {
                ElMessage.error(res?.message || '续费失败');
            }
        }
    }
    catch { /* cancel */ }
}
async function handleCreateService() {
    try {
        const res = await createService(serviceForm.value);
        if (res?.code === 200) {
            ElMessage.success('服务创建成功');
            showCreateServiceDialog.value = false;
            serviceForm.value = { name: '', description: '', price: 0, durationMonths: 1 };
            await loadServices();
        }
        else {
            ElMessage.error(res?.message || '创建失败');
        }
    }
    catch {
        ElMessage.error('创建失败');
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
        placeholder: "搜索服务名称...",
        clearable: true,
        size: "small",
        ...{ style: {} },
    }));
    const __VLS_9 = __VLS_8({
        ...{ 'onInput': {} },
        modelValue: (__VLS_ctx.searchKeyword),
        placeholder: "搜索服务名称...",
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
        onClick: (...[$event]) => {
            __VLS_ctx.loadServices();
            __VLS_ctx.loadSubscriptions();
            // @ts-ignore
            [loadServices, loadSubscriptions,];
        },
    };
    const { default: __VLS_21 } = __VLS_17.slots;
    // @ts-ignore
    [];
    var __VLS_17;
    var __VLS_18;
    if (__VLS_ctx.isAdmin) {
        let __VLS_22;
        /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
        elButton;
        // @ts-ignore
        const __VLS_23 = __VLS_asFunctionalComponent1(__VLS_22, new __VLS_22({
            ...{ 'onClick': {} },
            type: "primary",
            size: "small",
            icon: (__VLS_ctx.Plus),
        }));
        const __VLS_24 = __VLS_23({
            ...{ 'onClick': {} },
            type: "primary",
            size: "small",
            icon: (__VLS_ctx.Plus),
        }, ...__VLS_functionalComponentArgsRest(__VLS_23));
        let __VLS_27;
        const __VLS_28 = {
            /** @type {typeof __VLS_27.click} */
            onClick: (...[$event]) => {
                if (!(__VLS_ctx.isAdmin))
                    return;
                __VLS_ctx.showCreateServiceDialog = true;
                // @ts-ignore
                [isAdmin, Plus, showCreateServiceDialog,];
            },
        };
        const { default: __VLS_29 } = __VLS_25.slots;
        // @ts-ignore
        [];
        var __VLS_25;
        var __VLS_26;
    }
    // @ts-ignore
    [];
}
let __VLS_30;
/** @ts-ignore @type { | typeof __VLS_components.elTabs | typeof __VLS_components.ElTabs | typeof __VLS_components['el-tabs'] | typeof __VLS_components.elTabs | typeof __VLS_components.ElTabs | typeof __VLS_components['el-tabs']} */
elTabs;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({
    modelValue: (__VLS_ctx.activeTab),
}));
const __VLS_32 = __VLS_31({
    modelValue: (__VLS_ctx.activeTab),
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
const { default: __VLS_35 } = __VLS_33.slots;
let __VLS_36;
/** @ts-ignore @type { | typeof __VLS_components.elTabPane | typeof __VLS_components.ElTabPane | typeof __VLS_components['el-tab-pane'] | typeof __VLS_components.elTabPane | typeof __VLS_components.ElTabPane | typeof __VLS_components['el-tab-pane']} */
elTabPane;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({
    label: "服务市场",
    name: "market",
}));
const __VLS_38 = __VLS_37({
    label: "服务市场",
    name: "market",
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
const { default: __VLS_41 } = __VLS_39.slots;
let __VLS_42;
/** @ts-ignore @type { | typeof __VLS_components.elTable | typeof __VLS_components.ElTable | typeof __VLS_components['el-table'] | typeof __VLS_components.elTable | typeof __VLS_components.ElTable | typeof __VLS_components['el-table']} */
elTable;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent1(__VLS_42, new __VLS_42({
    data: (__VLS_ctx.pagedServices),
    stripe: true,
    size: "small",
}));
const __VLS_44 = __VLS_43({
    data: (__VLS_ctx.pagedServices),
    stripe: true,
    size: "small",
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
__VLS_asFunctionalDirective(__VLS_directives.vLoading, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.servicesLoading) }, null, null);
const { default: __VLS_47 } = __VLS_45.slots;
let __VLS_48;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent1(__VLS_48, new __VLS_48({
    prop: "name",
    label: "服务名称",
    minWidth: "140",
}));
const __VLS_50 = __VLS_49({
    prop: "name",
    label: "服务名称",
    minWidth: "140",
}, ...__VLS_functionalComponentArgsRest(__VLS_49));
let __VLS_53;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_54 = __VLS_asFunctionalComponent1(__VLS_53, new __VLS_53({
    prop: "description",
    label: "描述",
    showOverflowTooltip: true,
    minWidth: "200",
}));
const __VLS_55 = __VLS_54({
    prop: "description",
    label: "描述",
    showOverflowTooltip: true,
    minWidth: "200",
}, ...__VLS_functionalComponentArgsRest(__VLS_54));
let __VLS_58;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_59 = __VLS_asFunctionalComponent1(__VLS_58, new __VLS_58({
    label: "价格",
    width: "120",
}));
const __VLS_60 = __VLS_59({
    label: "价格",
    width: "120",
}, ...__VLS_functionalComponentArgsRest(__VLS_59));
const { default: __VLS_63 } = __VLS_61.slots;
{
    const { default: __VLS_64 } = __VLS_61.slots;
    const [{ row }] = __VLS_vSlot(__VLS_64);
    (row.price ?? 0);
    // @ts-ignore
    [activeTab, pagedServices, vLoading, servicesLoading,];
}
// @ts-ignore
[];
var __VLS_61;
let __VLS_65;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_66 = __VLS_asFunctionalComponent1(__VLS_65, new __VLS_65({
    label: "时长(月)",
    width: "100",
}));
const __VLS_67 = __VLS_66({
    label: "时长(月)",
    width: "100",
}, ...__VLS_functionalComponentArgsRest(__VLS_66));
const { default: __VLS_70 } = __VLS_68.slots;
{
    const { default: __VLS_71 } = __VLS_68.slots;
    const [{ row }] = __VLS_vSlot(__VLS_71);
    (row.durationMonths ?? '-');
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_68;
let __VLS_72;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_73 = __VLS_asFunctionalComponent1(__VLS_72, new __VLS_72({
    label: "操作",
    width: "100",
    fixed: "right",
}));
const __VLS_74 = __VLS_73({
    label: "操作",
    width: "100",
    fixed: "right",
}, ...__VLS_functionalComponentArgsRest(__VLS_73));
const { default: __VLS_77 } = __VLS_75.slots;
{
    const { default: __VLS_78 } = __VLS_75.slots;
    const [{ row }] = __VLS_vSlot(__VLS_78);
    let __VLS_79;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_80 = __VLS_asFunctionalComponent1(__VLS_79, new __VLS_79({
        ...{ 'onClick': {} },
        size: "small",
        type: "primary",
    }));
    const __VLS_81 = __VLS_80({
        ...{ 'onClick': {} },
        size: "small",
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_80));
    let __VLS_84;
    const __VLS_85 = {
        /** @type {typeof __VLS_84.click} */
        onClick: (...[$event]) => {
            __VLS_ctx.handleSubscribe(row);
            // @ts-ignore
            [handleSubscribe,];
        },
    };
    const { default: __VLS_86 } = __VLS_82.slots;
    // @ts-ignore
    [];
    var __VLS_82;
    var __VLS_83;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_75;
// @ts-ignore
[];
var __VLS_45;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ style: {} },
});
let __VLS_87;
/** @ts-ignore @type { | typeof __VLS_components.elPagination | typeof __VLS_components.ElPagination | typeof __VLS_components['el-pagination']} */
elPagination;
// @ts-ignore
const __VLS_88 = __VLS_asFunctionalComponent1(__VLS_87, new __VLS_87({
    currentPage: (__VLS_ctx.page),
    pageSize: (__VLS_ctx.pageSize),
    total: (__VLS_ctx.filteredServices.length),
    layout: "prev, pager, next, total",
    small: true,
}));
const __VLS_89 = __VLS_88({
    currentPage: (__VLS_ctx.page),
    pageSize: (__VLS_ctx.pageSize),
    total: (__VLS_ctx.filteredServices.length),
    layout: "prev, pager, next, total",
    small: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_88));
if (!__VLS_ctx.filteredServices.length && !__VLS_ctx.servicesLoading) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ style: {} },
    });
}
// @ts-ignore
[page, servicesLoading, pageSize, filteredServices, filteredServices,];
var __VLS_39;
let __VLS_92;
/** @ts-ignore @type { | typeof __VLS_components.elTabPane | typeof __VLS_components.ElTabPane | typeof __VLS_components['el-tab-pane'] | typeof __VLS_components.elTabPane | typeof __VLS_components.ElTabPane | typeof __VLS_components['el-tab-pane']} */
elTabPane;
// @ts-ignore
const __VLS_93 = __VLS_asFunctionalComponent1(__VLS_92, new __VLS_92({
    label: "我的订阅",
    name: "mine",
}));
const __VLS_94 = __VLS_93({
    label: "我的订阅",
    name: "mine",
}, ...__VLS_functionalComponentArgsRest(__VLS_93));
const { default: __VLS_97 } = __VLS_95.slots;
let __VLS_98;
/** @ts-ignore @type { | typeof __VLS_components.elTable | typeof __VLS_components.ElTable | typeof __VLS_components['el-table'] | typeof __VLS_components.elTable | typeof __VLS_components.ElTable | typeof __VLS_components['el-table']} */
elTable;
// @ts-ignore
const __VLS_99 = __VLS_asFunctionalComponent1(__VLS_98, new __VLS_98({
    data: (__VLS_ctx.pagedSubscriptions),
    stripe: true,
    size: "small",
}));
const __VLS_100 = __VLS_99({
    data: (__VLS_ctx.pagedSubscriptions),
    stripe: true,
    size: "small",
}, ...__VLS_functionalComponentArgsRest(__VLS_99));
__VLS_asFunctionalDirective(__VLS_directives.vLoading, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.subsLoading) }, null, null);
const { default: __VLS_103 } = __VLS_101.slots;
let __VLS_104;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_105 = __VLS_asFunctionalComponent1(__VLS_104, new __VLS_104({
    prop: "serviceName",
    label: "服务名称",
    minWidth: "140",
}));
const __VLS_106 = __VLS_105({
    prop: "serviceName",
    label: "服务名称",
    minWidth: "140",
}, ...__VLS_functionalComponentArgsRest(__VLS_105));
let __VLS_109;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_110 = __VLS_asFunctionalComponent1(__VLS_109, new __VLS_109({
    prop: "serviceDescription",
    label: "描述",
    showOverflowTooltip: true,
    minWidth: "160",
}));
const __VLS_111 = __VLS_110({
    prop: "serviceDescription",
    label: "描述",
    showOverflowTooltip: true,
    minWidth: "160",
}, ...__VLS_functionalComponentArgsRest(__VLS_110));
let __VLS_114;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_115 = __VLS_asFunctionalComponent1(__VLS_114, new __VLS_114({
    label: "价格",
    width: "100",
}));
const __VLS_116 = __VLS_115({
    label: "价格",
    width: "100",
}, ...__VLS_functionalComponentArgsRest(__VLS_115));
const { default: __VLS_119 } = __VLS_117.slots;
{
    const { default: __VLS_120 } = __VLS_117.slots;
    const [{ row }] = __VLS_vSlot(__VLS_120);
    (row.price ?? row.amount ?? 0);
    // @ts-ignore
    [vLoading, pagedSubscriptions, subsLoading,];
}
// @ts-ignore
[];
var __VLS_117;
let __VLS_121;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_122 = __VLS_asFunctionalComponent1(__VLS_121, new __VLS_121({
    label: "剩余时长",
    width: "100",
}));
const __VLS_123 = __VLS_122({
    label: "剩余时长",
    width: "100",
}, ...__VLS_functionalComponentArgsRest(__VLS_122));
const { default: __VLS_126 } = __VLS_124.slots;
{
    const { default: __VLS_127 } = __VLS_124.slots;
    const [{ row }] = __VLS_vSlot(__VLS_127);
    (row.remainingMonths ?? '-');
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_124;
let __VLS_128;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_129 = __VLS_asFunctionalComponent1(__VLS_128, new __VLS_128({
    label: "状态",
    width: "100",
}));
const __VLS_130 = __VLS_129({
    label: "状态",
    width: "100",
}, ...__VLS_functionalComponentArgsRest(__VLS_129));
const { default: __VLS_133 } = __VLS_131.slots;
{
    const { default: __VLS_134 } = __VLS_131.slots;
    const [{ row }] = __VLS_vSlot(__VLS_134);
    let __VLS_135;
    /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
    elTag;
    // @ts-ignore
    const __VLS_136 = __VLS_asFunctionalComponent1(__VLS_135, new __VLS_135({
        type: (__VLS_ctx.statusType[row.status] || 'info'),
        size: "small",
    }));
    const __VLS_137 = __VLS_136({
        type: (__VLS_ctx.statusType[row.status] || 'info'),
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_136));
    const { default: __VLS_140 } = __VLS_138.slots;
    (__VLS_ctx.statusMap[row.status] || row.status);
    // @ts-ignore
    [statusType, statusMap,];
    var __VLS_138;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_131;
let __VLS_141;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_142 = __VLS_asFunctionalComponent1(__VLS_141, new __VLS_141({
    label: "操作",
    width: "200",
    fixed: "right",
}));
const __VLS_143 = __VLS_142({
    label: "操作",
    width: "200",
    fixed: "right",
}, ...__VLS_functionalComponentArgsRest(__VLS_142));
const { default: __VLS_146 } = __VLS_144.slots;
{
    const { default: __VLS_147 } = __VLS_144.slots;
    const [{ row }] = __VLS_vSlot(__VLS_147);
    if (row.status === 'PENDING_PAYMENT') {
        let __VLS_148;
        /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
        elButton;
        // @ts-ignore
        const __VLS_149 = __VLS_asFunctionalComponent1(__VLS_148, new __VLS_148({
            ...{ 'onClick': {} },
            size: "small",
            type: "success",
            icon: (__VLS_ctx.CreditCard),
        }));
        const __VLS_150 = __VLS_149({
            ...{ 'onClick': {} },
            size: "small",
            type: "success",
            icon: (__VLS_ctx.CreditCard),
        }, ...__VLS_functionalComponentArgsRest(__VLS_149));
        let __VLS_153;
        const __VLS_154 = {
            /** @type {typeof __VLS_153.click} */
            onClick: (...[$event]) => {
                if (!(row.status === 'PENDING_PAYMENT'))
                    return;
                __VLS_ctx.handlePay(row);
                // @ts-ignore
                [CreditCard, handlePay,];
            },
        };
        const { default: __VLS_155 } = __VLS_151.slots;
        // @ts-ignore
        [];
        var __VLS_151;
        var __VLS_152;
    }
    if (row.status === 'ACTIVE') {
        let __VLS_156;
        /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
        elButton;
        // @ts-ignore
        const __VLS_157 = __VLS_asFunctionalComponent1(__VLS_156, new __VLS_156({
            ...{ 'onClick': {} },
            size: "small",
            icon: (__VLS_ctx.Refresh),
        }));
        const __VLS_158 = __VLS_157({
            ...{ 'onClick': {} },
            size: "small",
            icon: (__VLS_ctx.Refresh),
        }, ...__VLS_functionalComponentArgsRest(__VLS_157));
        let __VLS_161;
        const __VLS_162 = {
            /** @type {typeof __VLS_161.click} */
            onClick: (...[$event]) => {
                if (!(row.status === 'ACTIVE'))
                    return;
                __VLS_ctx.handleRenew(row);
                // @ts-ignore
                [Refresh, handleRenew,];
            },
        };
        const { default: __VLS_163 } = __VLS_159.slots;
        // @ts-ignore
        [];
        var __VLS_159;
        var __VLS_160;
    }
    if (row.status === 'ACTIVE' || row.status === 'PENDING_PAYMENT') {
        let __VLS_164;
        /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
        elButton;
        // @ts-ignore
        const __VLS_165 = __VLS_asFunctionalComponent1(__VLS_164, new __VLS_164({
            ...{ 'onClick': {} },
            size: "small",
            type: "danger",
            icon: (__VLS_ctx.Delete),
        }));
        const __VLS_166 = __VLS_165({
            ...{ 'onClick': {} },
            size: "small",
            type: "danger",
            icon: (__VLS_ctx.Delete),
        }, ...__VLS_functionalComponentArgsRest(__VLS_165));
        let __VLS_169;
        const __VLS_170 = {
            /** @type {typeof __VLS_169.click} */
            onClick: (...[$event]) => {
                if (!(row.status === 'ACTIVE' || row.status === 'PENDING_PAYMENT'))
                    return;
                __VLS_ctx.handleCancel(row);
                // @ts-ignore
                [Delete, handleCancel,];
            },
        };
        const { default: __VLS_171 } = __VLS_167.slots;
        // @ts-ignore
        [];
        var __VLS_167;
        var __VLS_168;
    }
    if (row.status === 'CANCELLED' || row.status === 'EXPIRED') {
        let __VLS_172;
        /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
        elTag;
        // @ts-ignore
        const __VLS_173 = __VLS_asFunctionalComponent1(__VLS_172, new __VLS_172({
            size: "small",
            disableTransitions: true,
        }));
        const __VLS_174 = __VLS_173({
            size: "small",
            disableTransitions: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_173));
        const { default: __VLS_177 } = __VLS_175.slots;
        // @ts-ignore
        [];
        var __VLS_175;
    }
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_144;
// @ts-ignore
[];
var __VLS_101;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ style: {} },
});
let __VLS_178;
/** @ts-ignore @type { | typeof __VLS_components.elPagination | typeof __VLS_components.ElPagination | typeof __VLS_components['el-pagination']} */
elPagination;
// @ts-ignore
const __VLS_179 = __VLS_asFunctionalComponent1(__VLS_178, new __VLS_178({
    currentPage: (__VLS_ctx.page),
    pageSize: (__VLS_ctx.pageSize),
    total: (__VLS_ctx.filteredSubscriptions.length),
    layout: "prev, pager, next, total",
    small: true,
}));
const __VLS_180 = __VLS_179({
    currentPage: (__VLS_ctx.page),
    pageSize: (__VLS_ctx.pageSize),
    total: (__VLS_ctx.filteredSubscriptions.length),
    layout: "prev, pager, next, total",
    small: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_179));
if (!__VLS_ctx.filteredSubscriptions.length && !__VLS_ctx.subsLoading) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ style: {} },
    });
}
// @ts-ignore
[page, pageSize, subsLoading, filteredSubscriptions, filteredSubscriptions,];
var __VLS_95;
// @ts-ignore
[];
var __VLS_33;
// @ts-ignore
[];
var __VLS_3;
let __VLS_183;
/** @ts-ignore @type { | typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog | typeof __VLS_components['el-dialog'] | typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog | typeof __VLS_components['el-dialog']} */
elDialog;
// @ts-ignore
const __VLS_184 = __VLS_asFunctionalComponent1(__VLS_183, new __VLS_183({
    modelValue: (__VLS_ctx.showCreateServiceDialog),
    title: "新建服务",
    width: "500px",
}));
const __VLS_185 = __VLS_184({
    modelValue: (__VLS_ctx.showCreateServiceDialog),
    title: "新建服务",
    width: "500px",
}, ...__VLS_functionalComponentArgsRest(__VLS_184));
const { default: __VLS_188 } = __VLS_186.slots;
let __VLS_189;
/** @ts-ignore @type { | typeof __VLS_components.elForm | typeof __VLS_components.ElForm | typeof __VLS_components['el-form'] | typeof __VLS_components.elForm | typeof __VLS_components.ElForm | typeof __VLS_components['el-form']} */
elForm;
// @ts-ignore
const __VLS_190 = __VLS_asFunctionalComponent1(__VLS_189, new __VLS_189({
    model: (__VLS_ctx.serviceForm),
    labelWidth: "110px",
}));
const __VLS_191 = __VLS_190({
    model: (__VLS_ctx.serviceForm),
    labelWidth: "110px",
}, ...__VLS_functionalComponentArgsRest(__VLS_190));
const { default: __VLS_194 } = __VLS_192.slots;
let __VLS_195;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_196 = __VLS_asFunctionalComponent1(__VLS_195, new __VLS_195({
    label: "服务名称",
    required: true,
}));
const __VLS_197 = __VLS_196({
    label: "服务名称",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_196));
const { default: __VLS_200 } = __VLS_198.slots;
let __VLS_201;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_202 = __VLS_asFunctionalComponent1(__VLS_201, new __VLS_201({
    modelValue: (__VLS_ctx.serviceForm.name),
    placeholder: "请输入服务名称",
}));
const __VLS_203 = __VLS_202({
    modelValue: (__VLS_ctx.serviceForm.name),
    placeholder: "请输入服务名称",
}, ...__VLS_functionalComponentArgsRest(__VLS_202));
// @ts-ignore
[showCreateServiceDialog, serviceForm, serviceForm,];
var __VLS_198;
let __VLS_206;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_207 = __VLS_asFunctionalComponent1(__VLS_206, new __VLS_206({
    label: "描述",
    required: true,
}));
const __VLS_208 = __VLS_207({
    label: "描述",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_207));
const { default: __VLS_211 } = __VLS_209.slots;
let __VLS_212;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_213 = __VLS_asFunctionalComponent1(__VLS_212, new __VLS_212({
    modelValue: (__VLS_ctx.serviceForm.description),
    type: "textarea",
    rows: (2),
    placeholder: "服务描述",
}));
const __VLS_214 = __VLS_213({
    modelValue: (__VLS_ctx.serviceForm.description),
    type: "textarea",
    rows: (2),
    placeholder: "服务描述",
}, ...__VLS_functionalComponentArgsRest(__VLS_213));
// @ts-ignore
[serviceForm,];
var __VLS_209;
let __VLS_217;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_218 = __VLS_asFunctionalComponent1(__VLS_217, new __VLS_217({
    label: "价格",
    required: true,
}));
const __VLS_219 = __VLS_218({
    label: "价格",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_218));
const { default: __VLS_222 } = __VLS_220.slots;
let __VLS_223;
/** @ts-ignore @type { | typeof __VLS_components.elInputNumber | typeof __VLS_components.ElInputNumber | typeof __VLS_components['el-input-number']} */
elInputNumber;
// @ts-ignore
const __VLS_224 = __VLS_asFunctionalComponent1(__VLS_223, new __VLS_223({
    modelValue: (__VLS_ctx.serviceForm.price),
    min: (0),
    step: (100),
    ...{ style: {} },
}));
const __VLS_225 = __VLS_224({
    modelValue: (__VLS_ctx.serviceForm.price),
    min: (0),
    step: (100),
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_224));
// @ts-ignore
[serviceForm,];
var __VLS_220;
let __VLS_228;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_229 = __VLS_asFunctionalComponent1(__VLS_228, new __VLS_228({
    label: "时长(月)",
    required: true,
}));
const __VLS_230 = __VLS_229({
    label: "时长(月)",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_229));
const { default: __VLS_233 } = __VLS_231.slots;
let __VLS_234;
/** @ts-ignore @type { | typeof __VLS_components.elInputNumber | typeof __VLS_components.ElInputNumber | typeof __VLS_components['el-input-number']} */
elInputNumber;
// @ts-ignore
const __VLS_235 = __VLS_asFunctionalComponent1(__VLS_234, new __VLS_234({
    modelValue: (__VLS_ctx.serviceForm.durationMonths),
    min: (1),
    max: (60),
    ...{ style: {} },
}));
const __VLS_236 = __VLS_235({
    modelValue: (__VLS_ctx.serviceForm.durationMonths),
    min: (1),
    max: (60),
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_235));
// @ts-ignore
[serviceForm,];
var __VLS_231;
// @ts-ignore
[];
var __VLS_192;
{
    const { footer: __VLS_239 } = __VLS_186.slots;
    let __VLS_240;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_241 = __VLS_asFunctionalComponent1(__VLS_240, new __VLS_240({
        ...{ 'onClick': {} },
    }));
    const __VLS_242 = __VLS_241({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_241));
    let __VLS_245;
    const __VLS_246 = {
        /** @type {typeof __VLS_245.click} */
        onClick: (...[$event]) => {
            __VLS_ctx.showCreateServiceDialog = false;
            // @ts-ignore
            [showCreateServiceDialog,];
        },
    };
    const { default: __VLS_247 } = __VLS_243.slots;
    // @ts-ignore
    [];
    var __VLS_243;
    var __VLS_244;
    let __VLS_248;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_249 = __VLS_asFunctionalComponent1(__VLS_248, new __VLS_248({
        ...{ 'onClick': {} },
        type: "primary",
    }));
    const __VLS_250 = __VLS_249({
        ...{ 'onClick': {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_249));
    let __VLS_253;
    const __VLS_254 = {
        /** @type {typeof __VLS_253.click} */
        onClick: (__VLS_ctx.handleCreateService),
    };
    const { default: __VLS_255 } = __VLS_251.slots;
    // @ts-ignore
    [handleCreateService,];
    var __VLS_251;
    var __VLS_252;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_186;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
