/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { onMounted, reactive, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Search, Refresh, Plus, Edit, Delete, SwitchButton } from '@element-plus/icons-vue';
import { pageUsers, createUser, updateUser, toggleUserStatus, deleteUser } from '../../api/user';
const loading = ref(false);
const query = reactive({ keyword: '', userType: '', status: '', pageNum: 1, pageSize: 10 });
const total = ref(0);
const users = ref([]);
const dialogVisible = ref(false);
const isEdit = ref(false);
const form = reactive({
    id: null,
    username: '',
    password: '',
    realName: '',
    phone: '',
    email: '',
    userType: 'SME',
    status: 'ACTIVE',
});
const userTypeOptions = [
    { value: '', label: '全部' },
    { value: 'SME', label: '中小企业' },
    { value: 'FARMER', label: '农户' },
    { value: 'FINANCIAL_INSTITUTION', label: '金融机构' },
    { value: 'RISK_MANAGER', label: '风控人员' },
    { value: 'ADMIN', label: '管理员' },
    { value: 'GOVERNMENT', label: '政府部门' },
    { value: 'THIRD_PARTY', label: '第三方服务商' },
];
const statusOptions = [
    { value: '', label: '全部' },
    { value: 'ACTIVE', label: '正常' },
    { value: 'DISABLED', label: '禁用' },
];
const userTypeMap = {
    SME: '中小企业', FARMER: '农户', FINANCIAL_INSTITUTION: '金融机构',
    RISK_MANAGER: '风控人员', ADMIN: '管理员', GOVERNMENT: '政府部门', THIRD_PARTY: '第三方服务商',
};
function formatUserType(type) {
    return userTypeMap[type] || type;
}
async function fetchData() {
    loading.value = true;
    try {
        const res = await pageUsers(query);
        if (res.code === 200) {
            users.value = res.data.records;
            total.value = res.data.total;
        }
    }
    finally {
        loading.value = false;
    }
}
function handleSearch() {
    query.pageNum = 1;
    fetchData();
}
function handleReset() {
    query.keyword = '';
    query.userType = '';
    query.status = '';
    query.pageNum = 1;
    fetchData();
}
function openCreate() {
    isEdit.value = false;
    form.id = null;
    form.username = '';
    form.password = '';
    form.realName = '';
    form.phone = '';
    form.email = '';
    form.userType = 'SME';
    dialogVisible.value = true;
}
function openEdit(row) {
    isEdit.value = true;
    form.id = row.id;
    form.username = row.username;
    form.password = '';
    form.realName = row.realName;
    form.phone = row.phone;
    form.email = row.email;
    form.userType = row.userType;
    form.status = row.status;
    dialogVisible.value = true;
}
async function handleSave() {
    try {
        let res;
        if (isEdit.value && form.id) {
            res = await updateUser(form.id, {
                realName: form.realName,
                phone: form.phone,
                email: form.email,
            });
        }
        else {
            res = await createUser({
                username: form.username,
                password: form.password,
                realName: form.realName,
                phone: form.phone,
                email: form.email,
                userType: form.userType,
            });
        }
        if (res.code === 200) {
            ElMessage.success(isEdit.value ? '更新成功' : '创建成功');
            dialogVisible.value = false;
            fetchData();
        }
        else {
            ElMessage.error(res.message);
        }
    }
    catch {
        ElMessage.error('操作失败');
    }
}
async function handleToggleStatus(row) {
    try {
        const res = await toggleUserStatus(row.id);
        if (res.code === 200) {
            ElMessage.success('状态已切换');
            fetchData();
        }
    }
    catch {
        ElMessage.error('操作失败');
    }
}
async function handleDelete(row) {
    try {
        await ElMessageBox.confirm(`确认删除用户「${row.username}」？`, '提示');
        const res = await deleteUser(row.id);
        if (res.code === 200) {
            ElMessage.success('删除成功');
            fetchData();
        }
    }
    catch {
        // cancelled
    }
}
onMounted(fetchData);
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
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
let __VLS_6;
/** @ts-ignore @type { | typeof __VLS_components.elForm | typeof __VLS_components.ElForm | typeof __VLS_components['el-form'] | typeof __VLS_components.elForm | typeof __VLS_components.ElForm | typeof __VLS_components['el-form']} */
elForm;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
    ...{ 'onSubmit': {} },
    model: (__VLS_ctx.query),
    inline: true,
}));
const __VLS_8 = __VLS_7({
    ...{ 'onSubmit': {} },
    model: (__VLS_ctx.query),
    inline: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
let __VLS_11;
const __VLS_12 = {
    /** @type {typeof __VLS_11.submit} */
    onSubmit: (__VLS_ctx.handleSearch),
};
const { default: __VLS_13 } = __VLS_9.slots;
let __VLS_14;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent1(__VLS_14, new __VLS_14({
    label: "关键词",
}));
const __VLS_16 = __VLS_15({
    label: "关键词",
}, ...__VLS_functionalComponentArgsRest(__VLS_15));
const { default: __VLS_19 } = __VLS_17.slots;
let __VLS_20;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent1(__VLS_20, new __VLS_20({
    modelValue: (__VLS_ctx.query.keyword),
    placeholder: "用户名/姓名/手机号",
    clearable: true,
    ...{ style: {} },
}));
const __VLS_22 = __VLS_21({
    modelValue: (__VLS_ctx.query.keyword),
    placeholder: "用户名/姓名/手机号",
    clearable: true,
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
// @ts-ignore
[query, query, handleSearch,];
var __VLS_17;
let __VLS_25;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({
    label: "用户类型",
}));
const __VLS_27 = __VLS_26({
    label: "用户类型",
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
const { default: __VLS_30 } = __VLS_28.slots;
let __VLS_31;
/** @ts-ignore @type { | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select'] | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select']} */
elSelect;
// @ts-ignore
const __VLS_32 = __VLS_asFunctionalComponent1(__VLS_31, new __VLS_31({
    modelValue: (__VLS_ctx.query.userType),
    ...{ style: {} },
    clearable: true,
}));
const __VLS_33 = __VLS_32({
    modelValue: (__VLS_ctx.query.userType),
    ...{ style: {} },
    clearable: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_32));
const { default: __VLS_36 } = __VLS_34.slots;
for (const [o] of __VLS_vFor((__VLS_ctx.userTypeOptions))) {
    let __VLS_37;
    /** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
    elOption;
    // @ts-ignore
    const __VLS_38 = __VLS_asFunctionalComponent1(__VLS_37, new __VLS_37({
        key: (o.value),
        label: (o.label),
        value: (o.value),
    }));
    const __VLS_39 = __VLS_38({
        key: (o.value),
        label: (o.label),
        value: (o.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_38));
    // @ts-ignore
    [query, userTypeOptions,];
}
// @ts-ignore
[];
var __VLS_34;
// @ts-ignore
[];
var __VLS_28;
let __VLS_42;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent1(__VLS_42, new __VLS_42({
    label: "状态",
}));
const __VLS_44 = __VLS_43({
    label: "状态",
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
const { default: __VLS_47 } = __VLS_45.slots;
let __VLS_48;
/** @ts-ignore @type { | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select'] | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select']} */
elSelect;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent1(__VLS_48, new __VLS_48({
    modelValue: (__VLS_ctx.query.status),
    ...{ style: {} },
    clearable: true,
}));
const __VLS_50 = __VLS_49({
    modelValue: (__VLS_ctx.query.status),
    ...{ style: {} },
    clearable: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_49));
const { default: __VLS_53 } = __VLS_51.slots;
for (const [o] of __VLS_vFor((__VLS_ctx.statusOptions))) {
    let __VLS_54;
    /** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
    elOption;
    // @ts-ignore
    const __VLS_55 = __VLS_asFunctionalComponent1(__VLS_54, new __VLS_54({
        key: (o.value),
        label: (o.label),
        value: (o.value),
    }));
    const __VLS_56 = __VLS_55({
        key: (o.value),
        label: (o.label),
        value: (o.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_55));
    // @ts-ignore
    [query, statusOptions,];
}
// @ts-ignore
[];
var __VLS_51;
// @ts-ignore
[];
var __VLS_45;
let __VLS_59;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_60 = __VLS_asFunctionalComponent1(__VLS_59, new __VLS_59({}));
const __VLS_61 = __VLS_60({}, ...__VLS_functionalComponentArgsRest(__VLS_60));
const { default: __VLS_64 } = __VLS_62.slots;
let __VLS_65;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_66 = __VLS_asFunctionalComponent1(__VLS_65, new __VLS_65({
    ...{ 'onClick': {} },
    type: "primary",
    icon: (__VLS_ctx.Search),
}));
const __VLS_67 = __VLS_66({
    ...{ 'onClick': {} },
    type: "primary",
    icon: (__VLS_ctx.Search),
}, ...__VLS_functionalComponentArgsRest(__VLS_66));
let __VLS_70;
const __VLS_71 = {
    /** @type {typeof __VLS_70.click} */
    onClick: (__VLS_ctx.handleSearch),
};
const { default: __VLS_72 } = __VLS_68.slots;
// @ts-ignore
[handleSearch, Search,];
var __VLS_68;
var __VLS_69;
let __VLS_73;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_74 = __VLS_asFunctionalComponent1(__VLS_73, new __VLS_73({
    ...{ 'onClick': {} },
    icon: (__VLS_ctx.Refresh),
}));
const __VLS_75 = __VLS_74({
    ...{ 'onClick': {} },
    icon: (__VLS_ctx.Refresh),
}, ...__VLS_functionalComponentArgsRest(__VLS_74));
let __VLS_78;
const __VLS_79 = {
    /** @type {typeof __VLS_78.click} */
    onClick: (__VLS_ctx.handleReset),
};
const { default: __VLS_80 } = __VLS_76.slots;
// @ts-ignore
[Refresh, handleReset,];
var __VLS_76;
var __VLS_77;
// @ts-ignore
[];
var __VLS_62;
// @ts-ignore
[];
var __VLS_9;
var __VLS_10;
// @ts-ignore
[];
var __VLS_3;
let __VLS_81;
/** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
elCard;
// @ts-ignore
const __VLS_82 = __VLS_asFunctionalComponent1(__VLS_81, new __VLS_81({
    ...{ style: {} },
}));
const __VLS_83 = __VLS_82({
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_82));
const { default: __VLS_86 } = __VLS_84.slots;
{
    const { header: __VLS_87 } = __VLS_84.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ style: {} },
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    let __VLS_88;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_89 = __VLS_asFunctionalComponent1(__VLS_88, new __VLS_88({
        ...{ 'onClick': {} },
        type: "primary",
        icon: (__VLS_ctx.Plus),
    }));
    const __VLS_90 = __VLS_89({
        ...{ 'onClick': {} },
        type: "primary",
        icon: (__VLS_ctx.Plus),
    }, ...__VLS_functionalComponentArgsRest(__VLS_89));
    let __VLS_93;
    const __VLS_94 = {
        /** @type {typeof __VLS_93.click} */
        onClick: (__VLS_ctx.openCreate),
    };
    const { default: __VLS_95 } = __VLS_91.slots;
    // @ts-ignore
    [Plus, openCreate,];
    var __VLS_91;
    var __VLS_92;
    // @ts-ignore
    [];
}
let __VLS_96;
/** @ts-ignore @type { | typeof __VLS_components.elTable | typeof __VLS_components.ElTable | typeof __VLS_components['el-table'] | typeof __VLS_components.elTable | typeof __VLS_components.ElTable | typeof __VLS_components['el-table']} */
elTable;
// @ts-ignore
const __VLS_97 = __VLS_asFunctionalComponent1(__VLS_96, new __VLS_96({
    data: (__VLS_ctx.users),
    stripe: true,
    ...{ style: {} },
}));
const __VLS_98 = __VLS_97({
    data: (__VLS_ctx.users),
    stripe: true,
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_97));
__VLS_asFunctionalDirective(__VLS_directives.vLoading, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.loading) }, null, null);
const { default: __VLS_101 } = __VLS_99.slots;
let __VLS_102;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_103 = __VLS_asFunctionalComponent1(__VLS_102, new __VLS_102({
    prop: "id",
    label: "ID",
    width: "60",
}));
const __VLS_104 = __VLS_103({
    prop: "id",
    label: "ID",
    width: "60",
}, ...__VLS_functionalComponentArgsRest(__VLS_103));
let __VLS_107;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_108 = __VLS_asFunctionalComponent1(__VLS_107, new __VLS_107({
    prop: "username",
    label: "用户名",
    width: "120",
}));
const __VLS_109 = __VLS_108({
    prop: "username",
    label: "用户名",
    width: "120",
}, ...__VLS_functionalComponentArgsRest(__VLS_108));
let __VLS_112;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_113 = __VLS_asFunctionalComponent1(__VLS_112, new __VLS_112({
    prop: "realName",
    label: "真实姓名",
    width: "140",
}));
const __VLS_114 = __VLS_113({
    prop: "realName",
    label: "真实姓名",
    width: "140",
}, ...__VLS_functionalComponentArgsRest(__VLS_113));
let __VLS_117;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_118 = __VLS_asFunctionalComponent1(__VLS_117, new __VLS_117({
    prop: "phone",
    label: "手机号",
    width: "130",
}));
const __VLS_119 = __VLS_118({
    prop: "phone",
    label: "手机号",
    width: "130",
}, ...__VLS_functionalComponentArgsRest(__VLS_118));
let __VLS_122;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_123 = __VLS_asFunctionalComponent1(__VLS_122, new __VLS_122({
    prop: "email",
    label: "邮箱",
    minWidth: "180",
}));
const __VLS_124 = __VLS_123({
    prop: "email",
    label: "邮箱",
    minWidth: "180",
}, ...__VLS_functionalComponentArgsRest(__VLS_123));
let __VLS_127;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_128 = __VLS_asFunctionalComponent1(__VLS_127, new __VLS_127({
    label: "用户类型",
    width: "130",
}));
const __VLS_129 = __VLS_128({
    label: "用户类型",
    width: "130",
}, ...__VLS_functionalComponentArgsRest(__VLS_128));
const { default: __VLS_132 } = __VLS_130.slots;
{
    const { default: __VLS_133 } = __VLS_130.slots;
    const [{ row }] = __VLS_vSlot(__VLS_133);
    if (row.userType === 'ADMIN') {
        let __VLS_134;
        /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
        elTag;
        // @ts-ignore
        const __VLS_135 = __VLS_asFunctionalComponent1(__VLS_134, new __VLS_134({
            size: "small",
            type: "warning",
        }));
        const __VLS_136 = __VLS_135({
            size: "small",
            type: "warning",
        }, ...__VLS_functionalComponentArgsRest(__VLS_135));
        const { default: __VLS_139 } = __VLS_137.slots;
        // @ts-ignore
        [users, vLoading, loading,];
        var __VLS_137;
    }
    else {
        let __VLS_140;
        /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
        elTag;
        // @ts-ignore
        const __VLS_141 = __VLS_asFunctionalComponent1(__VLS_140, new __VLS_140({
            size: "small",
        }));
        const __VLS_142 = __VLS_141({
            size: "small",
        }, ...__VLS_functionalComponentArgsRest(__VLS_141));
        const { default: __VLS_145 } = __VLS_143.slots;
        (__VLS_ctx.formatUserType(row.userType));
        // @ts-ignore
        [formatUserType,];
        var __VLS_143;
    }
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_130;
let __VLS_146;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_147 = __VLS_asFunctionalComponent1(__VLS_146, new __VLS_146({
    label: "状态",
    width: "80",
}));
const __VLS_148 = __VLS_147({
    label: "状态",
    width: "80",
}, ...__VLS_functionalComponentArgsRest(__VLS_147));
const { default: __VLS_151 } = __VLS_149.slots;
{
    const { default: __VLS_152 } = __VLS_149.slots;
    const [{ row }] = __VLS_vSlot(__VLS_152);
    let __VLS_153;
    /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
    elTag;
    // @ts-ignore
    const __VLS_154 = __VLS_asFunctionalComponent1(__VLS_153, new __VLS_153({
        size: "small",
        type: (row.status === 'ACTIVE' ? 'success' : 'danger'),
    }));
    const __VLS_155 = __VLS_154({
        size: "small",
        type: (row.status === 'ACTIVE' ? 'success' : 'danger'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_154));
    const { default: __VLS_158 } = __VLS_156.slots;
    (row.status === 'ACTIVE' ? '正常' : '禁用');
    // @ts-ignore
    [];
    var __VLS_156;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_149;
let __VLS_159;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_160 = __VLS_asFunctionalComponent1(__VLS_159, new __VLS_159({
    label: "操作",
    width: "200",
    fixed: "right",
}));
const __VLS_161 = __VLS_160({
    label: "操作",
    width: "200",
    fixed: "right",
}, ...__VLS_functionalComponentArgsRest(__VLS_160));
const { default: __VLS_164 } = __VLS_162.slots;
{
    const { default: __VLS_165 } = __VLS_162.slots;
    const [{ row }] = __VLS_vSlot(__VLS_165);
    let __VLS_166;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_167 = __VLS_asFunctionalComponent1(__VLS_166, new __VLS_166({
        ...{ 'onClick': {} },
        size: "small",
        icon: (__VLS_ctx.Edit),
    }));
    const __VLS_168 = __VLS_167({
        ...{ 'onClick': {} },
        size: "small",
        icon: (__VLS_ctx.Edit),
    }, ...__VLS_functionalComponentArgsRest(__VLS_167));
    let __VLS_171;
    const __VLS_172 = {
        /** @type {typeof __VLS_171.click} */
        onClick: (...[$event]) => {
            __VLS_ctx.openEdit(row);
            // @ts-ignore
            [Edit, openEdit,];
        },
    };
    const { default: __VLS_173 } = __VLS_169.slots;
    // @ts-ignore
    [];
    var __VLS_169;
    var __VLS_170;
    let __VLS_174;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_175 = __VLS_asFunctionalComponent1(__VLS_174, new __VLS_174({
        ...{ 'onClick': {} },
        size: "small",
        icon: (__VLS_ctx.SwitchButton),
        type: (row.status === 'ACTIVE' ? 'warning' : 'success'),
    }));
    const __VLS_176 = __VLS_175({
        ...{ 'onClick': {} },
        size: "small",
        icon: (__VLS_ctx.SwitchButton),
        type: (row.status === 'ACTIVE' ? 'warning' : 'success'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_175));
    let __VLS_179;
    const __VLS_180 = {
        /** @type {typeof __VLS_179.click} */
        onClick: (...[$event]) => {
            __VLS_ctx.handleToggleStatus(row);
            // @ts-ignore
            [SwitchButton, handleToggleStatus,];
        },
    };
    const { default: __VLS_181 } = __VLS_177.slots;
    (row.status === 'ACTIVE' ? '禁用' : '启用');
    // @ts-ignore
    [];
    var __VLS_177;
    var __VLS_178;
    let __VLS_182;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_183 = __VLS_asFunctionalComponent1(__VLS_182, new __VLS_182({
        ...{ 'onClick': {} },
        size: "small",
        type: "danger",
        icon: (__VLS_ctx.Delete),
    }));
    const __VLS_184 = __VLS_183({
        ...{ 'onClick': {} },
        size: "small",
        type: "danger",
        icon: (__VLS_ctx.Delete),
    }, ...__VLS_functionalComponentArgsRest(__VLS_183));
    let __VLS_187;
    const __VLS_188 = {
        /** @type {typeof __VLS_187.click} */
        onClick: (...[$event]) => {
            __VLS_ctx.handleDelete(row);
            // @ts-ignore
            [Delete, handleDelete,];
        },
    };
    var __VLS_185;
    var __VLS_186;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_162;
// @ts-ignore
[];
var __VLS_99;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ style: {} },
});
let __VLS_189;
/** @ts-ignore @type { | typeof __VLS_components.elPagination | typeof __VLS_components.ElPagination | typeof __VLS_components['el-pagination']} */
elPagination;
// @ts-ignore
const __VLS_190 = __VLS_asFunctionalComponent1(__VLS_189, new __VLS_189({
    ...{ 'onCurrentChange': {} },
    currentPage: (__VLS_ctx.query.pageNum),
    pageSize: (__VLS_ctx.query.pageSize),
    total: (__VLS_ctx.total),
    layout: "total, prev, pager, next",
}));
const __VLS_191 = __VLS_190({
    ...{ 'onCurrentChange': {} },
    currentPage: (__VLS_ctx.query.pageNum),
    pageSize: (__VLS_ctx.query.pageSize),
    total: (__VLS_ctx.total),
    layout: "total, prev, pager, next",
}, ...__VLS_functionalComponentArgsRest(__VLS_190));
let __VLS_194;
const __VLS_195 = {
    /** @type {typeof __VLS_194.currentChange} */
    onCurrentChange: (__VLS_ctx.fetchData),
};
var __VLS_192;
var __VLS_193;
// @ts-ignore
[query, query, total, fetchData,];
var __VLS_84;
let __VLS_196;
/** @ts-ignore @type { | typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog | typeof __VLS_components['el-dialog'] | typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog | typeof __VLS_components['el-dialog']} */
elDialog;
// @ts-ignore
const __VLS_197 = __VLS_asFunctionalComponent1(__VLS_196, new __VLS_196({
    modelValue: (__VLS_ctx.dialogVisible),
    title: (__VLS_ctx.isEdit ? '编辑用户' : '新增用户'),
    width: "500px",
}));
const __VLS_198 = __VLS_197({
    modelValue: (__VLS_ctx.dialogVisible),
    title: (__VLS_ctx.isEdit ? '编辑用户' : '新增用户'),
    width: "500px",
}, ...__VLS_functionalComponentArgsRest(__VLS_197));
const { default: __VLS_201 } = __VLS_199.slots;
let __VLS_202;
/** @ts-ignore @type { | typeof __VLS_components.elForm | typeof __VLS_components.ElForm | typeof __VLS_components['el-form'] | typeof __VLS_components.elForm | typeof __VLS_components.ElForm | typeof __VLS_components['el-form']} */
elForm;
// @ts-ignore
const __VLS_203 = __VLS_asFunctionalComponent1(__VLS_202, new __VLS_202({
    model: (__VLS_ctx.form),
    labelWidth: "100px",
}));
const __VLS_204 = __VLS_203({
    model: (__VLS_ctx.form),
    labelWidth: "100px",
}, ...__VLS_functionalComponentArgsRest(__VLS_203));
const { default: __VLS_207 } = __VLS_205.slots;
if (!__VLS_ctx.isEdit) {
    let __VLS_208;
    /** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
    elFormItem;
    // @ts-ignore
    const __VLS_209 = __VLS_asFunctionalComponent1(__VLS_208, new __VLS_208({
        label: "用户名",
    }));
    const __VLS_210 = __VLS_209({
        label: "用户名",
    }, ...__VLS_functionalComponentArgsRest(__VLS_209));
    const { default: __VLS_213 } = __VLS_211.slots;
    let __VLS_214;
    /** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
    elInput;
    // @ts-ignore
    const __VLS_215 = __VLS_asFunctionalComponent1(__VLS_214, new __VLS_214({
        modelValue: (__VLS_ctx.form.username),
        placeholder: "登录用户名",
    }));
    const __VLS_216 = __VLS_215({
        modelValue: (__VLS_ctx.form.username),
        placeholder: "登录用户名",
    }, ...__VLS_functionalComponentArgsRest(__VLS_215));
    // @ts-ignore
    [dialogVisible, isEdit, isEdit, form, form,];
    var __VLS_211;
}
if (!__VLS_ctx.isEdit) {
    let __VLS_219;
    /** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
    elFormItem;
    // @ts-ignore
    const __VLS_220 = __VLS_asFunctionalComponent1(__VLS_219, new __VLS_219({
        label: "密码",
    }));
    const __VLS_221 = __VLS_220({
        label: "密码",
    }, ...__VLS_functionalComponentArgsRest(__VLS_220));
    const { default: __VLS_224 } = __VLS_222.slots;
    let __VLS_225;
    /** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
    elInput;
    // @ts-ignore
    const __VLS_226 = __VLS_asFunctionalComponent1(__VLS_225, new __VLS_225({
        modelValue: (__VLS_ctx.form.password),
        type: "password",
        placeholder: "默认 123456",
    }));
    const __VLS_227 = __VLS_226({
        modelValue: (__VLS_ctx.form.password),
        type: "password",
        placeholder: "默认 123456",
    }, ...__VLS_functionalComponentArgsRest(__VLS_226));
    // @ts-ignore
    [isEdit, form,];
    var __VLS_222;
}
let __VLS_230;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_231 = __VLS_asFunctionalComponent1(__VLS_230, new __VLS_230({
    label: "真实姓名",
}));
const __VLS_232 = __VLS_231({
    label: "真实姓名",
}, ...__VLS_functionalComponentArgsRest(__VLS_231));
const { default: __VLS_235 } = __VLS_233.slots;
let __VLS_236;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_237 = __VLS_asFunctionalComponent1(__VLS_236, new __VLS_236({
    modelValue: (__VLS_ctx.form.realName),
}));
const __VLS_238 = __VLS_237({
    modelValue: (__VLS_ctx.form.realName),
}, ...__VLS_functionalComponentArgsRest(__VLS_237));
// @ts-ignore
[form,];
var __VLS_233;
let __VLS_241;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_242 = __VLS_asFunctionalComponent1(__VLS_241, new __VLS_241({
    label: "手机号",
}));
const __VLS_243 = __VLS_242({
    label: "手机号",
}, ...__VLS_functionalComponentArgsRest(__VLS_242));
const { default: __VLS_246 } = __VLS_244.slots;
let __VLS_247;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_248 = __VLS_asFunctionalComponent1(__VLS_247, new __VLS_247({
    modelValue: (__VLS_ctx.form.phone),
}));
const __VLS_249 = __VLS_248({
    modelValue: (__VLS_ctx.form.phone),
}, ...__VLS_functionalComponentArgsRest(__VLS_248));
// @ts-ignore
[form,];
var __VLS_244;
let __VLS_252;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_253 = __VLS_asFunctionalComponent1(__VLS_252, new __VLS_252({
    label: "邮箱",
}));
const __VLS_254 = __VLS_253({
    label: "邮箱",
}, ...__VLS_functionalComponentArgsRest(__VLS_253));
const { default: __VLS_257 } = __VLS_255.slots;
let __VLS_258;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_259 = __VLS_asFunctionalComponent1(__VLS_258, new __VLS_258({
    modelValue: (__VLS_ctx.form.email),
}));
const __VLS_260 = __VLS_259({
    modelValue: (__VLS_ctx.form.email),
}, ...__VLS_functionalComponentArgsRest(__VLS_259));
// @ts-ignore
[form,];
var __VLS_255;
if (!__VLS_ctx.isEdit) {
    let __VLS_263;
    /** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
    elFormItem;
    // @ts-ignore
    const __VLS_264 = __VLS_asFunctionalComponent1(__VLS_263, new __VLS_263({
        label: "用户类型",
    }));
    const __VLS_265 = __VLS_264({
        label: "用户类型",
    }, ...__VLS_functionalComponentArgsRest(__VLS_264));
    const { default: __VLS_268 } = __VLS_266.slots;
    let __VLS_269;
    /** @ts-ignore @type { | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select'] | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select']} */
    elSelect;
    // @ts-ignore
    const __VLS_270 = __VLS_asFunctionalComponent1(__VLS_269, new __VLS_269({
        modelValue: (__VLS_ctx.form.userType),
        ...{ style: {} },
    }));
    const __VLS_271 = __VLS_270({
        modelValue: (__VLS_ctx.form.userType),
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_270));
    const { default: __VLS_274 } = __VLS_272.slots;
    for (const [o] of __VLS_vFor((__VLS_ctx.userTypeOptions.filter(x => x.value)))) {
        let __VLS_275;
        /** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
        elOption;
        // @ts-ignore
        const __VLS_276 = __VLS_asFunctionalComponent1(__VLS_275, new __VLS_275({
            key: (o.value),
            label: (o.label),
            value: (o.value),
        }));
        const __VLS_277 = __VLS_276({
            key: (o.value),
            label: (o.label),
            value: (o.value),
        }, ...__VLS_functionalComponentArgsRest(__VLS_276));
        // @ts-ignore
        [userTypeOptions, isEdit, form,];
    }
    // @ts-ignore
    [];
    var __VLS_272;
    // @ts-ignore
    [];
    var __VLS_266;
}
// @ts-ignore
[];
var __VLS_205;
{
    const { footer: __VLS_280 } = __VLS_199.slots;
    let __VLS_281;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_282 = __VLS_asFunctionalComponent1(__VLS_281, new __VLS_281({
        ...{ 'onClick': {} },
    }));
    const __VLS_283 = __VLS_282({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_282));
    let __VLS_286;
    const __VLS_287 = {
        /** @type {typeof __VLS_286.click} */
        onClick: (...[$event]) => {
            __VLS_ctx.dialogVisible = false;
            // @ts-ignore
            [dialogVisible,];
        },
    };
    const { default: __VLS_288 } = __VLS_284.slots;
    // @ts-ignore
    [];
    var __VLS_284;
    var __VLS_285;
    let __VLS_289;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_290 = __VLS_asFunctionalComponent1(__VLS_289, new __VLS_289({
        ...{ 'onClick': {} },
        type: "primary",
    }));
    const __VLS_291 = __VLS_290({
        ...{ 'onClick': {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_290));
    let __VLS_294;
    const __VLS_295 = {
        /** @type {typeof __VLS_294.click} */
        onClick: (__VLS_ctx.handleSave),
    };
    const { default: __VLS_296 } = __VLS_292.slots;
    // @ts-ignore
    [handleSave,];
    var __VLS_292;
    var __VLS_293;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_199;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
