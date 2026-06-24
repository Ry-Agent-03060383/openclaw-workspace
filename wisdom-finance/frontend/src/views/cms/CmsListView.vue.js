/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getCmsListByCategory, getCmsList, deleteCms, CATEGORY_OPTIONS, getCategoryLabel } from '../../api/cms';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Plus, Edit, Delete, Refresh } from '@element-plus/icons-vue';
const router = useRouter();
const activeCategory = ref('');
const items = ref([]);
const loading = ref(false);
const filteredItems = computed(() => {
    if (!activeCategory.value)
        return items.value;
    return items.value.filter(i => i.category === activeCategory.value);
});
async function loadAll() {
    loading.value = true;
    try {
        const res = await getCmsList();
        items.value = res?.data || [];
    }
    catch {
        items.value = [];
    }
    finally {
        loading.value = false;
    }
}
async function loadByCategory() {
    loading.value = true;
    try {
        const res = await getCmsListByCategory(activeCategory.value);
        items.value = res?.data || [];
    }
    catch {
        items.value = [];
    }
    finally {
        loading.value = false;
    }
}
function loadData() {
    if (activeCategory.value) {
        loadByCategory();
    }
    else {
        loadAll();
    }
}
function onCategoryChange(cat) {
    activeCategory.value = cat;
    loadData();
}
function goEdit(id) {
    if (id)
        router.push(`/dashboard/cms/edit/${id}`);
    else
        router.push('/dashboard/cms/create');
}
async function handleDelete(id, title) {
    try {
        await ElMessageBox.confirm(`确定删除「${title}」吗？`, '确认删除', { type: 'warning' });
        await deleteCms(id);
        ElMessage.success('删除成功');
        loadData();
    }
    catch {
        // cancelled
    }
}
const categoryCounts = computed(() => {
    const map = {};
    for (const item of items.value) {
        map[item.category] = (map[item.category] || 0) + 1;
    }
    return map;
});
onMounted(loadAll);
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "cms-manage" },
});
/** @type {__VLS_StyleScopedClasses['cms-manage']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "page-header" },
});
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "header-actions" },
});
/** @type {__VLS_StyleScopedClasses['header-actions']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    icon: (__VLS_ctx.Refresh),
    size: "small",
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    icon: (__VLS_ctx.Refresh),
    size: "small",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = {
    /** @type {typeof __VLS_5.click} */
    onClick: (__VLS_ctx.loadData),
};
const { default: __VLS_7 } = __VLS_3.slots;
// @ts-ignore
[Refresh, loadData,];
var __VLS_3;
var __VLS_4;
let __VLS_8;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent1(__VLS_8, new __VLS_8({
    ...{ 'onClick': {} },
    type: "primary",
    icon: (__VLS_ctx.Plus),
}));
const __VLS_10 = __VLS_9({
    ...{ 'onClick': {} },
    type: "primary",
    icon: (__VLS_ctx.Plus),
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_13;
const __VLS_14 = {
    /** @type {typeof __VLS_13.click} */
    onClick: (...[$event]) => {
        __VLS_ctx.goEdit();
        // @ts-ignore
        [Plus, goEdit,];
    },
};
const { default: __VLS_15 } = __VLS_11.slots;
// @ts-ignore
[];
var __VLS_11;
var __VLS_12;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "category-tabs" },
});
/** @type {__VLS_StyleScopedClasses['category-tabs']} */ ;
let __VLS_16;
/** @ts-ignore @type { | typeof __VLS_components.elTabs | typeof __VLS_components.ElTabs | typeof __VLS_components['el-tabs'] | typeof __VLS_components.elTabs | typeof __VLS_components.ElTabs | typeof __VLS_components['el-tabs']} */
elTabs;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent1(__VLS_16, new __VLS_16({
    ...{ 'onTabChange': {} },
    modelValue: (__VLS_ctx.activeCategory),
}));
const __VLS_18 = __VLS_17({
    ...{ 'onTabChange': {} },
    modelValue: (__VLS_ctx.activeCategory),
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
let __VLS_21;
const __VLS_22 = {
    /** @type {typeof __VLS_21.tabChange} */
    onTabChange: (__VLS_ctx.onCategoryChange),
};
const { default: __VLS_23 } = __VLS_19.slots;
let __VLS_24;
/** @ts-ignore @type { | typeof __VLS_components.elTabPane | typeof __VLS_components.ElTabPane | typeof __VLS_components['el-tab-pane']} */
elTabPane;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({
    label: "全部",
    name: "",
}));
const __VLS_26 = __VLS_25({
    label: "全部",
    name: "",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
for (const [co] of __VLS_vFor((__VLS_ctx.CATEGORY_OPTIONS))) {
    let __VLS_29;
    /** @ts-ignore @type { | typeof __VLS_components.elTabPane | typeof __VLS_components.ElTabPane | typeof __VLS_components['el-tab-pane']} */
    elTabPane;
    // @ts-ignore
    const __VLS_30 = __VLS_asFunctionalComponent1(__VLS_29, new __VLS_29({
        key: (co.value),
        label: (`${co.label} (${__VLS_ctx.categoryCounts[co.value] || 0})`),
        name: (co.value),
    }));
    const __VLS_31 = __VLS_30({
        key: (co.value),
        label: (`${co.label} (${__VLS_ctx.categoryCounts[co.value] || 0})`),
        name: (co.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_30));
    // @ts-ignore
    [activeCategory, onCategoryChange, CATEGORY_OPTIONS, categoryCounts,];
}
// @ts-ignore
[];
var __VLS_19;
var __VLS_20;
let __VLS_34;
/** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
elCard;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent1(__VLS_34, new __VLS_34({
    shadow: "never",
    ...{ class: "list-card" },
}));
const __VLS_36 = __VLS_35({
    shadow: "never",
    ...{ class: "list-card" },
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
/** @type {__VLS_StyleScopedClasses['list-card']} */ ;
const { default: __VLS_39 } = __VLS_37.slots;
let __VLS_40;
/** @ts-ignore @type { | typeof __VLS_components.elTable | typeof __VLS_components.ElTable | typeof __VLS_components['el-table'] | typeof __VLS_components.elTable | typeof __VLS_components.ElTable | typeof __VLS_components['el-table']} */
elTable;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent1(__VLS_40, new __VLS_40({
    data: (__VLS_ctx.filteredItems),
    stripe: true,
    ...{ style: {} },
}));
const __VLS_42 = __VLS_41({
    data: (__VLS_ctx.filteredItems),
    stripe: true,
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
__VLS_asFunctionalDirective(__VLS_directives.vLoading, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.loading) }, null, null);
const { default: __VLS_45 } = __VLS_43.slots;
let __VLS_46;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_47 = __VLS_asFunctionalComponent1(__VLS_46, new __VLS_46({
    label: "排序",
    prop: "sortOrder",
    width: "60",
    align: "center",
}));
const __VLS_48 = __VLS_47({
    label: "排序",
    prop: "sortOrder",
    width: "60",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_47));
let __VLS_51;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_52 = __VLS_asFunctionalComponent1(__VLS_51, new __VLS_51({
    label: "图标",
    width: "60",
    align: "center",
}));
const __VLS_53 = __VLS_52({
    label: "图标",
    width: "60",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_52));
const { default: __VLS_56 } = __VLS_54.slots;
{
    const { default: __VLS_57 } = __VLS_54.slots;
    const [{ row }] = __VLS_vSlot(__VLS_57);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ style: {} },
    });
    (row.icon);
    // @ts-ignore
    [filteredItems, vLoading, loading,];
}
// @ts-ignore
[];
var __VLS_54;
let __VLS_58;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_59 = __VLS_asFunctionalComponent1(__VLS_58, new __VLS_58({
    label: "分类",
    width: "100",
}));
const __VLS_60 = __VLS_59({
    label: "分类",
    width: "100",
}, ...__VLS_functionalComponentArgsRest(__VLS_59));
const { default: __VLS_63 } = __VLS_61.slots;
{
    const { default: __VLS_64 } = __VLS_61.slots;
    const [{ row }] = __VLS_vSlot(__VLS_64);
    (__VLS_ctx.getCategoryLabel(row.category));
    // @ts-ignore
    [getCategoryLabel,];
}
// @ts-ignore
[];
var __VLS_61;
let __VLS_65;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_66 = __VLS_asFunctionalComponent1(__VLS_65, new __VLS_65({
    label: "类型标识",
    prop: "type",
    width: "160",
}));
const __VLS_67 = __VLS_66({
    label: "类型标识",
    prop: "type",
    width: "160",
}, ...__VLS_functionalComponentArgsRest(__VLS_66));
let __VLS_70;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_71 = __VLS_asFunctionalComponent1(__VLS_70, new __VLS_70({
    label: "标题",
    prop: "title",
    minWidth: "160",
    showOverflowTooltip: true,
}));
const __VLS_72 = __VLS_71({
    label: "标题",
    prop: "title",
    minWidth: "160",
    showOverflowTooltip: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_71));
let __VLS_75;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_76 = __VLS_asFunctionalComponent1(__VLS_75, new __VLS_75({
    label: "副标题",
    prop: "subtitle",
    minWidth: "200",
    showOverflowTooltip: true,
}));
const __VLS_77 = __VLS_76({
    label: "副标题",
    prop: "subtitle",
    minWidth: "200",
    showOverflowTooltip: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_76));
const { default: __VLS_80 } = __VLS_78.slots;
{
    const { default: __VLS_81 } = __VLS_78.slots;
    const [{ row }] = __VLS_vSlot(__VLS_81);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "subtitle-text" },
    });
    /** @type {__VLS_StyleScopedClasses['subtitle-text']} */ ;
    (row.subtitle || '-');
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_78;
let __VLS_82;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_83 = __VLS_asFunctionalComponent1(__VLS_82, new __VLS_82({
    label: "状态",
    width: "80",
    align: "center",
}));
const __VLS_84 = __VLS_83({
    label: "状态",
    width: "80",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_83));
const { default: __VLS_87 } = __VLS_85.slots;
{
    const { default: __VLS_88 } = __VLS_85.slots;
    const [{ row }] = __VLS_vSlot(__VLS_88);
    let __VLS_89;
    /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
    elTag;
    // @ts-ignore
    const __VLS_90 = __VLS_asFunctionalComponent1(__VLS_89, new __VLS_89({
        type: (row.status === 'PUBLISHED' ? 'success' : 'info'),
        size: "small",
    }));
    const __VLS_91 = __VLS_90({
        type: (row.status === 'PUBLISHED' ? 'success' : 'info'),
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_90));
    const { default: __VLS_94 } = __VLS_92.slots;
    (row.status === 'PUBLISHED' ? '已发布' : '草稿');
    // @ts-ignore
    [];
    var __VLS_92;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_85;
let __VLS_95;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_96 = __VLS_asFunctionalComponent1(__VLS_95, new __VLS_95({
    label: "更新时间",
    width: "160",
}));
const __VLS_97 = __VLS_96({
    label: "更新时间",
    width: "160",
}, ...__VLS_functionalComponentArgsRest(__VLS_96));
const { default: __VLS_100 } = __VLS_98.slots;
{
    const { default: __VLS_101 } = __VLS_98.slots;
    const [{ row }] = __VLS_vSlot(__VLS_101);
    (row.updatedAt?.substring(0, 16) || '-');
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_98;
let __VLS_102;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_103 = __VLS_asFunctionalComponent1(__VLS_102, new __VLS_102({
    label: "操作",
    width: "140",
    fixed: "right",
}));
const __VLS_104 = __VLS_103({
    label: "操作",
    width: "140",
    fixed: "right",
}, ...__VLS_functionalComponentArgsRest(__VLS_103));
const { default: __VLS_107 } = __VLS_105.slots;
{
    const { default: __VLS_108 } = __VLS_105.slots;
    const [{ row }] = __VLS_vSlot(__VLS_108);
    let __VLS_109;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_110 = __VLS_asFunctionalComponent1(__VLS_109, new __VLS_109({
        ...{ 'onClick': {} },
        size: "small",
        icon: (__VLS_ctx.Edit),
        circle: true,
    }));
    const __VLS_111 = __VLS_110({
        ...{ 'onClick': {} },
        size: "small",
        icon: (__VLS_ctx.Edit),
        circle: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_110));
    let __VLS_114;
    const __VLS_115 = {
        /** @type {typeof __VLS_114.click} */
        onClick: (...[$event]) => {
            __VLS_ctx.goEdit(row.id);
            // @ts-ignore
            [goEdit, Edit,];
        },
    };
    var __VLS_112;
    var __VLS_113;
    let __VLS_116;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_117 = __VLS_asFunctionalComponent1(__VLS_116, new __VLS_116({
        ...{ 'onClick': {} },
        size: "small",
        type: "danger",
        icon: (__VLS_ctx.Delete),
        circle: true,
    }));
    const __VLS_118 = __VLS_117({
        ...{ 'onClick': {} },
        size: "small",
        type: "danger",
        icon: (__VLS_ctx.Delete),
        circle: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_117));
    let __VLS_121;
    const __VLS_122 = {
        /** @type {typeof __VLS_121.click} */
        onClick: (...[$event]) => {
            __VLS_ctx.handleDelete(row.id, row.title);
            // @ts-ignore
            [Delete, handleDelete,];
        },
    };
    var __VLS_119;
    var __VLS_120;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_105;
// @ts-ignore
[];
var __VLS_43;
// @ts-ignore
[];
var __VLS_37;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
