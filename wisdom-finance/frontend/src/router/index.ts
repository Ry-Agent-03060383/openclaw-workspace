import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../store/user'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: () => import('../views/home/LandingPage.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/LoginView.vue'),
    meta: { requiresAuth: false }
  },
  // ═══ 页脚详情页（公开） ═══
  {
    path: '/footer/:id',
    name: 'FooterDetail',
    component: () => import('../views/footer/FooterDetailView.vue'),
    meta: { requiresAuth: false }
  },
  // ═══ 核心服务详情页（公开） ═══
  {
    path: '/core-services/bank-match',
    name: 'BankMatch',
    component: () => import('../views/core-services/BankMatchView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/core-services/credit-check',
    name: 'CreditCheck',
    component: () => import('../views/core-services/CreditCheckView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/core-services/risk',
    name: 'CoreRisk',
    component: () => import('../views/core-services/RiskView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/core-services/ai',
    name: 'AiService',
    component: () => import('../views/core-services/AiServiceView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/core-services/mobile',
    name: 'MobileFinance',
    component: () => import('../views/core-services/MobileView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/core-services/security',
    name: 'DataSecurity',
    component: () => import('../views/core-services/SecurityView.vue'),
    meta: { requiresAuth: false }
  },
  // ═══ 仪表盘（需登录） ═══
  {
    path: '/dashboard',
    component: () => import('../layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'Dashboard', component: () => import('../views/dashboards/DashboardView.vue') },
      { path: 'user', name: 'User', component: () => import('../views/user/UserView.vue') },
      { path: 'notification', name: 'Notification', component: () => import('../views/notification/NotificationView.vue') },
      { path: 'loan', name: 'Loan', component: () => import('../views/loan/LoanView.vue') },
      { path: 'credit', name: 'Credit', component: () => import('../views/credit/CreditView.vue') },
      { path: 'credit/report/:id', name: 'CreditReport', component: () => import('../views/credit/ReportDetailView.vue') },
      { path: 'risk', name: 'Risk', component: () => import('../views/risk/RiskView.vue') },
      { path: 'monitoring', name: 'Monitoring', component: () => import('../views/monitoring/MonitoringView.vue') },
      { path: 'ai-chat', name: 'AiChat', component: () => import('../views/ai-chat/AiChatView.vue') },
      { path: 'guarantee', name: 'Guarantee', component: () => import('../views/guarantee/GuaranteeView.vue') },
      { path: 'approval', name: 'Approval', component: () => import('../views/approval/ApprovalView.vue') },
      { path: 'subscription', name: 'Subscription', component: () => import('../views/subscription/SubscriptionView.vue') },
      { path: 'thirdparty', name: 'ThirdParty', component: () => import('../views/thirdparty/ThirdPartyView.vue') },
      // ═══ 内容管理（仅 ADMIN） ═══
      { path: 'cms', name: 'CmsList', component: () => import('../views/cms/CmsListView.vue') },
      { path: 'cms/create', name: 'CmsCreate', component: () => import('../views/cms/CmsEditView.vue') },
      { path: 'cms/edit/:id', name: 'CmsEdit', component: () => import('../views/cms/CmsEditView.vue') },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _, next) => {
  const userStore = useUserStore()
  if (to.meta.requiresAuth !== false && !userStore.isLoggedIn) {
    next('/login')
  } else if (to.path === '/' && userStore.isLoggedIn) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router