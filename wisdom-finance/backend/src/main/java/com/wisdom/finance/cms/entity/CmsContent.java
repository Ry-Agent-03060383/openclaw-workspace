package com.wisdom.finance.cms.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

/**
 * CMS内容管理实体
 * 存储页脚详情页的所有内容（平台服务、政策指南、关于我们）
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "cms_contents")
public class CmsContent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** 分类：PLATFORM / POLICY / ABOUT */
    @Column(nullable = false, length = 20)
    private String category;

    /** 类型标识：financial-products, credit-check, ... */
    @Column(nullable = false, length = 50, unique = true)
    private String type;

    /** 标题 */
    @Column(nullable = false, length = 100)
    private String title;

    /** 副标题 */
    @Column(length = 200)
    private String subtitle;

    /** Emoji图标 */
    @Column(length = 10)
    private String icon;

    /** 摘要 */
    @Column(length = 500)
    private String summary;

    /** 正文 — JSON数组，每个元素为HTML片段 */
    @Column(columnDefinition = "TEXT")
    private String body;

    /** 元数据 — JSON数组 [{key, value}] */
    @Column(columnDefinition = "TEXT")
    private String meta;

    /** 相关链接 — JSON数组 [{label, link}] */
    @Column(columnDefinition = "TEXT")
    private String related;

    /** 排序号 */
    private Integer sortOrder;

    /** 状态：PUBLISHED / DRAFT */
    @Column(length = 10)
    private String status = "PUBLISHED";

    @Column(updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (status == null) status = "PUBLISHED";
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
