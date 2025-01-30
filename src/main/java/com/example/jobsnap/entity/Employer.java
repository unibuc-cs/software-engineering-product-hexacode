package com.example.jobsnap.entity;

import jakarta.persistence.*;

/**
 * Employer Entity that inherits from User entity and adds employer-specific fields.
 */
@Entity
@Table(name = "employer")
@PrimaryKeyJoinColumn(name = "id")  // Inheriting the 'id' field from the User class
public class Employer extends User {

    private String companyName;
    private String companyEmail;
    private String companyPhone;
    private String firstName;
    private String lastName;
    private String bio;
    // Constructor
    public Employer(String email, String password, String companyName, String companyEmail, String companyPhone, String firstName, String lastName, String bio) {
        super(email, password);
        this.companyEmail = companyEmail;
        this.companyName = companyName;
        this.companyPhone = companyPhone;
        this.firstName = firstName;
        this.lastName = lastName;
        this.bio = bio;
    }

    // Default constructor
    public Employer(User user, String phoneNumber) {
        super();
    }

    public Employer() {

    }

    // Getters and Setters
    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getCompanyEmail() { return companyEmail; }
    public void setCompanyEmail(String companyEmail) { this.companyEmail = companyEmail; }

    public String getCompanyPhone() { return companyPhone; }
    public void setCompanyPhone(String companyPhone) { this.companyPhone = companyPhone; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    @Override
    public String toString() {
        return "Employer [email=" + getEmail() + ", companyName=" + companyName + ", companyPhone=" + companyPhone + "]";
    }
}
