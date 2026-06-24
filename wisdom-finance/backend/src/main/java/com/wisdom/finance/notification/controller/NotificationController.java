package com.wisdom.finance.notification.controller;

import com.wisdom.finance.common.controller.Result;
import com.wisdom.finance.notification.entity.Notification;
import com.wisdom.finance.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notification")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping("/list")
    public Result<Page<Notification>> getNotificationList(
            @RequestParam Long userId,
            @RequestParam(defaultValue = "0") int page) {
        return Result.success(notificationService.getUserNotifications(userId, page));
    }

    @GetMapping("/{id}")
    public Result<Notification> getNotificationDetail(@PathVariable Long id) {
        return Result.success(notificationService.getNotificationById(id));
    }

    @PutMapping("/{id}/read")
    public Result<Notification> markAsRead(@PathVariable Long id) {
        return Result.success(notificationService.markAsRead(id));
    }

    @PutMapping("/read/all")
    public Result<Integer> markAllAsRead(@RequestParam Long userId) {
        return Result.success(notificationService.markAllAsRead(userId));
    }

    @GetMapping("/unread-count")
    public Result<Long> getUnreadCount(@RequestParam Long userId) {
        return Result.success(notificationService.getUnreadCount(userId));
    }

    @PostMapping("/send")
    public Result<Notification> sendNotification(@RequestBody Notification notification) {
        return Result.success(notificationService.sendNotification(notification));
    }

    @DeleteMapping("/{id}")
    public Result<Void> deleteNotification(@PathVariable Long id) {
        boolean deleted = notificationService.deleteNotification(id);
        return deleted ? Result.success(null) : Result.error(404, "通知不存在");
    }
}