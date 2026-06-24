<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../store/user'
import { login } from '../../api/auth'
import { ElMessage } from 'element-plus'
import {
  User, Coin, CreditCard, Cherry, School, WarningFilled, Service
} from '@element-plus/icons-vue'

const router = useRouter()
const userStore = useUserStore()

const roles = [
  { key: 'ADMIN', label: '平台管理员', icon: User, color: '#667eea', bg: 'linear-gradient(135deg, #667eea, #764ba2)', cred: { username: 'admin', password: '123456' } },
  { key: 'SME', label: '中小企业', icon: Coin, color: '#43e97b', bg: 'linear-gradient(135deg, #43e97b, #38f9d7)', cred: { username: 'enterprise1', password: '123456' } },
  { key: 'FINANCIAL_INSTITUTION', label: '金融机构', icon: CreditCard, color: '#667eea', bg: 'linear-gradient(135deg, #4facfe, #00f2fe)', cred: { username: 'bank1', password: '123456' } },
  { key: 'FARMER', label: '农户', icon: Cherry, color: '#43e97b', bg: 'linear-gradient(135deg, #a8e063, #56ab2f)', cred: { username: 'farmer1', password: '123456' } },
  { key: 'GOVERNMENT', label: '政府部门', icon: School, color: '#f093fb', bg: 'linear-gradient(135deg, #f093fb, #f5576c)', cred: { username: 'government', password: '123456' } },
  { key: 'RISK_MANAGER', label: '风控人员', icon: WarningFilled, color: '#fa709a', bg: 'linear-gradient(135deg, #fa709a, #fee140)', cred: { username: 'risk', password: '123456' } },
  { key: 'THIRD_PARTY', label: '第三方', icon: Service, color: '#a18cd1', bg: 'linear-gradient(135deg, #a18cd1, #fbc2eb)', cred: { username: 'thirdparty1', password: '123456' } },
]

const selectedRole = ref(roles[0])
const form = ref({ username: selectedRole.value.cred.username, password: selectedRole.value.cred.password })
const loading = ref(false)

function selectRole(role: typeof roles[0]) {
  selectedRole.value = role
  form.value = { username: role.cred.username, password: role.cred.password }
}

async function handleLogin() {
  loading.value = true
  try {
    const res: any = await login(form.value)
    if (res.code === 200) {
      userStore.setAuth(res.data.token, res.data.user)
      ElMessage.success('登录成功')
      router.push('/dashboard')
    } else {
      ElMessage.error(res.message || '登录失败')
    }
  } catch {
    ElMessage.error('登录失败')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #0f0c29, #302b63, #24243e)">
    <el-card style="width: 480px; padding: 20px; border-radius: 12px">
      <div style="text-align: center; margin-bottom: 24px">
        <h2 style="margin: 0; color: #303133">智慧金服平台</h2>
        <p style="margin: 4px 0 0; color: #909399; font-size: 13px">焦作市中小企业融资服务平台</p>
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-bottom: 24px">
        <div
          v-for="r in roles" :key="r.key"
          :style="{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
            padding: '8px 0', width: '60px', cursor: 'pointer', borderRadius: '8px',
            transition: 'all .2s',
            background: selectedRole.key === r.key ? r.color + '18' : 'transparent',
            border: selectedRole.key === r.key ? '2px solid ' + r.color : '2px solid transparent',
          }"
          @click="selectRole(r)"
        >
          <el-avatar :icon="r.icon" :style="{ background: r.color }" size="small" shape="square" />
          <span style="font-size: 11px; color: #606266; text-align: center; line-height: 1.2">{{ r.label }}</span>
        </div>
      </div>

      <div :style="{ height: '4px', background: selectedRole.bg, borderRadius: '2px', marginBottom: '20px', transition: 'all .3s' }" />

      <el-form :model="form" @submit.prevent="handleLogin">
        <el-form-item>
          <el-input v-model="form.username" placeholder="用户名" prefix-icon="User" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" type="password" placeholder="密码" prefix-icon="Lock" show-password />
        </el-form-item>
        <el-form-item>
          <el-button
            :style="{ width: '100%', background: selectedRole.color, borderColor: selectedRole.color }"
            :loading="loading" @click="handleLogin"
          >登 录</el-button>
        </el-form-item>
      </el-form>
      <div style="text-align: center; color: #999; font-size: 12px">
        选择角色后自动填充测试账号 · 点击登录进入操控台
      </div>
    </el-card>
  </div>
</template>
