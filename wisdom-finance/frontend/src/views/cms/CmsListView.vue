<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getCmsListByCategory, getCmsList, deleteCms, CATEGORY_OPTIONS, getCategoryLabel, type CmsContentItem } from '../../api/cms'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Edit, Delete, Refresh } from '@element-plus/icons-vue'

const router = useRouter()

const activeCategory = ref('')
const items = ref<CmsContentItem[]>([])
const loading = ref(false)

const filteredItems = computed(() => {
  if (!activeCategory.value) return items.value
  return items.value.filter(i => i.category === activeCategory.value)
})

async function loadAll() {
  loading.value = true
  try {
    const res = await getCmsList()
    items.value = res?.data || []
  } catch {
    items.value = []
  } finally {
    loading.value = false
  }
}

async function loadByCategory() {
  loading.value = true
  try {
    const res = await getCmsListByCategory(activeCategory.value)
    items.value = res?.data || []
  } catch {
    items.value = []
  } finally {
    loading.value = false
  }
}

function loadData() {
  if (activeCategory.value) {
    loadByCategory()
  } else {
    loadAll()
  }
}

function onCategoryChange(cat: string) {
  activeCategory.value = cat
  loadData()
}

function goEdit(id?: number) {
  if (id) router.push(`/dashboard/cms/edit/${id}`)
  else router.push('/dashboard/cms/create')
}

async function handleDelete(id: number, title: string) {
  try {
    await ElMessageBox.confirm(`确定删除「${title}」吗？`, '确认删除', { type: 'warning' })
    await deleteCms(id)
    ElMessage.success('删除成功')
    loadData()
  } catch {
    // cancelled
  }
}

const categoryCounts = computed(() => {
  const map: Record<string, number> = {}
  for (const item of items.value) {
    map[item.category] = (map[item.category] || 0) + 1
  }
  return map
})

onMounted(loadAll)
</script>

<template>
  <div class="cms-manage">
    <div class="page-header">
      <h2>内容管理</h2>
      <div class="header-actions">
        <el-button @click="loadData" :icon="Refresh" size="small">刷新</el-button>
        <el-button type="primary" @click="goEdit()" :icon="Plus">新建内容</el-button>
      </div>
    </div>

    <!-- 分类Tab -->
    <div class="category-tabs">
      <el-tabs v-model="activeCategory" @tab-change="onCategoryChange">
        <el-tab-pane label="全部" name="" />
        <el-tab-pane v-for="co in CATEGORY_OPTIONS" :key="co.value"
                     :label="`${co.label} (${categoryCounts[co.value] || 0})`"
                     :name="co.value" />
      </el-tabs>
    </div>

    <!-- 内容列表 -->
    <el-card shadow="never" class="list-card">
      <el-table :data="filteredItems" v-loading="loading" stripe style="width:100%">
        <el-table-column label="排序" prop="sortOrder" width="60" align="center" />
        <el-table-column label="图标" width="60" align="center">
          <template #default="{ row }">
            <span style="font-size:22px">{{ row.icon }}</span>
          </template>
        </el-table-column>
        <el-table-column label="分类" width="100">
          <template #default="{ row }">{{ getCategoryLabel(row.category) }}</template>
        </el-table-column>
        <el-table-column label="类型标识" prop="type" width="160" />
        <el-table-column label="标题" prop="title" min-width="160" show-overflow-tooltip />
        <el-table-column label="副标题" prop="subtitle" min-width="200" show-overflow-tooltip>
          <template #default="{ row }">
            <span class="subtitle-text">{{ row.subtitle || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="80" align="center">
          <template #default="{ row }">
            <el-tag :type="row.status === 'PUBLISHED' ? 'success' : 'info'" size="small">
              {{ row.status === 'PUBLISHED' ? '已发布' : '草稿' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" width="160">
          <template #default="{ row }">{{ row.updatedAt?.substring(0, 16) || '-' }}</template>
        </el-table-column>
        <el-table-column label="操作" width="140" fixed="right">
          <template #default="{ row }">
            <el-button size="small" :icon="Edit" @click="goEdit(row.id)" circle />
            <el-button size="small" type="danger" :icon="Delete"
                       @click="handleDelete(row.id!, row.title)" circle />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped>
.cms-manage { padding: 20px; }
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.page-header h2 { margin: 0; font-size: 20px; color: #1a1a2e; }
.header-actions { display: flex; gap: 8px; }
.subtitle-text { color: #909399; font-size: 13px; }
.list-card { border-radius: 12px; }
:deep(.el-tabs__header) { margin-bottom: 16px; }
</style>