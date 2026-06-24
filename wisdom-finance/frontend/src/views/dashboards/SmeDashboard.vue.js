/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, onMounted } from 'vue';
import { useUserStore } from '../../store/user';
import { getMyLoans } from '../../api/loan';
import { getDashboardStats } from '../../api/dashboard';
import { useRouter } from 'vue-router';
const userStore = useUserStore();
const router = useRouter();
const stats = ref([
    { label: '进行中贷款', value: '-', color: '#409EFF' },
    { label: '信用评分', value: '-', color: '#67C23A' },
    { label: '历史贷款', value: '-', color: '#E6A23C' },
    { label: '可申请额度', value: '-', color: '#F56C6C' }
]);
const recentLoans = ref([]);
const loading = ref(true);
onMounted(async () => {
    try {
        const [dashRes, loanRes] = await Promise.all([
            getDashboardStats().catch(() => ({ code: 500 })),
            getMyLoans().catch(() => ({ code: 500, data: [] }))
        ]);
        if (dashRes.code === 200 && dashRes.data?.stats)
            stats.value = dashRes.data.stats;
        if (loanRes.code === 200)
            recentLoans.value = loanRes.data || [];
    }
    catch { /* ignore */ }
    loading.value = false;
});
const statusTag = (s) => ({
    SUBMITTED: 'warning', PENDING: 'info', APPROVING: 'warning',
    APPROVED: 'success', REJECTED: 'danger', NEEDS_MANUAL: 'warning'
}[s] || 'info');
const statusLabel = (s) => ({
    SUBMITTED: '已提交', PENDING: '待审核', APPROVING: '审批中',
    APPROVED: '已通过', REJECTED: '已拒绝', NEEDS_MANUAL: '待人工'
}[s] || s);
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
elCard;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ style: {} },
}));
const __VLS_2 = __VLS_1({
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ style: {} },
});
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ style: {} },
});
(__VLS_ctx.userStore.realName || __VLS_ctx.userStore.username);
// @ts-ignore
[userStore, userStore,];
var __VLS_3;
let __VLS_6;
/** @ts-ignore @type { | typeof __VLS_components.elRow | typeof __VLS_components.ElRow | typeof __VLS_components['el-row'] | typeof __VLS_components.elRow | typeof __VLS_components.ElRow | typeof __VLS_components['el-row']} */
elRow;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
    gutter: (20),
}));
const __VLS_8 = __VLS_7({
    gutter: (20),
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
const { default: __VLS_11 } = __VLS_9.slots;
for (const [s, i] of __VLS_vFor((__VLS_ctx.stats))) {
    let __VLS_12;
    /** @ts-ignore @type { | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col'] | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col']} */
    elCol;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
        span: (6),
        key: (i),
    }));
    const __VLS_14 = __VLS_13({
        span: (6),
        key: (i),
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    const { default: __VLS_17 } = __VLS_15.slots;
    let __VLS_18;
    /** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
    elCard;
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
        ...{ 'onClick': {} },
        shadow: "hover",
        ...{ style: {} },
    }));
    const __VLS_20 = __VLS_19({
        ...{ 'onClick': {} },
        shadow: "hover",
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    let __VLS_23;
    const __VLS_24 = {
        /** @type {typeof __VLS_23.click} */
        onClick: (...[$event]) => {
            __VLS_ctx.router.push(i === 1 ? '/dashboard/credit' : '/dashboard/loan');
            // @ts-ignore
            [stats, router,];
        },
    };
    const { default: __VLS_25 } = __VLS_21.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ style: {} },
    });
    let __VLS_26;
    /** @ts-ignore @type { | typeof __VLS_components.elAvatar | typeof __VLS_components.ElAvatar | typeof __VLS_components['el-avatar'] | typeof __VLS_components.elAvatar | typeof __VLS_components.ElAvatar | typeof __VLS_components['el-avatar']} */
    elAvatar;
    // @ts-ignore
    const __VLS_27 = __VLS_asFunctionalComponent1(__VLS_26, new __VLS_26({
        shape: "square",
        size: "medium",
        ...{ style: ('background:' + s.color) },
    }));
    const __VLS_28 = __VLS_27({
        shape: "square",
        size: "medium",
        ...{ style: ('background:' + s.color) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_27));
    const { default: __VLS_31 } = __VLS_29.slots;
    (s.label[0]);
    // @ts-ignore
    [];
    var __VLS_29;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ style: {} },
    });
    (s.value);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ style: {} },
    });
    (s.label);
    // @ts-ignore
    [];
    var __VLS_21;
    var __VLS_22;
    // @ts-ignore
    [];
    var __VLS_15;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_9;
let __VLS_32;
/** @ts-ignore @type { | typeof __VLS_components.elRow | typeof __VLS_components.ElRow | typeof __VLS_components['el-row'] | typeof __VLS_components.elRow | typeof __VLS_components.ElRow | typeof __VLS_components['el-row']} */
elRow;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent1(__VLS_32, new __VLS_32({
    gutter: (20),
}));
const __VLS_34 = __VLS_33({
    gutter: (20),
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
const { default: __VLS_37 } = __VLS_35.slots;
let __VLS_38;
/** @ts-ignore @type { | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col'] | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col']} */
elCol;
// @ts-ignore
const __VLS_39 = __VLS_asFunctionalComponent1(__VLS_38, new __VLS_38({
    span: (16),
}));
const __VLS_40 = __VLS_39({
    span: (16),
}, ...__VLS_functionalComponentArgsRest(__VLS_39));
const { default: __VLS_43 } = __VLS_41.slots;
let __VLS_44;
/** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
elCard;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent1(__VLS_44, new __VLS_44({}));
const __VLS_46 = __VLS_45({}, ...__VLS_functionalComponentArgsRest(__VLS_45));
const { default: __VLS_49 } = __VLS_47.slots;
{
    const { header: __VLS_50 } = __VLS_47.slots;
    // @ts-ignore
    [];
}
let __VLS_51;
/** @ts-ignore @type { | typeof __VLS_components.elTable | typeof __VLS_components.ElTable | typeof __VLS_components['el-table'] | typeof __VLS_components.elTable | typeof __VLS_components.ElTable | typeof __VLS_components['el-table']} */
elTable;
// @ts-ignore
const __VLS_52 = __VLS_asFunctionalComponent1(__VLS_51, new __VLS_51({
    data: (__VLS_ctx.recentLoans),
    stripe: true,
    size: "small",
    emptyText: "暂无贷款记录，立即申请",
}));
const __VLS_53 = __VLS_52({
    data: (__VLS_ctx.recentLoans),
    stripe: true,
    size: "small",
    emptyText: "暂无贷款记录，立即申请",
}, ...__VLS_functionalComponentArgsRest(__VLS_52));
__VLS_asFunctionalDirective(__VLS_directives.vLoading, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.loading) }, null, null);
const { default: __VLS_56 } = __VLS_54.slots;
let __VLS_57;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_58 = __VLS_asFunctionalComponent1(__VLS_57, new __VLS_57({
    label: "编号",
    prop: "applicationNo",
    width: "160",
}));
const __VLS_59 = __VLS_58({
    label: "编号",
    prop: "applicationNo",
    width: "160",
}, ...__VLS_functionalComponentArgsRest(__VLS_58));
let __VLS_62;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_63 = __VLS_asFunctionalComponent1(__VLS_62, new __VLS_62({
    label: "金额",
    width: "120",
}));
const __VLS_64 = __VLS_63({
    label: "金额",
    width: "120",
}, ...__VLS_functionalComponentArgsRest(__VLS_63));
const { default: __VLS_67 } = __VLS_65.slots;
{
    const { default: __VLS_68 } = __VLS_65.slots;
    const [{ row }] = __VLS_vSlot(__VLS_68);
    (row.loanAmount?.toLocaleString() || '-');
    // @ts-ignore
    [recentLoans, vLoading, loading,];
}
// @ts-ignore
[];
var __VLS_65;
let __VLS_69;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_70 = __VLS_asFunctionalComponent1(__VLS_69, new __VLS_69({
    label: "状态",
    width: "110",
}));
const __VLS_71 = __VLS_70({
    label: "状态",
    width: "110",
}, ...__VLS_functionalComponentArgsRest(__VLS_70));
const { default: __VLS_74 } = __VLS_72.slots;
{
    const { default: __VLS_75 } = __VLS_72.slots;
    const [{ row }] = __VLS_vSlot(__VLS_75);
    let __VLS_76;
    /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
    elTag;
    // @ts-ignore
    const __VLS_77 = __VLS_asFunctionalComponent1(__VLS_76, new __VLS_76({
        type: (__VLS_ctx.statusTag(row.status)),
        size: "small",
    }));
    const __VLS_78 = __VLS_77({
        type: (__VLS_ctx.statusTag(row.status)),
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_77));
    const { default: __VLS_81 } = __VLS_79.slots;
    (__VLS_ctx.statusLabel(row.status));
    // @ts-ignore
    [statusTag, statusLabel,];
    var __VLS_79;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_72;
let __VLS_82;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_83 = __VLS_asFunctionalComponent1(__VLS_82, new __VLS_82({
    label: "时间",
    width: "170",
}));
const __VLS_84 = __VLS_83({
    label: "时间",
    width: "170",
}, ...__VLS_functionalComponentArgsRest(__VLS_83));
const { default: __VLS_87 } = __VLS_85.slots;
{
    const { default: __VLS_88 } = __VLS_85.slots;
    const [{ row }] = __VLS_vSlot(__VLS_88);
    (row.createdAt?.substring(0, 10) || '-');
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_85;
// @ts-ignore
[];
var __VLS_54;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ style: {} },
});
let __VLS_89;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_90 = __VLS_asFunctionalComponent1(__VLS_89, new __VLS_89({
    ...{ 'onClick': {} },
    type: "primary",
}));
const __VLS_91 = __VLS_90({
    ...{ 'onClick': {} },
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_90));
let __VLS_94;
const __VLS_95 = {
    /** @type {typeof __VLS_94.click} */
    onClick: (...[$event]) => {
        __VLS_ctx.router.push('/dashboard/loan');
        // @ts-ignore
        [router,];
    },
};
const { default: __VLS_96 } = __VLS_92.slots;
// @ts-ignore
[];
var __VLS_92;
var __VLS_93;
// @ts-ignore
[];
var __VLS_47;
// @ts-ignore
[];
var __VLS_41;
let __VLS_97;
/** @ts-ignore @type { | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col'] | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col']} */
elCol;
// @ts-ignore
const __VLS_98 = __VLS_asFunctionalComponent1(__VLS_97, new __VLS_97({
    span: (8),
}));
const __VLS_99 = __VLS_98({
    span: (8),
}, ...__VLS_functionalComponentArgsRest(__VLS_98));
const { default: __VLS_102 } = __VLS_100.slots;
let __VLS_103;
/** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
elCard;
// @ts-ignore
const __VLS_104 = __VLS_asFunctionalComponent1(__VLS_103, new __VLS_103({}));
const __VLS_105 = __VLS_104({}, ...__VLS_functionalComponentArgsRest(__VLS_104));
const { default: __VLS_108 } = __VLS_106.slots;
{
    const { header: __VLS_109 } = __VLS_106.slots;
    // @ts-ignore
    [];
}
let __VLS_110;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_111 = __VLS_asFunctionalComponent1(__VLS_110, new __VLS_110({
    ...{ 'onClick': {} },
    ...{ style: {} },
}));
const __VLS_112 = __VLS_111({
    ...{ 'onClick': {} },
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_111));
let __VLS_115;
const __VLS_116 = {
    /** @type {typeof __VLS_115.click} */
    onClick: (...[$event]) => {
        __VLS_ctx.router.push('/dashboard/loan');
        // @ts-ignore
        [router,];
    },
};
const { default: __VLS_117 } = __VLS_113.slots;
// @ts-ignore
[];
var __VLS_113;
var __VLS_114;
let __VLS_118;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_119 = __VLS_asFunctionalComponent1(__VLS_118, new __VLS_118({
    ...{ 'onClick': {} },
    ...{ style: {} },
}));
const __VLS_120 = __VLS_119({
    ...{ 'onClick': {} },
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_119));
let __VLS_123;
const __VLS_124 = {
    /** @type {typeof __VLS_123.click} */
    onClick: (...[$event]) => {
        __VLS_ctx.router.push('/dashboard/credit');
        // @ts-ignore
        [router,];
    },
};
const { default: __VLS_125 } = __VLS_121.slots;
// @ts-ignore
[];
var __VLS_121;
var __VLS_122;
let __VLS_126;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_127 = __VLS_asFunctionalComponent1(__VLS_126, new __VLS_126({
    ...{ 'onClick': {} },
    ...{ style: {} },
}));
const __VLS_128 = __VLS_127({
    ...{ 'onClick': {} },
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_127));
let __VLS_131;
const __VLS_132 = {
    /** @type {typeof __VLS_131.click} */
    onClick: (...[$event]) => {
        __VLS_ctx.router.push('/dashboard/monitoring');
        // @ts-ignore
        [router,];
    },
};
const { default: __VLS_133 } = __VLS_129.slots;
// @ts-ignore
[];
var __VLS_129;
var __VLS_130;
let __VLS_134;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_135 = __VLS_asFunctionalComponent1(__VLS_134, new __VLS_134({
    ...{ 'onClick': {} },
    ...{ style: {} },
}));
const __VLS_136 = __VLS_135({
    ...{ 'onClick': {} },
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_135));
let __VLS_139;
const __VLS_140 = {
    /** @type {typeof __VLS_139.click} */
    onClick: (...[$event]) => {
        __VLS_ctx.router.push('/dashboard/ai-chat');
        // @ts-ignore
        [router,];
    },
};
const { default: __VLS_141 } = __VLS_137.slots;
// @ts-ignore
[];
var __VLS_137;
var __VLS_138;
// @ts-ignore
[];
var __VLS_106;
// @ts-ignore
[];
var __VLS_100;
// @ts-ignore
[];
var __VLS_35;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
