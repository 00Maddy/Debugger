package com.example.demo.contr;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.service.ModelLoggingEventService;

@RestController
@RequestMapping("/loggingevent")
@CrossOrigin(origins = "http://localhost:8100")
public class ModalLoggingEventCont {
	
	@Autowired
    private ModelLoggingEventService loggingEventService;
	
    @GetMapping("/imei")
    public List<String> getDistinctImeiNumbers() {
        return loggingEventService.getDistinctImeiNumbers();
    }
    
    @GetMapping("/rawdata/{imei}/{startDate}/{endDate}")
    public List<String> getRawDataByImeiAndDateRange(@PathVariable String imei, 
                                                     @PathVariable String startDate, 
                                                     @PathVariable String endDate) {
        List<String> rawDataList = loggingEventService.getRawDataByImeiAndDateRange(imei, startDate, endDate);
        return rawDataList;
    }
    
}
