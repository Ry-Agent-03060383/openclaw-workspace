/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, onMounted, computed } from 'vue';
import { useUserStore } from '../../store/user';
import { getServices, getServiceOrders, createService, createOrder, payOrder, completeOrder, rateOrder, } from '../../api/thirdparty';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Plus, CreditCard, CircleCheck, Star } from '@element-plus/icons-vue';
const userStore = useUserStore();
const isAdmin = computed(() => userStore.userType === 'ADMIN');
const activeTab = ref('catalog');
// 服务目录
const services = ref([]);
const servicesLoading = ref(false);
// 服务订单
const orders = ref([]);
const ordersLoading = ref(false);
// 新建服务
const showCreateServiceDialog = ref(false);
const serviceForm = ref({
    name: '',
    provider: '',
    description: '',
    price: 0,
});
const searchKeyword = ref('');
const page = ref(1);
const pageSize = ref(10);
const orderStatusMap = {
    PENDING_PAYMENT: '待支付',
    PAID: '已支付',
    IN_PROGRESS: '进行中',
    COMPLETED: '已完成',
    CANCELLED: '已取消',
};
const orderStatusType = {
    PENDING_PAYMENT: 'warning',
    PAID: 'primary',
    IN_PROGRESS: 'info',
    COMPLETED: 'success',
    CANCELLED: 'danger',
};
onMounted(async () => {
    await loadServices();
    await loadOrders();
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
async function loadOrders() {
    ordersLoading.value = true;
    try {
        const res = await getServiceOrders();
        if (res?.code === 200) {
            orders.value = Array.isArray(res.data) ? res.data : (res.data?.records || []);
        }
    }
    catch {
        orders.value = [];
    }
    ordersLoading.value = false;
}
const filteredServices = computed(() => {
    if (!searchKeyword.value)
        return services.value;
    const kw = searchKeyword.value.toLowerCase();
    return services.value.filter((s) => (s.name && s.name.toLowerCase().includes(kw)) ||
        (s.provider && s.provider.toLowerCase().includes(kw)) ||
        (s.description && s.description.toLowerCase().includes(kw)));
});
const pagedServices = computed(() => {
    const start = (page.value - 1) * pageSize.value;
    return filteredServices.value.slice(start, start + pageSize.value);
});
const filteredOrders = computed(() => {
    if (!searchKeyword.value)
        return orders.value;
    const kw = searchKeyword.value.toLowerCase();
    return orders.value.filter((o) => (o.orderNo && o.orderNo.toLowerCase().includes(kw)) ||
        (o.serviceName && o.serviceName.toLowerCase().includes(kw)));
});
const pagedOrders = computed(() => {
    const start = (page.value - 1) * pageSize.value;
    return filteredOrders.value.slice(start, start + pageSize.value);
});
async function handleCreateOrder(service) {
    try {
        const res = await createOrder({ serviceId: service.id });
        if (res?.code === 200) {
            ElMessage.success('下单成功');
            await loadOrders();
        }
        else {
            ElMessage.error(res?.message || '下单失败');
        }
    }
    catch {
        ElMessage.error('下单失败');
    }
}
async function handlePayOrder(order) {
    try {
        const res = await payOrder(order.id);
        if (res?.code === 200) {
            ElMessage.success('支付成功');
            await loadOrders();
        }
        else {
            ElMessage.error(res?.message || '支付失败');
        }
    }
    catch {
        ElMessage.error('支付失败');
    }
}
async function handleCompleteOrder(order) {
    try {
        const res = await completeOrder(order.id);
        if (res?.code === 200) {
            ElMessage.success('已完成');
            await loadOrders();
        }
        else {
            ElMessage.error(res?.message || '操作失败');
        }
    }
    catch {
        ElMessage.error('操作失败');
    }
}
async function handleRateOrder(order) {
    try {
        const { value } = await ElMessageBox.prompt('请输入评分（1-5）', '评价服务', {
            inputValue: '5',
            inputPattern: /^[1-5]$/,
            inputErrorMessage: '请输入1-5之间的整数',
        });
        if (value) {
            const res = await rateOrder(order.id, { rating: parseInt(value), comment: '' });
            if (res?.code === 200) {
                ElMessage.success('评价成功');
                await loadOrders();
            }
            else {
                ElMessage.error(res?.message || '评价失败');
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
            serviceForm.value = { name: '', provider: '', description: '', price: 0 };
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
        placeholder: "搜索服务/订单...",
        clearable: true,
        size: "small",
        ...{ style: {} },
    }));
    const __VLS_9 = __VLS_8({
        ...{ 'onInput': {} },
        modelValue: (__VLS_ctx.searchKeyword),
        placeholder: "搜索服务/订单...",
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
            __VLS_ctx.loadOrders();
            // @ts-ignore
            [loadServices, loadOrders,];
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
    label: "服务目录",
    name: "catalog",
}));
const __VLS_38 = __VLS_37({
    label: "服务目录",
    name: "catalog",
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
    prop: "provider",
    label: "提供商",
    width: "120",
}));
const __VLS_55 = __VLS_54({
    prop: "provider",
    label: "提供商",
    width: "120",
}, ...__VLS_functionalComponentArgsRest(__VLS_54));
let __VLS_58;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_59 = __VLS_asFunctionalComponent1(__VLS_58, new __VLS_58({
    prop: "description",
    label: "描述",
    showOverflowTooltip: true,
    minWidth: "200",
}));
const __VLS_60 = __VLS_59({
    prop: "description",
    label: "描述",
    showOverflowTooltip: true,
    minWidth: "200",
}, ...__VLS_functionalComponentArgsRest(__VLS_59));
let __VLS_63;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_64 = __VLS_asFunctionalComponent1(__VLS_63, new __VLS_63({
    label: "价格",
    width: "120",
}));
const __VLS_65 = __VLS_64({
    label: "价格",
    width: "120",
}, ...__VLS_functionalComponentArgsRest(__VLS_64));
const { default: __VLS_68 } = __VLS_66.slots;
{
    const { default: __VLS_69 } = __VLS_66.slots;
    const [{ row }] = __VLS_vSlot(__VLS_69);
    (row.price ?? 0);
    // @ts-ignore
    [activeTab, pagedServices, vLoading, servicesLoading,];
}
// @ts-ignore
[];
var __VLS_66;
let __VLS_70;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_71 = __VLS_asFunctionalComponent1(__VLS_70, new __VLS_70({
    label: "操作",
    width: "100",
    fixed: "right",
}));
const __VLS_72 = __VLS_71({
    label: "操作",
    width: "100",
    fixed: "right",
}, ...__VLS_functionalComponentArgsRest(__VLS_71));
const { default: __VLS_75 } = __VLS_73.slots;
{
    const { default: __VLS_76 } = __VLS_73.slots;
    const [{ row }] = __VLS_vSlot(__VLS_76);
    let __VLS_77;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_78 = __VLS_asFunctionalComponent1(__VLS_77, new __VLS_77({
        ...{ 'onClick': {} },
        size: "small",
        type: "primary",
    }));
    const __VLS_79 = __VLS_78({
        ...{ 'onClick': {} },
        size: "small",
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_78));
    let __VLS_82;
    const __VLS_83 = {
        /** @type {typeof __VLS_82.click} */
        onClick: (...[$event]) => {
            __VLS_ctx.handleCreateOrder(row);
            // @ts-ignore
            [handleCreateOrder,];
        },
    };
    const { default: __VLS_84 } = __VLS_80.slots;
    // @ts-ignore
    [];
    var __VLS_80;
    var __VLS_81;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_73;
// @ts-ignore
[];
var __VLS_45;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ style: {} },
});
let __VLS_85;
/** @ts-ignore @type { | typeof __VLS_components.elPagination | typeof __VLS_components.ElPagination | typeof __VLS_components['el-pagination']} */
elPagination;
// @ts-ignore
const __VLS_86 = __VLS_asFunctionalComponent1(__VLS_85, new __VLS_85({
    currentPage: (__VLS_ctx.page),
    pageSize: (__VLS_ctx.pageSize),
    total: (__VLS_ctx.filteredServices.length),
    layout: "prev, pager, next, total",
    small: true,
}));
const __VLS_87 = __VLS_86({
    currentPage: (__VLS_ctx.page),
    pageSize: (__VLS_ctx.pageSize),
    total: (__VLS_ctx.filteredServices.length),
    layout: "prev, pager, next, total",
    small: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_86));
if (!__VLS_ctx.filteredServices.length && !__VLS_ctx.servicesLoading) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ style: {} },
    });
}
// @ts-ignore
[page, servicesLoading, pageSize, filteredServices, filteredServices,];
var __VLS_39;
let __VLS_90;
/** @ts-ignore @type { | typeof __VLS_components.elTabPane | typeof __VLS_components.ElTabPane | typeof __VLS_components['el-tab-pane'] | typeof __VLS_components.elTabPane | typeof __VLS_components.ElTabPane | typeof __VLS_components['el-tab-pane']} */
elTabPane;
// @ts-ignore
const __VLS_91 = __VLS_asFunctionalComponent1(__VLS_90, new __VLS_90({
    label: "服务订单",
    name: "orders",
}));
const __VLS_92 = __VLS_91({
    label: "服务订单",
    name: "orders",
}, ...__VLS_functionalComponentArgsRest(__VLS_91));
const { default: __VLS_95 } = __VLS_93.slots;
let __VLS_96;
/** @ts-ignore @type { | typeof __VLS_components.elTable | typeof __VLS_components.ElTable | typeof __VLS_components['el-table'] | typeof __VLS_components.elTable | typeof __VLS_components.ElTable | typeof __VLS_components['el-table']} */
elTable;
// @ts-ignore
const __VLS_97 = __VLS_asFunctionalComponent1(__VLS_96, new __VLS_96({
    data: (__VLS_ctx.pagedOrders),
    stripe: true,
    size: "small",
}));
const __VLS_98 = __VLS_97({
    data: (__VLS_ctx.pagedOrders),
    stripe: true,
    size: "small",
}, ...__VLS_functionalComponentArgsRest(__VLS_97));
__VLS_asFunctionalDirective(__VLS_directives.vLoading, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.ordersLoading) }, null, null);
const { default: __VLS_101 } = __VLS_99.slots;
let __VLS_102;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_103 = __VLS_asFunctionalComponent1(__VLS_102, new __VLS_102({
    prop: "orderNo",
    label: "订单编号",
    width: "160",
}));
const __VLS_104 = __VLS_103({
    prop: "orderNo",
    label: "订单编号",
    width: "160",
}, ...__VLS_functionalComponentArgsRest(__VLS_103));
let __VLS_107;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_108 = __VLS_asFunctionalComponent1(__VLS_107, new __VLS_107({
    prop: "serviceName",
    label: "服务名称",
    minWidth: "140",
}));
const __VLS_109 = __VLS_108({
    prop: "serviceName",
    label: "服务名称",
    minWidth: "140",
}, ...__VLS_functionalComponentArgsRest(__VLS_108));
let __VLS_112;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_113 = __VLS_asFunctionalComponent1(__VLS_112, new __VLS_112({
    label: "金额",
    width: "110",
}));
const __VLS_114 = __VLS_113({
    label: "金额",
    width: "110",
}, ...__VLS_functionalComponentArgsRest(__VLS_113));
const { default: __VLS_117 } = __VLS_115.slots;
{
    const { default: __VLS_118 } = __VLS_115.slots;
    const [{ row }] = __VLS_vSlot(__VLS_118);
    (row.amount ?? row.price ?? 0);
    // @ts-ignore
    [vLoading, pagedOrders, ordersLoading,];
}
// @ts-ignore
[];
var __VLS_115;
let __VLS_119;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_120 = __VLS_asFunctionalComponent1(__VLS_119, new __VLS_119({
    label: "状态",
    width: "100",
}));
const __VLS_121 = __VLS_120({
    label: "状态",
    width: "100",
}, ...__VLS_functionalComponentArgsRest(__VLS_120));
const { default: __VLS_124 } = __VLS_122.slots;
{
    const { default: __VLS_125 } = __VLS_122.slots;
    const [{ row }] = __VLS_vSlot(__VLS_125);
    let __VLS_126;
    /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
    elTag;
    // @ts-ignore
    const __VLS_127 = __VLS_asFunctionalComponent1(__VLS_126, new __VLS_126({
        type: (__VLS_ctx.orderStatusType[row.status] || 'info'),
        size: "small",
    }));
    const __VLS_128 = __VLS_127({
        type: (__VLS_ctx.orderStatusType[row.status] || 'info'),
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_127));
    const { default: __VLS_131 } = __VLS_129.slots;
    (__VLS_ctx.orderStatusMap[row.status] || row.status);
    // @ts-ignore
    [orderStatusType, orderStatusMap,];
    var __VLS_129;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_122;
let __VLS_132;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_133 = __VLS_asFunctionalComponent1(__VLS_132, new __VLS_132({
    label: "操作",
    width: "220",
    fixed: "right",
}));
const __VLS_134 = __VLS_133({
    label: "操作",
    width: "220",
    fixed: "right",
}, ...__VLS_functionalComponentArgsRest(__VLS_133));
const { default: __VLS_137 } = __VLS_135.slots;
{
    const { default: __VLS_138 } = __VLS_135.slots;
    const [{ row }] = __VLS_vSlot(__VLS_138);
    if (row.status === 'PENDING_PAYMENT') {
        let __VLS_139;
        /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
        elButton;
        // @ts-ignore
        const __VLS_140 = __VLS_asFunctionalComponent1(__VLS_139, new __VLS_139({
            ...{ 'onClick': {} },
            size: "small",
            type: "success",
            icon: (__VLS_ctx.CreditCard),
        }));
        const __VLS_141 = __VLS_140({
            ...{ 'onClick': {} },
            size: "small",
            type: "success",
            icon: (__VLS_ctx.CreditCard),
        }, ...__VLS_functionalComponentArgsRest(__VLS_140));
        let __VLS_144;
        const __VLS_145 = {
            /** @type {typeof __VLS_144.click} */
            onClick: (...[$event]) => {
                if (!(row.status === 'PENDING_PAYMENT'))
                    return;
                __VLS_ctx.handlePayOrder(row);
                // @ts-ignore
                [CreditCard, handlePayOrder,];
            },
        };
        const { default: __VLS_146 } = __VLS_142.slots;
        // @ts-ignore
        [];
        var __VLS_142;
        var __VLS_143;
    }
    if (row.status === 'PAID' || row.status === 'IN_PROGRESS') {
        let __VLS_147;
        /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
        elButton;
        // @ts-ignore
        const __VLS_148 = __VLS_asFunctionalComponent1(__VLS_147, new __VLS_147({
            ...{ 'onClick': {} },
            size: "small",
            type: "primary",
            icon: (__VLS_ctx.CircleCheck),
        }));
        const __VLS_149 = __VLS_148({
            ...{ 'onClick': {} },
            size: "small",
            type: "primary",
            icon: (__VLS_ctx.CircleCheck),
        }, ...__VLS_functionalComponentArgsRest(__VLS_148));
        let __VLS_152;
        const __VLS_153 = {
            /** @type {typeof __VLS_152.click} */
            onClick: (...[$event]) => {
                if (!(row.status === 'PAID' || row.status === 'IN_PROGRESS'))
                    return;
                __VLS_ctx.handleCompleteOrder(row);
                // @ts-ignore
                [CircleCheck, handleCompleteOrder,];
            },
        };
        const { default: __VLS_154 } = __VLS_150.slots;
        // @ts-ignore
        [];
        var __VLS_150;
        var __VLS_151;
    }
    if (row.status === 'COMPLETED') {
        let __VLS_155;
        /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
        elButton;
        // @ts-ignore
        const __VLS_156 = __VLS_asFunctionalComponent1(__VLS_155, new __VLS_155({
            ...{ 'onClick': {} },
            size: "small",
            type: "warning",
            icon: (__VLS_ctx.Star),
        }));
        const __VLS_157 = __VLS_156({
            ...{ 'onClick': {} },
            size: "small",
            type: "warning",
            icon: (__VLS_ctx.Star),
        }, ...__VLS_functionalComponentArgsRest(__VLS_156));
        let __VLS_160;
        const __VLS_161 = {
            /** @type {typeof __VLS_160.click} */
            onClick: (...[$event]) => {
                if (!(row.status === 'COMPLETED'))
                    return;
                __VLS_ctx.handleRateOrder(row);
                // @ts-ignore
                [Star, handleRateOrder,];
            },
        };
        const { default: __VLS_162 } = __VLS_158.slots;
        // @ts-ignore
        [];
        var __VLS_158;
        var __VLS_159;
    }
    if (row.status === 'CANCELLED') {
        let __VLS_163;
        /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
        elTag;
        // @ts-ignore
        const __VLS_164 = __VLS_asFunctionalComponent1(__VLS_163, new __VLS_163({
            size: "small",
            disableTransitions: true,
        }));
        const __VLS_165 = __VLS_164({
            size: "small",
            disableTransitions: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_164));
        const { default: __VLS_168 } = __VLS_166.slots;
        // @ts-ignore
        [];
        var __VLS_166;
    }
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_135;
// @ts-ignore
[];
var __VLS_99;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ style: {} },
});
let __VLS_169;
/** @ts-ignore @type { | typeof __VLS_components.elPagination | typeof __VLS_components.ElPagination | typeof __VLS_components['el-pagination']} */
elPagination;
// @ts-ignore
const __VLS_170 = __VLS_asFunctionalComponent1(__VLS_169, new __VLS_169({
    currentPage: (__VLS_ctx.page),
    pageSize: (__VLS_ctx.pageSize),
    total: (__VLS_ctx.filteredOrders.length),
    layout: "prev, pager, next, total",
    small: true,
}));
const __VLS_171 = __VLS_170({
    currentPage: (__VLS_ctx.page),
    pageSize: (__VLS_ctx.pageSize),
    total: (__VLS_ctx.filteredOrders.length),
    layout: "prev, pager, next, total",
    small: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_170));
if (!__VLS_ctx.filteredOrders.length && !__VLS_ctx.ordersLoading) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ style: {} },
    });
}
// @ts-ignore
[page, pageSize, ordersLoading, filteredOrders, filteredOrders,];
var __VLS_93;
// @ts-ignore
[];
var __VLS_33;
// @ts-ignore
[];
var __VLS_3;
let __VLS_174;
/** @ts-ignore @type { | typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog | typeof __VLS_components['el-dialog'] | typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog | typeof __VLS_components['el-dialog']} */
elDialog;
// @ts-ignore
const __VLS_175 = __VLS_asFunctionalComponent1(__VLS_174, new __VLS_174({
    modelValue: (__VLS_ctx.showCreateServiceDialog),
    title: "新建第三方服务",
    width: "500px",
}));
const __VLS_176 = __VLS_175({
    modelValue: (__VLS_ctx.showCreateServiceDialog),
    title: "新建第三方服务",
    width: "500px",
}, ...__VLS_functionalComponentArgsRest(__VLS_175));
const { default: __VLS_179 } = __VLS_177.slots;
let __VLS_180;
/** @ts-ignore @type { | typeof __VLS_components.elForm | typeof __VLS_components.ElForm | typeof __VLS_components['el-form'] | typeof __VLS_components.elForm | typeof __VLS_components.ElForm | typeof __VLS_components['el-form']} */
elForm;
// @ts-ignore
const __VLS_181 = __VLS_asFunctionalComponent1(__VLS_180, new __VLS_180({
    model: (__VLS_ctx.serviceForm),
    labelWidth: "100px",
}));
const __VLS_182 = __VLS_181({
    model: (__VLS_ctx.serviceForm),
    labelWidth: "100px",
}, ...__VLS_functionalComponentArgsRest(__VLS_181));
const { default: __VLS_185 } = __VLS_183.slots;
let __VLS_186;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_187 = __VLS_asFunctionalComponent1(__VLS_186, new __VLS_186({
    label: "服务名称",
    required: true,
}));
const __VLS_188 = __VLS_187({
    label: "服务名称",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_187));
const { default: __VLS_191 } = __VLS_189.slots;
let __VLS_192;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_193 = __VLS_asFunctionalComponent1(__VLS_192, new __VLS_192({
    modelValue: (__VLS_ctx.serviceForm.name),
    placeholder: "请输入服务名称",
}));
const __VLS_194 = __VLS_193({
    modelValue: (__VLS_ctx.serviceForm.name),
    placeholder: "请输入服务名称",
}, ...__VLS_functionalComponentArgsRest(__VLS_193));
// @ts-ignore
[showCreateServiceDialog, serviceForm, serviceForm,];
var __VLS_189;
let __VLS_197;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_198 = __VLS_asFunctionalComponent1(__VLS_197, new __VLS_197({
    label: "提供商",
    required: true,
}));
const __VLS_199 = __VLS_198({
    label: "提供商",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_198));
const { default: __VLS_202 } = __VLS_200.slots;
let __VLS_203;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_204 = __VLS_asFunctionalComponent1(__VLS_203, new __VLS_203({
    modelValue: (__VLS_ctx.serviceForm.provider),
    placeholder: "请输入提供商名称",
}));
const __VLS_205 = __VLS_204({
    modelValue: (__VLS_ctx.serviceForm.provider),
    placeholder: "请输入提供商名称",
}, ...__VLS_functionalComponentArgsRest(__VLS_204));
// @ts-ignore
[serviceForm,];
var __VLS_200;
let __VLS_208;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_209 = __VLS_asFunctionalComponent1(__VLS_208, new __VLS_208({
    label: "描述",
    required: true,
}));
const __VLS_210 = __VLS_209({
    label: "描述",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_209));
const { default: __VLS_213 } = __VLS_211.slots;
let __VLS_214;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_215 = __VLS_asFunctionalComponent1(__VLS_214, new __VLS_214({
    modelValue: (__VLS_ctx.serviceForm.description),
    type: "textarea",
    rows: (2),
    placeholder: "服务描述",
}));
const __VLS_216 = __VLS_215({
    modelValue: (__VLS_ctx.serviceForm.description),
    type: "textarea",
    rows: (2),
    placeholder: "服务描述",
}, ...__VLS_functionalComponentArgsRest(__VLS_215));
// @ts-ignore
[serviceForm,];
var __VLS_211;
let __VLS_219;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_220 = __VLS_asFunctionalComponent1(__VLS_219, new __VLS_219({
    label: "价格",
    required: true,
}));
const __VLS_221 = __VLS_220({
    label: "价格",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_220));
const { default: __VLS_224 } = __VLS_222.slots;
let __VLS_225;
/** @ts-ignore @type { | typeof __VLS_components.elInputNumber | typeof __VLS_components.ElInputNumber | typeof __VLS_components['el-input-number']} */
elInputNumber;
// @ts-ignore
const __VLS_226 = __VLS_asFunctionalComponent1(__VLS_225, new __VLS_225({
    modelValue: (__VLS_ctx.serviceForm.price),
    min: (0),
    step: (100),
    ...{ style: {} },
}));
const __VLS_227 = __VLS_226({
    modelValue: (__VLS_ctx.serviceForm.price),
    min: (0),
    step: (100),
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_226));
// @ts-ignore
[serviceForm,];
var __VLS_222;
// @ts-ignore
[];
var __VLS_183;
{
    const { footer: __VLS_230 } = __VLS_177.slots;
    let __VLS_231;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_232 = __VLS_asFunctionalComponent1(__VLS_231, new __VLS_231({
        ...{ 'onClick': {} },
    }));
    const __VLS_233 = __VLS_232({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_232));
    let __VLS_236;
    const __VLS_237 = {
        /** @type {typeof __VLS_236.click} */
        onClick: (...[$event]) => {
            __VLS_ctx.showCreateServiceDialog = false;
            // @ts-ignore
            [showCreateServiceDialog,];
        },
    };
    const { default: __VLS_238 } = __VLS_234.slots;
    // @ts-ignore
    [];
    var __VLS_234;
    var __VLS_235;
    let __VLS_239;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_240 = __VLS_asFunctionalComponent1(__VLS_239, new __VLS_239({
        ...{ 'onClick': {} },
        type: "primary",
    }));
    const __VLS_241 = __VLS_240({
        ...{ 'onClick': {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_240));
    let __VLS_244;
    const __VLS_245 = {
        /** @type {typeof __VLS_244.click} */
        onClick: (__VLS_ctx.handleCreateService),
    };
    const { default: __VLS_246 } = __VLS_242.slots;
    // @ts-ignore
    [handleCreateService,];
    var __VLS_242;
    var __VLS_243;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_177;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
