/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getCmsById, createCms, updateCms, CATEGORY_OPTIONS } from '../../api/cms';
import { ElMessage } from 'element-plus';
const route = useRoute();
const router = useRouter();
const isEdit = ref(false);
const saving = ref(false);
const form = ref({
    category: 'PLATFORM',
    type: '',
    title: '',
    subtitle: '',
    icon: '',
    summary: '',
    body: [''],
    meta: [{ key: '', value: '' }],
    related: [{ label: '', link: '' }],
    sortOrder: 1,
    status: 'PUBLISHED'
});
const bodyHtml = ref('');
const editorRef = ref(null);
const quillLoaded = ref(false);
const quillInstance = ref(null);
/** 从 CDN 加载 Quill */
function loadQuill() {
    return new Promise((resolve) => {
        if (window.Quill) {
            quillLoaded.value = true;
            resolve();
            return;
        }
        // CSS
        const link = document.createElement('link');
        link.href = 'https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        // JS
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.min.js';
        script.onload = () => {
            quillLoaded.value = true;
            resolve();
        };
        document.body.appendChild(script);
    });
}
/** 初始化 Quill */
async function initEditor(html) {
    await loadQuill();
    // 等待 DOM 渲染
    await new Promise(r => setTimeout(r, 50));
    const container = document.getElementById('quill-container');
    if (!container || quillInstance.value)
        return;
    quillInstance.value = new Quill(container, {
        theme: 'snow',
        placeholder: '在此编写内容...',
        modules: {
            toolbar: [
                [{ header: [false, 1, 2, 3] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['link', 'code-block'],
                ['clean']
            ]
        }
    });
    // 设置内容
    quillInstance.value.root.innerHTML = html || '';
    // 监听变化
    quillInstance.value.on('text-change', () => {
        bodyHtml.value = quillInstance.value.root.innerHTML;
    });
    bodyHtml.value = quillInstance.value.root.innerHTML;
}
onMounted(async () => {
    const id = route.params.id;
    if (id) {
        isEdit.value = true;
        try {
            const res = await getCmsById(Number(id));
            const item = res?.data;
            if (item) {
                form.value = {
                    category: item.category,
                    type: item.type,
                    title: item.title,
                    subtitle: item.subtitle || '',
                    icon: item.icon || '',
                    summary: item.summary || '',
                    body: item.body?.length ? item.body : [''],
                    meta: item.meta?.length ? item.meta : [{ key: '', value: '' }],
                    related: item.related?.length ? item.related : [{ label: '', link: '' }],
                    sortOrder: item.sortOrder || 1,
                    status: item.status || 'PUBLISHED'
                };
                const html = (item.body || ['']).join('\n\n---\n\n');
                await nextTick();
                await initEditor(html);
            }
        }
        catch {
            ElMessage.error('加载内容失败');
            router.push('/dashboard/cms');
        }
    }
    else {
        // 新建：直接初始化空白编辑器
        await nextTick();
        await initEditor('');
    }
});
import { nextTick } from 'vue';
function getSections() {
    return bodyHtml.value
        .split(/\n\s*---\s*\n/)
        .map(s => s.trim())
        .filter(s => s.length > 0);
}
function addMeta() {
    form.value.meta.push({ key: '', value: '' });
}
function removeMeta(index) {
    if (form.value.meta.length > 1)
        form.value.meta.splice(index, 1);
}
function addRelated() {
    form.value.related.push({ label: '', link: '' });
}
function removeRelated(index) {
    if (form.value.related.length > 1)
        form.value.related.splice(index, 1);
}
async function save() {
    if (!form.value.type.trim() || !form.value.title.trim()) {
        ElMessage.warning('类型标识和标题为必填');
        return;
    }
    // 从 Quill 获取最新内容
    if (quillInstance.value) {
        bodyHtml.value = quillInstance.value.root.innerHTML;
    }
    // 分割段落
    const sections = getSections();
    form.value.body = sections.length > 0 ? sections : [bodyHtml.value || ''];
    saving.value = true;
    try {
        if (isEdit.value) {
            const id = Number(route.params.id);
            await updateCms(id, form.value);
            ElMessage.success('更新成功');
        }
        else {
            await createCms(form.value);
            ElMessage.success('创建成功');
        }
        router.push('/dashboard/cms');
    }
    catch {
        ElMessage.error('保存失败');
    }
    finally {
        saving.value = false;
    }
}
function goBack() {
    router.push('/dashboard/cms');
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
/** @type {__VLS_StyleScopedClasses['editor-card']} */ ;
/** @type {__VLS_StyleScopedClasses['editor-card']} */ ;
/** @type {__VLS_StyleScopedClasses['editor-card']} */ ;
/** @type {__VLS_StyleScopedClasses['section-hint']} */ ;
/** @type {__VLS_StyleScopedClasses['editor-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['form-actions']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "cms-edit" },
});
/** @type {__VLS_StyleScopedClasses['cms-edit']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "page-header" },
});
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    text: true,
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    text: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = {
    /** @type {typeof __VLS_5.click} */
    onClick: (__VLS_ctx.goBack),
};
const { default: __VLS_7 } = __VLS_3.slots;
// @ts-ignore
[goBack,];
var __VLS_3;
var __VLS_4;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
(__VLS_ctx.isEdit ? '编辑内容' : '新建内容');
if (__VLS_ctx.isEdit) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "status-badge" },
    });
    /** @type {__VLS_StyleScopedClasses['status-badge']} */ ;
    (__VLS_ctx.route.params.id);
}
let __VLS_8;
/** @ts-ignore @type { | typeof __VLS_components.elForm | typeof __VLS_components.ElForm | typeof __VLS_components['el-form'] | typeof __VLS_components.elForm | typeof __VLS_components.ElForm | typeof __VLS_components['el-form']} */
elForm;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent1(__VLS_8, new __VLS_8({
    model: (__VLS_ctx.form),
    labelWidth: "100px",
    ...{ class: "edit-form" },
}));
const __VLS_10 = __VLS_9({
    model: (__VLS_ctx.form),
    labelWidth: "100px",
    ...{ class: "edit-form" },
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
/** @type {__VLS_StyleScopedClasses['edit-form']} */ ;
const { default: __VLS_13 } = __VLS_11.slots;
let __VLS_14;
/** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
elCard;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent1(__VLS_14, new __VLS_14({
    shadow: "never",
    ...{ class: "form-section" },
}));
const __VLS_16 = __VLS_15({
    shadow: "never",
    ...{ class: "form-section" },
}, ...__VLS_functionalComponentArgsRest(__VLS_15));
/** @type {__VLS_StyleScopedClasses['form-section']} */ ;
const { default: __VLS_19 } = __VLS_17.slots;
{
    const { header: __VLS_20 } = __VLS_17.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    // @ts-ignore
    [isEdit, isEdit, route, form,];
}
let __VLS_21;
/** @ts-ignore @type { | typeof __VLS_components.elRow | typeof __VLS_components.ElRow | typeof __VLS_components['el-row'] | typeof __VLS_components.elRow | typeof __VLS_components.ElRow | typeof __VLS_components['el-row']} */
elRow;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent1(__VLS_21, new __VLS_21({
    gutter: (20),
}));
const __VLS_23 = __VLS_22({
    gutter: (20),
}, ...__VLS_functionalComponentArgsRest(__VLS_22));
const { default: __VLS_26 } = __VLS_24.slots;
let __VLS_27;
/** @ts-ignore @type { | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col'] | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col']} */
elCol;
// @ts-ignore
const __VLS_28 = __VLS_asFunctionalComponent1(__VLS_27, new __VLS_27({
    span: (8),
}));
const __VLS_29 = __VLS_28({
    span: (8),
}, ...__VLS_functionalComponentArgsRest(__VLS_28));
const { default: __VLS_32 } = __VLS_30.slots;
let __VLS_33;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_34 = __VLS_asFunctionalComponent1(__VLS_33, new __VLS_33({
    label: "分类",
}));
const __VLS_35 = __VLS_34({
    label: "分类",
}, ...__VLS_functionalComponentArgsRest(__VLS_34));
const { default: __VLS_38 } = __VLS_36.slots;
let __VLS_39;
/** @ts-ignore @type { | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select'] | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select']} */
elSelect;
// @ts-ignore
const __VLS_40 = __VLS_asFunctionalComponent1(__VLS_39, new __VLS_39({
    modelValue: (__VLS_ctx.form.category),
    ...{ style: {} },
}));
const __VLS_41 = __VLS_40({
    modelValue: (__VLS_ctx.form.category),
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_40));
const { default: __VLS_44 } = __VLS_42.slots;
for (const [co] of __VLS_vFor((__VLS_ctx.CATEGORY_OPTIONS))) {
    let __VLS_45;
    /** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
    elOption;
    // @ts-ignore
    const __VLS_46 = __VLS_asFunctionalComponent1(__VLS_45, new __VLS_45({
        key: (co.value),
        label: (co.label),
        value: (co.value),
    }));
    const __VLS_47 = __VLS_46({
        key: (co.value),
        label: (co.label),
        value: (co.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_46));
    // @ts-ignore
    [form, CATEGORY_OPTIONS,];
}
// @ts-ignore
[];
var __VLS_42;
// @ts-ignore
[];
var __VLS_36;
// @ts-ignore
[];
var __VLS_30;
let __VLS_50;
/** @ts-ignore @type { | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col'] | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col']} */
elCol;
// @ts-ignore
const __VLS_51 = __VLS_asFunctionalComponent1(__VLS_50, new __VLS_50({
    span: (4),
}));
const __VLS_52 = __VLS_51({
    span: (4),
}, ...__VLS_functionalComponentArgsRest(__VLS_51));
const { default: __VLS_55 } = __VLS_53.slots;
let __VLS_56;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent1(__VLS_56, new __VLS_56({
    label: "排序",
}));
const __VLS_58 = __VLS_57({
    label: "排序",
}, ...__VLS_functionalComponentArgsRest(__VLS_57));
const { default: __VLS_61 } = __VLS_59.slots;
let __VLS_62;
/** @ts-ignore @type { | typeof __VLS_components.elInputNumber | typeof __VLS_components.ElInputNumber | typeof __VLS_components['el-input-number']} */
elInputNumber;
// @ts-ignore
const __VLS_63 = __VLS_asFunctionalComponent1(__VLS_62, new __VLS_62({
    modelValue: (__VLS_ctx.form.sortOrder),
    min: (1),
    max: (99),
    ...{ style: {} },
}));
const __VLS_64 = __VLS_63({
    modelValue: (__VLS_ctx.form.sortOrder),
    min: (1),
    max: (99),
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_63));
// @ts-ignore
[form,];
var __VLS_59;
// @ts-ignore
[];
var __VLS_53;
let __VLS_67;
/** @ts-ignore @type { | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col'] | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col']} */
elCol;
// @ts-ignore
const __VLS_68 = __VLS_asFunctionalComponent1(__VLS_67, new __VLS_67({
    span: (6),
}));
const __VLS_69 = __VLS_68({
    span: (6),
}, ...__VLS_functionalComponentArgsRest(__VLS_68));
const { default: __VLS_72 } = __VLS_70.slots;
let __VLS_73;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_74 = __VLS_asFunctionalComponent1(__VLS_73, new __VLS_73({
    label: "图标Emoji",
}));
const __VLS_75 = __VLS_74({
    label: "图标Emoji",
}, ...__VLS_functionalComponentArgsRest(__VLS_74));
const { default: __VLS_78 } = __VLS_76.slots;
let __VLS_79;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_80 = __VLS_asFunctionalComponent1(__VLS_79, new __VLS_79({
    modelValue: (__VLS_ctx.form.icon),
    placeholder: "🏦",
}));
const __VLS_81 = __VLS_80({
    modelValue: (__VLS_ctx.form.icon),
    placeholder: "🏦",
}, ...__VLS_functionalComponentArgsRest(__VLS_80));
// @ts-ignore
[form,];
var __VLS_76;
// @ts-ignore
[];
var __VLS_70;
let __VLS_84;
/** @ts-ignore @type { | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col'] | typeof __VLS_components.elCol | typeof __VLS_components.ElCol | typeof __VLS_components['el-col']} */
elCol;
// @ts-ignore
const __VLS_85 = __VLS_asFunctionalComponent1(__VLS_84, new __VLS_84({
    span: (6),
}));
const __VLS_86 = __VLS_85({
    span: (6),
}, ...__VLS_functionalComponentArgsRest(__VLS_85));
const { default: __VLS_89 } = __VLS_87.slots;
let __VLS_90;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_91 = __VLS_asFunctionalComponent1(__VLS_90, new __VLS_90({
    label: "状态",
}));
const __VLS_92 = __VLS_91({
    label: "状态",
}, ...__VLS_functionalComponentArgsRest(__VLS_91));
const { default: __VLS_95 } = __VLS_93.slots;
let __VLS_96;
/** @ts-ignore @type { | typeof __VLS_components.elRadioGroup | typeof __VLS_components.ElRadioGroup | typeof __VLS_components['el-radio-group'] | typeof __VLS_components.elRadioGroup | typeof __VLS_components.ElRadioGroup | typeof __VLS_components['el-radio-group']} */
elRadioGroup;
// @ts-ignore
const __VLS_97 = __VLS_asFunctionalComponent1(__VLS_96, new __VLS_96({
    modelValue: (__VLS_ctx.form.status),
}));
const __VLS_98 = __VLS_97({
    modelValue: (__VLS_ctx.form.status),
}, ...__VLS_functionalComponentArgsRest(__VLS_97));
const { default: __VLS_101 } = __VLS_99.slots;
let __VLS_102;
/** @ts-ignore @type { | typeof __VLS_components.elRadio | typeof __VLS_components.ElRadio | typeof __VLS_components['el-radio'] | typeof __VLS_components.elRadio | typeof __VLS_components.ElRadio | typeof __VLS_components['el-radio']} */
elRadio;
// @ts-ignore
const __VLS_103 = __VLS_asFunctionalComponent1(__VLS_102, new __VLS_102({
    value: "PUBLISHED",
}));
const __VLS_104 = __VLS_103({
    value: "PUBLISHED",
}, ...__VLS_functionalComponentArgsRest(__VLS_103));
const { default: __VLS_107 } = __VLS_105.slots;
// @ts-ignore
[form,];
var __VLS_105;
let __VLS_108;
/** @ts-ignore @type { | typeof __VLS_components.elRadio | typeof __VLS_components.ElRadio | typeof __VLS_components['el-radio'] | typeof __VLS_components.elRadio | typeof __VLS_components.ElRadio | typeof __VLS_components['el-radio']} */
elRadio;
// @ts-ignore
const __VLS_109 = __VLS_asFunctionalComponent1(__VLS_108, new __VLS_108({
    value: "DRAFT",
}));
const __VLS_110 = __VLS_109({
    value: "DRAFT",
}, ...__VLS_functionalComponentArgsRest(__VLS_109));
const { default: __VLS_113 } = __VLS_111.slots;
// @ts-ignore
[];
var __VLS_111;
// @ts-ignore
[];
var __VLS_99;
// @ts-ignore
[];
var __VLS_93;
// @ts-ignore
[];
var __VLS_87;
// @ts-ignore
[];
var __VLS_24;
let __VLS_114;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_115 = __VLS_asFunctionalComponent1(__VLS_114, new __VLS_114({
    label: "类型标识",
    required: true,
}));
const __VLS_116 = __VLS_115({
    label: "类型标识",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_115));
const { default: __VLS_119 } = __VLS_117.slots;
let __VLS_120;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_121 = __VLS_asFunctionalComponent1(__VLS_120, new __VLS_120({
    modelValue: (__VLS_ctx.form.type),
    placeholder: "financial-products（唯一标识，URL用）",
}));
const __VLS_122 = __VLS_121({
    modelValue: (__VLS_ctx.form.type),
    placeholder: "financial-products（唯一标识，URL用）",
}, ...__VLS_functionalComponentArgsRest(__VLS_121));
// @ts-ignore
[form,];
var __VLS_117;
let __VLS_125;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_126 = __VLS_asFunctionalComponent1(__VLS_125, new __VLS_125({
    label: "标题",
    required: true,
}));
const __VLS_127 = __VLS_126({
    label: "标题",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_126));
const { default: __VLS_130 } = __VLS_128.slots;
let __VLS_131;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_132 = __VLS_asFunctionalComponent1(__VLS_131, new __VLS_131({
    modelValue: (__VLS_ctx.form.title),
    placeholder: "如：金融产品",
}));
const __VLS_133 = __VLS_132({
    modelValue: (__VLS_ctx.form.title),
    placeholder: "如：金融产品",
}, ...__VLS_functionalComponentArgsRest(__VLS_132));
// @ts-ignore
[form,];
var __VLS_128;
let __VLS_136;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_137 = __VLS_asFunctionalComponent1(__VLS_136, new __VLS_136({
    label: "副标题",
}));
const __VLS_138 = __VLS_137({
    label: "副标题",
}, ...__VLS_functionalComponentArgsRest(__VLS_137));
const { default: __VLS_141 } = __VLS_139.slots;
let __VLS_142;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_143 = __VLS_asFunctionalComponent1(__VLS_142, new __VLS_142({
    modelValue: (__VLS_ctx.form.subtitle),
    placeholder: "如：汇聚全市银行·担保·小贷优质产品",
}));
const __VLS_144 = __VLS_143({
    modelValue: (__VLS_ctx.form.subtitle),
    placeholder: "如：汇聚全市银行·担保·小贷优质产品",
}, ...__VLS_functionalComponentArgsRest(__VLS_143));
// @ts-ignore
[form,];
var __VLS_139;
let __VLS_147;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_148 = __VLS_asFunctionalComponent1(__VLS_147, new __VLS_147({
    label: "摘要",
}));
const __VLS_149 = __VLS_148({
    label: "摘要",
}, ...__VLS_functionalComponentArgsRest(__VLS_148));
const { default: __VLS_152 } = __VLS_150.slots;
let __VLS_153;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_154 = __VLS_asFunctionalComponent1(__VLS_153, new __VLS_153({
    modelValue: (__VLS_ctx.form.summary),
    type: "textarea",
    rows: (2),
    maxlength: "500",
    showWordLimit: true,
}));
const __VLS_155 = __VLS_154({
    modelValue: (__VLS_ctx.form.summary),
    type: "textarea",
    rows: (2),
    maxlength: "500",
    showWordLimit: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_154));
// @ts-ignore
[form,];
var __VLS_150;
// @ts-ignore
[];
var __VLS_17;
let __VLS_158;
/** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
elCard;
// @ts-ignore
const __VLS_159 = __VLS_asFunctionalComponent1(__VLS_158, new __VLS_158({
    shadow: "never",
    ...{ class: "form-section editor-card" },
}));
const __VLS_160 = __VLS_159({
    shadow: "never",
    ...{ class: "form-section editor-card" },
}, ...__VLS_functionalComponentArgsRest(__VLS_159));
/** @type {__VLS_StyleScopedClasses['form-section']} */ ;
/** @type {__VLS_StyleScopedClasses['editor-card']} */ ;
const { default: __VLS_163 } = __VLS_161.slots;
{
    const { header: __VLS_164 } = __VLS_161.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "section-hint" },
    });
    /** @type {__VLS_StyleScopedClasses['section-hint']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.code, __VLS_intrinsics.code)({});
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    id: "quill-container",
    ...{ class: "quill-wrapper" },
});
/** @type {__VLS_StyleScopedClasses['quill-wrapper']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "editor-footer" },
});
/** @type {__VLS_StyleScopedClasses['editor-footer']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.code, __VLS_intrinsics.code)({});
// @ts-ignore
[];
var __VLS_161;
let __VLS_165;
/** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
elCard;
// @ts-ignore
const __VLS_166 = __VLS_asFunctionalComponent1(__VLS_165, new __VLS_165({
    shadow: "never",
    ...{ class: "form-section" },
}));
const __VLS_167 = __VLS_166({
    shadow: "never",
    ...{ class: "form-section" },
}, ...__VLS_functionalComponentArgsRest(__VLS_166));
/** @type {__VLS_StyleScopedClasses['form-section']} */ ;
const { default: __VLS_170 } = __VLS_168.slots;
{
    const { header: __VLS_171 } = __VLS_168.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    let __VLS_172;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_173 = __VLS_asFunctionalComponent1(__VLS_172, new __VLS_172({
        ...{ 'onClick': {} },
        size: "small",
        ...{ style: {} },
    }));
    const __VLS_174 = __VLS_173({
        ...{ 'onClick': {} },
        size: "small",
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_173));
    let __VLS_177;
    const __VLS_178 = {
        /** @type {typeof __VLS_177.click} */
        onClick: (__VLS_ctx.addMeta),
    };
    const { default: __VLS_179 } = __VLS_175.slots;
    // @ts-ignore
    [addMeta,];
    var __VLS_175;
    var __VLS_176;
    // @ts-ignore
    [];
}
for (const [m, i] of __VLS_vFor((__VLS_ctx.form.meta))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: ('m' + i),
        ...{ class: "kv-row" },
    });
    /** @type {__VLS_StyleScopedClasses['kv-row']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "kv-index" },
    });
    /** @type {__VLS_StyleScopedClasses['kv-index']} */ ;
    (i + 1);
    let __VLS_180;
    /** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
    elInput;
    // @ts-ignore
    const __VLS_181 = __VLS_asFunctionalComponent1(__VLS_180, new __VLS_180({
        modelValue: (m.key),
        placeholder: "指标名（入驻机构）",
        ...{ style: {} },
    }));
    const __VLS_182 = __VLS_181({
        modelValue: (m.key),
        placeholder: "指标名（入驻机构）",
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_181));
    let __VLS_185;
    /** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
    elInput;
    // @ts-ignore
    const __VLS_186 = __VLS_asFunctionalComponent1(__VLS_185, new __VLS_185({
        modelValue: (m.value),
        placeholder: "指标值（28家）",
        ...{ style: {} },
    }));
    const __VLS_187 = __VLS_186({
        modelValue: (m.value),
        placeholder: "指标值（28家）",
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_186));
    if (__VLS_ctx.form.meta.length > 1) {
        let __VLS_190;
        /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
        elButton;
        // @ts-ignore
        const __VLS_191 = __VLS_asFunctionalComponent1(__VLS_190, new __VLS_190({
            ...{ 'onClick': {} },
            type: "danger",
            text: true,
        }));
        const __VLS_192 = __VLS_191({
            ...{ 'onClick': {} },
            type: "danger",
            text: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_191));
        let __VLS_195;
        const __VLS_196 = {
            /** @type {typeof __VLS_195.click} */
            onClick: (...[$event]) => {
                if (!(__VLS_ctx.form.meta.length > 1))
                    return;
                __VLS_ctx.removeMeta(i);
                // @ts-ignore
                [form, form, removeMeta,];
            },
        };
        const { default: __VLS_197 } = __VLS_193.slots;
        // @ts-ignore
        [];
        var __VLS_193;
        var __VLS_194;
    }
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_168;
let __VLS_198;
/** @ts-ignore @type { | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card'] | typeof __VLS_components.elCard | typeof __VLS_components.ElCard | typeof __VLS_components['el-card']} */
elCard;
// @ts-ignore
const __VLS_199 = __VLS_asFunctionalComponent1(__VLS_198, new __VLS_198({
    shadow: "never",
    ...{ class: "form-section" },
}));
const __VLS_200 = __VLS_199({
    shadow: "never",
    ...{ class: "form-section" },
}, ...__VLS_functionalComponentArgsRest(__VLS_199));
/** @type {__VLS_StyleScopedClasses['form-section']} */ ;
const { default: __VLS_203 } = __VLS_201.slots;
{
    const { header: __VLS_204 } = __VLS_201.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    let __VLS_205;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_206 = __VLS_asFunctionalComponent1(__VLS_205, new __VLS_205({
        ...{ 'onClick': {} },
        size: "small",
        ...{ style: {} },
    }));
    const __VLS_207 = __VLS_206({
        ...{ 'onClick': {} },
        size: "small",
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_206));
    let __VLS_210;
    const __VLS_211 = {
        /** @type {typeof __VLS_210.click} */
        onClick: (__VLS_ctx.addRelated),
    };
    const { default: __VLS_212 } = __VLS_208.slots;
    // @ts-ignore
    [addRelated,];
    var __VLS_208;
    var __VLS_209;
    // @ts-ignore
    [];
}
for (const [r, i] of __VLS_vFor((__VLS_ctx.form.related))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: ('r' + i),
        ...{ class: "kv-row" },
    });
    /** @type {__VLS_StyleScopedClasses['kv-row']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "kv-index" },
    });
    /** @type {__VLS_StyleScopedClasses['kv-index']} */ ;
    (i + 1);
    let __VLS_213;
    /** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
    elInput;
    // @ts-ignore
    const __VLS_214 = __VLS_asFunctionalComponent1(__VLS_213, new __VLS_213({
        modelValue: (r.label),
        placeholder: "链接文字（信用体检）",
        ...{ style: {} },
    }));
    const __VLS_215 = __VLS_214({
        modelValue: (r.label),
        placeholder: "链接文字（信用体检）",
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_214));
    let __VLS_218;
    /** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
    elInput;
    // @ts-ignore
    const __VLS_219 = __VLS_asFunctionalComponent1(__VLS_218, new __VLS_218({
        modelValue: (r.link),
        placeholder: "路径（/footer/credit-check）",
        ...{ style: {} },
    }));
    const __VLS_220 = __VLS_219({
        modelValue: (r.link),
        placeholder: "路径（/footer/credit-check）",
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_219));
    if (__VLS_ctx.form.related.length > 1) {
        let __VLS_223;
        /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
        elButton;
        // @ts-ignore
        const __VLS_224 = __VLS_asFunctionalComponent1(__VLS_223, new __VLS_223({
            ...{ 'onClick': {} },
            type: "danger",
            text: true,
        }));
        const __VLS_225 = __VLS_224({
            ...{ 'onClick': {} },
            type: "danger",
            text: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_224));
        let __VLS_228;
        const __VLS_229 = {
            /** @type {typeof __VLS_228.click} */
            onClick: (...[$event]) => {
                if (!(__VLS_ctx.form.related.length > 1))
                    return;
                __VLS_ctx.removeRelated(i);
                // @ts-ignore
                [form, form, removeRelated,];
            },
        };
        const { default: __VLS_230 } = __VLS_226.slots;
        // @ts-ignore
        [];
        var __VLS_226;
        var __VLS_227;
    }
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_201;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "form-actions" },
});
/** @type {__VLS_StyleScopedClasses['form-actions']} */ ;
let __VLS_231;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_232 = __VLS_asFunctionalComponent1(__VLS_231, new __VLS_231({
    ...{ 'onClick': {} },
}));
const __VLS_233 = __VLS_232({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_232));
let __VLS_236;
const __VLS_237 = {
    /** @type {typeof __VLS_236.click} */
    onClick: (__VLS_ctx.goBack),
};
const { default: __VLS_238 } = __VLS_234.slots;
// @ts-ignore
[goBack,];
var __VLS_234;
var __VLS_235;
let __VLS_239;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_240 = __VLS_asFunctionalComponent1(__VLS_239, new __VLS_239({
    ...{ 'onClick': {} },
    type: "primary",
    loading: (__VLS_ctx.saving),
    size: "large",
}));
const __VLS_241 = __VLS_240({
    ...{ 'onClick': {} },
    type: "primary",
    loading: (__VLS_ctx.saving),
    size: "large",
}, ...__VLS_functionalComponentArgsRest(__VLS_240));
let __VLS_244;
const __VLS_245 = {
    /** @type {typeof __VLS_244.click} */
    onClick: (__VLS_ctx.save),
};
const { default: __VLS_246 } = __VLS_242.slots;
(__VLS_ctx.isEdit ? '保存修改' : '创建内容');
// @ts-ignore
[isEdit, saving, save,];
var __VLS_242;
var __VLS_243;
// @ts-ignore
[];
var __VLS_11;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
