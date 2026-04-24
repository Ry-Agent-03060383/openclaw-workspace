package com.wisdom.finance.user.entity;

import com.wisdom.finance.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 银行实体 - 银行管理
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "t_bank")
public class Bank extends BaseEntity {
    
    @Column(name = "bank_code", unique = true, length = 20, nullable = false)
    private String bankCode; // 银行代码
    
    @Column(name = "bank_name", length = 100, nullable = false)
    private String bankName; // 银行名称
    
    @Column(name = "short_name", length = 50)
    private String shortName; // 简称
    
    @Column(name = "contact_person", length = 50)
    private String contactPerson; // 联系人
    
    @Column(name = "contact_phone", length = 20)
    private String contactPhone; // 联系电话
    
    @Column(name = "contact_email", length = 100)
    private String contactEmail; // 联系邮箱
    
    @Column(name = "address", length = 500)
    private String address; // 地址
    
    @Column(name = "status", length = 20)
    private String status; // 状态：ACTIVE/INACTIVE
    
    @Column(name = "api_url", length = 200)
    private String apiUrl; // API接口地址
    
    @Column(name = "api_key", length = 200)
    private String apiKey; // API密钥
    
    @Column(name = "remark", length = 500)
    private String remark; // 备注
    
    public String getBankCode() {
        return bankCode;
    }
    
    public void setBankCode(String bankCode) {
        this.bankCode = bankCode;
    }
    
    public String getBankName() {
        return bankName;
    }
    
    public void setBankName(String bankName) {
        this.bankName = bankName;
    }
    
    public String getShortName() {
        return shortName;
    }
    
    public void setShortName(String shortName) {
        this.shortName = shortName;
    }
    
    public String getContactPerson() {
        return contactPerson;
    }
    
    public void setContactPerson(String contactPerson) {
        this.contactPerson = contactPerson;
    }
    
    public String getContactPhone() {
        return contactPhone;
    }
    
    public void setContactPhone(String contactPhone) {
        this.contactPhone = contactPhone;
    }
    
    public String getContactEmail() {
        return contactEmail;
    }
    
    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }
    
    public String getAddress() {
        return address;
    }
    
    public void setAddress(String address) {
        this.address = address;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public String getApiUrl() {
        return apiUrl;
    }
    
    public void setApiUrl(String apiUrl) {
        this.apiUrl = apiUrl;
    }
    
    public String getApiKey() {
        return apiKey;
    }
    
    public void setApiKey(String apiKey) {
        this.apiKey = apiKey;
    }
    
    public String getRemark() {
        return remark;
    }
    
    public void setRemark(String remark) {
        this.remark = remark;
    }
}
