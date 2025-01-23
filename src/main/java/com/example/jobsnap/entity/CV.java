package com.example.jobsnap.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
public class CV {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // This will automatically generate the ID
    private Long id;

    private String fullName;
    private String email;
    private String phone;
    private String education;
    private String experience;
    private String skills;
    private String projects;

    private String summary;

    private String technologies;

    private String certifications;

    private String tools;

    private String campaignExperience;

    private String targetAudience;

    private String portfolio;
    private String clinicalExperience;

    private String degree;

    private String awards;

    private String cvType;


    // Adding userId field
    private Long userId;

    // Getters and Setters for all fields
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }


    public String getProjects() {
        return projects;
    }

    public void setProjects(String projects) {
        this.projects = projects;
    }

    // Getter and Setter for userId
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getSummary() {return summary;}

    public void setSummary(String summary){this.summary= summary;}


    public String getTechnologies() {return technologies;}

    public void setTechnologies(String technologies){this.technologies= technologies;}

    public String getCertifications() {return certifications;}

    public void setCertifications(String certifications){this.certifications= certifications;}

    public String getTools() {return tools;}

    public void setTools(String tools){this.tools= tools;}

    public String getcampaignExperience() {return campaignExperience;}

    public void setcampaignExperience(String campaignexp){this.campaignExperience= campaignExperience;}

    public String gettargetAudience() {return targetAudience;}

    public void settargetAudience(String targetAudience){this.targetAudience= targetAudience;}

    public String getPortfolio() {return portfolio;}

    public void setPortfolio(String portfolio){this.portfolio= portfolio;}


    public String getClinicalExperience() {return clinicalExperience;}

    public void setClinicalExperience(String clinicalExperience){this.clinicalExperience= clinicalExperience;}

    public String getDegree() {return degree;}

    public void setDegree(String degree){this.degree= degree;}

    public String getAwards() {return awards;}

    public void setAwards(String awards){this.awards= awards;}

    public String getCvType() {return cvType;}

    public void setCvType(String cvType){this.cvType= cvType;}





    @Override
    public String toString() {
        return "CV{" +
                "id=" + id +
                ", fullName='" + fullName + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", summary='" + summary + '\'' +
                ", education='" + education + '\'' +
                ", experience='" + experience + '\'' +
                ", skills='" + skills + '\'' +
                ", technologies='" + technologies + '\'' +
                ", certifications='" + certifications + '\'' +
                ", projects='" + projects + '\'' +
                ", tools='" + tools + '\'' +
                ", campaignExperience='" + campaignExperience + '\'' +
                ", targetAudience='" + targetAudience + '\'' +
                ", portfolio='" + portfolio + '\'' +
                ", clinicalExperience='" + clinicalExperience + '\'' +
                ", degree='" + degree + '\'' +
                ", awards='" + awards + '\'' +
                ", cvType='" + cvType + '\'' +
                ", userId=" + userId +
                '}';
    }


}
