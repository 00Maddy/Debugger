package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.repo.ModalLoggingEventRepo;

@Service
public class ModelLoggingEventService {
	
    @Autowired
    private ModalLoggingEventRepo loggingEventRepository;

    public List<String> getDistinctImeiNumbers() {
        return loggingEventRepository.findDistinctImeiNumbers();
    }
    public List<String> getRawDataByImeiAndDateRange(String imei, String startDate, String endDate) {
        return loggingEventRepository.findRawDataByImeiAndDateRange(imei, startDate, endDate);
    }
}

    
