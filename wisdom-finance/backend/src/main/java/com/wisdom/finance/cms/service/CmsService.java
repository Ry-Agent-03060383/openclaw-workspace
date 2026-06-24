package com.wisdom.finance.cms.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wisdom.finance.cms.dto.CmsContentDTO;
import com.wisdom.finance.cms.entity.CmsContent;
import com.wisdom.finance.cms.mapper.CmsContentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * CMS内容管理服务
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class CmsService {

    private final CmsContentRepository repository;
    private final ObjectMapper objectMapper;

    // ═══ 公开查询 ═══

    /** 获取已发布内容列表（按分类） */
    public List<CmsContentDTO> getPublishedByCategory(String category) {
        return repository.findByCategoryAndStatusOrderBySortOrderAsc(category, "PUBLISHED")
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    /** 获取单个已发布内容 */
    public CmsContentDTO getPublishedByType(String type) {
        return repository.findByType(type)
                .filter(c -> "PUBLISHED".equals(c.getStatus()))
                .map(this::toDTO)
                .orElse(null);
    }

    /** 获取全部已发布内容 */
    public List<CmsContentDTO> getAllPublished() {
        return repository.findByStatusOrderBySortOrderAsc("PUBLISHED")
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    // ═══ 管理端CRUD ═══

    /** 获取全部内容（含草稿） */
    public List<CmsContentDTO> listAll() {
        return repository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    /** 按分类获取（含草稿） */
    public List<CmsContentDTO> listByCategory(String category) {
        return repository.findByCategoryOrderBySortOrderAsc(category)
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    /** 获取单个 */
    public CmsContentDTO getById(Long id) {
        return repository.findById(id).map(this::toDTO).orElse(null);
    }

    /** 获取单个按type */
    public CmsContentDTO getByType(String type) {
        return repository.findByType(type).map(this::toDTO).orElse(null);
    }

    /** 创建 */
    @Transactional
    public CmsContentDTO create(CmsContentDTO.CmsRequest req) {
        CmsContent entity = new CmsContent();
        applyRequest(entity, req);
        entity.setStatus(req.getStatus() != null ? req.getStatus() : "PUBLISHED");
        entity = repository.save(entity);
        return toDTO(entity);
    }

    /** 更新 */
    @Transactional
    public CmsContentDTO update(Long id, CmsContentDTO.CmsRequest req) {
        CmsContent entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("CMS内容不存在: " + id));
        applyRequest(entity, req);
        entity = repository.save(entity);
        return toDTO(entity);
    }

    /** 删除 */
    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("CMS内容不存在: " + id);
        }
        repository.deleteById(id);
    }

    // ═══ 内部方法 ═══

    private void applyRequest(CmsContent entity, CmsContentDTO.CmsRequest req) {
        entity.setCategory(req.getCategory());
        entity.setType(req.getType());
        entity.setTitle(req.getTitle());
        entity.setSubtitle(req.getSubtitle());
        entity.setIcon(req.getIcon());
        entity.setSummary(req.getSummary());
        entity.setSortOrder(req.getSortOrder());
        if (req.getStatus() != null) entity.setStatus(req.getStatus());

        // JSON序列化
        try {
            entity.setBody(req.getBody() != null ? objectMapper.writeValueAsString(req.getBody()) : "[]");
            entity.setMeta(req.getMeta() != null ? objectMapper.writeValueAsString(req.getMeta()) : "[]");
            entity.setRelated(req.getRelated() != null ? objectMapper.writeValueAsString(req.getRelated()) : "[]");
        } catch (Exception e) {
            throw new RuntimeException("JSON序列化失败", e);
        }
    }

    private CmsContentDTO toDTO(CmsContent entity) {
        if (entity == null) return null;
        CmsContentDTO.CmsContentDTOBuilder builder = CmsContentDTO.builder()
                .id(entity.getId())
                .category(entity.getCategory())
                .type(entity.getType())
                .title(entity.getTitle())
                .subtitle(entity.getSubtitle())
                .icon(entity.getIcon())
                .summary(entity.getSummary())
                .sortOrder(entity.getSortOrder())
                .status(entity.getStatus())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt());

        // JSON反序列化
        try {
            builder.body(entity.getBody() != null
                    ? objectMapper.readValue(entity.getBody(), new TypeReference<List<String>>() {})
                    : Collections.emptyList());
            builder.meta(entity.getMeta() != null
                    ? objectMapper.readValue(entity.getMeta(), new TypeReference<List<CmsContentDTO.MetaItem>>() {})
                    : Collections.emptyList());
            builder.related(entity.getRelated() != null
                    ? objectMapper.readValue(entity.getRelated(), new TypeReference<List<CmsContentDTO.RelatedItem>>() {})
                    : Collections.emptyList());
        } catch (Exception e) {
            log.warn("CMS JSON反序列化失败 id={}, type={}", entity.getId(), entity.getType(), e);
            builder.body(Collections.emptyList());
            builder.meta(Collections.emptyList());
            builder.related(Collections.emptyList());
        }

        return builder.build();
    }
}
