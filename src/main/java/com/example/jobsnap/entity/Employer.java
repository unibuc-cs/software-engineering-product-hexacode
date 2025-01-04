package com.example.jobsnap.entity;

public class Employer {
    private String employerId;
    private String companyName;
    private String searchCriteria;

    public Employer(String employerId, String companyName, String searchCriteria) {
        this.employerId = employerId;
        this.companyName = companyName;
        this.searchCriteria = searchCriteria;
    }

    public String getEmployerId() {
        return employerId;
    }

    public void setEmployerId(String employerId) {
        this.employerId = employerId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getSearchCriteria() {
        return searchCriteria;
    }

    public void setSearchCriteria(String searchCriteria) {
        this.searchCriteria = searchCriteria;
    }
}
