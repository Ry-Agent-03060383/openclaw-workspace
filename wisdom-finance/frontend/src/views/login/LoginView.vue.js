/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../store/user';
import { login } from '../../api/auth';
import { ElMessage } from 'element-plus';
import { User, Coin, CreditCard, Cherry, School, WarningFilled, Service } from '@element-plus/icons-vue';
const router = useRouter();
const userStore = useUserStore();
const roles = [
    { key: 'ADMIN', label: '平台管理员', icon: User, color: '#667eea', bg: 'linear-gradient(135deg, #667eea, #764ba2)', cred: { username: 'admin', password: '123456' } },
    { key: 'SME', label: '中小企业', icon: Coin, color: '#43e97b', bg: 'linear-gradient(135deg, #43e97b, #38f9d7)', cred: { username: 'enterprise1', password: '123456' } },
    { key: 'FINANCIAL_INSTITUTION', label: '金融机构', icon: CreditCard, color: '#667eea', bg: 'linear-gradient(135deg, #4facfe, #00f2fe)', cred: { username: 'bank1', password: '123456' } },
    { key: 'FARMER', label: '农户', icon: Cherry, color: '#43e97b', bg: 'linear-gradient(135deg, #a8e063, #56ab2f)', cred: { username: 'farmer1', password: '123456' } },
    { key: 'GOVERNMENT', label: '政府部门', icon: School, color: '#f093fb', bg: 'linear-gradient(135deg, #f093fb, #f5576c)', cred: { username: 'government', password: '123456' } },
    { key: 'RISK_MANAGER', label: '风控人员', icon: WarningFilled, color: '#fa709a', bg: 'linear-gradient(135deg, #fa709a, #fee140)', cred: { username: 'risk', password: '123456' } },
    { key: 'THIRD_PARTY', label: '第三方', icon: Service, color: '#a18cd1', bg: 'linear-gradient(135deg, #a18cd1, #fbc2eb)', cred: { username: 'thirdparty1', password: '123456' } },
];
const selectedRole = ref(roles[0]);
const form = ref({ username: selectedRole.value.cred.username, password: selectedRole.value.cred.password });
const loading = ref(false);
function selectRole(role) {
    selectedRole.value = role;
    form.value = { username: role.cred.username, password: role.cred.password };
}
async function handleLogin() {
    loading.value = true;
    try {
        const res = await login(form.value);
        if (res.code === 200) {
            userStore.setAuth(res.data.token, res.data.user);
            ElMessage.success('登录成功');
            router.push('/dashboard');
        }
        else {
            ElMessage.error(res.message || '登录失败');
        }
    }
    catch {
        ElMessage.error('登录失败');
    }
    finally {
        loading.value = false;
    }
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ style: {} },
});
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
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ style: {} },
});
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ style: {} },
});
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ style: {} },
});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ style: {} },
});
for (const [r] of __VLS_vFor((__VLS_ctx.roles))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.selectRole(r);
                // @ts-ignore
                [roles, selectRole,];
            } },
        key: (r.key),
        ...{ style: ({
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                padding: '8px 0', width: '60px', cursor: 'pointer', borderRadius: '8px',
                transition: 'all .2s',
                background: __VLS_ctx.selectedRole.key === r.key ? r.color + '18' : 'transparent',
                border: __VLS_ctx.selectedRole.key === r.key ? '2px solid ' + r.color : '2px solid transparent',
            }) },
    });
    let __VLS_6;
    /** @ts-ignore @type { | typeof __VLS_components.elAvatar | typeof __VLS_components.ElAvatar | typeof __VLS_components['el-avatar']} */
    elAvatar;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
        icon: (r.icon),
        ...{ style: ({ background: r.color }) },
        size: "small",
        shape: "square",
    }));
    const __VLS_8 = __VLS_7({
        icon: (r.icon),
        ...{ style: ({ background: r.color }) },
        size: "small",
        shape: "square",
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ style: {} },
    });
    (r.label);
    // @ts-ignore
    [selectedRole, selectedRole,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ style: ({ height: '4px', background: __VLS_ctx.selectedRole.bg, borderRadius: '2px', marginBottom: '20px', transition: 'all .3s' }) },
});
let __VLS_11;
/** @ts-ignore @type { | typeof __VLS_components.elForm | typeof __VLS_components.ElForm | typeof __VLS_components['el-form'] | typeof __VLS_components.elForm | typeof __VLS_components.ElForm | typeof __VLS_components['el-form']} */
elForm;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11({
    ...{ 'onSubmit': {} },
    model: (__VLS_ctx.form),
}));
const __VLS_13 = __VLS_12({
    ...{ 'onSubmit': {} },
    model: (__VLS_ctx.form),
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
let __VLS_16;
const __VLS_17 = {
    /** @type {typeof __VLS_16.submit} */
    onSubmit: (__VLS_ctx.handleLogin),
};
const { default: __VLS_18 } = __VLS_14.slots;
let __VLS_19;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({}));
const __VLS_21 = __VLS_20({}, ...__VLS_functionalComponentArgsRest(__VLS_20));
const { default: __VLS_24 } = __VLS_22.slots;
let __VLS_25;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({
    modelValue: (__VLS_ctx.form.username),
    placeholder: "用户名",
    prefixIcon: "User",
}));
const __VLS_27 = __VLS_26({
    modelValue: (__VLS_ctx.form.username),
    placeholder: "用户名",
    prefixIcon: "User",
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
// @ts-ignore
[selectedRole, form, form, handleLogin,];
var __VLS_22;
let __VLS_30;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({}));
const __VLS_32 = __VLS_31({}, ...__VLS_functionalComponentArgsRest(__VLS_31));
const { default: __VLS_35 } = __VLS_33.slots;
let __VLS_36;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({
    modelValue: (__VLS_ctx.form.password),
    type: "password",
    placeholder: "密码",
    prefixIcon: "Lock",
    showPassword: true,
}));
const __VLS_38 = __VLS_37({
    modelValue: (__VLS_ctx.form.password),
    type: "password",
    placeholder: "密码",
    prefixIcon: "Lock",
    showPassword: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
// @ts-ignore
[form,];
var __VLS_33;
let __VLS_41;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_42 = __VLS_asFunctionalComponent1(__VLS_41, new __VLS_41({}));
const __VLS_43 = __VLS_42({}, ...__VLS_functionalComponentArgsRest(__VLS_42));
const { default: __VLS_46 } = __VLS_44.slots;
let __VLS_47;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_48 = __VLS_asFunctionalComponent1(__VLS_47, new __VLS_47({
    ...{ 'onClick': {} },
    ...{ style: ({ width: '100%', background: __VLS_ctx.selectedRole.color, borderColor: __VLS_ctx.selectedRole.color }) },
    loading: (__VLS_ctx.loading),
}));
const __VLS_49 = __VLS_48({
    ...{ 'onClick': {} },
    ...{ style: ({ width: '100%', background: __VLS_ctx.selectedRole.color, borderColor: __VLS_ctx.selectedRole.color }) },
    loading: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_48));
let __VLS_52;
const __VLS_53 = {
    /** @type {typeof __VLS_52.click} */
    onClick: (__VLS_ctx.handleLogin),
};
const { default: __VLS_54 } = __VLS_50.slots;
// @ts-ignore
[selectedRole, selectedRole, handleLogin, loading,];
var __VLS_50;
var __VLS_51;
// @ts-ignore
[];
var __VLS_44;
// @ts-ignore
[];
var __VLS_14;
var __VLS_15;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ style: {} },
});
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
