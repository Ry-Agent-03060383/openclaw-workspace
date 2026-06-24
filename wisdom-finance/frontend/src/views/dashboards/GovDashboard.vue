<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '../../store/user'
import { getDashboardStats } from '../../api/dashboard'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const stats = ref([
  { label: '注册企业', value: '-', color: '#409EFF' },
  { label: '总融资金额', value: '-', color: '#67C23A' },
  { label: '本月新增', value: '-', color: '#E6A23C' },
  { label: '扶持企业', value: '-', color: '#F56C6C' }
])
const loading = ref(true)

onMounted(async () => {
  try {
    const res: any = await getDashboardStats().catch(() => ({ code: 500 }))
    if (res.code === 200 && res.data?.stats) stats.value = res.data.stats
  } catch { /* ignore */ }
  loading.value = false
})
</script>
<template>
  <div>
    <el-card style="margin-bottom:16px;background:linear-gradient(135deg,#43e97b,#38f9d7);color:#fff;border:none">
      <h2 style="margin:0">政府监管控制台</h2>
      <p style="margin:8px 0 0;opacity:.85">{{ userStore.realName || userStore.username }} · 政府部门</p>
    </el-card>
    <el-row :gutter="20">
      <el-col :span="6" v-for="(s, i) in stats" :key="i">
        <el-card shadow="hover" style="margin-bottom:16px">
          <div style="display:flex;align-items:center;gap:12px">
            <el-avatar shape="square" size="medium" :style="'background:'+s.color">{{ s.label[0] }}</el-avatar>
            <div><div style="font-size:22px;font-weight:bold">{{ s.value }}</div><div style="color:#999;font-size:13px">{{ s.label }}</div></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card><template #header>区域融资概览</template>
          <div style="padding:40px 0;text-align:center;color:#999">融资数据可视化看板</div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card><template #header>政策发布</template>
          <el-button style="width:100%;margin-bottom:8px" @click="router.push('/dashboard/ai-chat')">发布扶持政策</el-button>
          <el-button style="width:100%" @click="router.push('/dashboard/credit')">查看企业征信</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
