/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, onMounted } from 'vue';
import { useUserStore } from '../../store/user';
import { getNotifications, getUnreadCount, markAsRead, markAllAsRead, deleteNotification } from '../../api/notification';
import { Bell, Delete, Check, Reading } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
const userStore = useUserStore();
const notifications = ref([]);
const unreadCount = ref(0);
const loading = ref(true);
const total = ref(0);
const page = ref(1);
onMounted(async () => { await loadData(); });
async function loadData() {
    if (!userStore.userId)
        return;
    loading.value = true;
    try {
        const [listRes, countRes] = await Promise.all([
            getNotifications(userStore.userId, page.value - 1),
            getUnreadCount(userStore.userId)
        ]);
        if (listRes.code === 200) {
            notifications.value = listRes.data.content || [];
            total.value = listRes.data.totalElements || 0;
        }
        if (countRes.code === 200)
            unreadCount.value = countRes.data || 0;
    }
    catch { /* ignore */ }
    loading.value = false;
}
async function handleMarkRead(id) {
    const res = await markAsRead(id);
    if (res.code === 200) {
        unreadCount.value = Math.max(0, unreadCount.value - 1);
        await loadData();
    }
}
async function handleMarkAllRead() {
    const res = await markAllAsRead(userStore.userId);
    if (res.code === 200) {
        unreadCount.value = 0;
        ElMessage.success('全部标记已读');
        await loadData();
    }
}
async function handleDelete(id) {
    try {
        await ElMessageBox.confirm('确定删除此通知？', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' });
        const res = await deleteNotification(id);
        if (res.code === 200) {
            ElMessage.success('删除成功');
            await loadData();
        }
    }
    catch { /* cancelled */ }
}
const typeLabel = {
    SYSTEM: '系统', APPLICATION_SUBMITTED: '提交', APPLICATION_APPROVED: '通过',
    APPLICATION_REJECTED: '驳回', NEED_MATERIALS: '补充', CREDIT_UPDATED: '征信', RISK_ALERT: '预警'
};
function typeTag(type) {
    const map = { SYSTEM: 'info', APPLICATION_SUBMITTED: 'primary', APPLICATION_APPROVED: 'success', APPLICATION_REJECTED: 'danger', RISK_ALERT: 'danger', CREDIT_UPDATED: 'success' };
    return map[type] || 'info';
}
function formatTime(t) {
    if (!t)
        return '-';
    return t.substring(0, 19).replace('T', ' ');
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "notification-view" },
});
/** @type {__VLS_StyleScopedClasses['notification-view']} */ ;
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
    let __VLS_7;
    /** @ts-ignore @type { | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon'] | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon']} */
    elIcon;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
        ...{ style: {} },
    }));
    const __VLS_9 = __VLS_8({
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    const { default: __VLS_12 } = __VLS_10.slots;
    let __VLS_13;
    /** @ts-ignore @type { | typeof __VLS_components.Bell} */
    Bell;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({}));
    const __VLS_15 = __VLS_14({}, ...__VLS_functionalComponentArgsRest(__VLS_14));
    var __VLS_10;
    if (__VLS_ctx.unreadCount) {
        let __VLS_18;
        /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
        elTag;
        // @ts-ignore
        const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
            size: "small",
            type: "danger",
        }));
        const __VLS_20 = __VLS_19({
            size: "small",
            type: "danger",
        }, ...__VLS_functionalComponentArgsRest(__VLS_19));
        const { default: __VLS_23 } = __VLS_21.slots;
        (__VLS_ctx.unreadCount);
        // @ts-ignore
        [unreadCount, unreadCount,];
        var __VLS_21;
    }
    let __VLS_24;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({
        ...{ 'onClick': {} },
        size: "small",
        icon: (__VLS_ctx.Check),
        disabled: (__VLS_ctx.unreadCount === 0),
    }));
    const __VLS_26 = __VLS_25({
        ...{ 'onClick': {} },
        size: "small",
        icon: (__VLS_ctx.Check),
        disabled: (__VLS_ctx.unreadCount === 0),
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    let __VLS_29;
    const __VLS_30 = {
        /** @type {typeof __VLS_29.click} */
        onClick: (__VLS_ctx.handleMarkAllRead),
    };
    const { default: __VLS_31 } = __VLS_27.slots;
    // @ts-ignore
    [unreadCount, Check, handleMarkAllRead,];
    var __VLS_27;
    var __VLS_28;
    // @ts-ignore
    [];
}
let __VLS_32;
/** @ts-ignore @type { | typeof __VLS_components.elTable | typeof __VLS_components.ElTable | typeof __VLS_components['el-table'] | typeof __VLS_components.elTable | typeof __VLS_components.ElTable | typeof __VLS_components['el-table']} */
elTable;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent1(__VLS_32, new __VLS_32({
    data: (__VLS_ctx.notifications),
    stripe: true,
    size: "small",
    emptyText: "暂无通知",
}));
const __VLS_34 = __VLS_33({
    data: (__VLS_ctx.notifications),
    stripe: true,
    size: "small",
    emptyText: "暂无通知",
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
__VLS_asFunctionalDirective(__VLS_directives.vLoading, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.loading) }, null, null);
const { default: __VLS_37 } = __VLS_35.slots;
let __VLS_38;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_39 = __VLS_asFunctionalComponent1(__VLS_38, new __VLS_38({
    label: "类型",
    width: "90",
}));
const __VLS_40 = __VLS_39({
    label: "类型",
    width: "90",
}, ...__VLS_functionalComponentArgsRest(__VLS_39));
const { default: __VLS_43 } = __VLS_41.slots;
{
    const { default: __VLS_44 } = __VLS_41.slots;
    const [{ row }] = __VLS_vSlot(__VLS_44);
    let __VLS_45;
    /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
    elTag;
    // @ts-ignore
    const __VLS_46 = __VLS_asFunctionalComponent1(__VLS_45, new __VLS_45({
        type: (__VLS_ctx.typeTag(row.type)),
        size: "small",
    }));
    const __VLS_47 = __VLS_46({
        type: (__VLS_ctx.typeTag(row.type)),
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_46));
    const { default: __VLS_50 } = __VLS_48.slots;
    (__VLS_ctx.typeLabel[row.type] || row.type);
    // @ts-ignore
    [notifications, vLoading, loading, typeTag, typeLabel,];
    var __VLS_48;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_41;
let __VLS_51;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_52 = __VLS_asFunctionalComponent1(__VLS_51, new __VLS_51({
    label: "标题",
    width: "140",
}));
const __VLS_53 = __VLS_52({
    label: "标题",
    width: "140",
}, ...__VLS_functionalComponentArgsRest(__VLS_52));
const { default: __VLS_56 } = __VLS_54.slots;
{
    const { default: __VLS_57 } = __VLS_54.slots;
    const [{ row }] = __VLS_vSlot(__VLS_57);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ style: ({ fontWeight: row.readStatus ? 'normal' : 'bold' }) },
    });
    (row.title || '-');
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_54;
let __VLS_58;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_59 = __VLS_asFunctionalComponent1(__VLS_58, new __VLS_58({
    label: "内容",
    minWidth: "160",
    showOverflowTooltip: true,
}));
const __VLS_60 = __VLS_59({
    label: "内容",
    minWidth: "160",
    showOverflowTooltip: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_59));
const { default: __VLS_63 } = __VLS_61.slots;
{
    const { default: __VLS_64 } = __VLS_61.slots;
    const [{ row }] = __VLS_vSlot(__VLS_64);
    (row.content || '-');
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_61;
let __VLS_65;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_66 = __VLS_asFunctionalComponent1(__VLS_65, new __VLS_65({
    label: "时间",
    width: "150",
}));
const __VLS_67 = __VLS_66({
    label: "时间",
    width: "150",
}, ...__VLS_functionalComponentArgsRest(__VLS_66));
const { default: __VLS_70 } = __VLS_68.slots;
{
    const { default: __VLS_71 } = __VLS_68.slots;
    const [{ row }] = __VLS_vSlot(__VLS_71);
    (__VLS_ctx.formatTime(row.createdAt));
    // @ts-ignore
    [formatTime,];
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
    width: "150",
    fixed: "right",
}));
const __VLS_74 = __VLS_73({
    label: "操作",
    width: "150",
    fixed: "right",
}, ...__VLS_functionalComponentArgsRest(__VLS_73));
const { default: __VLS_77 } = __VLS_75.slots;
{
    const { default: __VLS_78 } = __VLS_75.slots;
    const [{ row }] = __VLS_vSlot(__VLS_78);
    if (!row.readStatus) {
        let __VLS_79;
        /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
        elButton;
        // @ts-ignore
        const __VLS_80 = __VLS_asFunctionalComponent1(__VLS_79, new __VLS_79({
            ...{ 'onClick': {} },
            size: "small",
            type: "primary",
            link: true,
            icon: (__VLS_ctx.Reading),
        }));
        const __VLS_81 = __VLS_80({
            ...{ 'onClick': {} },
            size: "small",
            type: "primary",
            link: true,
            icon: (__VLS_ctx.Reading),
        }, ...__VLS_functionalComponentArgsRest(__VLS_80));
        let __VLS_84;
        const __VLS_85 = {
            /** @type {typeof __VLS_84.click} */
            onClick: (...[$event]) => {
                if (!(!row.readStatus))
                    return;
                __VLS_ctx.handleMarkRead(row.id);
                // @ts-ignore
                [Reading, handleMarkRead,];
            },
        };
        const { default: __VLS_86 } = __VLS_82.slots;
        // @ts-ignore
        [];
        var __VLS_82;
        var __VLS_83;
    }
    let __VLS_87;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_88 = __VLS_asFunctionalComponent1(__VLS_87, new __VLS_87({
        ...{ 'onClick': {} },
        size: "small",
        type: "danger",
        link: true,
        icon: (__VLS_ctx.Delete),
    }));
    const __VLS_89 = __VLS_88({
        ...{ 'onClick': {} },
        size: "small",
        type: "danger",
        link: true,
        icon: (__VLS_ctx.Delete),
    }, ...__VLS_functionalComponentArgsRest(__VLS_88));
    let __VLS_92;
    const __VLS_93 = {
        /** @type {typeof __VLS_92.click} */
        onClick: (...[$event]) => {
            __VLS_ctx.handleDelete(row.id);
            // @ts-ignore
            [Delete, handleDelete,];
        },
    };
    const { default: __VLS_94 } = __VLS_90.slots;
    // @ts-ignore
    [];
    var __VLS_90;
    var __VLS_91;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_75;
// @ts-ignore
[];
var __VLS_35;
if (__VLS_ctx.total > 10) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ style: {} },
    });
    let __VLS_95;
    /** @ts-ignore @type { | typeof __VLS_components.elPagination | typeof __VLS_components.ElPagination | typeof __VLS_components['el-pagination']} */
    elPagination;
    // @ts-ignore
    const __VLS_96 = __VLS_asFunctionalComponent1(__VLS_95, new __VLS_95({
        ...{ 'onCurrentChange': {} },
        small: true,
        background: true,
        layout: "prev,next",
        total: (__VLS_ctx.total),
        pageSize: (10),
        currentPage: (__VLS_ctx.page),
    }));
    const __VLS_97 = __VLS_96({
        ...{ 'onCurrentChange': {} },
        small: true,
        background: true,
        layout: "prev,next",
        total: (__VLS_ctx.total),
        pageSize: (10),
        currentPage: (__VLS_ctx.page),
    }, ...__VLS_functionalComponentArgsRest(__VLS_96));
    let __VLS_100;
    const __VLS_101 = {
        /** @type {typeof __VLS_100.currentChange} */
        onCurrentChange: (__VLS_ctx.loadData),
    };
    var __VLS_98;
    var __VLS_99;
}
// @ts-ignore
[total, total, page, loadData,];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
