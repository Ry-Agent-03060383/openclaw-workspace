<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from '../../store/user'
import {
  getServices,
  getUserSubscriptions,
  createSubscription,
  paySubscription,
  cancelSubscription,
  renewSubscription,
  createService,
} from '../../api/subscription'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, CreditCard, Delete, Refresh } from '@element-plus/icons-vue'

const userStore = useUserStore()
const isAdmin = computed(() => userStore.userType === 'ADMIN')

const activeTab = ref('market')

// 服务市场
const services = ref<any[]>([])
const servicesLoading = ref(false)

// 我的订阅
const subscriptions = ref<any[]>([])
const subsLoading = ref(false)

// 新建服务
const showCreateServiceDialog = ref(false)
const serviceForm = ref({
  name: '',
  description: '',
  price: 0,
  durationMonths: 1,
})

// 搜索
const searchKeyword = ref('')

const page = ref(1)
const pageSize = ref(10)

const statusMap: Record<string, string> = {
  ACTIVE: '已订阅',
  EXPIRED: '已过期',
  CANCELLED: '已取消',
  PENDING_PAYMENT: '待支付',
}
const statusType: Record<string, string> = {
  ACTIVE: 'success',
  EXPIRED: 'info',
  CANCELLED: 'danger',
  PENDING_PAYMENT: 'warning',
}

onMounted(async () => {
  await loadServices()
  await loadSubscriptions()
})

async function loadServices() {
  servicesLoading.value = true
  try {
    const res: any = await getServices()
    if (res?.code === 200) {
      services.value = Array.isArray(res.data) ? res.data : (res.data?.records || [])
    }
  } catch { services.value = [] }
  servicesLoading.value = false
}

async function loadSubscriptions() {
  subsLoading.value = true
  try {
    const res: any = await getUserSubscriptions()
    if (res?.code === 200) {
      subscriptions.value = Array.isArray(res.data) ? res.data : (res.data?.records || [])
    }
  } catch { subscriptions.value = [] }
  subsLoading.value = false
}

const filteredServices = computed(() => {
  if (!searchKeyword.value) return services.value
  const kw = searchKeyword.value.toLowerCase()
  return services.value.filter((s: any) =>
    (s.name && s.name.toLowerCase().includes(kw)) ||
    (s.description && s.description.toLowerCase().includes(kw))
  )
})

const pagedServices = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return filteredServices.value.slice(start, start + pageSize.value)
})

const filteredSubscriptions = computed(() => {
  if (!searchKeyword.value) return subscriptions.value
  const kw = searchKeyword.value.toLowerCase()
  return subscriptions.value.filter((s: any) =>
    (s.serviceName && s.serviceName.toLowerCase().includes(kw)) ||
    (s.name && s.name.toLowerCase().includes(kw))
  )
})

const pagedSubscriptions = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return filteredSubscriptions.value.slice(start, start + pageSize.value)
})

async function handleSubscribe(service: any) {
  try {
    const { value } = await ElMessageBox.prompt('请输入订阅时长（月）', '订阅服务', {
      inputValue: '1',
      inputPattern: /^\d+$/,
      inputErrorMessage: '请输入正整数',
    })
    if (value) {
      const res: any = await createSubscription(service.id, { durationMonths: parseInt(value) })
      if (res?.code === 200) {
        ElMessage.success('订阅成功')
        await loadSubscriptions()
      } else {
        ElMessage.error(res?.message || '订阅失败')
      }
    }
  } catch { /* cancel */ }
}

async function handlePay(sub: any) {
  try {
    const res: any = await paySubscription(sub.id)
    if (res?.code === 200) {
      ElMessage.success('支付成功')
      await loadSubscriptions()
    } else {
      ElMessage.error(res?.message || '支付失败')
    }
  } catch { ElMessage.error('支付失败') }
}

async function handleCancel(sub: any) {
  try {
    await ElMessageBox.confirm('确认取消该订阅？', '提示', { type: 'warning' })
    const res: any = await cancelSubscription(sub.id)
    if (res?.code === 200) {
      ElMessage.success('已取消')
      await loadSubscriptions()
    } else {
      ElMessage.error(res?.message || '操作失败')
    }
  } catch { /* cancel */ }
}

async function handleRenew(sub: any) {
  try {
    const { value } = await ElMessageBox.prompt('请输入续费时长（月）', '续费', {
      inputValue: '1',
      inputPattern: /^\d+$/,
      inputErrorMessage: '请输入正整数',
    })
    if (value) {
      const res: any = await renewSubscription(sub.id)
      if (res?.code === 200) {
        ElMessage.success('续费成功')
        await loadSubscriptions()
      } else {
        ElMessage.error(res?.message || '续费失败')
      }
    }
  } catch { /* cancel */ }
}

async function handleCreateService() {
  try {
    const res: any = await createService(serviceForm.value)
    if (res?.code === 200) {
      ElMessage.success('服务创建成功')
      showCreateServiceDialog.value = false
      serviceForm.value = { name: '', description: '', price: 0, durationMonths: 1 }
      await loadServices()
    } else {
      ElMessage.error(res?.message || '创建失败')
    }
  } catch { ElMessage.error('创建失败') }
}
</script>

<template>
  <el-card>
    <template #header>
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span>订阅服务</span>
        <div>
          <el-input
            v-model="searchKeyword"
            placeholder="搜索服务名称..."
            clearable
            size="small"
            style="width:220px;margin-right:8px"
            @input="page=1"
          />
          <el-button size="small" @click="loadServices(); loadSubscriptions()">刷新</el-button>
          <el-button v-if="isAdmin" type="primary" size="small" :icon="Plus" @click="showCreateServiceDialog = true">新建服务</el-button>
        </div>
      </div>
    </template>

    <el-tabs v-model="activeTab">
      <el-tab-pane label="服务市场" name="market">
        <el-table :data="pagedServices" v-loading="servicesLoading" stripe size="small">
          <el-table-column prop="name" label="服务名称" min-width="140" />
          <el-table-column prop="description" label="描述" show-overflow-tooltip min-width="200" />
          <el-table-column label="价格" width="120">
            <template #default="{row}">¥{{ row.price ?? 0 }}</template>
          </el-table-column>
          <el-table-column label="时长(月)" width="100">
            <template #default="{row}">{{ row.durationMonths ?? '-' }} 月</template>
          </el-table-column>
          <el-table-column label="操作" width="100" fixed="right">
            <template #default="{row}">
              <el-button size="small" type="primary" @click="handleSubscribe(row)">订阅</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="display:flex;justify-content:center;margin-top:16px">
          <el-pagination
            v-model:current-page="page"
            v-model:page-size="pageSize"
            :total="filteredServices.length"
            layout="prev, pager, next, total"
            small
          />
        </div>
        <p v-if="!filteredServices.length && !servicesLoading" style="color:#999;text-align:center;padding:20px 0">暂无可用服务</p>
      </el-tab-pane>

      <el-tab-pane label="我的订阅" name="mine">
        <el-table :data="pagedSubscriptions" v-loading="subsLoading" stripe size="small">
          <el-table-column prop="serviceName" label="服务名称" min-width="140" />
          <el-table-column prop="serviceDescription" label="描述" show-overflow-tooltip min-width="160" />
          <el-table-column label="价格" width="100">
            <template #default="{row}">¥{{ row.price ?? row.amount ?? 0 }}</template>
          </el-table-column>
          <el-table-column label="剩余时长" width="100">
            <template #default="{row}">{{ row.remainingMonths ?? '-' }} 月</template>
          </el-table-column>
          <el-table-column label="状态" width="100">
            <template #default="{row}">
              <el-tag :type="statusType[row.status] || 'info'" size="small">{{ statusMap[row.status] || row.status }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" fixed="right">
            <template #default="{row}">
              <el-button v-if="row.status==='PENDING_PAYMENT'" size="small" type="success" :icon="CreditCard" @click="handlePay(row)">支付</el-button>
              <el-button v-if="row.status==='ACTIVE'" size="small" :icon="Refresh" @click="handleRenew(row)">续费</el-button>
              <el-button v-if="row.status==='ACTIVE' || row.status==='PENDING_PAYMENT'" size="small" type="danger" :icon="Delete" @click="handleCancel(row)">取消</el-button>
              <el-tag v-if="row.status==='CANCELLED' || row.status==='EXPIRED'" size="small" disable-transitions>已结束</el-tag>
            </template>
          </el-table-column>
        </el-table>
        <div style="display:flex;justify-content:center;margin-top:16px">
          <el-pagination
            v-model:current-page="page"
            v-model:page-size="pageSize"
            :total="filteredSubscriptions.length"
            layout="prev, pager, next, total"
            small
          />
        </div>
        <p v-if="!filteredSubscriptions.length && !subsLoading" style="color:#999;text-align:center;padding:20px 0">暂无订阅</p>
      </el-tab-pane>
    </el-tabs>
  </el-card>

  <!-- 新建服务 -->
  <el-dialog v-model="showCreateServiceDialog" title="新建服务" width="500px">
    <el-form :model="serviceForm" label-width="110px">
      <el-form-item label="服务名称" required>
        <el-input v-model="serviceForm.name" placeholder="请输入服务名称" />
      </el-form-item>
      <el-form-item label="描述" required>
        <el-input v-model="serviceForm.description" type="textarea" :rows="2" placeholder="服务描述" />
      </el-form-item>
      <el-form-item label="价格" required>
        <el-input-number v-model="serviceForm.price" :min="0" :step="100" style="width:100%" />
      </el-form-item>
      <el-form-item label="时长(月)" required>
        <el-input-number v-model="serviceForm.durationMonths" :min="1" :max="60" style="width:100%" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="showCreateServiceDialog = false">取消</el-button>
      <el-button type="primary" @click="handleCreateService">创建</el-button>
    </template>
  </el-dialog>
</template>