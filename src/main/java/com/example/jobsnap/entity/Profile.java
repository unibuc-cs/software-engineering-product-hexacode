package com.example.jobsnap.entity;

public class Profile {
    private Long id;
    private String firstName;
    private String lastName;
    private String bio;
    private String contactInfo;
    private CV cv;

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
    public String getContactInfo() { return contactInfo; }
    public void setContactInfo(String contactInfo) { this.contactInfo = contactInfo; }
    public CV getCv() { return cv; }
    public void setCv(CV cv) { this.cv = cv; }
}
