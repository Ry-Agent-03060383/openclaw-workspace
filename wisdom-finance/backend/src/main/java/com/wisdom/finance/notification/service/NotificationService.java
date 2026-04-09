package com.wisdom.finance.notification.service;

import com.wisdom.finance.notification.constant.NotificationType;
import com.wisdom.finance.notification.entity.Notification;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

/**
 * 通知服务 - M8 通知中心
 * 
 * 提供通知的发送、查询、管理等功能
 */
@Slf4j
@Service
public class NotificationService {
    
    // 模拟数据库存储
    private final Map<Long, Notification> notificationStore = new ConcurrentHashMap<>();
    private Long idGenerator = 1L;
    
    /**
     * 发送通知
     * @param notification 通知实体
     * @return 创建的通知
     */
    public Notification sendNotification(Notification notification) {
        log.info("发送通知给用户: {}, 类型: {}", notification.getUserId(), notification.getType());
        
        // 生成通知ID
        if (notification.getId() == null) {
            notification.setId(idGenerator++);
        }
        
        // 设置默认时间
        if (notification.getCreatedAt() == null) {
            notification.setCreatedAt(LocalDateTime.now());
        }
        
        // 设置发送状态
        notification.setSendStatus(true);
        notification.setSendAt(LocalDateTime.now());
        
        // 初始化未读状态
        if (notification.getReadStatus() == null) {
            notification.setReadStatus(false);
        }
        
        // 保存通知
        notificationStore.put(notification.getId(), notification);
        
        log.info("通知发送成功，通知ID: {}", notification.getId());
        return notification;
    }
    
    /**
     * 批量发送通知
     * @param notifications 通知列表
     * @return 发送成功的通知列表
     */
    public List<Notification> sendBatch(List<Notification> notifications) {
        log.info("批量发送通知，数量: {}", notifications.size());
        
        List<Notification> sentNotifications = new ArrayList<>();
        for (Notification notification : notifications) {
            try {
                Notification sent = sendNotification(notification);
                sentNotifications.add(sent);
            } catch (Exception e) {
                log.error("发送通知失败: {}", e.getMessage(), e);
            }
        }
        
        log.info("批量发送完成，成功: {}/{}", sentNotifications.size(), notifications.size());
        return sentNotifications;
    }
    
    /**
     * 获取用户通知列表
     * @param userId 用户ID
     * @param page 页码（从0开始）
     * @return 分页通知列表
     */
    public Page<Notification> getUserNotifications(Long userId, int page) {
        log.info("查询用户通知列表，用户ID: {}, 页码: {}", userId, page);
        
        List<Notification> userNotifications = notificationStore.values().stream()
                .filter(n -> n.getUserId().equals(userId))
                .sorted((n1, n2) -> n2.getCreatedAt().compareTo(n1.getCreatedAt()))
                .collect(Collectors.toList());
        
        int pageSize = 20;
        int start = page * pageSize;
        int end = Math.min(start + pageSize, userNotifications.size());
        
        List<Notification> pageList = start < userNotifications.size() 
                ? userNotifications.subList(start, end) 
                : new ArrayList<>();
        
        return new PageImpl<>(pageList, PageRequest.of(page, pageSize), userNotifications.size());
    }
    
    /**
     * 获取用户所有通知列表
     * @param userId 用户ID
     * @return 通知列表
     */
    public List<Notification> getAllUserNotifications(Long userId) {
        return notificationStore.values().stream()
                .filter(n -> n.getUserId().equals(userId))
                .sorted((n1, n2) -> n2.getCreatedAt().compareTo(n1.getCreatedAt()))
                .collect(Collectors.toList());
    }
    
    /**
     * 标记通知为已读
     * @param notificationId 通知ID
     * @return 更新后的通知
     */
    public Notification markAsRead(Long notificationId) {
        log.info("标记通知为已读，通知ID: {}", notificationId);
        
        Notification notification = notificationStore.get(notificationId);
        if (notification == null) {
            throw new RuntimeException("通知不存在: " + notificationId);
        }
        
        notification.setReadStatus(true);
        notification.setReadAt(LocalDateTime.now());
        
        log.info("通知已标记为已读，通知ID: {}", notificationId);
        return notification;
    }
    
    /**
     * 标记用户所有通知为已读
     * @param userId 用户ID
     * @return 标记成功的数量
     */
    public int markAllAsRead(Long userId) {
        log.info("标记用户所有通知为已读，用户ID: {}", userId);
        
        int count = 0;
        for (Notification notification : notificationStore.values()) {
            if (notification.getUserId().equals(userId) && !Boolean.TRUE.equals(notification.getReadStatus())) {
                notification.setReadStatus(true);
                notification.setReadAt(LocalDateTime.now());
                count++;
            }
        }
        
        log.info("已标记 {} 条通知为已读", count);
        return count;
    }
    
    /**
     * 获取用户未读通知数量
     * @param userId 用户ID
     * @return 未读通知数量
     */
    public long getUnreadCount(Long userId) {
        long count = notificationStore.values().stream()
                .filter(n -> n.getUserId().equals(userId))
                .filter(n -> !Boolean.TRUE.equals(n.getReadStatus()))
                .count();
        
        log.debug("用户 {} 未读通知数量: {}", userId, count);
        return count;
    }
    
    /**
     * 获取通知详情
     * @param notificationId 通知ID
     * @return 通知详情
     */
    public Notification getNotificationById(Long notificationId) {
        Notification notification = notificationStore.get(notificationId);
        if (notification == null) {
            throw new RuntimeException("通知不存在: " + notificationId);
        }
        return notification;
    }
    
    /**
     * 创建系统通知
     * @param userId 接收用户ID
     * @param type 通知类型
     * @param title 标题
     * @param content 内容
     * @param referenceType 关联类型
     * @param referenceId 关联ID
     * @return 创建的通知
     */
    public Notification createNotification(Long userId, NotificationType type, String title, 
                                           String content, String referenceType, Long referenceId) {
        Notification notification = new Notification();
        notification.setUserId(userId);
        notification.setType(type);
        notification.setTitle(title != null ? title : type.getTitle());
        notification.setContent(content != null ? content : type.getDefaultContent());
        notification.setReferenceType(referenceType);
        notification.setReferenceId(referenceId);
        
        // 站内信渠道
        notification.setChannel(Notification.NotificationChannel.IN_SITE);
        
        return sendNotification(notification);
    }
    
    /**
     * 删除通知
     * @param notificationId 通知ID
     * @return 是否删除成功
     */
    public boolean deleteNotification(Long notificationId) {
        Notification removed = notificationStore.remove(notificationId);
        return removed != null;
    }
}