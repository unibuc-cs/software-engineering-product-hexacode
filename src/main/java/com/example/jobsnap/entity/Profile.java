package com.example.jobsnap.entity;

import jakarta.persistence.*;

@Entity
public class Profile {

    @Id
    private int id; // Same as Student/Employer ID

    private String firstName;
    private String lastName;
    private String bio;
    private String contactInfo;

    @OneToOne
    @JoinColumn(name = "cv_id") // Foreign key to the CV table
    private CV cv;

    @ManyToOne
    //@MapsId // Maps this ID to the Student or Employer's ID
    @JoinColumn(name = "user_id") // Foreign key to Student/Employer
    private User user; // This could be either Student or Employer

    public Profile() {
    }

    public Profile(int id, String firstName, String lastName, String bio, String contactInfo) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.bio = bio;
        this.contactInfo = contactInfo;
    }


    // Getters and setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
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
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
