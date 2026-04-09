package com.wisdom.finance.notification.controller;

import com.wisdom.finance.notification.entity.Notification;
import com.wisdom.finance.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.pringframework.data.domain.Page;
import org.pringframework.http.ResponseEntity;
import org.pringframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 通知中心控制器 - M8 通知中心
 * 
 * 提供通知相关的REST API接口
 */
@RestController
@RequestMapping("/api/notification")
@RequiredArgsConstructor
public class NotificationController {
    
    private final NotificationService notificationService;
    
    /**
     * 获取用户通知列表
     * GET /api/notification/list?userId=xxx&page=0
     */
    @GetMapping("/list")
    public ResponseEntity<Map<String, Object>> getNotificationList(
            @RequestParam Long userId,
            @RequestParam(defaultValue = "0") int page) {
        
        Page<Notification> notificationPage = notificationService.getUserNotifications(userId, page);
        
        Map<String, Object> response = new HashMap<>();
        response.put("code", 200);
        response.put("message", "获取成功");
        response.put("data", notificationPage.getContent());
        response.put("total", notificationPage.getTotalElements());
        response.put("page", page);
        response.put("totalPages", notificationPage.getTotalPages());
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * 获取通知详情
     * GET /api/notification/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getNotificationDetail(@PathVariable Long id) {
        Notification notification = notificationService.getNotificationById(id);
        
        Map<String, Object> response = new HashMap<>();
        response.put("code", 200);
        response.put("message", "获取成功");
        response.put("data", notification);
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * 标记通知为已读
     * PUT /api/notification/{id}/read
     */
    @PutMapping("/{id}/read")
    public ResponseEntity<Map<String, Object>> markAsRead(@PathVariable Long id) {
        Notification notification = notificationService.markAsRead(id);
        
        Map<String, Object> response = new HashMap<>();
        response.put("code", 200);
        response.put("message", "标记已读成功");
        response.put("data", notification);
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * 标记用户所有通知为已读
     * PUT /api/notification/read/all?userId=xxx
     */
    @PutMapping("/read/all")
    public ResponseEntity<Map<String, Object>> markAllAsRead(@RequestParam Long userId) {
        int count = notificationService.markAllAsRead(userId);
        
        Map<String, Object> response = new HashMap<>();
        response.put("code", 200);
        response.put("message", "全部标记已读成功");
        response.put("data", count);
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * 获取用户未读通知数量
     * GET /api/notification/unread-count?userId=xxx
     */
    @GetMapping("/unread-count")
    public ResponseEntity<Map<String, Object>> getUnreadCount(@RequestParam Long userId) {
        long count = notificationService.getUnreadCount(userId);
        
        Map<String, Object> response = new HashMap<>();
        response.put("code", 200);
        response.put("message", "获取成功");
        response.put("data", count);
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * 发送通知
     * POST /api/notification/send
     */
    @PostMapping("/send")
    public ResponseEntity<Map<String, Object>> sendNotification(@RequestBody Notification notification) {
        Notification sent = notificationService.sendNotification(notification);
        
        Map<String, Object> response = new HashMap<>();
        response.put("code", 200);
        response.put("message", "发送成功");
        response.put("data", sent);
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * 批量发送通知
     * POST /api/notification/batch
     */
    @PostMapping("/batch")
    public ResponseEntity<Map<String, Object>> sendBatch(@RequestBody List<Notification> notifications) {
        List<Notification> sentList = notificationService.sendBatch(notifications);
        
        Map<String, Object> response = new HashMap<>();
        response.put("code", 200);
        response.put("message", "批量发送完成");
        response.put("data", sentList);
        response.put("successCount", sentList.size());
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * 删除通知
     * DELETE /api/notification/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteNotification(@PathVariable Long id) {
        boolean deleted = notificationService.deleteNotification(id);
        
        Map<String, Object> response = new HashMap<>();
        response.put("code", deleted ? 200 : 404);
        response.put("message", deleted ? "删除成功" : "通知不存在");
        
        return ResponseEntity.ok(response);
    }
}