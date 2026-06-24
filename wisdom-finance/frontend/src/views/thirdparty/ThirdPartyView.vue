<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from '../../store/user'
import {
  getServices,
  getServiceOrders,
  createService,
  createOrder,
  payOrder,
  completeOrder,
  rateOrder,
} from '../../api/thirdparty'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, CreditCard, CircleCheck, Star } from '@element-plus/icons-vue'

const userStore = useUserStore()
const isAdmin = computed(() => userStore.userType === 'ADMIN')

const activeTab = ref('catalog')

// 服务目录
const services = ref<any[]>([])
const servicesLoading = ref(false)

// 服务订单
const orders = ref<any[]>([])
const ordersLoading = ref(false)

// 新建服务
const showCreateServiceDialog = ref(false)
const serviceForm = ref({
  name: '',
  provider: '',
  description: '',
  price: 0,
})

const searchKeyword = ref('')

const page = ref(1)
const pageSize = ref(10)

const orderStatusMap: Record<string, string> = {
  PENDING_PAYMENT: '待支付',
  PAID: '已支付',
  IN_PROGRESS: '进行中',
  COMPLETED: '已完成',
  CANCELLED: '已取消',
}
const orderStatusType: Record<string, string> = {
  PENDING_PAYMENT: 'warning',
  PAID: 'primary',
  IN_PROGRESS: 'info',
  COMPLETED: 'success',
  CANCELLED: 'danger',
}

onMounted(async () => {
  await loadServices()
  await loadOrders()
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

async function loadOrders() {
  ordersLoading.value = true
  try {
    const res: any = await getServiceOrders()
    if (res?.code === 200) {
      orders.value = Array.isArray(res.data) ? res.data : (res.data?.records || [])
    }
  } catch { orders.value = [] }
  ordersLoading.value = false
}

const filteredServices = computed(() => {
  if (!searchKeyword.value) return services.value
  const kw = searchKeyword.value.toLowerCase()
  return services.value.filter((s: any) =>
    (s.name && s.name.toLowerCase().includes(kw)) ||
    (s.provider && s.provider.toLowerCase().includes(kw)) ||
    (s.description && s.description.toLowerCase().includes(kw))
  )
})

const pagedServices = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return filteredServices.value.slice(start, start + pageSize.value)
})

const filteredOrders = computed(() => {
  if (!searchKeyword.value) return orders.value
  const kw = searchKeyword.value.toLowerCase()
  return orders.value.filter((o: any) =>
    (o.orderNo && o.orderNo.toLowerCase().includes(kw)) ||
    (o.serviceName && o.serviceName.toLowerCase().includes(kw))
  )
})

const pagedOrders = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return filteredOrders.value.slice(start, start + pageSize.value)
})

async function handleCreateOrder(service: any) {
  try {
    const res: any = await createOrder({ serviceId: service.id })
    if (res?.code === 200) {
      ElMessage.success('下单成功')
      await loadOrders()
    } else {
      ElMessage.error(res?.message || '下单失败')
    }
  } catch { ElMessage.error('下单失败') }
}

async function handlePayOrder(order: any) {
  try {
    const res: any = await payOrder(order.id)
    if (res?.code === 200) {
      ElMessage.success('支付成功')
      await loadOrders()
    } else {
      ElMessage.error(res?.message || '支付失败')
    }
  } catch { ElMessage.error('支付失败') }
}

async function handleCompleteOrder(order: any) {
  try {
    const res: any = await completeOrder(order.id)
    if (res?.code === 200) {
      ElMessage.success('已完成')
      await loadOrders()
    } else {
      ElMessage.error(res?.message || '操作失败')
    }
  } catch { ElMessage.error('操作失败') }
}

async function handleRateOrder(order: any) {
  try {
    const { value } = await ElMessageBox.prompt('请输入评分（1-5）', '评价服务', {
      inputValue: '5',
      inputPattern: /^[1-5]$/,
      inputErrorMessage: '请输入1-5之间的整数',
    })
    if (value) {
      const res: any = await rateOrder(order.id, { rating: parseInt(value), comment: '' })
      if (res?.code === 200) {
        ElMessage.success('评价成功')
        await loadOrders()
      } else {
        ElMessage.error(res?.message || '评价失败')
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
      serviceForm.value = { name: '', provider: '', description: '', price: 0 }
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
        <span>第三方服务</span>
        <div>
          <el-input
            v-model="searchKeyword"
            placeholder="搜索服务/订单..."
            clearable
            size="small"
            style="width:220px;margin-right:8px"
            @input="page=1"
          />
          <el-button size="small" @click="loadServices(); loadOrders()">刷新</el-button>
          <el-button v-if="isAdmin" type="primary" size="small" :icon="Plus" @click="showCreateServiceDialog = true">新建服务</el-button>
        </div>
      </div>
    </template>

    <el-tabs v-model="activeTab">
      <el-tab-pane label="服务目录" name="catalog">
        <el-table :data="pagedServices" v-loading="servicesLoading" stripe size="small">
          <el-table-column prop="name" label="服务名称" min-width="140" />
          <el-table-column prop="provider" label="提供商" width="120" />
          <el-table-column prop="description" label="描述" show-overflow-tooltip min-width="200" />
          <el-table-column label="价格" width="120">
            <template #default="{row}">¥{{ row.price ?? 0 }}</template>
          </el-table-column>
          <el-table-column label="操作" width="100" fixed="right">
            <template #default="{row}">
              <el-button size="small" type="primary" @click="handleCreateOrder(row)">下单</el-button>
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
        <p v-if="!filteredServices.length && !servicesLoading" style="color:#999;text-align:center;padding:20px 0">暂无服务</p>
      </el-tab-pane>

      <el-tab-pane label="服务订单" name="orders">
        <el-table :data="pagedOrders" v-loading="ordersLoading" stripe size="small">
          <el-table-column prop="orderNo" label="订单编号" width="160" />
          <el-table-column prop="serviceName" label="服务名称" min-width="140" />
          <el-table-column label="金额" width="110">
            <template #default="{row}">¥{{ row.amount ?? row.price ?? 0 }}</template>
          </el-table-column>
          <el-table-column label="状态" width="100">
            <template #default="{row}">
              <el-tag :type="orderStatusType[row.status] || 'info'" size="small">{{ orderStatusMap[row.status] || row.status }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="220" fixed="right">
            <template #default="{row}">
              <el-button v-if="row.status==='PENDING_PAYMENT'" size="small" type="success" :icon="CreditCard" @click="handlePayOrder(row)">支付</el-button>
              <el-button v-if="row.status==='PAID' || row.status==='IN_PROGRESS'" size="small" type="primary" :icon="CircleCheck" @click="handleCompleteOrder(row)">完成</el-button>
              <el-button v-if="row.status==='COMPLETED'" size="small" type="warning" :icon="Star" @click="handleRateOrder(row)">评价</el-button>
              <el-tag v-if="row.status==='CANCELLED'" size="small" disable-transitions>已取消</el-tag>
            </template>
          </el-table-column>
        </el-table>
        <div style="display:flex;justify-content:center;margin-top:16px">
          <el-pagination
            v-model:current-page="page"
            v-model:page-size="pageSize"
            :total="filteredOrders.length"
            layout="prev, pager, next, total"
            small
          />
        </div>
        <p v-if="!filteredOrders.length && !ordersLoading" style="color:#999;text-align:center;padding:20px 0">暂无订单</p>
      </el-tab-pane>
    </el-tabs>
  </el-card>

  <!-- 新建服务 -->
  <el-dialog v-model="showCreateServiceDialog" title="新建第三方服务" width="500px">
    <el-form :model="serviceForm" label-width="100px">
      <el-form-item label="服务名称" required>
        <el-input v-model="serviceForm.name" placeholder="请输入服务名称" />
      </el-form-item>
      <el-form-item label="提供商" required>
        <el-input v-model="serviceForm.provider" placeholder="请输入提供商名称" />
      </el-form-item>
      <el-form-item label="描述" required>
        <el-input v-model="serviceForm.description" type="textarea" :rows="2" placeholder="服务描述" />
      </el-form-item>
      <el-form-item label="价格" required>
        <el-input-number v-model="serviceForm.price" :min="0" :step="100" style="width:100%" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="showCreateServiceDialog = false">取消</el-button>
      <el-button type="primary" @click="handleCreateService">创建</el-button>
    </template>
  </el-dialog>
</template>