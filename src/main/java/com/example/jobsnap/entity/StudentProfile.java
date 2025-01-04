package com.example.jobsnap.entity;

import java.util.List;

public class StudentProfile {
    private String profileId;
    private String userId;
    private String academicBackground;
    private List<String> projects;
    private List<String> skills;
    private List<String> experience;

    public StudentProfile(String profileId, String userId, String academicBackground,
                          List<String> projects, List<String> skills, List<String> experience) {
        this.profileId = profileId;
        this.userId = userId;
        this.academicBackground = academicBackground;
        this.projects = projects;
        this.skills = skills;
        this.experience = experience;
    }

    public String getProfileId() {
        return profileId;
    }

    public void setProfileId(String profileId) {
        this.profileId = profileId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getAcademicBackground() {
        return academicBackground;
    }

    public void setAcademicBackground(String academicBackground) {
        this.academicBackground = academicBackground;
    }

    public List<String> getProjects() {
        return projects;
    }

    public void setProjects(List<String> projects) {
        this.projects = projects;
    }

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }

    public List<String> getExperience() {
        return experience;
    }

    public void setExperience(List<String> experience) {
        this.experience = experience;
    }
}
