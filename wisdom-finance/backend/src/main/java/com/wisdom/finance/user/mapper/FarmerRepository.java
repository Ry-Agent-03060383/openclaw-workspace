package com.wisdom.finance.user.mapper;

import com.wisdom.finance.user.entity.Farmer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * 农户Repository
 */
@Repository
public interface FarmerRepository extends JpaRepository<Farmer, Long> {
    
    /**
     * 根据用户ID查询
     */
    Optional<Farmer> findByUserId(Long userId);
    
    /**
     * 根据身份证号查询
     */
    Optional<Farmer> findByIdCard(String idCard);
    
    /**
     * 根据手机号查询
     */
    Optional<Farmer> findByPhone(String phone);
    
    /**
     * 根据村庄查询
     */
    List<Farmer> findByVillage(String village);
    
    /**
     * 根据乡镇查询
     */
    List<Farmer> findByTown(String town);
    
    /**
     * 根据种植类型查询
     */
    List<Farmer> findByFarmingType(String farmingType);
    
    /**
     * 根据状态查询
     */
    List<Farmer> findByStatus(String status);
}
