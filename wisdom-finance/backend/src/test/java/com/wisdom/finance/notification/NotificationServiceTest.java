package com.wisdom.finance.notification;

import com.wisdom.finance.notification.entity.Notification;
import com.wisdom.finance.notification.service.NotificationService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class NotificationServiceTest {

    @InjectMocks
    private NotificationService notificationService;

    @Test
    void createNotification_ShouldCreateAndSend() {
        Notification result = notificationService.createNotification(
                1L, Notification.NotificationType.SYSTEM, "系统通知",
                "测试内容", "LOAN_APPLICATION", 100L);

        assertNotNull(result);
        assertEquals(1L, result.getUserId());
        assertEquals(Notification.NotificationType.SYSTEM, result.getType());
        assertEquals("系统通知", result.getTitle());
        assertEquals("测试内容", result.getContent());
        assertEquals("LOAN_APPLICATION", result.getReferenceType());
        assertEquals(100L, result.getReferenceId());
        assertTrue(result.getSendStatus());
        assertFalse(result.getReadStatus());
    }

    @Test
    void sendNotification_ShouldPersist() {
        Notification notification = new Notification();
        notification.setUserId(1L);
        notification.setType(Notification.NotificationType.APPLICATION_SUBMITTED);
        notification.setTitle("贷款申请已提交");
        notification.setContent("您的贷款申请已成功提交");
        notification.setReferenceType("LOAN");
        notification.setReferenceId(200L);

        Notification result = notificationService.sendNotification(notification);

        assertNotNull(result.getId());
        assertEquals(1L, result.getUserId());
        assertTrue(result.getSendStatus());
    }

    @Test
    void markAsRead_ShouldUpdateStatus() {
        Notification n = notificationService.createNotification(
                1L, Notification.NotificationType.SYSTEM, "测试", "测试", null, null);
        assertFalse(n.getReadStatus());

        Notification updated = notificationService.markAsRead(n.getId());

        assertTrue(updated.getReadStatus());
        assertNotNull(updated.getReadAt());
    }

    @Test
    void markAsRead_ShouldThrowWhenNotFound() {
        assertThrows(RuntimeException.class, () -> notificationService.markAsRead(999L));
    }

    @Test
    void getAllUserNotifications_ShouldReturnUserNotifications() {
        notificationService.createNotification(1L, Notification.NotificationType.SYSTEM, "通知1", "内容1", null, null);
        notificationService.createNotification(1L, Notification.NotificationType.CREDIT_UPDATED, "通知2", "内容2", null, null);
        notificationService.createNotification(2L, Notification.NotificationType.SYSTEM, "通知3", "内容3", null, null);

        List<Notification> user1Notifications = notificationService.getAllUserNotifications(1L);

        assertEquals(2, user1Notifications.size());
    }

    @Test
    void getUnreadCount_ShouldReturnCorrectCount() {
        notificationService.createNotification(1L, Notification.NotificationType.SYSTEM, "未读", "未读", null, null);
        Notification n2 = notificationService.createNotification(
                1L, Notification.NotificationType.SYSTEM, "已读", "已读", null, null);
        notificationService.markAsRead(n2.getId());

        long unreadCount = notificationService.getUnreadCount(1L);

        assertEquals(1, unreadCount);
    }

    @Test
    void markAllAsRead_ShouldMarkAll() {
        notificationService.createNotification(1L, Notification.NotificationType.SYSTEM, "a", "a", null, null);
        notificationService.createNotification(1L, Notification.NotificationType.RISK_ALERT, "b", "b", null, null);

        int count = notificationService.markAllAsRead(1L);

        assertEquals(2, count);
        assertEquals(0, notificationService.getUnreadCount(1L));
    }

    @Test
    void deleteNotification_ShouldRemove() {
        Notification n = notificationService.createNotification(
                1L, Notification.NotificationType.SYSTEM, "待删", "待删", null, null);

        assertTrue(notificationService.deleteNotification(n.getId()));
        assertFalse(notificationService.deleteNotification(999L));
    }

    @Test
    void getNotificationById_ShouldReturn() {
        Notification n = notificationService.createNotification(
                1L, Notification.NotificationType.SYSTEM, "详情", "详情", null, null);

        Notification found = notificationService.getNotificationById(n.getId());

        assertNotNull(found);
        assertEquals("详情", found.getTitle());
    }
}