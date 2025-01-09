package com.example.jobsnap.entity;

import java.util.Date;

public class Application {
    private Long id;
    private User user;
    private Job job;
    private Date applicationDate;
    private String status;

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public Job getJob() { return job; }
    public void setJob(Job job) { this.job = job; }
    public Date getApplicationDate() { return applicationDate; }
    public void setApplicationDate(Date applicationDate) { this.applicationDate = applicationDate; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
