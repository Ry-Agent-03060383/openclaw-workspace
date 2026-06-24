<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCmsById, createCms, updateCms, CATEGORY_OPTIONS, type CmsRequest } from '../../api/cms'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()

const isEdit = ref(false)
const saving = ref(false)

const form = ref<CmsRequest>({
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
})

const bodyHtml = ref('')

/** Quill 全局对象（从 CDN 加载） */
declare var Quill: any
const quillLoaded = ref(false)
const quillInstance = ref<any>(null)

/** 从 CDN 加载 Quill */
function loadQuill() {
  return new Promise<void>((resolve) => {
    if ((window as any).Quill) {
      quillLoaded.value = true
      resolve()
      return
    }
    // CSS
    const link = document.createElement('link')
    link.href = 'https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
    // JS
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.min.js'
    script.onload = () => {
      quillLoaded.value = true
      resolve()
    }
    document.body.appendChild(script)
  })
}

/** 初始化 Quill */
async function initEditor(html: string) {
  await loadQuill()
  // 等待 DOM 渲染
  await new Promise(r => setTimeout(r, 50))
  const container = document.getElementById('quill-container')
  if (!container || quillInstance.value) return

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
  })

  // 设置内容
  quillInstance.value.root.innerHTML = html || ''

  // 监听变化
  quillInstance.value.on('text-change', () => {
    bodyHtml.value = quillInstance.value.root.innerHTML
  })

  bodyHtml.value = quillInstance.value.root.innerHTML
}

onMounted(async () => {
  const id = route.params.id
  if (id) {
    isEdit.value = true
    try {
      const res = await getCmsById(Number(id))
      const item = res?.data
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
        }
        const html = (item.body || ['']).join('\n\n---\n\n')
        await nextTick()
        await initEditor(html)
      }
    } catch {
      ElMessage.error('加载内容失败')
      router.push('/dashboard/cms')
    }
  } else {
    // 新建：直接初始化空白编辑器
    await nextTick()
    await initEditor('')
  }
})

import { nextTick } from 'vue'

function getSections(): string[] {
  return bodyHtml.value
    .split(/\n\s*---\s*\n/)
    .map(s => s.trim())
    .filter(s => s.length > 0)
}

function addMeta() {
  form.value.meta.push({ key: '', value: '' })
}

function removeMeta(index: number) {
  if (form.value.meta.length > 1) form.value.meta.splice(index, 1)
}

function addRelated() {
  form.value.related.push({ label: '', link: '' })
}

function removeRelated(index: number) {
  if (form.value.related.length > 1) form.value.related.splice(index, 1)
}

async function save() {
  if (!form.value.type.trim() || !form.value.title.trim()) {
    ElMessage.warning('类型标识和标题为必填')
    return
  }

  // 从 Quill 获取最新内容
  if (quillInstance.value) {
    bodyHtml.value = quillInstance.value.root.innerHTML
  }

  // 分割段落
  const sections = getSections()
  form.value.body = sections.length > 0 ? sections : [bodyHtml.value || '']

  saving.value = true
  try {
    if (isEdit.value) {
      const id = Number(route.params.id)
      await updateCms(id, form.value)
      ElMessage.success('更新成功')
    } else {
      await createCms(form.value)
      ElMessage.success('创建成功')
    }
    router.push('/dashboard/cms')
  } catch {
    ElMessage.error('保存失败')
  } finally {
    saving.value = false
  }
}

function goBack() {
  router.push('/dashboard/cms')
}
</script>

<template>
  <div class="cms-edit">
    <div class="page-header">
      <el-button @click="goBack" text>← 返回列表</el-button>
      <h2>{{ isEdit ? '编辑内容' : '新建内容' }}</h2>
      <span class="status-badge" v-if="isEdit">ID: {{ route.params.id }}</span>
    </div>

    <el-form :model="form" label-width="100px" class="edit-form">
      <!-- ═══ 基础信息 ═══ -->
      <el-card shadow="never" class="form-section">
        <template #header><span>基础信息</span></template>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="分类">
              <el-select v-model="form.category" style="width:100%">
                <el-option v-for="co in CATEGORY_OPTIONS" :key="co.value" :label="co.label" :value="co.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="排序">
              <el-input-number v-model="form.sortOrder" :min="1" :max="99" style="width:100%" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="图标Emoji">
              <el-input v-model="form.icon" placeholder="🏦" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态">
              <el-radio-group v-model="form.status">
                <el-radio value="PUBLISHED">发布</el-radio>
                <el-radio value="DRAFT">草稿</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="类型标识" required>
          <el-input v-model="form.type" placeholder="financial-products（唯一标识，URL用）" />
        </el-form-item>
        <el-form-item label="标题" required>
          <el-input v-model="form.title" placeholder="如：金融产品" />
        </el-form-item>
        <el-form-item label="副标题">
          <el-input v-model="form.subtitle" placeholder="如：汇聚全市银行·担保·小贷优质产品" />
        </el-form-item>
        <el-form-item label="摘要">
          <el-input v-model="form.summary" type="textarea" :rows="2" maxlength="500" show-word-limit />
        </el-form-item>
      </el-card>

      <!-- ═══ 正文 — 所见即所得编辑器 ═══ -->
      <el-card shadow="never" class="form-section editor-card">
        <template #header>
          <span>正文内容</span>
          <span class="section-hint">段落用 <code>---</code> 分隔</span>
        </template>
        <div id="quill-container" class="quill-wrapper" />
        <div class="editor-footer">
          <span> 支持：标题 / 粗体 / 斜体 / 下划线 / 删除线 / 列表 / 超链接</span>
          <span>多段落用 <code>---</code> 分隔，每个段落对应前台一个卡片</span>
        </div>
      </el-card>

      <!-- ═══ 数据指标 ═══ -->
      <el-card shadow="never" class="form-section">
        <template #header>
          <span>数据指标（前台紫色卡片展示）</span>
          <el-button size="small" @click="addMeta" style="float:right">+ 添加</el-button>
        </template>
        <div v-for="(m, i) in form.meta" :key="'m'+i" class="kv-row">
          <span class="kv-index">{{ i + 1 }}</span>
          <el-input v-model="m.key" placeholder="指标名（入驻机构）" style="width:220px" />
          <el-input v-model="m.value" placeholder="指标值（28家）" style="width:220px" />
          <el-button v-if="form.meta.length > 1" type="danger" text @click="removeMeta(i)">✕</el-button>
        </div>
      </el-card>

      <!-- ═══ 相关链接 ═══ -->
      <el-card shadow="never" class="form-section">
        <template #header>
          <span>相关链接</span>
          <el-button size="small" @click="addRelated" style="float:right">+ 添加</el-button>
        </template>
        <div v-for="(r, i) in form.related" :key="'r'+i" class="kv-row">
          <span class="kv-index">{{ i + 1 }}</span>
          <el-input v-model="r.label" placeholder="链接文字（信用体检）" style="width:260px" />
          <el-input v-model="r.link" placeholder="路径（/footer/credit-check）" style="width:300px" />
          <el-button v-if="form.related.length > 1" type="danger" text @click="removeRelated(i)">✕</el-button>
        </div>
      </el-card>

      <!-- ═══ 提交 ═══ -->
      <div class="form-actions">
        <el-button @click="goBack">取消</el-button>
        <el-button type="primary" @click="save" :loading="saving" size="large">
          {{ isEdit ? '保存修改' : '创建内容' }}
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<style scoped>
.cms-edit { padding: 20px; max-width: 960px; }
.page-header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
.page-header h2 { margin: 0; font-size: 20px; color: #1a1a2e; }
.status-badge { font-size: 12px; color: #909399; background: #f0f0f5; padding: 2px 10px; border-radius: 10px; }
.form-section { margin-bottom: 20px; border-radius: 12px; }

/* Quill 编辑器 */
.editor-card { overflow: visible; }
.quill-wrapper { min-height: 320px; }
.editor-card :deep(.ql-editor) {
  min-height: 320px;
  font-size: 15px;
  line-height: 1.8;
}
.editor-card :deep(.ql-toolbar) {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background: #fafafa;
}
.editor-card :deep(.ql-container) {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}
.section-hint { font-size: 12px; color: #909399; margin-left: 16px; }
.section-hint code { background: #f0f0f5; padding: 1px 6px; border-radius: 3px; font-size: 11px; color: #667eea; }
.editor-footer {
  display: flex; gap: 24px; margin-top: 12px;
  font-size: 12px; color: #909399; flex-wrap: wrap;
}
.editor-footer code { background: #f0f0f5; padding: 1px 5px; border-radius: 3px; font-size: 11px; color: #667eea; }

.kv-row { display: flex; gap: 8px; align-items: center; margin-bottom: 8px; }
.kv-index { display: inline-flex; width: 24px; height: 24px; border-radius: 50%; background: #667eea; color: #fff; font-size: 12px; align-items: center; justify-content: center; flex-shrink: 0; }

.form-actions { padding: 20px 0; display: flex; gap: 12px; justify-content: flex-end; }
.form-actions .el-button { min-width: 140px; }
</style>