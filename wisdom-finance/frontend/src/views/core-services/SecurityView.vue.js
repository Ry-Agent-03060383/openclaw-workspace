/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/46532/AppData/Local/npm-cache/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Check } from '@element-plus/icons-vue';
const router = useRouter();
function scrollTo(id) { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }
// ── SEO ╱ 页面元信息 ──
onMounted(() => {
    document.title = '数据安全 — 焦作市智慧金融服务平台';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
    }
    meta.setAttribute('content', '金融级数据加密，全方位信息安全保障。焦作市智慧金融服务平台提供等保三级认证、ISO27001认证、AES-256+TLS1.3加密、数据脱敏、访问控制等全方位数据安全服务。');
});
// ── 滚动入场观察 ──
const observed = ref(new Set());
function observeEntries(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observed.value.delete(entry.target);
        }
    });
}
onMounted(() => {
    const observer = new IntersectionObserver(observeEntries, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
        observed.value.add(el);
    });
});
// ── 滚动阴影 ──
const scrolled = ref(false);
function handleScroll() {
    scrolled.value = window.scrollY > 60;
}
onMounted(() => window.addEventListener('scroll', handleScroll));
function goLogin() {
    router.push('/login');
}
const certifications = [
    {
        icon: '🛡️',
        title: '等保三级认证',
        desc: '通过国家信息安全等级保护三级认证，严格遵循《信息安全等级保护管理办法》要求，覆盖物理安全、网络安全、主机安全、应用安全、数据安全五大维度，确保平台安全防护能力达到国家标准。',
    },
    {
        icon: '📜',
        title: 'ISO 27001',
        desc: '通过ISO 27001信息安全管理体系认证，建立覆盖组织管理、资产管理、密码控制、物理安全、通信安全、访问控制等14个领域的全方位信息安全管理体系，与国际标准接轨。',
    },
    {
        icon: '🔐',
        title: '金融级加密',
        desc: '采用AES-256对称加密算法与TLS 1.3传输层安全协议，对数据进行端到端加密保护。密钥采用硬件安全模块(HSM)管理，具备完整的密钥生命周期管理和安全审计能力。',
    },
];
const securityLayers = [
    {
        title: '物理安全',
        icon: '🏢',
        details: [
            '数据中心A级机房标准建设',
            '7×24小时安保与视频监控',
            '生物识别+IC卡双重门禁',
            '温湿度智能监控与消防系统',
            '双路供电与UPS不间断电源',
        ],
    },
    {
        title: '网络安全',
        icon: '🌐',
        details: [
            '下一代防火墙(NGFW)防护',
            '入侵检测与防御系统(IDS/IPS)',
            'DDoS流量清洗与防护',
            'Web应用防火墙(WAF)',
            '全网流量审计与异常检测',
        ],
    },
    {
        title: '数据安全',
        icon: '🗄️',
        details: [
            'AES-256静态数据加密存储',
            'TLS 1.3传输加密保护',
            '数据库审计与敏感数据发现',
            '数据备份与异地容灾恢复',
            '数据分级分类与生命周期管理',
        ],
    },
    {
        title: '应用安全',
        icon: '💻',
        details: [
            '全链路代码安全审计',
            'OWASP Top 10漏洞防护',
            '接口鉴权与API安全网关',
            '统一身份认证与权限管理',
            '应用安全监控与应急响应',
        ],
    },
];
// ── Section 3: 安全记录 ──
const securityStats = ref([
    { label: '安全运行', value: '365', unit: '天', icon: '📅', color: '#67C23A' },
    { label: '安全事件', value: '零', unit: '事故', icon: '✅', color: '#409EFF' },
    { label: '安全审计', value: '通过', unit: '审计', icon: '📋', color: '#E6A23C' },
]);
const privacyItems = [
    { icon: '🔍', title: '数据脱敏', desc: '对敏感个人信息（姓名、手机号、身份证号等）进行动态脱敏处理，确保在不影响业务分析的前提下，有效防止敏感数据泄露' },
    { icon: '🔑', title: '访问控制', desc: '基于角色的细粒度访问控制(RBAC)，按需分配最小权限，严格审批数据访问请求，实现数据访问全过程可追溯' },
    { icon: '📝', title: '审计日志', desc: '完整记录所有数据操作行为，包括访问、修改、导出等，审计日志不可篡改，满足合规审计与事后追溯要求' },
    { icon: '📡', title: '加密传输', desc: '全链路传输层加密，端到端数据保护，确保数据在传输过程中不被窃听、篡改或伪造，支持国密算法' },
];
// ── Section 5: 合规认证 ──
const complianceBadges = [
    { name: 'ISO 27001', icon: '🌐' },
    { name: '等保三级', icon: '🛡️' },
    { name: '银监会', icon: '🏦' },
    { name: '网信办', icon: '📱' },
    { name: '公安联网', icon: '👮' },
    { name: 'SSL', icon: '🔒' },
];
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
/** @type {__VLS_StyleScopedClasses['navbar-links']} */ ;
/** @type {__VLS_StyleScopedClasses['navbar-links']} */ ;
/** @type {__VLS_StyleScopedClasses['navbar-links']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-bg']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-btn-outline']} */ ;
/** @type {__VLS_StyleScopedClasses['cert-card']} */ ;
/** @type {__VLS_StyleScopedClasses['layer-body']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-card']} */ ;
/** @type {__VLS_StyleScopedClasses['privacy-card']} */ ;
/** @type {__VLS_StyleScopedClasses['badge-item']} */ ;
/** @type {__VLS_StyleScopedClasses['cta-bg']} */ ;
/** @type {__VLS_StyleScopedClasses['cta-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-brand']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-col']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-col']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-bottom']} */ ;
/** @type {__VLS_StyleScopedClasses['certs-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['privacy-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['certs-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['privacy-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['badges-row']} */ ;
/** @type {__VLS_StyleScopedClasses['badge-item']} */ ;
/** @type {__VLS_StyleScopedClasses['layer-details']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-content']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-links']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-section']} */ ;
/** @type {__VLS_StyleScopedClasses['badge-item']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-card']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-value']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "security-page" },
});
/** @type {__VLS_StyleScopedClasses['security-page']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.nav, __VLS_intrinsics.nav)({
    ...{ class: "navbar" },
    ...{ class: ({ 'navbar-scrolled': __VLS_ctx.scrolled }) },
});
/** @type {__VLS_StyleScopedClasses['navbar']} */ ;
/** @type {__VLS_StyleScopedClasses['navbar-scrolled']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "navbar-inner section-container" },
});
/** @type {__VLS_StyleScopedClasses['navbar-inner']} */ ;
/** @type {__VLS_StyleScopedClasses['section-container']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "navbar-brand" },
});
/** @type {__VLS_StyleScopedClasses['navbar-brand']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "brand-icon" },
});
/** @type {__VLS_StyleScopedClasses['brand-icon']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "brand-text" },
});
/** @type {__VLS_StyleScopedClasses['brand-text']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "navbar-links" },
});
/** @type {__VLS_StyleScopedClasses['navbar-links']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "#certifications",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "#system",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "#records",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "#privacy",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "#compliance",
});
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    type: "primary",
    round: true,
    ...{ class: "navbar-cta" },
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    type: "primary",
    round: true,
    ...{ class: "navbar-cta" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = {
    /** @type {typeof __VLS_5.click} */
    onClick: (__VLS_ctx.goLogin),
};
/** @type {__VLS_StyleScopedClasses['navbar-cta']} */ ;
const { default: __VLS_7 } = __VLS_3.slots;
// @ts-ignore
[scrolled, goLogin,];
var __VLS_3;
var __VLS_4;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "hero-section" },
});
/** @type {__VLS_StyleScopedClasses['hero-section']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ class: "hero-bg" },
});
/** @type {__VLS_StyleScopedClasses['hero-bg']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "hero-content" },
});
/** @type {__VLS_StyleScopedClasses['hero-content']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "hero-badge" },
});
/** @type {__VLS_StyleScopedClasses['hero-badge']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
    ...{ class: "hero-title" },
});
/** @type {__VLS_StyleScopedClasses['hero-title']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "hero-subtitle" },
});
/** @type {__VLS_StyleScopedClasses['hero-subtitle']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "hero-desc" },
});
/** @type {__VLS_StyleScopedClasses['hero-desc']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.br)({
    ...{ class: "hide-mobile" },
});
/** @type {__VLS_StyleScopedClasses['hide-mobile']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "hero-actions" },
});
/** @type {__VLS_StyleScopedClasses['hero-actions']} */ ;
let __VLS_8;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent1(__VLS_8, new __VLS_8({
    ...{ 'onClick': {} },
    type: "primary",
    size: "large",
    ...{ class: "hero-btn-primary" },
}));
const __VLS_10 = __VLS_9({
    ...{ 'onClick': {} },
    type: "primary",
    size: "large",
    ...{ class: "hero-btn-primary" },
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_13;
const __VLS_14 = {
    /** @type {typeof __VLS_13.click} */
    onClick: (__VLS_ctx.goLogin),
};
/** @type {__VLS_StyleScopedClasses['hero-btn-primary']} */ ;
const { default: __VLS_15 } = __VLS_11.slots;
// @ts-ignore
[goLogin,];
var __VLS_11;
var __VLS_12;
let __VLS_16;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent1(__VLS_16, new __VLS_16({
    ...{ 'onClick': {} },
    size: "large",
    ...{ class: "hero-btn-outline" },
}));
const __VLS_18 = __VLS_17({
    ...{ 'onClick': {} },
    size: "large",
    ...{ class: "hero-btn-outline" },
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
let __VLS_21;
const __VLS_22 = {
    /** @type {typeof __VLS_21.click} */
    onClick: (...[$event]) => {
        __VLS_ctx.scrollTo('certifications');
        // @ts-ignore
        [scrollTo,];
    },
};
/** @type {__VLS_StyleScopedClasses['hero-btn-outline']} */ ;
const { default: __VLS_23 } = __VLS_19.slots;
// @ts-ignore
[];
var __VLS_19;
var __VLS_20;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ref: "certifications",
    id: "certifications",
    ...{ class: "section animate-on-scroll" },
});
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "section-container" },
});
/** @type {__VLS_StyleScopedClasses['section-container']} */ ;
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
    ...{ class: "certs-grid" },
});
/** @type {__VLS_StyleScopedClasses['certs-grid']} */ ;
for (const [cert, i] of __VLS_vFor((__VLS_ctx.certifications))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (cert.title),
        ...{ class: "cert-card animate-on-scroll" },
        ...{ style: ({ animationDelay: `${i * 0.12}s` }) },
    });
    /** @type {__VLS_StyleScopedClasses['cert-card']} */ ;
    /** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "cert-shield" },
    });
    /** @type {__VLS_StyleScopedClasses['cert-shield']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "cert-icon" },
    });
    /** @type {__VLS_StyleScopedClasses['cert-icon']} */ ;
    (cert.icon);
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
        ...{ class: "cert-title" },
    });
    /** @type {__VLS_StyleScopedClasses['cert-title']} */ ;
    (cert.title);
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "cert-desc" },
    });
    /** @type {__VLS_StyleScopedClasses['cert-desc']} */ ;
    (cert.desc);
    // @ts-ignore
    [certifications,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    id: "system",
    ...{ class: "section section-alt animate-on-scroll" },
});
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-alt']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "section-container" },
});
/** @type {__VLS_StyleScopedClasses['section-container']} */ ;
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
    ...{ class: "layers-flow" },
});
/** @type {__VLS_StyleScopedClasses['layers-flow']} */ ;
for (const [layer, idx] of __VLS_vFor((__VLS_ctx.securityLayers))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (layer.title),
        ...{ class: "layer-card animate-on-scroll" },
        ...{ style: ({ animationDelay: `${idx * 0.1}s` }) },
    });
    /** @type {__VLS_StyleScopedClasses['layer-card']} */ ;
    /** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "layer-step" },
    });
    /** @type {__VLS_StyleScopedClasses['layer-step']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "step-number" },
    });
    /** @type {__VLS_StyleScopedClasses['step-number']} */ ;
    (idx + 1);
    if (idx < __VLS_ctx.securityLayers.length - 1) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
            ...{ class: "step-line" },
        });
        /** @type {__VLS_StyleScopedClasses['step-line']} */ ;
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "layer-body" },
    });
    /** @type {__VLS_StyleScopedClasses['layer-body']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "layer-header" },
    });
    /** @type {__VLS_StyleScopedClasses['layer-header']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "layer-icon" },
    });
    /** @type {__VLS_StyleScopedClasses['layer-icon']} */ ;
    (layer.icon);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
        ...{ class: "layer-title" },
    });
    /** @type {__VLS_StyleScopedClasses['layer-title']} */ ;
    (layer.title);
    __VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
        ...{ class: "layer-details" },
    });
    /** @type {__VLS_StyleScopedClasses['layer-details']} */ ;
    for (const [detail] of __VLS_vFor((layer.details))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
            key: (detail),
            ...{ class: "layer-detail-item" },
        });
        /** @type {__VLS_StyleScopedClasses['layer-detail-item']} */ ;
        let __VLS_24;
        /** @ts-ignore @type { | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon'] | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon']} */
        elIcon;
        // @ts-ignore
        const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({
            ...{ class: "check-icon" },
        }));
        const __VLS_26 = __VLS_25({
            ...{ class: "check-icon" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_25));
        /** @type {__VLS_StyleScopedClasses['check-icon']} */ ;
        const { default: __VLS_29 } = __VLS_27.slots;
        let __VLS_30;
        /** @ts-ignore @type { | typeof __VLS_components.Check} */
        Check;
        // @ts-ignore
        const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({}));
        const __VLS_32 = __VLS_31({}, ...__VLS_functionalComponentArgsRest(__VLS_31));
        // @ts-ignore
        [securityLayers, securityLayers,];
        var __VLS_27;
        (detail);
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    id: "records",
    ...{ class: "section animate-on-scroll" },
});
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "section-container" },
});
/** @type {__VLS_StyleScopedClasses['section-container']} */ ;
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
    ...{ class: "stats-grid" },
});
/** @type {__VLS_StyleScopedClasses['stats-grid']} */ ;
for (const [stat] of __VLS_vFor((__VLS_ctx.securityStats))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (stat.label),
        ...{ class: "stat-card animate-on-scroll" },
    });
    /** @type {__VLS_StyleScopedClasses['stat-card']} */ ;
    /** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "stat-icon" },
        ...{ style: ({ background: stat.color + '15', color: stat.color }) },
    });
    /** @type {__VLS_StyleScopedClasses['stat-icon']} */ ;
    (stat.icon);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "stat-info" },
    });
    /** @type {__VLS_StyleScopedClasses['stat-info']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "stat-value" },
        ...{ style: ({ color: stat.color }) },
    });
    /** @type {__VLS_StyleScopedClasses['stat-value']} */ ;
    (stat.value);
    if (stat.unit) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "stat-unit" },
        });
        /** @type {__VLS_StyleScopedClasses['stat-unit']} */ ;
        (stat.unit);
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "stat-label" },
    });
    /** @type {__VLS_StyleScopedClasses['stat-label']} */ ;
    (stat.label);
    // @ts-ignore
    [securityStats,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    id: "privacy",
    ...{ class: "section section-alt animate-on-scroll" },
});
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-alt']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "section-container" },
});
/** @type {__VLS_StyleScopedClasses['section-container']} */ ;
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
    ...{ class: "privacy-grid" },
});
/** @type {__VLS_StyleScopedClasses['privacy-grid']} */ ;
for (const [item, i] of __VLS_vFor((__VLS_ctx.privacyItems))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (item.title),
        ...{ class: "privacy-card animate-on-scroll" },
        ...{ style: ({ animationDelay: `${i * 0.1}s` }) },
    });
    /** @type {__VLS_StyleScopedClasses['privacy-card']} */ ;
    /** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "privacy-icon-wrapper" },
    });
    /** @type {__VLS_StyleScopedClasses['privacy-icon-wrapper']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "privacy-icon" },
    });
    /** @type {__VLS_StyleScopedClasses['privacy-icon']} */ ;
    (item.icon);
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
        ...{ class: "privacy-title" },
    });
    /** @type {__VLS_StyleScopedClasses['privacy-title']} */ ;
    (item.title);
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "privacy-desc" },
    });
    /** @type {__VLS_StyleScopedClasses['privacy-desc']} */ ;
    (item.desc);
    // @ts-ignore
    [privacyItems,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    id: "compliance",
    ...{ class: "section animate-on-scroll" },
});
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "section-container" },
});
/** @type {__VLS_StyleScopedClasses['section-container']} */ ;
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
    ...{ class: "badges-row" },
});
/** @type {__VLS_StyleScopedClasses['badges-row']} */ ;
for (const [badge] of __VLS_vFor((__VLS_ctx.complianceBadges))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (badge.name),
        ...{ class: "badge-item animate-on-scroll" },
    });
    /** @type {__VLS_StyleScopedClasses['badge-item']} */ ;
    /** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "badge-icon-wrapper" },
    });
    /** @type {__VLS_StyleScopedClasses['badge-icon-wrapper']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "badge-icon" },
    });
    /** @type {__VLS_StyleScopedClasses['badge-icon']} */ ;
    (badge.icon);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "badge-name" },
    });
    /** @type {__VLS_StyleScopedClasses['badge-name']} */ ;
    (badge.name);
    // @ts-ignore
    [complianceBadges,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "cta-section animate-on-scroll" },
});
/** @type {__VLS_StyleScopedClasses['cta-section']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-on-scroll']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ class: "cta-bg" },
});
/** @type {__VLS_StyleScopedClasses['cta-bg']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "section-container cta-content" },
});
/** @type {__VLS_StyleScopedClasses['section-container']} */ ;
/** @type {__VLS_StyleScopedClasses['cta-content']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "cta-title" },
});
/** @type {__VLS_StyleScopedClasses['cta-title']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "cta-desc" },
});
/** @type {__VLS_StyleScopedClasses['cta-desc']} */ ;
let __VLS_35;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_36 = __VLS_asFunctionalComponent1(__VLS_35, new __VLS_35({
    ...{ 'onClick': {} },
    type: "primary",
    size: "large",
    ...{ class: "cta-btn" },
}));
const __VLS_37 = __VLS_36({
    ...{ 'onClick': {} },
    type: "primary",
    size: "large",
    ...{ class: "cta-btn" },
}, ...__VLS_functionalComponentArgsRest(__VLS_36));
let __VLS_40;
const __VLS_41 = {
    /** @type {typeof __VLS_40.click} */
    onClick: (__VLS_ctx.goLogin),
};
/** @type {__VLS_StyleScopedClasses['cta-btn']} */ ;
const { default: __VLS_42 } = __VLS_38.slots;
// @ts-ignore
[goLogin,];
var __VLS_38;
var __VLS_39;
__VLS_asFunctionalElement1(__VLS_intrinsics.footer, __VLS_intrinsics.footer)({
    ...{ class: "footer" },
});
/** @type {__VLS_StyleScopedClasses['footer']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "section-container footer-content" },
});
/** @type {__VLS_StyleScopedClasses['section-container']} */ ;
/** @type {__VLS_StyleScopedClasses['footer-content']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "footer-brand" },
});
/** @type {__VLS_StyleScopedClasses['footer-brand']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "footer-links" },
});
/** @type {__VLS_StyleScopedClasses['footer-links']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "footer-col" },
});
/** @type {__VLS_StyleScopedClasses['footer-col']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h4, __VLS_intrinsics.h4)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "footer-col" },
});
/** @type {__VLS_StyleScopedClasses['footer-col']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h4, __VLS_intrinsics.h4)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "footer-col" },
});
/** @type {__VLS_StyleScopedClasses['footer-col']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h4, __VLS_intrinsics.h4)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "footer-bottom" },
});
/** @type {__VLS_StyleScopedClasses['footer-bottom']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
