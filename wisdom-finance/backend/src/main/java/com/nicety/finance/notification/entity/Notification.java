package com.wisdom.notification.entity;

import com.wisdom.loan.entity.LoanApplication;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

/**
 * 通知实体 - M8 通知中心
 */
@Data
@Entity
@Table(name = "t_notification")
public class Notification {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "user_id")
    private Long userId;
    
    @Column(name = "title", nullable = false, length = 200)
    private String title;
    
    @Column(name = "content", columnDefinition = "TEXT")
    private String content;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "type", length = 20)
    private NotificationType type;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "channel", length = 20)
    private NotificationChannel channel;
    
    @Column(name = "reference_type", length = 50)
    private String referenceType; // 关联类型: LOAN_APPLICATION/CREDIT_REPORT
    
    @Column(name = "reference_id")
    private Long referenceId; // 关联ID
    
    @Column(name = "read_status")
    private Boolean readStatus = false;
    
    @Column(name = "read_at")
    private LocalDateTime readAt;
    
    @Column(name = "send_status")
    private Boolean sendStatus = false;
    
    @Column(name = "send_at")
    private LocalDateTime sendAt;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    public enum NotificationType {
        APPLICATION_SUBMITTED,   // 申请已提交
        APPLICATION_APPROVED,    // 申请通过
        APPLICATION_REJECTED,    // 申请拒绝
        NEED_MATERIALS,          // 补充材料
        CREDIT_UPDATED,          // 信用评分更新
        RISK_ALERT,              // 风险预警
        SYSTEM                   // 系统通知
    }
    
    public enum NotificationChannel {
        IN_SITE,     // 站内信
        SMS,         // 短信
        EMAIL,       // 邮件
        WECHAT       // 微信
    }
}