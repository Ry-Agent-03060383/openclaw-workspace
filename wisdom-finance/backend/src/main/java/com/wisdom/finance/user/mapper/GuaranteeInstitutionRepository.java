package com.wisdom.finance.user.mapper;

import com.wisdom.finance.user.entity.GuaranteeInstitution;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GuaranteeInstitutionRepository extends JpaRepository<GuaranteeInstitution, Long> {
    Optional<GuaranteeInstitution> findByCreditCode(String creditCode);
    Optional<GuaranteeInstitution> findByUserId(Long userId);
}
