package com.wisdom.finance.cms.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

/**
 * CMS内容DTO — 匹配前端 FooterContentItem 接口
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CmsContentDTO {
    private Long id;
    private String category;
    private String type;
    private String title;
    private String subtitle;
    private String icon;
    private String summary;
    private List<String> body;
    private List<MetaItem> meta;
    private List<RelatedItem> related;
    private Integer sortOrder;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MetaItem {
        private String key;
        private String value;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RelatedItem {
        private String label;
        private String link;
    }

    /** 创建/更新请求 */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CmsRequest {
        private String category;
        private String type;
        private String title;
        private String subtitle;
        private String icon;
        private String summary;
        private List<String> body;
        private List<MetaItem> meta;
        private List<RelatedItem> related;
        private Integer sortOrder;
        private String status;
    }
}