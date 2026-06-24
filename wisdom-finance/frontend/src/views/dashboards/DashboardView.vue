<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '../../store/user'

const userStore = useUserStore()

const roleComponent = computed(() => {
  const role = userStore.userType || ''
  if (role.includes('ADMIN') || role.includes('admin')) return 'AdminDashboard'
  if (role.includes('BANK') || role.includes('bank')) return 'BankDashboard'
  if (role.includes('ENTERPRISE') || role.includes('enterprise') || role.includes('SME')) return 'SmeDashboard'
  if (role.includes('FARMER') || role.includes('farmer')) return 'FarmerDashboard'
  if (role.includes('GOV') || role.includes('gov')) return 'GovDashboard'
  if (role.includes('RISK') || role.includes('risk')) return 'RiskDashboard'
  if (role.includes('THIRD') || role.includes('third')) return 'ThirdPartyDashboard'
  if (role.includes('GUARANTEE') || role.includes('guarantee')) return 'SmeDashboard'
  return 'SmeDashboard'
})
</script>
<template>
  <component :is="roleComponent" />
</template>
