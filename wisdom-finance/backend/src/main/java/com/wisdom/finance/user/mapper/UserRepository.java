package com.wisdom.finance.user.mapper;

import com.wisdom.finance.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {

    Optional<User> findByUsername(String username);

    Optional<User> findByPhone(String phone);

    List<User> findByUserType(User.UserType userType);

    List<User> findByStatus(User.UserStatus status);

    List<User> findByTenantId(String tenantId);
}
