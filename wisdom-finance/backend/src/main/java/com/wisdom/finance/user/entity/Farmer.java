package com.wisdom.finance.user.entity;

import com.wisdom.finance.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.math.BigDecimal;

/**
 * 农户实体 - 农户信息管理
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "t_farmer")
public class Farmer extends BaseEntity {
    
    @Column(name = "user_id", unique = true)
    private Long userId; // 关联的用户ID
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;
    
    @Column(name = "farmer_name", length = 50)
    private String farmerName; // 农户姓名
    
    @Column(name = "id_card", length = 18, unique = true)
    private String idCard; // 身份证号
    
    @Column(name = "phone", length = 20)
    private String phone; // 联系电话
    
    @Column(name = "address", length = 500)
    private String address; // 家庭住址
    
    @Column(name = "village", length = 100)
    private String village; // 村庄
    
    @Column(name = "town", length = 100)
    private String town; // 乡镇
    
    @Column(name = "county", length = 100)
    private String county; // 县
    
    @Column(name = "land_area", precision = 10, scale = 2)
    private BigDecimal landArea; // 土地面积（亩）
    
    @Column(name = "farming_type", length = 100)
    private String farmingType; // 种植类型：粮食作物/经济作物/养殖业等
    
    @Column(name = "family_members")
    private Integer familyMembers; // 家庭成员数
    
    @Column(name = "annual_income", precision = 18, scale = 2)
    private BigDecimal annualIncome; // 年收入
    
    @Column(name = "credit_score")
    private Integer creditScore; // 信用评分
    
    @Column(name = "risk_level", length = 10)
    private String riskLevel; // 风险等级
    
    @Column(name = "farming_years")
    private Integer farmingYears; // 种植年限
    
    @Column(name = "cooperative_id")
    private Long cooperativeId; // 合作社ID
    
    @Column(name = "cooperative_name", length = 200)
    private String cooperativeName; // 合作社名称
    
    @Column(name = "status", length = 20)
    private String status; // 状态：ACTIVE/INACTIVE
    
    @Column(name = "remark", length = 500)
    private String remark; // 备注
}
