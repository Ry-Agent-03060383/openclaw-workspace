package com.wisdom.finance.admin.mapper;

import com.wisdom.finance.admin.entity.DataStatistics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * 数据统计Repository
 */
@Repository
public interface DataStatisticsRepository extends JpaRepository<DataStatistics, Long> {
    
    /**
     * 根据统计日期和类型查询
     */
    Optional<DataStatistics> findByStatDateAndStatType(LocalDate statDate, String statType);
    
    /**
     * 根据统计类型查询
     */
    List<DataStatistics> findByStatType(String statType);
    
    /**
     * 根据日期范围查询
     */
    List<DataStatistics> findByStatDateBetween(LocalDate startDate, LocalDate endDate);
}
