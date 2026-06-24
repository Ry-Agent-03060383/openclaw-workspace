/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, onMounted } from 'vue';
import { useUserStore } from '../../store/user';
import { getDashboardStats } from '../../api/dashboard';
import { getPendingLoans } from '../../api/loan';
import { useRouter } from 'vue-router';
const userStore = useUserStore();
const router = useRouter();
const stats = ref([
    { label: '待审批申请', value: 0, color: '#E6A23C', icon: 'el-icon-document' },
    { label: '已放款金额', value: '0 元', color: '#67C23A', icon: 'el-icon-money' },
    { label: '在贷产品', value: 0, color: '#409EFF', icon: 'el-icon-goods' },
    { label: '本月新申请', value: 0, color: '#F56C6C', icon: 'el-icon-trend' }
]);
const pendingLoans = ref([]);
const loading = ref(true);
onMounted(async () => {
    try {
        const [dashRes, loanRes] = await Promise.all([
            getDashboardStats().catch(() => ({ code: 500 })),
            getPendingLoans().catch(() => ({ code: 500, data: [] }))
        ]);
        if (dashRes.code === 200 && dashRes.data?.stats) {
            stats.value = dashRes.data.stats;
        }
        if (loanRes.code === 200)
            pendingLoans.value = loanRes.data || [];
    }
    catch { /* ignore */ }
    loading.value = false;
});
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
        shadow: "hover",
        ...{ style: {} },
    }));
    const __VLS_20 = __VLS_19({
        shadow: "hover",
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    const { default: __VLS_23 } = __VLS_21.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ style: {} },
    });
    let __VLS_24;
    /** @ts-ignore @type { | typeof __VLS_components.elAvatar | typeof __VLS_components.ElAvatar | typeof __VLS_components['el-avatar'] | typeof __VLS_components.elAvatar | typeof __VLS_components.ElAvatar | typeof __VLS_components['el-avatar']} */
    elAvatar;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({
        shape: "square",
        size: "medium",
        ...{ style: {} },
    }));
    const __VLS_26 = __VLS_25({
        shape: "square",
        size: "medium",
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    const { default: __VLS_29 } = __VLS_27.slots;
    (s.label[0]);
    // @ts-ignore
    [stats,];
    var __VLS_27;
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
    // @ts-ignore
    [];
    var __VLS_15;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_9;
let __VLS_30;
/** @ts-ignore @type { | typeof __VLS_components.elRow | typeof __VLS_components.ElRow | typeof __VLS_components['el-row'] | typeof __VLS_components.elRow | typeof __VLS_components.ElRow | typeof __VLS_components['el-row']} */
elRow;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({
    gutter: (20),
}));
const __VLS_32 = __VLS_31({
    gutter: (20),
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
const { default: __VLS_35 } = __VLS_33.slots;
let __VLS_36;
/** @ts-ignore @type { | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col'] | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col']} */
elCol;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({
    span: (16),
}));
const __VLS_38 = __VLS_37({
    span: (16),
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
const { default: __VLS_41 } = __VLS_39.slots;
let __VLS_42;
/** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
elCard;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent1(__VLS_42, new __VLS_42({}));
const __VLS_44 = __VLS_43({}, ...__VLS_functionalComponentArgsRest(__VLS_43));
const { default: __VLS_47 } = __VLS_45.slots;
{
    const { header: __VLS_48 } = __VLS_45.slots;
    // @ts-ignore
    [];
}
let __VLS_49;
/** @ts-ignore @type { | typeof __VLS_components.elTable | typeof __VLS_components.ElTable | typeof __VLS_components['el-table'] | typeof __VLS_components.elTable | typeof __VLS_components.ElTable | typeof __VLS_components['el-table']} */
elTable;
// @ts-ignore
const __VLS_50 = __VLS_asFunctionalComponent1(__VLS_49, new __VLS_49({
    data: (__VLS_ctx.pendingLoans),
    stripe: true,
    size: "small",
    emptyText: "暂无待审批申请",
}));
const __VLS_51 = __VLS_50({
    data: (__VLS_ctx.pendingLoans),
    stripe: true,
    size: "small",
    emptyText: "暂无待审批申请",
}, ...__VLS_functionalComponentArgsRest(__VLS_50));
__VLS_asFunctionalDirective(__VLS_directives.vLoading, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.loading) }, null, null);
const { default: __VLS_54 } = __VLS_52.slots;
let __VLS_55;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_56 = __VLS_asFunctionalComponent1(__VLS_55, new __VLS_55({
    label: "申请编号",
    prop: "applicationNo",
    width: "160",
}));
const __VLS_57 = __VLS_56({
    label: "申请编号",
    prop: "applicationNo",
    width: "160",
}, ...__VLS_functionalComponentArgsRest(__VLS_56));
let __VLS_60;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_61 = __VLS_asFunctionalComponent1(__VLS_60, new __VLS_60({
    label: "企业",
    prop: "companyName",
}));
const __VLS_62 = __VLS_61({
    label: "企业",
    prop: "companyName",
}, ...__VLS_functionalComponentArgsRest(__VLS_61));
let __VLS_65;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_66 = __VLS_asFunctionalComponent1(__VLS_65, new __VLS_65({
    label: "金额",
    width: "120",
}));
const __VLS_67 = __VLS_66({
    label: "金额",
    width: "120",
}, ...__VLS_functionalComponentArgsRest(__VLS_66));
const { default: __VLS_70 } = __VLS_68.slots;
{
    const { default: __VLS_71 } = __VLS_68.slots;
    const [{ row }] = __VLS_vSlot(__VLS_71);
    (row.loanAmount?.toLocaleString() || '-');
    // @ts-ignore
    [pendingLoans, vLoading, loading,];
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
    width: "180",
}));
const __VLS_74 = __VLS_73({
    label: "操作",
    width: "180",
}, ...__VLS_functionalComponentArgsRest(__VLS_73));
const { default: __VLS_77 } = __VLS_75.slots;
{
    const { default: __VLS_78 } = __VLS_75.slots;
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
            __VLS_ctx.router.push('/dashboard/loan');
            // @ts-ignore
            [router,];
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
var __VLS_52;
// @ts-ignore
[];
var __VLS_45;
// @ts-ignore
[];
var __VLS_39;
let __VLS_87;
/** @ts-ignore @type { | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col'] | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col']} */
elCol;
// @ts-ignore
const __VLS_88 = __VLS_asFunctionalComponent1(__VLS_87, new __VLS_87({
    span: (8),
}));
const __VLS_89 = __VLS_88({
    span: (8),
}, ...__VLS_functionalComponentArgsRest(__VLS_88));
const { default: __VLS_92 } = __VLS_90.slots;
let __VLS_93;
/** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
elCard;
// @ts-ignore
const __VLS_94 = __VLS_asFunctionalComponent1(__VLS_93, new __VLS_93({}));
const __VLS_95 = __VLS_94({}, ...__VLS_functionalComponentArgsRest(__VLS_94));
const { default: __VLS_98 } = __VLS_96.slots;
{
    const { header: __VLS_99 } = __VLS_96.slots;
    // @ts-ignore
    [];
}
let __VLS_100;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_101 = __VLS_asFunctionalComponent1(__VLS_100, new __VLS_100({
    ...{ 'onClick': {} },
    ...{ style: {} },
}));
const __VLS_102 = __VLS_101({
    ...{ 'onClick': {} },
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_101));
let __VLS_105;
const __VLS_106 = {
    /** @type {typeof __VLS_105.click} */
    onClick: (...[$event]) => {
        __VLS_ctx.router.push('/dashboard/loan');
        // @ts-ignore
        [router,];
    },
};
const { default: __VLS_107 } = __VLS_103.slots;
// @ts-ignore
[];
var __VLS_103;
var __VLS_104;
let __VLS_108;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_109 = __VLS_asFunctionalComponent1(__VLS_108, new __VLS_108({
    ...{ 'onClick': {} },
    ...{ style: {} },
}));
const __VLS_110 = __VLS_109({
    ...{ 'onClick': {} },
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_109));
let __VLS_113;
const __VLS_114 = {
    /** @type {typeof __VLS_113.click} */
    onClick: (...[$event]) => {
        __VLS_ctx.router.push('/dashboard/credit');
        // @ts-ignore
        [router,];
    },
};
const { default: __VLS_115 } = __VLS_111.slots;
// @ts-ignore
[];
var __VLS_111;
var __VLS_112;
let __VLS_116;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_117 = __VLS_asFunctionalComponent1(__VLS_116, new __VLS_116({
    ...{ 'onClick': {} },
    ...{ style: {} },
}));
const __VLS_118 = __VLS_117({
    ...{ 'onClick': {} },
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_117));
let __VLS_121;
const __VLS_122 = {
    /** @type {typeof __VLS_121.click} */
    onClick: (...[$event]) => {
        __VLS_ctx.router.push('/dashboard/ai-chat');
        // @ts-ignore
        [router,];
    },
};
const { default: __VLS_123 } = __VLS_119.slots;
// @ts-ignore
[];
var __VLS_119;
var __VLS_120;
// @ts-ignore
[];
var __VLS_96;
// @ts-ignore
[];
var __VLS_90;
// @ts-ignore
[];
var __VLS_33;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
