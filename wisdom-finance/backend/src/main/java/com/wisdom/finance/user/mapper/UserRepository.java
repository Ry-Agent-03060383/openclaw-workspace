package com.wisdom.finance.user.mapper;

import com.wisdom.finance.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * 用户Repository
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    /**
     * 根据用户名查询
     */
    Optional<User> findByUsername(String username);
    
    /**
     * 根据手机号查询
     */
    Optional<User> findByPhone(String phone);
    
    /**
     * 根据用户类型查询
     */
    List<User> findByUserType(User.UserType userType);
    
    /**
     * 根据状态查询
     */
    List<User> findByStatus(User.UserStatus status);
    
    /**
     * 根据租户ID查询
     */
    List<User> findByTenantId(String tenantId);
}
