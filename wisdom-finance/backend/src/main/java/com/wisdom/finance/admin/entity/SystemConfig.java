package com.wisdom.finance.admin.entity;

import com.wisdom.finance.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 系统配置 - 平台运营方系统配置
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "t_system_config")
public class SystemConfig extends BaseEntity {
    
    @Column(name = "config_key", unique = true, length = 100, nullable = false)
    private String configKey; // 配置键
    
    @Column(name = "config_value", columnDefinition = "TEXT")
    private String configValue; // 配置值
    
    @Column(name = "config_name", length = 200)
    private String configName; // 配置名称
    
    @Column(name = "config_type", length = 50)
    private String configType; // 配置类型：系统/业务/安全
    
    @Column(name = "description", length = 500)
    private String description; // 配置描述
    
    @Column(name = "status", length = 20)
    private String status; // 状态：ACTIVE/INACTIVE
    
    @Column(name = "sort_order")
    private Integer sortOrder; // 排序顺序
    
    @Column(name = "is_secret")
    private Boolean isSecret; // 是否保密
    
    @Column(name = "update_by", length = 50)
    private String updateBy; // 更新人
}
