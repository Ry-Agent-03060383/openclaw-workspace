<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '../../store/user'
import { getNotifications, getUnreadCount, markAsRead, markAllAsRead, deleteNotification } from '../../api/notification'
import { Bell, Delete, Check, Reading } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const userStore = useUserStore()
const notifications = ref<any[]>([])
const unreadCount = ref(0)
const loading = ref(true)
const total = ref(0)
const page = ref(1)

onMounted(async () => { await loadData() })

async function loadData() {
  if (!userStore.userId) return
  loading.value = true
  try {
    const [listRes, countRes]: any = await Promise.all([
      getNotifications(userStore.userId, page.value - 1),
      getUnreadCount(userStore.userId)
    ])
    if (listRes.code === 200) {
      notifications.value = listRes.data.content || []
      total.value = listRes.data.totalElements || 0
    }
    if (countRes.code === 200) unreadCount.value = countRes.data || 0
  } catch { /* ignore */ }
  loading.value = false
}

async function handleMarkRead(id: number) {
  const res: any = await markAsRead(id)
  if (res.code === 200) {
    unreadCount.value = Math.max(0, unreadCount.value - 1)
    await loadData()
  }
}

async function handleMarkAllRead() {
  const res: any = await markAllAsRead(userStore.userId)
  if (res.code === 200) {
    unreadCount.value = 0
    ElMessage.success('全部标记已读')
    await loadData()
  }
}

async function handleDelete(id: number) {
  try {
    await ElMessageBox.confirm('确定删除此通知？', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' })
    const res: any = await deleteNotification(id)
    if (res.code === 200) {
      ElMessage.success('删除成功')
      await loadData()
    }
  } catch { /* cancelled */ }
}

const typeLabel: Record<string, string> = {
  SYSTEM: '系统', APPLICATION_SUBMITTED: '提交', APPLICATION_APPROVED: '通过',
  APPLICATION_REJECTED: '驳回', NEED_MATERIALS: '补充', CREDIT_UPDATED: '征信', RISK_ALERT: '预警'
}

function typeTag(type: string) {
  const map: Record<string, string> = { SYSTEM: 'info', APPLICATION_SUBMITTED: 'primary', APPLICATION_APPROVED: 'success', APPLICATION_REJECTED: 'danger', RISK_ALERT: 'danger', CREDIT_UPDATED: 'success' }
  return map[type] || 'info'
}

function formatTime(t: string) {
  if (!t) return '-'
  return t.substring(0, 19).replace('T', ' ')
}
</script>

<template>
  <div class="notification-view">
    <el-card shadow="never">
      <template #header>
        <div class="header-bar">
          <span><el-icon style="vertical-align:middle;margin-right:6px"><Bell /></el-icon>通知中心 <el-tag v-if="unreadCount" size="small" type="danger">{{ unreadCount }}条未读</el-tag></span>
          <el-button size="small" :icon="Check" @click="handleMarkAllRead" :disabled="unreadCount === 0">全部已读</el-button>
        </div>
      </template>

      <el-table :data="notifications" v-loading="loading" stripe size="small" empty-text="暂无通知">
        <el-table-column label="类型" width="90">
          <template #default="{row}"><el-tag :type="typeTag(row.type)" size="small">{{ typeLabel[row.type] || row.type }}</el-tag></template>
        </el-table-column>
        <el-table-column label="标题" width="140">
          <template #default="{row}">
            <span :style="{fontWeight: row.readStatus ? 'normal' : 'bold'}">{{ row.title || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="内容" min-width="160" show-overflow-tooltip>
          <template #default="{row}">{{ row.content || '-' }}</template>
        </el-table-column>
        <el-table-column label="时间" width="150">
          <template #default="{row}">{{ formatTime(row.createdAt) }}</template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{row}">
            <el-button v-if="!row.readStatus" size="small" type="primary" link :icon="Reading" @click="handleMarkRead(row.id)">标已读</el-button>
            <el-button size="small" type="danger" link :icon="Delete" @click="handleDelete(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div v-if="total > 10" style="text-align:center;padding:12px 0">
        <el-pagination small background layout="prev,next" :total="total" :page-size="10" v-model:current-page="page" @current-change="loadData" />
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.notification-view { max-width: 900px; margin: 0 auto; }
.header-bar { display: flex; justify-content: space-between; align-items: center; }
</style>
