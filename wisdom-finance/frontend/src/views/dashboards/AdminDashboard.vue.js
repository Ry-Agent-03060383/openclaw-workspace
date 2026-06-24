/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, onMounted } from 'vue';
import { useUserStore } from '../../store/user';
import { getDashboardStats } from '../../api/dashboard';
import { useRouter } from 'vue-router';
const userStore = useUserStore();
const router = useRouter();
const stats = ref([
    { label: '用户总数', value: '-', color: '#409EFF' },
    { label: '贷款申请', value: '-', color: '#67C23A' },
    { label: '放款金额', value: '-', color: '#E6A23C' },
    { label: '注册企业', value: '-', color: '#F56C6C' },
    { label: '金融机构', value: '-', color: '#909399' },
    { label: '合作第三方', value: '-', color: '#B37FEB' }
]);
const loading = ref(true);
onMounted(async () => {
    try {
        const res = await getDashboardStats().catch(() => ({ code: 500 }));
        if (res.code === 200 && res.data?.stats)
            stats.value = res.data.stats;
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
        span: (8),
        key: (i),
    }));
    const __VLS_14 = __VLS_13({
        span: (8),
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
            i === 0 ? __VLS_ctx.router.push('/dashboard/user') : __VLS_ctx.router.push('/dashboard/loan');
            // @ts-ignore
            [stats, router, router,];
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
/** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
elCard;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent1(__VLS_32, new __VLS_32({}));
const __VLS_34 = __VLS_33({}, ...__VLS_functionalComponentArgsRest(__VLS_33));
const { default: __VLS_37 } = __VLS_35.slots;
{
    const { header: __VLS_38 } = __VLS_35.slots;
    // @ts-ignore
    [];
}
let __VLS_39;
/** @ts-ignore @type { | typeof __VLS_components.elRow | typeof __VLS_components.ElRow | typeof __VLS_components['el-row'] | typeof __VLS_components.elRow | typeof __VLS_components.ElRow | typeof __VLS_components['el-row']} */
elRow;
// @ts-ignore
const __VLS_40 = __VLS_asFunctionalComponent1(__VLS_39, new __VLS_39({
    gutter: (20),
}));
const __VLS_41 = __VLS_40({
    gutter: (20),
}, ...__VLS_functionalComponentArgsRest(__VLS_40));
const { default: __VLS_44 } = __VLS_42.slots;
let __VLS_45;
/** @ts-ignore @type { | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col'] | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col']} */
elCol;
// @ts-ignore
const __VLS_46 = __VLS_asFunctionalComponent1(__VLS_45, new __VLS_45({
    span: (6),
}));
const __VLS_47 = __VLS_46({
    span: (6),
}, ...__VLS_functionalComponentArgsRest(__VLS_46));
const { default: __VLS_50 } = __VLS_48.slots;
let __VLS_51;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_52 = __VLS_asFunctionalComponent1(__VLS_51, new __VLS_51({
    ...{ 'onClick': {} },
    ...{ style: {} },
}));
const __VLS_53 = __VLS_52({
    ...{ 'onClick': {} },
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_52));
let __VLS_56;
const __VLS_57 = {
    /** @type {typeof __VLS_56.click} */
    onClick: (...[$event]) => {
        __VLS_ctx.router.push('/dashboard/user');
        // @ts-ignore
        [router,];
    },
};
const { default: __VLS_58 } = __VLS_54.slots;
// @ts-ignore
[];
var __VLS_54;
var __VLS_55;
// @ts-ignore
[];
var __VLS_48;
let __VLS_59;
/** @ts-ignore @type { | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col'] | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col']} */
elCol;
// @ts-ignore
const __VLS_60 = __VLS_asFunctionalComponent1(__VLS_59, new __VLS_59({
    span: (6),
}));
const __VLS_61 = __VLS_60({
    span: (6),
}, ...__VLS_functionalComponentArgsRest(__VLS_60));
const { default: __VLS_64 } = __VLS_62.slots;
let __VLS_65;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_66 = __VLS_asFunctionalComponent1(__VLS_65, new __VLS_65({
    ...{ 'onClick': {} },
    ...{ style: {} },
}));
const __VLS_67 = __VLS_66({
    ...{ 'onClick': {} },
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_66));
let __VLS_70;
const __VLS_71 = {
    /** @type {typeof __VLS_70.click} */
    onClick: (...[$event]) => {
        __VLS_ctx.router.push('/dashboard/loan');
        // @ts-ignore
        [router,];
    },
};
const { default: __VLS_72 } = __VLS_68.slots;
// @ts-ignore
[];
var __VLS_68;
var __VLS_69;
// @ts-ignore
[];
var __VLS_62;
let __VLS_73;
/** @ts-ignore @type { | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col'] | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col']} */
elCol;
// @ts-ignore
const __VLS_74 = __VLS_asFunctionalComponent1(__VLS_73, new __VLS_73({
    span: (6),
}));
const __VLS_75 = __VLS_74({
    span: (6),
}, ...__VLS_functionalComponentArgsRest(__VLS_74));
const { default: __VLS_78 } = __VLS_76.slots;
let __VLS_79;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_80 = __VLS_asFunctionalComponent1(__VLS_79, new __VLS_79({
    ...{ 'onClick': {} },
    ...{ style: {} },
}));
const __VLS_81 = __VLS_80({
    ...{ 'onClick': {} },
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_80));
let __VLS_84;
const __VLS_85 = {
    /** @type {typeof __VLS_84.click} */
    onClick: (...[$event]) => {
        __VLS_ctx.router.push('/dashboard/credit');
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
var __VLS_76;
let __VLS_87;
/** @ts-ignore @type { | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col'] | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col']} */
elCol;
// @ts-ignore
const __VLS_88 = __VLS_asFunctionalComponent1(__VLS_87, new __VLS_87({
    span: (6),
}));
const __VLS_89 = __VLS_88({
    span: (6),
}, ...__VLS_functionalComponentArgsRest(__VLS_88));
const { default: __VLS_92 } = __VLS_90.slots;
let __VLS_93;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_94 = __VLS_asFunctionalComponent1(__VLS_93, new __VLS_93({
    ...{ 'onClick': {} },
    ...{ style: {} },
}));
const __VLS_95 = __VLS_94({
    ...{ 'onClick': {} },
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_94));
let __VLS_98;
const __VLS_99 = {
    /** @type {typeof __VLS_98.click} */
    onClick: (...[$event]) => {
        __VLS_ctx.router.push('/dashboard/risk');
        // @ts-ignore
        [router,];
    },
};
const { default: __VLS_100 } = __VLS_96.slots;
// @ts-ignore
[];
var __VLS_96;
var __VLS_97;
// @ts-ignore
[];
var __VLS_90;
let __VLS_101;
/** @ts-ignore @type { | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col'] | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col']} */
elCol;
// @ts-ignore
const __VLS_102 = __VLS_asFunctionalComponent1(__VLS_101, new __VLS_101({
    span: (6),
}));
const __VLS_103 = __VLS_102({
    span: (6),
}, ...__VLS_functionalComponentArgsRest(__VLS_102));
const { default: __VLS_106 } = __VLS_104.slots;
let __VLS_107;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_108 = __VLS_asFunctionalComponent1(__VLS_107, new __VLS_107({
    ...{ 'onClick': {} },
    ...{ style: {} },
}));
const __VLS_109 = __VLS_108({
    ...{ 'onClick': {} },
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_108));
let __VLS_112;
const __VLS_113 = {
    /** @type {typeof __VLS_112.click} */
    onClick: (...[$event]) => {
        __VLS_ctx.router.push('/dashboard/monitoring');
        // @ts-ignore
        [router,];
    },
};
const { default: __VLS_114 } = __VLS_110.slots;
// @ts-ignore
[];
var __VLS_110;
var __VLS_111;
// @ts-ignore
[];
var __VLS_104;
let __VLS_115;
/** @ts-ignore @type { | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col'] | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col']} */
elCol;
// @ts-ignore
const __VLS_116 = __VLS_asFunctionalComponent1(__VLS_115, new __VLS_115({
    span: (6),
}));
const __VLS_117 = __VLS_116({
    span: (6),
}, ...__VLS_functionalComponentArgsRest(__VLS_116));
const { default: __VLS_120 } = __VLS_118.slots;
let __VLS_121;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_122 = __VLS_asFunctionalComponent1(__VLS_121, new __VLS_121({
    ...{ 'onClick': {} },
    ...{ style: {} },
}));
const __VLS_123 = __VLS_122({
    ...{ 'onClick': {} },
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_122));
let __VLS_126;
const __VLS_127 = {
    /** @type {typeof __VLS_126.click} */
    onClick: (...[$event]) => {
        __VLS_ctx.router.push('/dashboard/notification');
        // @ts-ignore
        [router,];
    },
};
const { default: __VLS_128 } = __VLS_124.slots;
// @ts-ignore
[];
var __VLS_124;
var __VLS_125;
// @ts-ignore
[];
var __VLS_118;
let __VLS_129;
/** @ts-ignore @type { | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col'] | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col']} */
elCol;
// @ts-ignore
const __VLS_130 = __VLS_asFunctionalComponent1(__VLS_129, new __VLS_129({
    span: (6),
}));
const __VLS_131 = __VLS_130({
    span: (6),
}, ...__VLS_functionalComponentArgsRest(__VLS_130));
const { default: __VLS_134 } = __VLS_132.slots;
let __VLS_135;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_136 = __VLS_asFunctionalComponent1(__VLS_135, new __VLS_135({
    ...{ 'onClick': {} },
    ...{ style: {} },
}));
const __VLS_137 = __VLS_136({
    ...{ 'onClick': {} },
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_136));
let __VLS_140;
const __VLS_141 = {
    /** @type {typeof __VLS_140.click} */
    onClick: (...[$event]) => {
        __VLS_ctx.router.push('/dashboard/ai-chat');
        // @ts-ignore
        [router,];
    },
};
const { default: __VLS_142 } = __VLS_138.slots;
// @ts-ignore
[];
var __VLS_138;
var __VLS_139;
// @ts-ignore
[];
var __VLS_132;
// @ts-ignore
[];
var __VLS_42;
// @ts-ignore
[];
var __VLS_35;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
