package com.wisdom.finance.cms.controller;

import com.wisdom.finance.cms.dto.CmsContentDTO;
import com.wisdom.finance.cms.service.CmsService;
import com.wisdom.finance.common.controller.Result;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * CMS内容管理接口
 *
 * 公开接口（无需登录）：
 *   GET /api/cms/public/category/{category} — 按分类获取已发布内容
 *   GET /api/cms/public/type/{type} — 按类型标识获取
 *   GET /api/cms/public/all — 全部已发布内容
 *
 * 管理端接口（需 ADMIN 角色）：
 *   GET /api/cms/admin/list — 全部内容（含草稿）
 *   GET /api/cms/admin/list/{category} — 按分类
 *   GET /api/cms/admin/{id} — 按ID
 *   GET /api/cms/admin/type/{type} — 按类型标识
 *   POST /api/cms/admin — 创建
 *   PUT /api/cms/admin/{id} — 更新
 *   DELETE /api/cms/admin/{id} — 删除
 */
@RestController
@RequiredArgsConstructor
public class CmsController {

    private final CmsService cmsService;

    // ═══════════════════════════════════════════
    //  公开接口
    // ═══════════════════════════════════════════

    @GetMapping("/api/cms/public/category/{category}")
    public Result<List<CmsContentDTO>> getByCategory(@PathVariable String category) {
        return Result.success(cmsService.getPublishedByCategory(category));
    }

    @GetMapping("/api/cms/public/type/{type}")
    public Result<CmsContentDTO> getByType(@PathVariable String type) {
        CmsContentDTO dto = cmsService.getPublishedByType(type);
        if (dto == null) return Result.error(404, "内容不存在");
        return Result.success(dto);
    }

    @GetMapping("/api/cms/public/all")
    public Result<List<CmsContentDTO>> getAllPublic() {
        return Result.success(cmsService.getAllPublished());
    }

    // ═══════════════════════════════════════════
    //  管理端接口
    // ═══════════════════════════════════════════

    @GetMapping("/api/cms/admin/list")
    @PreAuthorize("hasRole('ADMIN')")
    public Result<List<CmsContentDTO>> listAll() {
        return Result.success(cmsService.listAll());
    }

    @GetMapping("/api/cms/admin/list/{category}")
    @PreAuthorize("hasRole('ADMIN')")
    public Result<List<CmsContentDTO>> listByCategory(@PathVariable String category) {
        return Result.success(cmsService.listByCategory(category));
    }

    @GetMapping("/api/cms/admin/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Result<CmsContentDTO> getById(@PathVariable Long id) {
        CmsContentDTO dto = cmsService.getById(id);
        if (dto == null) return Result.error(404, "内容不存在");
        return Result.success(dto);
    }

    @GetMapping("/api/cms/admin/type/{type}")
    @PreAuthorize("hasRole('ADMIN')")
    public Result<CmsContentDTO> getByTypeAdmin(@PathVariable String type) {
        CmsContentDTO dto = cmsService.getByType(type);
        if (dto == null) return Result.error(404, "内容不存在");
        return Result.success(dto);
    }

    @PostMapping("/api/cms/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public Result<CmsContentDTO> create(@RequestBody CmsContentDTO.CmsRequest req) {
        return Result.success(cmsService.create(req));
    }

    @PutMapping("/api/cms/admin/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Result<CmsContentDTO> update(@PathVariable Long id, @RequestBody CmsContentDTO.CmsRequest req) {
        return Result.success(cmsService.update(id, req));
    }

    @DeleteMapping("/api/cms/admin/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Result<Void> delete(@PathVariable Long id) {
        cmsService.delete(id);
        return Result.success();
    }
}