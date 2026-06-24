<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Refresh, Plus, Edit, Delete, SwitchButton } from '@element-plus/icons-vue'
import { pageUsers, createUser, updateUser, toggleUserStatus, deleteUser } from '../../api/user'

const loading = ref(false)
const query = reactive({ keyword: '', userType: '', status: '', pageNum: 1, pageSize: 10 })
const total = ref(0)
const users = ref<any[]>([])

const dialogVisible = ref(false)
const isEdit = ref(false)
const form = reactive({
  id: null as number | null,
  username: '',
  password: '',
  realName: '',
  phone: '',
  email: '',
  userType: 'SME',
  status: 'ACTIVE',
})

const userTypeOptions = [
  { value: '', label: '全部' },
  { value: 'SME', label: '中小企业' },
  { value: 'FARMER', label: '农户' },
  { value: 'FINANCIAL_INSTITUTION', label: '金融机构' },
  { value: 'RISK_MANAGER', label: '风控人员' },
  { value: 'ADMIN', label: '管理员' },
  { value: 'GOVERNMENT', label: '政府部门' },
  { value: 'THIRD_PARTY', label: '第三方服务商' },
]

const statusOptions = [
  { value: '', label: '全部' },
  { value: 'ACTIVE', label: '正常' },
  { value: 'DISABLED', label: '禁用' },
]

const userTypeMap: Record<string, string> = {
  SME: '中小企业', FARMER: '农户', FINANCIAL_INSTITUTION: '金融机构',
  RISK_MANAGER: '风控人员', ADMIN: '管理员', GOVERNMENT: '政府部门', THIRD_PARTY: '第三方服务商',
}

function formatUserType(type: string) {
  return userTypeMap[type] || type
}

async function fetchData() {
  loading.value = true
  try {
    const res: any = await pageUsers(query)
    if (res.code === 200) {
      users.value = res.data.records
      total.value = res.data.total
    }
  } finally {
    loading.value = false
  }
}

function handleSearch() {
  query.pageNum = 1
  fetchData()
}

function handleReset() {
  query.keyword = ''
  query.userType = ''
  query.status = ''
  query.pageNum = 1
  fetchData()
}

function openCreate() {
  isEdit.value = false
  form.id = null
  form.username = ''
  form.password = ''
  form.realName = ''
  form.phone = ''
  form.email = ''
  form.userType = 'SME'
  dialogVisible.value = true
}

function openEdit(row: any) {
  isEdit.value = true
  form.id = row.id
  form.username = row.username
  form.password = ''
  form.realName = row.realName
  form.phone = row.phone
  form.email = row.email
  form.userType = row.userType
  form.status = row.status
  dialogVisible.value = true
}

async function handleSave() {
  try {
    let res: any
    if (isEdit.value && form.id) {
      res = await updateUser(form.id, {
        realName: form.realName,
        phone: form.phone,
        email: form.email,
      })
    } else {
      res = await createUser({
        username: form.username,
        password: form.password,
        realName: form.realName,
        phone: form.phone,
        email: form.email,
        userType: form.userType,
      })
    }
    if (res.code === 200) {
      ElMessage.success(isEdit.value ? '更新成功' : '创建成功')
      dialogVisible.value = false
      fetchData()
    } else {
      ElMessage.error(res.message)
    }
  } catch {
    ElMessage.error('操作失败')
  }
}

async function handleToggleStatus(row: any) {
  try {
    const res: any = await toggleUserStatus(row.id)
    if (res.code === 200) {
      ElMessage.success('状态已切换')
      fetchData()
    }
  } catch {
    ElMessage.error('操作失败')
  }
}

async function handleDelete(row: any) {
  try {
    await ElMessageBox.confirm(`确认删除用户「${row.username}」？`, '提示')
    const res: any = await deleteUser(row.id)
    if (res.code === 200) {
      ElMessage.success('删除成功')
      fetchData()
    }
  } catch {
    // cancelled
  }
}

onMounted(fetchData)
</script>

<template>
  <div>
    <el-card>
      <el-form :model="query" inline @submit.prevent="handleSearch">
        <el-form-item label="关键词">
          <el-input v-model="query.keyword" placeholder="用户名/姓名/手机号" clearable style="width: 200px" />
        </el-form-item>
        <el-form-item label="用户类型">
          <el-select v-model="query.userType" style="width: 140px" clearable>
            <el-option v-for="o in userTypeOptions" :key="o.value" :label="o.label" :value="o.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="query.status" style="width: 100px" clearable>
            <el-option v-for="o in statusOptions" :key="o.value" :label="o.label" :value="o.value" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
          <el-button :icon="Refresh" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card style="margin-top: 16px">
      <template #header>
        <div style="display: flex; justify-content: space-between; align-items: center">
          <span>用户列表</span>
          <el-button type="primary" :icon="Plus" @click="openCreate">新增用户</el-button>
        </div>
      </template>

      <el-table v-loading="loading" :data="users" stripe style="width: 100%">
        <el-table-column prop="id" label="ID" width="60" />
        <el-table-column prop="username" label="用户名" width="120" />
        <el-table-column prop="realName" label="真实姓名" width="140" />
        <el-table-column prop="phone" label="手机号" width="130" />
        <el-table-column prop="email" label="邮箱" min-width="180" />
        <el-table-column label="用户类型" width="130">
          <template #default="{ row }">
            <el-tag size="small" type="warning" v-if="row.userType === 'ADMIN'">管理员</el-tag>
            <el-tag size="small" v-else>{{ formatUserType(row.userType) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="80">
          <template #default="{ row }">
            <el-tag size="small" :type="row.status === 'ACTIVE' ? 'success' : 'danger'">
              {{ row.status === 'ACTIVE' ? '正常' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button size="small" :icon="Edit" @click="openEdit(row)">编辑</el-button>
            <el-button size="small" :icon="SwitchButton" :type="row.status === 'ACTIVE' ? 'warning' : 'success'"
              @click="handleToggleStatus(row)">
              {{ row.status === 'ACTIVE' ? '禁用' : '启用' }}
            </el-button>
            <el-button size="small" type="danger" :icon="Delete" @click="handleDelete(row)" />
          </template>
        </el-table-column>
      </el-table>

      <div style="display: flex; justify-content: flex-end; margin-top: 16px">
        <el-pagination
          v-model:current-page="query.pageNum"
          v-model:page-size="query.pageSize"
          :total="total"
          layout="total, prev, pager, next"
          @current-change="fetchData"
        />
      </div>
    </el-card>

    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑用户' : '新增用户'" width="500px">
      <el-form :model="form" label-width="100px">
        <el-form-item label="用户名" v-if="!isEdit">
          <el-input v-model="form.username" placeholder="登录用户名" />
        </el-form-item>
        <el-form-item label="密码" v-if="!isEdit">
          <el-input v-model="form.password" type="password" placeholder="默认 123456" />
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="form.realName" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="用户类型" v-if="!isEdit">
          <el-select v-model="form.userType" style="width: 100%">
            <el-option v-for="o in userTypeOptions.filter(x => x.value)" :key="o.value" :label="o.label" :value="o.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>
