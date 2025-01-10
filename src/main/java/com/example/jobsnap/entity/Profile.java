package com.example.jobsnap.entity;

import jakarta.persistence.*;

@Entity
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Optional if you want auto-generation of id
    private int id; // This will be the same as User's ID

    private String firstName;
    private String lastName;
    private String bio;
    private String contactInfo;

    @OneToOne
    @JoinColumn(name = "cv_id") // Foreign key to the CV table
    private CV cv;

    @OneToOne
    @MapsId  // This will map Profile's id to User's id
    @JoinColumn(name = "user_id") // Foreign key to User
    private User user; // This could be either Student or Employer

    public Profile() {
    }

    public Profile(String firstName, String lastName, String bio, String contactInfo) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.bio = bio;
        this.contactInfo = contactInfo;
    }

    // Getters and setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getContactInfo() {
        return contactInfo;
    }

    public void setContactInfo(String contactInfo) {
        this.contactInfo = contactInfo;
    }

    public CV getCv() {
        return cv;
    }

    public void setCv(CV cv) {
        this.cv = cv;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}

