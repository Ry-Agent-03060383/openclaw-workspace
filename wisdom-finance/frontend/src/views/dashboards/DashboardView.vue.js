/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { computed } from 'vue';
import { useUserStore } from '../../store/user';
const userStore = useUserStore();
const roleComponent = computed(() => {
    const role = userStore.userType || '';
    if (role.includes('ADMIN') || role.includes('admin'))
        return 'AdminDashboard';
    if (role.includes('BANK') || role.includes('bank'))
        return 'BankDashboard';
    if (role.includes('ENTERPRISE') || role.includes('enterprise') || role.includes('SME'))
        return 'SmeDashboard';
    if (role.includes('FARMER') || role.includes('farmer'))
        return 'FarmerDashboard';
    if (role.includes('GOV') || role.includes('gov'))
        return 'GovDashboard';
    if (role.includes('RISK') || role.includes('risk'))
        return 'RiskDashboard';
    if (role.includes('THIRD') || role.includes('third'))
        return 'ThirdPartyDashboard';
    return 'SmeDashboard';
});
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
const __VLS_0 = (__VLS_ctx.roleComponent);
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
var __VLS_3;
// @ts-ignore
[roleComponent,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
