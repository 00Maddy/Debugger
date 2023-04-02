package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "loggingevent")
public class ModelLoggingEvent {
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "logid")
	    private Long logid;

	    @Column(name = "imei")
	    private String imei;

	    @Column(name = "eventtimestamp", columnDefinition = "TIMESTAMP")
	    private String  eventtimestamp;

	    @Column(name = "servertimestamp")
	    private String servertimestamp;

	    @Column(name = "rawdata")
	    private String rawdata;
	   
		public ModelLoggingEvent(Long logId, String imei, String  eventTimeStamp, String serverTimeStamp,
				String rawData) {
			this.logid = logId;
			this.imei = imei;
			this.eventtimestamp = eventTimeStamp;
			this.servertimestamp = serverTimeStamp;
			this.rawdata = rawData;
		}
		
		public ModelLoggingEvent() {
			
		}
		public Long getLogId() {
			return logid;
		}
		public void setLogId(Long logId) {
			this.logid = logId;
		}
		public String getImei() {
			return imei;
		}
		public void setImei(String imei) {
			this.imei = imei;
		}
		public String  getEventTimeStamp() {
			return eventtimestamp;
		}
		public void setEventTimeStamp(String  eventTimeStamp) {
			this.eventtimestamp = eventTimeStamp;
		}
		public String getServerTimeStamp() {
			return servertimestamp;
		}
		public void setServerTimeStamp(String serverTimeStamp) {
			this.servertimestamp = serverTimeStamp;
		}
		public String getRawData() {
			return rawdata;
		}
		public void setRawData(String rawData) {
			this.rawdata = rawData;
		}

}
