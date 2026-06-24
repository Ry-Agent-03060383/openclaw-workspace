/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/user';
import { House, User, Coin, Document, WarningFilled, Monitor, ChatDotSquare, Bell, TakeawayBox, EditPen, Tickets, Connection, Collection } from '@element-plus/icons-vue';
const router = useRouter();
const userStore = useUserStore();
const roleMenus = {
    ADMIN: [
        { path: '/dashboard', label: '操控台', icon: House },
        { path: '/dashboard/user', label: '用户管理', icon: User },
        { path: '/dashboard/cms', label: '内容管理', icon: Collection },
        { path: '/dashboard/notification', label: '通知中心', icon: Bell },
        { path: '/dashboard/loan', label: '贷款管理', icon: Coin },
        { path: '/dashboard/credit', label: '征信评级', icon: Document },
        { path: '/dashboard/guarantee', label: '担保管理', icon: TakeawayBox },
        { path: '/dashboard/approval', label: '审批管理', icon: EditPen },
        { path: '/dashboard/risk', label: '风险处置', icon: WarningFilled },
        { path: '/dashboard/monitoring', label: '贷后监控', icon: Monitor },
        { path: '/dashboard/subscription', label: '订阅服务', icon: Tickets },
        { path: '/dashboard/thirdparty', label: '第三方服务', icon: Connection },
        { path: '/dashboard/ai-chat', label: 'AI客服', icon: ChatDotSquare },
    ],
    SME: [
        { path: '/dashboard', label: '操控台', icon: House },
        { path: '/dashboard/notification', label: '通知中心', icon: Bell },
        { path: '/dashboard/loan', label: '贷款申请', icon: Coin },
        { path: '/dashboard/credit', label: '征信评级', icon: Document },
        { path: '/dashboard/ai-chat', label: 'AI客服', icon: ChatDotSquare },
    ],
    FINANCIAL_INSTITUTION: [
        { path: '/dashboard', label: '操控台', icon: House },
        { path: '/dashboard/notification', label: '通知中心', icon: Bell },
        { path: '/dashboard/loan', label: '贷款审核', icon: Coin },
        { path: '/dashboard/credit', label: '企业征信', icon: Document },
        { path: '/dashboard/guarantee', label: '担保管理', icon: TakeawayBox },
        { path: '/dashboard/monitoring', label: '贷后监控', icon: Monitor },
    ],
    FARMER: [
        { path: '/dashboard', label: '操控台', icon: House },
        { path: '/dashboard/notification', label: '通知中心', icon: Bell },
        { path: '/dashboard/loan', label: '贷款申请', icon: Coin },
        { path: '/dashboard/credit', label: '征信评级', icon: Document },
        { path: '/dashboard/ai-chat', label: '政策咨询', icon: ChatDotSquare },
    ],
    GOVERNMENT: [
        { path: '/dashboard', label: '操控台', icon: House },
        { path: '/dashboard/notification', label: '通知中心', icon: Bell },
        { path: '/dashboard/loan', label: '贷款数据', icon: Coin },
        { path: '/dashboard/credit', label: '区域征信', icon: Document },
        { path: '/dashboard/monitoring', label: '区域监控', icon: Monitor },
    ],
    RISK_MANAGER: [
        { path: '/dashboard', label: '操控台', icon: House },
        { path: '/dashboard/notification', label: '通知中心', icon: Bell },
        { path: '/dashboard/loan', label: '贷款审核', icon: Coin },
        { path: '/dashboard/credit', label: '企业征信', icon: Document },
        { path: '/dashboard/approval', label: '审批管理', icon: EditPen },
        { path: '/dashboard/risk', label: '风险处置', icon: WarningFilled },
    ],
    GUARANTEE_INSTITUTION: [
        { path: '/dashboard', label: '操控台', icon: House },
        { path: '/dashboard/notification', label: '通知中心', icon: Bell },
        { path: '/dashboard/loan', label: '贷款查询', icon: Coin },
        { path: '/dashboard/credit', label: '征信查询', icon: Document },
        { path: '/dashboard/guarantee', label: '担保管理', icon: TakeawayBox },
        { path: '/dashboard/monitoring', label: '贷后监控', icon: Monitor },
        { path: '/dashboard/ai-chat', label: 'AI客服', icon: ChatDotSquare },
    ],
    THIRD_PARTY: [
        { path: '/dashboard', label: '操控台', icon: House },
        { path: '/dashboard/notification', label: '通知中心', icon: Bell },
        { path: '/dashboard/loan', label: '服务订单', icon: Coin },
        { path: '/dashboard/credit', label: '征信查询', icon: Document },
        { path: '/dashboard/ai-chat', label: '客服', icon: ChatDotSquare },
    ],
};
const menuItems = computed(() => roleMenus[userStore.userType] || roleMenus.ADMIN);
function handleLogout() {
    userStore.logout();
    router.push('/');
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.elContainer | typeof __VLS_components.ElContainer | typeof __VLS_components['el-container'] | typeof __VLS_components.elContainer | typeof __VLS_components.ElContainer | typeof __VLS_components['el-container']} */
elContainer;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ style: {} },
}));
const __VLS_2 = __VLS_1({
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
const { default: __VLS_6 } = __VLS_3.slots;
let __VLS_7;
/** @ts-ignore @type { | typeof __VLS_components.elAside | typeof __VLS_components.ElAside | typeof __VLS_components['el-aside'] | typeof __VLS_components.elAside | typeof __VLS_components.ElAside | typeof __VLS_components['el-aside']} */
elAside;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    width: "220px",
    ...{ style: {} },
}));
const __VLS_9 = __VLS_8({
    width: "220px",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
const { default: __VLS_12 } = __VLS_10.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ style: {} },
});
let __VLS_13;
/** @ts-ignore @type { | typeof __VLS_components.elMenu | typeof __VLS_components.ElMenu | typeof __VLS_components['el-menu'] | typeof __VLS_components.elMenu | typeof __VLS_components.ElMenu | typeof __VLS_components['el-menu']} */
elMenu;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
    defaultActive: (__VLS_ctx.router.currentRoute.value.path),
    backgroundColor: "#304156",
    textColor: "#bfcbd9",
    activeTextColor: "#409EFF",
    router: true,
    ...{ style: {} },
}));
const __VLS_15 = __VLS_14({
    defaultActive: (__VLS_ctx.router.currentRoute.value.path),
    backgroundColor: "#304156",
    textColor: "#bfcbd9",
    activeTextColor: "#409EFF",
    router: true,
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
const { default: __VLS_18 } = __VLS_16.slots;
for (const [item] of __VLS_vFor((__VLS_ctx.menuItems))) {
    let __VLS_19;
    /** @ts-ignore @type { | typeof __VLS_components.elMenuItem | typeof __VLS_components.ElMenuItem | typeof __VLS_components['el-menu-item'] | typeof __VLS_components.elMenuItem | typeof __VLS_components.ElMenuItem | typeof __VLS_components['el-menu-item']} */
    elMenuItem;
    // @ts-ignore
    const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
        key: (item.path),
        index: (item.path),
    }));
    const __VLS_21 = __VLS_20({
        key: (item.path),
        index: (item.path),
    }, ...__VLS_functionalComponentArgsRest(__VLS_20));
    const { default: __VLS_24 } = __VLS_22.slots;
    let __VLS_25;
    /** @ts-ignore @type { | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon'] | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon']} */
    elIcon;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({}));
    const __VLS_27 = __VLS_26({}, ...__VLS_functionalComponentArgsRest(__VLS_26));
    const { default: __VLS_30 } = __VLS_28.slots;
    const __VLS_31 = (item.icon);
    // @ts-ignore
    const __VLS_32 = __VLS_asFunctionalComponent1(__VLS_31, new __VLS_31({}));
    const __VLS_33 = __VLS_32({}, ...__VLS_functionalComponentArgsRest(__VLS_32));
    // @ts-ignore
    [router, menuItems,];
    var __VLS_28;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (item.label);
    // @ts-ignore
    [];
    var __VLS_22;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_16;
// @ts-ignore
[];
var __VLS_10;
let __VLS_36;
/** @ts-ignore @type { | typeof __VLS_components.elContainer | typeof __VLS_components.ElContainer | typeof __VLS_components['el-container'] | typeof __VLS_components.elContainer | typeof __VLS_components.ElContainer | typeof __VLS_components['el-container']} */
elContainer;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({}));
const __VLS_38 = __VLS_37({}, ...__VLS_functionalComponentArgsRest(__VLS_37));
const { default: __VLS_41 } = __VLS_39.slots;
let __VLS_42;
/** @ts-ignore @type { | typeof __VLS_components.elHeader | typeof __VLS_components.ElHeader | typeof __VLS_components['el-header'] | typeof __VLS_components.elHeader | typeof __VLS_components.ElHeader | typeof __VLS_components['el-header']} */
elHeader;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent1(__VLS_42, new __VLS_42({
    ...{ style: {} },
}));
const __VLS_44 = __VLS_43({
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
const { default: __VLS_47 } = __VLS_45.slots;
let __VLS_48;
/** @ts-ignore @type { | typeof __VLS_components.elDropdown | typeof __VLS_components.ElDropdown | typeof __VLS_components['el-dropdown'] | typeof __VLS_components.elDropdown | typeof __VLS_components.ElDropdown | typeof __VLS_components['el-dropdown']} */
elDropdown;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent1(__VLS_48, new __VLS_48({
    ...{ 'onCommand': {} },
}));
const __VLS_50 = __VLS_49({
    ...{ 'onCommand': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_49));
let __VLS_53;
const __VLS_54 = {
    /** @type {typeof __VLS_53.command} */
    onCommand: (__VLS_ctx.handleLogout),
};
const { default: __VLS_55 } = __VLS_51.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ style: {} },
});
let __VLS_56;
/** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
elTag;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent1(__VLS_56, new __VLS_56({
    size: "small",
    type: "warning",
    ...{ style: {} },
}));
const __VLS_58 = __VLS_57({
    size: "small",
    type: "warning",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_57));
const { default: __VLS_61 } = __VLS_59.slots;
(__VLS_ctx.userStore.roleName);
// @ts-ignore
[handleLogout, userStore,];
var __VLS_59;
(__VLS_ctx.userStore.username);
let __VLS_62;
/** @ts-ignore @type { | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon'] | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon']} */
elIcon;
// @ts-ignore
const __VLS_63 = __VLS_asFunctionalComponent1(__VLS_62, new __VLS_62({}));
const __VLS_64 = __VLS_63({}, ...__VLS_functionalComponentArgsRest(__VLS_63));
const { default: __VLS_67 } = __VLS_65.slots;
let __VLS_68;
/** @ts-ignore @type { | typeof __VLS_components.User} */
User;
// @ts-ignore
const __VLS_69 = __VLS_asFunctionalComponent1(__VLS_68, new __VLS_68({}));
const __VLS_70 = __VLS_69({}, ...__VLS_functionalComponentArgsRest(__VLS_69));
// @ts-ignore
[userStore,];
var __VLS_65;
{
    const { dropdown: __VLS_73 } = __VLS_51.slots;
    let __VLS_74;
    /** @ts-ignore @type { | typeof __VLS_components.elDropdownMenu | typeof __VLS_components.ElDropdownMenu | typeof __VLS_components['el-dropdown-menu'] | typeof __VLS_components.elDropdownMenu | typeof __VLS_components.ElDropdownMenu | typeof __VLS_components['el-dropdown-menu']} */
    elDropdownMenu;
    // @ts-ignore
    const __VLS_75 = __VLS_asFunctionalComponent1(__VLS_74, new __VLS_74({}));
    const __VLS_76 = __VLS_75({}, ...__VLS_functionalComponentArgsRest(__VLS_75));
    const { default: __VLS_79 } = __VLS_77.slots;
    let __VLS_80;
    /** @ts-ignore @type { | typeof __VLS_components.elDropdownItem | typeof __VLS_components.ElDropdownItem | typeof __VLS_components['el-dropdown-item'] | typeof __VLS_components.elDropdownItem | typeof __VLS_components.ElDropdownItem | typeof __VLS_components['el-dropdown-item']} */
    elDropdownItem;
    // @ts-ignore
    const __VLS_81 = __VLS_asFunctionalComponent1(__VLS_80, new __VLS_80({
        command: "logout",
    }));
    const __VLS_82 = __VLS_81({
        command: "logout",
    }, ...__VLS_functionalComponentArgsRest(__VLS_81));
    const { default: __VLS_85 } = __VLS_83.slots;
    // @ts-ignore
    [];
    var __VLS_83;
    // @ts-ignore
    [];
    var __VLS_77;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_51;
var __VLS_52;
// @ts-ignore
[];
var __VLS_45;
let __VLS_86;
/** @ts-ignore @type { | typeof __VLS_components.elMain | typeof __VLS_components.ElMain | typeof __VLS_components['el-main'] | typeof __VLS_components.elMain | typeof __VLS_components.ElMain | typeof __VLS_components['el-main']} */
elMain;
// @ts-ignore
const __VLS_87 = __VLS_asFunctionalComponent1(__VLS_86, new __VLS_86({
    ...{ style: {} },
}));
const __VLS_88 = __VLS_87({
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_87));
const { default: __VLS_91 } = __VLS_89.slots;
let __VLS_92;
/** @ts-ignore @type { | typeof __VLS_components.routerView | typeof __VLS_components.RouterView | typeof __VLS_components['router-view']} */
routerView;
// @ts-ignore
const __VLS_93 = __VLS_asFunctionalComponent1(__VLS_92, new __VLS_92({}));
const __VLS_94 = __VLS_93({}, ...__VLS_functionalComponentArgsRest(__VLS_93));
// @ts-ignore
[];
var __VLS_89;
// @ts-ignore
[];
var __VLS_39;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
