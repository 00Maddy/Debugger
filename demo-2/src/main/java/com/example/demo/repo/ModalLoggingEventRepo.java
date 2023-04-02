package com.example.demo.repo;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.model.ModelLoggingEvent;

@Repository
public interface ModalLoggingEventRepo extends JpaRepository<ModelLoggingEvent, Long> {

    List<ModelLoggingEvent> findByImei(String imei);
    
    @Query("SELECT DISTINCT l.imei FROM ModelLoggingEvent l")
    List<String> findDistinctImeiNumbers();

    
    @Query(value = "SELECT rawdata FROM loggingevent WHERE imei = :imei AND eventTimeStamp BETWEEN :startDate AND :endDate ORDER BY eventTimeStamp DESC", nativeQuery = true)
    public List<String> findRawDataByImeiAndDateRange(@Param("imei") String imei, 
                                                      @Param("startDate") String startDate, 
                                                      @Param("endDate") String endDate);
}