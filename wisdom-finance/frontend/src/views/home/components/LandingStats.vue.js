/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, onMounted, nextTick } from 'vue';
import { getHomeStats } from '../../../api/home';
const loading = ref(true);
const stats = ref([
    { label: '注册认证企业', value: 0, suffix: '户', icon: '🏢' },
    { label: '融资需求数量', value: 0, suffix: '笔', icon: '📋' },
    { label: '累计需求金额', value: 0, suffix: '万元', icon: '💰' },
    { label: '累计放款金额', value: 0, suffix: '万元', icon: '✅' },
]);
const activityFeed = ref([]);
function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(el => {
        const target = parseInt(el.getAttribute('data-target') || '0', 10);
        if (!target)
            return;
        let current = 0;
        const start = performance.now();
        function step(now) {
            const elapsed = now - start;
            if (elapsed >= 1500) {
                el.textContent = target.toLocaleString();
                return;
            }
            current = Math.floor((elapsed / 1500) * target);
            el.textContent = Math.min(current, target).toLocaleString();
            requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    });
}
async function loadStats() {
    try {
        const res = await getHomeStats();
        if (res.code === 200 && res.data) {
            const data = res.data;
            if (data.stats?.length) {
                stats.value = data.stats.map((s, i) => ({
                    ...stats.value[i], label: s.label || stats.value[i].label,
                    value: Number(s.value) || 0, suffix: s.suffix || '',
                }));
            }
            if (data.activities?.length)
                activityFeed.value = data.activities;
        }
    }
    catch { /* 降级 */ }
    finally {
        loading.value = false;
        nextTick(animateCounters);
    }
}
onMounted(loadStats);
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['stat-card']} */ ;
/** @type {__VLS_StyleScopedClasses['ticker-content']} */ ;
/** @type {__VLS_StyleScopedClasses['ticker-content']} */ ;
/** @type {__VLS_StyleScopedClasses['ticker-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['ticker-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['ticker-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['ticker-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['ticker-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-card']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-number']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    id: "data-stats",
    ...{ class: "stats-section" },
    'aria-label': "平台数据统计",
});
/** @type {__VLS_StyleScopedClasses['stats-section']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "section-container animate-on-scroll" },
});
/** @type {__VLS_StyleScopedClasses['section-container']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "section-header" },
});
/** @type {__VLS_StyleScopedClasses['section-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "section-label" },
});
/** @type {__VLS_StyleScopedClasses['section-label']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "section-title" },
});
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "section-desc" },
});
/** @type {__VLS_StyleScopedClasses['section-desc']} */ ;
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "stats-grid" },
    });
    /** @type {__VLS_StyleScopedClasses['stats-grid']} */ ;
    for (const [i] of __VLS_vFor((4))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            key: (i),
            ...{ class: "stat-card skeleton" },
        });
        /** @type {__VLS_StyleScopedClasses['stat-card']} */ ;
        /** @type {__VLS_StyleScopedClasses['skeleton']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
            ...{ class: "skeleton-circle" },
        });
        /** @type {__VLS_StyleScopedClasses['skeleton-circle']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
            ...{ class: "skeleton-block h-10 w-28 mx-auto" },
        });
        /** @type {__VLS_StyleScopedClasses['skeleton-block']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-10']} */ ;
        /** @type {__VLS_StyleScopedClasses['w-28']} */ ;
        /** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
            ...{ class: "skeleton-block h-4 w-20 mx-auto mt-2" },
        });
        /** @type {__VLS_StyleScopedClasses['skeleton-block']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['w-20']} */ ;
        /** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
        /** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
        // @ts-ignore
        [loading,];
    }
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "stats-grid" },
    });
    /** @type {__VLS_StyleScopedClasses['stats-grid']} */ ;
    for (const [s] of __VLS_vFor((__VLS_ctx.stats))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            key: (s.label),
            ...{ class: "stat-card" },
            role: "figure",
            'aria-label': (s.label + ': ' + s.value + s.suffix),
        });
        /** @type {__VLS_StyleScopedClasses['stat-card']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "stat-icon" },
            'aria-hidden': "true",
        });
        /** @type {__VLS_StyleScopedClasses['stat-icon']} */ ;
        (s.icon);
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "stat-number-wrap" },
        });
        /** @type {__VLS_StyleScopedClasses['stat-number-wrap']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "stat-number" },
            'data-target': (s.value),
            role: "meter",
            'aria-valuenow': (s.value),
            'aria-valuemin': "0",
        });
        /** @type {__VLS_StyleScopedClasses['stat-number']} */ ;
        (s.value.toLocaleString());
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "stat-suffix" },
        });
        /** @type {__VLS_StyleScopedClasses['stat-suffix']} */ ;
        (s.suffix);
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "stat-label" },
        });
        /** @type {__VLS_StyleScopedClasses['stat-label']} */ ;
        (s.label);
        // @ts-ignore
        [stats,];
    }
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "ticker-wrap" },
});
/** @type {__VLS_StyleScopedClasses['ticker-wrap']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "ticker-icon" },
    'aria-hidden': "true",
});
/** @type {__VLS_StyleScopedClasses['ticker-icon']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "ticker-track" },
});
/** @type {__VLS_StyleScopedClasses['ticker-track']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "ticker-content" },
});
/** @type {__VLS_StyleScopedClasses['ticker-content']} */ ;
for (const [act, i] of __VLS_vFor(((__VLS_ctx.activityFeed.length ? __VLS_ctx.activityFeed : [
    { tag: '成功', text: '某企业成功获得贷款500万元' }, { tag: '发布', text: '某金融机构发布新产品' },
    { tag: '完成', text: '某企业完成信用体检' }, { tag: '新增', text: '新增注册企业3家' },
    { tag: '提交', text: '某企业提交融资申请' },
])))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        key: (i),
        ...{ class: "ticker-item" },
    });
    /** @type {__VLS_StyleScopedClasses['ticker-item']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: (['ticker-tag', act.tag]) },
    });
    /** @type {__VLS_StyleScopedClasses['ticker-tag']} */ ;
    (act.tag);
    (act.text);
    // @ts-ignore
    [activityFeed, activityFeed,];
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
