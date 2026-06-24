/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, computed } from 'vue';
/* ── 担保方式占比 ── */
const guaranteeData = [
    { label: '抵押', pct: 42, color: '#667eea' },
    { label: '信用', pct: 28, color: '#67C23A' },
    { label: '保证', pct: 17, color: '#E6A23C' },
    { label: '质押', pct: 13, color: '#F56C6C' },
];
/** Compute SVG donut arc dash arrays */
function donutSegments() {
    const total = guaranteeData.reduce((s, g) => s + g.pct, 0);
    const r = 72;
    const circ = 2 * Math.PI * r;
    let offset = 0;
    return guaranteeData.map(g => {
        const len = (g.pct / total) * circ;
        const seg = { ...g, dasharray: `${len} ${circ - len}`, dashoffset: -offset, strokeWidth: 26 };
        offset += len;
        return seg;
    });
}
/* ── 行业融资占比（按百分比降序） ── */
const industryData = computed(() => [
    { label: '制造业', pct: 35, icon: '🏭', color: '#667eea' },
    { label: '农业', pct: 25, icon: '🌾', color: '#67C23A' },
    { label: '科技', pct: 20, icon: '💻', color: '#E6A23C' },
    { label: '商贸', pct: 12, icon: '🏪', color: '#F56C6C' },
    { label: '其他', pct: 8, icon: '📋', color: '#909399' },
].sort((a, b) => b.pct - a.pct));
/* ── 县市区企业分布（降序+颜色分级） ── */
const regionColor = (val) => {
    if (val >= 1500)
        return '#667eea';
    if (val >= 1000)
        return '#67C23A';
    if (val >= 800)
        return '#E6A23C';
    return '#F56C6C';
};
const regionData = computed(() => [
    { name: '沁阳市', val: 1680 }, { name: '孟州市', val: 1532 },
    { name: '山阳区', val: 1420 }, { name: '武陟县', val: 1350 },
    { name: '解放区', val: 1258 }, { name: '温县', val: 1120 },
    { name: '博爱县', val: 980 }, { name: '中站区', val: 892 },
    { name: '修武县', val: 876 }, { name: '马村区', val: 756 },
].sort((a, b) => b.val - a.val).map((r, i) => ({ ...r, rank: i + 1, barColor: regionColor(r.val) })));
/* ── 月度放款趋势 ── */
const selectedYear = ref(2026);
const trendData = {
    2024: [48, 52, 58, 55, 63, 60, 68, 72, 65, 70, 66, 73],
    2025: [55, 60, 65, 68, 72, 78, 82, 80, 74, 86, 82, 90],
    2026: [65, 78, 82, 70, 90, 85, 92, 88, 76, 95, 89, 99],
};
const trendValues = computed(() => trendData[selectedYear.value] || trendData[2026]);
const trendMax = computed(() => Math.max(...trendValues.value));
/** Y-axis labels (5 steps) */
const yLabels = computed(() => {
    const max = trendMax.value;
    return [0, 1, 2, 3, 4].map(i => Math.round((max / 4) * i));
});
/* ── 实时动态 ── */
const activityData = [
    { tag: '成功', text: '某企业成功获得贷款500万元', time: '2分钟前' },
    { tag: '发布', text: '某金融机构发布新产品', time: '8分钟前' },
    { tag: '完成', text: '某企业完成信用体检', time: '15分钟前' },
    { tag: '新增', text: '新增注册企业3家', time: '22分钟前' },
    { tag: '提交', text: '某企业提交融资申请', time: '35分钟前' },
    { tag: '成功', text: '某企业成功获得贷款300万元', time: '46分钟前' },
];
/* ── 年份切换 ── */
function yearBtnClass(y) {
    return { active: selectedYear.value === y };
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['viz-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['viz-card']} */ ;
/** @type {__VLS_StyleScopedClasses['viz-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-accent']} */ ;
/** @type {__VLS_StyleScopedClasses['viz-header-row']} */ ;
/** @type {__VLS_StyleScopedClasses['viz-header']} */ ;
/** @type {__VLS_StyleScopedClasses['year-selector']} */ ;
/** @type {__VLS_StyleScopedClasses['year-selector']} */ ;
/** @type {__VLS_StyleScopedClasses['year-selector']} */ ;
/** @type {__VLS_StyleScopedClasses['region-rank']} */ ;
/** @type {__VLS_StyleScopedClasses['trend-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['trend-bar-col']} */ ;
/** @type {__VLS_StyleScopedClasses['trend-val']} */ ;
/** @type {__VLS_StyleScopedClasses['activity-item']} */ ;
/** @type {__VLS_StyleScopedClasses['activity-badge']} */ ;
/** @type {__VLS_StyleScopedClasses['activity-badge']} */ ;
/** @type {__VLS_StyleScopedClasses['activity-badge']} */ ;
/** @type {__VLS_StyleScopedClasses['activity-badge']} */ ;
/** @type {__VLS_StyleScopedClasses['activity-badge']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
/** @type {__VLS_StyleScopedClasses['donut-arc']} */ ;
/** @type {__VLS_StyleScopedClasses['industry-fill']} */ ;
/** @type {__VLS_StyleScopedClasses['region-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['trend-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['activity-item']} */ ;
/** @type {__VLS_StyleScopedClasses['viz-card']} */ ;
/** @type {__VLS_StyleScopedClasses['live-dot']} */ ;
/** @type {__VLS_StyleScopedClasses['viz-grid-3']} */ ;
/** @type {__VLS_StyleScopedClasses['viz-grid-2-1']} */ ;
/** @type {__VLS_StyleScopedClasses['viz-grid-3']} */ ;
/** @type {__VLS_StyleScopedClasses['viz-header-row']} */ ;
/** @type {__VLS_StyleScopedClasses['trend-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['trend-bars']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    id: "data-viz",
    ...{ class: "viz-section" },
    'aria-label': "数据可视化看板",
});
/** @type {__VLS_StyleScopedClasses['viz-section']} */ ;
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
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "viz-grid viz-grid-3" },
});
/** @type {__VLS_StyleScopedClasses['viz-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['viz-grid-3']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "viz-card card-donut" },
    role: "figure",
    'aria-label': "担保方式占比统计",
});
/** @type {__VLS_StyleScopedClasses['viz-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-donut']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ class: "card-accent" },
});
/** @type {__VLS_StyleScopedClasses['card-accent']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "viz-header" },
});
/** @type {__VLS_StyleScopedClasses['viz-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "viz-icon" },
});
/** @type {__VLS_StyleScopedClasses['viz-icon']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "donut-wrap" },
});
/** @type {__VLS_StyleScopedClasses['donut-wrap']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "donut-chart" },
});
/** @type {__VLS_StyleScopedClasses['donut-chart']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    viewBox: "0 0 200 200",
    ...{ class: "donut-svg" },
    'aria-hidden': "true",
});
/** @type {__VLS_StyleScopedClasses['donut-svg']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.circle)({
    cx: "100",
    cy: "100",
    r: "72",
    fill: "none",
    stroke: "#edeff5",
    'stroke-width': "26",
});
for (const [seg, i] of __VLS_vFor((__VLS_ctx.donutSegments()))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.circle)({
        key: (i),
        cx: "100",
        cy: "100",
        r: "72",
        fill: "none",
        stroke: (seg.color),
        'stroke-width': (seg.strokeWidth),
        'stroke-dasharray': (seg.dasharray),
        'stroke-dashoffset': (seg.dashoffset),
        transform: "rotate(-90 100 100)",
        ...{ class: "donut-arc" },
        ...{ style: ({ '--delay': i * 0.15 + 's' }) },
        'aria-label': (seg.label + ' ' + seg.pct + '%'),
    });
    /** @type {__VLS_StyleScopedClasses['donut-arc']} */ ;
    // @ts-ignore
    [donutSegments,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "donut-center" },
    'aria-hidden': "true",
});
/** @type {__VLS_StyleScopedClasses['donut-center']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "donut-total" },
});
/** @type {__VLS_StyleScopedClasses['donut-total']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "donut-sub" },
});
/** @type {__VLS_StyleScopedClasses['donut-sub']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "viz-legend" },
    role: "list",
    'aria-label': "图例",
});
/** @type {__VLS_StyleScopedClasses['viz-legend']} */ ;
for (const [g] of __VLS_vFor((__VLS_ctx.guaranteeData))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        key: (g.label),
        role: "listitem",
        ...{ class: "legend-item" },
    });
    /** @type {__VLS_StyleScopedClasses['legend-item']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span)({
        ...{ class: "legend-dot" },
        ...{ style: ({ background: g.color }) },
        'aria-hidden': "true",
    });
    /** @type {__VLS_StyleScopedClasses['legend-dot']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "legend-label" },
    });
    /** @type {__VLS_StyleScopedClasses['legend-label']} */ ;
    (g.label);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "legend-pct" },
    });
    /** @type {__VLS_StyleScopedClasses['legend-pct']} */ ;
    (g.pct);
    // @ts-ignore
    [guaranteeData,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "viz-card card-industry" },
    role: "figure",
    'aria-label': "行业融资占比",
});
/** @type {__VLS_StyleScopedClasses['viz-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-industry']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ class: "card-accent" },
});
/** @type {__VLS_StyleScopedClasses['card-accent']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "viz-header" },
});
/** @type {__VLS_StyleScopedClasses['viz-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "viz-icon" },
});
/** @type {__VLS_StyleScopedClasses['viz-icon']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "industry-chart" },
});
/** @type {__VLS_StyleScopedClasses['industry-chart']} */ ;
for (const [row, i] of __VLS_vFor((__VLS_ctx.industryData))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (i),
        ...{ class: "industry-row" },
        'aria-label': (row.label + ' ' + row.pct + '%'),
    });
    /** @type {__VLS_StyleScopedClasses['industry-row']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "industry-icon" },
    });
    /** @type {__VLS_StyleScopedClasses['industry-icon']} */ ;
    (row.icon);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "industry-label" },
    });
    /** @type {__VLS_StyleScopedClasses['industry-label']} */ ;
    (row.label);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "industry-track" },
    });
    /** @type {__VLS_StyleScopedClasses['industry-track']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ class: "industry-fill" },
        ...{ style: ({ width: row.pct + '%', background: row.color, '--delay': i * 0.12 + 's' }) },
    });
    /** @type {__VLS_StyleScopedClasses['industry-fill']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "industry-pct" },
    });
    /** @type {__VLS_StyleScopedClasses['industry-pct']} */ ;
    (row.pct);
    // @ts-ignore
    [industryData,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "viz-card card-region" },
    role: "figure",
    'aria-label': "县市区企业分布",
});
/** @type {__VLS_StyleScopedClasses['viz-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-region']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ class: "card-accent" },
});
/** @type {__VLS_StyleScopedClasses['card-accent']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "viz-header" },
});
/** @type {__VLS_StyleScopedClasses['viz-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "viz-icon" },
});
/** @type {__VLS_StyleScopedClasses['viz-icon']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "region-chart" },
    role: "list",
});
/** @type {__VLS_StyleScopedClasses['region-chart']} */ ;
for (const [r] of __VLS_vFor((__VLS_ctx.regionData))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (r.name),
        ...{ class: "region-row" },
        role: "listitem",
        'aria-label': ('第' + r.rank + '名 ' + r.name + '：' + r.val + '家'),
    });
    /** @type {__VLS_StyleScopedClasses['region-row']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: (['region-rank', r.rank <= 3 ? 'top-three' : '']) },
    });
    /** @type {__VLS_StyleScopedClasses['region-rank']} */ ;
    (r.rank);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "region-name" },
    });
    /** @type {__VLS_StyleScopedClasses['region-name']} */ ;
    (r.name);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "region-track" },
    });
    /** @type {__VLS_StyleScopedClasses['region-track']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ class: "region-bar" },
        ...{ style: ({ width: (r.val / 1700 * 100) + '%', background: r.barColor, '--delay': r.rank * 0.06 + 's' }) },
    });
    /** @type {__VLS_StyleScopedClasses['region-bar']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "region-val" },
    });
    /** @type {__VLS_StyleScopedClasses['region-val']} */ ;
    (r.val);
    // @ts-ignore
    [regionData,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "viz-grid viz-grid-2-1" },
});
/** @type {__VLS_StyleScopedClasses['viz-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['viz-grid-2-1']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "viz-card card-trend" },
    role: "figure",
    'aria-label': (__VLS_ctx.selectedYear + '年度放款趋势'),
});
/** @type {__VLS_StyleScopedClasses['viz-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-trend']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ class: "card-accent" },
});
/** @type {__VLS_StyleScopedClasses['card-accent']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "viz-header-row" },
});
/** @type {__VLS_StyleScopedClasses['viz-header-row']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "viz-header" },
});
/** @type {__VLS_StyleScopedClasses['viz-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "viz-icon" },
});
/** @type {__VLS_StyleScopedClasses['viz-icon']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.selectedYear);
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "trend-unit" },
});
/** @type {__VLS_StyleScopedClasses['trend-unit']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "year-selector" },
    role: "tablist",
    'aria-label': "选择年份",
});
/** @type {__VLS_StyleScopedClasses['year-selector']} */ ;
for (const [y] of __VLS_vFor(([2024, 2025, 2026]))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.selectedYear = y;
                // @ts-ignore
                [selectedYear, selectedYear, selectedYear,];
            } },
        key: (y),
        ...{ class: (__VLS_ctx.yearBtnClass(y)) },
        role: "tab",
        'aria-selected': (__VLS_ctx.selectedYear === y),
        'aria-label': (y + '年数据'),
    });
    (y);
    // @ts-ignore
    [selectedYear, yearBtnClass,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "trend-wrap" },
});
/** @type {__VLS_StyleScopedClasses['trend-wrap']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "trend-y-axis" },
    'aria-hidden': "true",
});
/** @type {__VLS_StyleScopedClasses['trend-y-axis']} */ ;
for (const [v, i] of __VLS_vFor((__VLS_ctx.yLabels))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        key: (i),
        ...{ class: "y-tick" },
    });
    /** @type {__VLS_StyleScopedClasses['y-tick']} */ ;
    (v);
    // @ts-ignore
    [yLabels,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "trend-body" },
});
/** @type {__VLS_StyleScopedClasses['trend-body']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "trend-average" },
    ...{ style: ({ bottom: (__VLS_ctx.trendValues.reduce((a, b) => a + b, 0) / 12 / __VLS_ctx.trendMax * 100) + '%' }) },
    'aria-hidden': "true",
});
/** @type {__VLS_StyleScopedClasses['trend-average']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "avg-label" },
});
/** @type {__VLS_StyleScopedClasses['avg-label']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "trend-bars" },
    role: "list",
    'aria-label': "月度放款金额柱状图",
});
/** @type {__VLS_StyleScopedClasses['trend-bars']} */ ;
for (const [b, i] of __VLS_vFor((__VLS_ctx.trendValues))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (i),
        ...{ class: "trend-bar-col" },
        role: "listitem",
        'aria-label': ((i + 1) + '月：' + b + '亿元'),
    });
    /** @type {__VLS_StyleScopedClasses['trend-bar-col']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "trend-bar" },
        ...{ style: ({ height: (b / __VLS_ctx.trendMax * 100) + '%', '--delay': i * 0.06 + 's' }) },
    });
    /** @type {__VLS_StyleScopedClasses['trend-bar']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "trend-val" },
    });
    /** @type {__VLS_StyleScopedClasses['trend-val']} */ ;
    (b);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "trend-label" },
    });
    /** @type {__VLS_StyleScopedClasses['trend-label']} */ ;
    (i + 1);
    // @ts-ignore
    [trendValues, trendValues, trendMax, trendMax,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "viz-card card-activity" },
    role: "feed",
    'aria-label': "实时动态",
});
/** @type {__VLS_StyleScopedClasses['viz-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-activity']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ class: "card-accent" },
});
/** @type {__VLS_StyleScopedClasses['card-accent']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "viz-header" },
});
/** @type {__VLS_StyleScopedClasses['viz-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "viz-icon" },
});
/** @type {__VLS_StyleScopedClasses['viz-icon']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "activity-header-inner" },
});
/** @type {__VLS_StyleScopedClasses['activity-header-inner']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span)({
    ...{ class: "live-dot" },
    'aria-label': "实时更新中",
});
/** @type {__VLS_StyleScopedClasses['live-dot']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "activity-feed" },
});
/** @type {__VLS_StyleScopedClasses['activity-feed']} */ ;
for (const [act, i] of __VLS_vFor((__VLS_ctx.activityData))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (i),
        ...{ class: "activity-item" },
        ...{ style: ({ '--delay': i * 0.1 + 's' }) },
        'aria-label': (act.tag + '：' + act.text),
    });
    /** @type {__VLS_StyleScopedClasses['activity-item']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: (['activity-badge', act.tag]) },
    });
    /** @type {__VLS_StyleScopedClasses['activity-badge']} */ ;
    (act.tag);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "activity-body" },
    });
    /** @type {__VLS_StyleScopedClasses['activity-body']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "activity-text" },
    });
    /** @type {__VLS_StyleScopedClasses['activity-text']} */ ;
    (act.text);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "activity-time" },
    });
    /** @type {__VLS_StyleScopedClasses['activity-time']} */ ;
    (act.time);
    // @ts-ignore
    [activityData,];
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
