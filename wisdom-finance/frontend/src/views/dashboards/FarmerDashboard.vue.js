/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, onMounted } from 'vue';
import { useUserStore } from '../../store/user';
import { getDashboardStats } from '../../api/dashboard';
import { getMyLoans } from '../../api/loan';
import { Coin, ChatDotSquare } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
const userStore = useUserStore();
const router = useRouter();
const stats = ref([]);
const recentLoans = ref([]);
const loading = ref(true);
onMounted(async () => {
    try {
        const [dashRes, loanRes] = await Promise.all([getDashboardStats(), getMyLoans()]);
        if (dashRes.code === 200)
            stats.value = dashRes.data.stats || [];
        if (loanRes.code === 200)
            recentLoans.value = loanRes.data || [];
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
let __VLS_12;
/** @ts-ignore @type { | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col'] | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col']} */
elCol;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
    span: (12),
}));
const __VLS_14 = __VLS_13({
    span: (12),
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
        __VLS_ctx.router.push('/dashboard/loan');
        // @ts-ignore
        [router,];
    },
};
const { default: __VLS_25 } = __VLS_21.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ style: {} },
});
let __VLS_26;
/** @ts-ignore @type { | typeof __VLS_components.elAvatar | typeof __VLS_components.ElAvatar | typeof __VLS_components['el-avatar']} */
elAvatar;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent1(__VLS_26, new __VLS_26({
    shape: "square",
    size: "large",
    icon: (__VLS_ctx.Coin),
    ...{ style: {} },
}));
const __VLS_28 = __VLS_27({
    shape: "square",
    size: "large",
    icon: (__VLS_ctx.Coin),
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_27));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ style: {} },
});
(__VLS_ctx.stats[0]?.value || '-');
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ style: {} },
});
(__VLS_ctx.stats[0]?.label || '我的贷款');
// @ts-ignore
[Coin, stats, stats,];
var __VLS_21;
var __VLS_22;
// @ts-ignore
[];
var __VLS_15;
let __VLS_31;
/** @ts-ignore @type { | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col'] | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col']} */
elCol;
// @ts-ignore
const __VLS_32 = __VLS_asFunctionalComponent1(__VLS_31, new __VLS_31({
    span: (12),
}));
const __VLS_33 = __VLS_32({
    span: (12),
}, ...__VLS_functionalComponentArgsRest(__VLS_32));
const { default: __VLS_36 } = __VLS_34.slots;
let __VLS_37;
/** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
elCard;
// @ts-ignore
const __VLS_38 = __VLS_asFunctionalComponent1(__VLS_37, new __VLS_37({
    ...{ 'onClick': {} },
    shadow: "hover",
    ...{ style: {} },
}));
const __VLS_39 = __VLS_38({
    ...{ 'onClick': {} },
    shadow: "hover",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_38));
let __VLS_42;
const __VLS_43 = {
    /** @type {typeof __VLS_42.click} */
    onClick: (...[$event]) => {
        __VLS_ctx.router.push('/dashboard/ai-chat');
        // @ts-ignore
        [router,];
    },
};
const { default: __VLS_44 } = __VLS_40.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ style: {} },
});
let __VLS_45;
/** @ts-ignore @type { | typeof __VLS_components.elAvatar | typeof __VLS_components.ElAvatar | typeof __VLS_components['el-avatar']} */
elAvatar;
// @ts-ignore
const __VLS_46 = __VLS_asFunctionalComponent1(__VLS_45, new __VLS_45({
    shape: "square",
    size: "large",
    icon: (__VLS_ctx.ChatDotSquare),
    ...{ style: {} },
}));
const __VLS_47 = __VLS_46({
    shape: "square",
    size: "large",
    icon: (__VLS_ctx.ChatDotSquare),
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_46));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ style: {} },
});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ style: {} },
});
// @ts-ignore
[ChatDotSquare,];
var __VLS_40;
var __VLS_41;
// @ts-ignore
[];
var __VLS_34;
// @ts-ignore
[];
var __VLS_9;
let __VLS_50;
/** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
elCard;
// @ts-ignore
const __VLS_51 = __VLS_asFunctionalComponent1(__VLS_50, new __VLS_50({
    ...{ style: {} },
}));
const __VLS_52 = __VLS_51({
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_51));
const { default: __VLS_55 } = __VLS_53.slots;
{
    const { header: __VLS_56 } = __VLS_53.slots;
    // @ts-ignore
    [];
}
let __VLS_57;
/** @ts-ignore @type { | typeof __VLS_components.elTable | typeof __VLS_components.ElTable | typeof __VLS_components['el-table'] | typeof __VLS_components.elTable | typeof __VLS_components.ElTable | typeof __VLS_components['el-table']} */
elTable;
// @ts-ignore
const __VLS_58 = __VLS_asFunctionalComponent1(__VLS_57, new __VLS_57({
    data: (__VLS_ctx.recentLoans),
    stripe: true,
    size: "small",
}));
const __VLS_59 = __VLS_58({
    data: (__VLS_ctx.recentLoans),
    stripe: true,
    size: "small",
}, ...__VLS_functionalComponentArgsRest(__VLS_58));
__VLS_asFunctionalDirective(__VLS_directives.vLoading, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.loading) }, null, null);
const { default: __VLS_62 } = __VLS_60.slots;
let __VLS_63;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_64 = __VLS_asFunctionalComponent1(__VLS_63, new __VLS_63({
    label: "金额",
}));
const __VLS_65 = __VLS_64({
    label: "金额",
}, ...__VLS_functionalComponentArgsRest(__VLS_64));
const { default: __VLS_68 } = __VLS_66.slots;
{
    const { default: __VLS_69 } = __VLS_66.slots;
    const [{ row }] = __VLS_vSlot(__VLS_69);
    (row.amount);
    // @ts-ignore
    [recentLoans, vLoading, loading,];
}
// @ts-ignore
[];
var __VLS_66;
let __VLS_70;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_71 = __VLS_asFunctionalComponent1(__VLS_70, new __VLS_70({
    label: "状态",
}));
const __VLS_72 = __VLS_71({
    label: "状态",
}, ...__VLS_functionalComponentArgsRest(__VLS_71));
const { default: __VLS_75 } = __VLS_73.slots;
{
    const { default: __VLS_76 } = __VLS_73.slots;
    const [{ row }] = __VLS_vSlot(__VLS_76);
    let __VLS_77;
    /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
    elTag;
    // @ts-ignore
    const __VLS_78 = __VLS_asFunctionalComponent1(__VLS_77, new __VLS_77({
        type: (row.status === 'APPROVED' ? 'success' : row.status === 'REJECTED' ? 'danger' : 'warning'),
        size: "small",
    }));
    const __VLS_79 = __VLS_78({
        type: (row.status === 'APPROVED' ? 'success' : row.status === 'REJECTED' ? 'danger' : 'warning'),
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_78));
    const { default: __VLS_82 } = __VLS_80.slots;
    (row.statusLabel);
    // @ts-ignore
    [];
    var __VLS_80;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_73;
// @ts-ignore
[];
var __VLS_60;
if (!__VLS_ctx.recentLoans.length && !__VLS_ctx.loading) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ style: {} },
    });
}
// @ts-ignore
[recentLoans, loading,];
var __VLS_53;
let __VLS_83;
/** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
elCard;
// @ts-ignore
const __VLS_84 = __VLS_asFunctionalComponent1(__VLS_83, new __VLS_83({
    ...{ style: {} },
}));
const __VLS_85 = __VLS_84({
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_84));
const { default: __VLS_88 } = __VLS_86.slots;
{
    const { header: __VLS_89 } = __VLS_86.slots;
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ style: {} },
});
// @ts-ignore
[];
var __VLS_86;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
