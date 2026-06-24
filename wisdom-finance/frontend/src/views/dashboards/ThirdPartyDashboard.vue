<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '../../store/user'
import { getDashboardStats } from '../../api/dashboard'
const userStore = useUserStore()
const stats = ref<{label:string;value:number|string;color:string}[]>([])
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
    <el-card style="margin-bottom:16px;background:linear-gradient(135deg,#4facfe,#00f2fe);color:#fff;border:none">
      <h2 style="margin:0">第三方服务控制台</h2>
      <p style="margin:8px 0 0;opacity:.85">{{ userStore.realName || userStore.username }} · 第三方服务商</p>
    </el-card>
    <el-row :gutter="20">
      <el-col :span="8" v-for="(s, i) in stats" :key="i">
        <el-card shadow="hover" style="margin-bottom:16px">
          <div style="display:flex;align-items:center;gap:12px">
            <el-avatar shape="square" size="medium" :style="'background:'+s.color">{{ s.label[0] }}</el-avatar>
            <div><div style="font-size:22px;font-weight:bold">{{ s.value }}</div><div style="color:#999;font-size:13px">{{ s.label }}</div></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-card v-if="!stats.length">
      <el-empty description="暂无服务数据" />
    </el-card>
    <el-row :gutter="20" style="margin-top:16px">
      <el-col :span="24">
        <el-card><template #header>服务工单</template>
          <p style="color:#999;text-align:center;padding:20px 0">暂无服务工单</p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
