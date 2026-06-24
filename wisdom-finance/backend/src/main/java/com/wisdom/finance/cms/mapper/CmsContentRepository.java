package com.wisdom.finance.cms.mapper;

import com.wisdom.finance.cms.entity.CmsContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * CMS内容Repository
 */
@Repository
public interface CmsContentRepository extends JpaRepository<CmsContent, Long> {

    List<CmsContent> findByCategoryOrderBySortOrderAsc(String category);

    List<CmsContent> findByCategoryAndStatusOrderBySortOrderAsc(String category, String status);

    Optional<CmsContent> findByType(String type);

    List<CmsContent> findByStatusOrderBySortOrderAsc(String status);
}