package com.example.jobsnap.entity;

public class CV {
    private String cvId;
    private StudentProfile studentProfile;
    private CVTemplate cvTemplate;
    private JobRole jobRole;
    private String content;

    public CV(String cvId, StudentProfile studentProfile, CVTemplate cvTemplate, JobRole jobRole, String content) {
        this.cvId = cvId;
        this.studentProfile = studentProfile;
        this.cvTemplate = cvTemplate;
        this.jobRole = jobRole;
        this.content = content;
    }

    public String getCvId() {
        return cvId;
    }

    public void setCvId(String cvId) {
        this.cvId = cvId;
    }

    public StudentProfile getStudentProfile() {
        return studentProfile;
    }

    public void setStudentProfile(StudentProfile studentProfile) {
        this.studentProfile = studentProfile;
    }

    public CVTemplate getCvTemplate() {
        return cvTemplate;
    }

    public void setCvTemplate(CVTemplate cvTemplate) {
        this.cvTemplate = cvTemplate;
    }

    public JobRole getJobRole() {
        return jobRole;
    }

    public void setJobRole(JobRole jobRole) {
        this.jobRole = jobRole;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
