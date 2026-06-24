import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
export const useUserStore = defineStore('user', () => {
    const token = ref(localStorage.getItem('token') || '');
    const userInfo = ref(JSON.parse(localStorage.getItem('userInfo') || 'null'));
    const isLoggedIn = computed(() => !!token.value);
    const userId = computed(() => userInfo.value?.id || userInfo.value?.userId || 0);
    const username = computed(() => userInfo.value?.username || '');
    const realName = computed(() => userInfo.value?.realName || '');
    const userType = computed(() => userInfo.value?.userType || '');
    const roleName = computed(() => {
        const map = {
            ADMIN: '平台管理员', SME: '中小企业', FINANCIAL_INSTITUTION: '金融机构',
            FARMER: '农户', GOVERNMENT: '政府部门', RISK_MANAGER: '风控人员', THIRD_PARTY: '第三方服务商',
        };
        return map[userType.value] || userType.value;
    });
    function setAuth(t, user) {
        token.value = t;
        userInfo.value = user;
        localStorage.setItem('token', t);
        localStorage.setItem('userInfo', JSON.stringify(user));
    }
    function logout() {
        token.value = '';
        userInfo.value = null;
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
    }
    return { token, userInfo, isLoggedIn, userId, username, realName, userType, roleName, setAuth, logout };
});
