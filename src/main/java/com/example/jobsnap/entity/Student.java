package com.example.jobsnap.entity;

import jakarta.persistence.*;

/**
 * Student Entity that inherits from User entity and adds student-specific fields.
 */
@Entity
@Table(name = "student")
@PrimaryKeyJoinColumn(name = "id")  // Inheriting the 'id' field from the User class
public class Student extends User {

    private String universityName;
    private String universityEmail;
    private String phone;
    private String firstName;
    private String lastName;
    private String bio;

    // Constructor
    public Student(String email, String password, String universityName, String universityEmail, String phone, String firstName, String lastName, String bio) {
        super(email, password);  // Calls the constructor of the User class
        this.universityEmail = universityEmail;
        this.universityName = universityName;
        this.phone = phone;
        this.firstName = firstName;
        this.lastName = lastName;
        this.bio = bio;
    }

    // Default constructor
    public Student() {
        super();
    }

    // Getters and Setters
    public String getUniversityName() { return universityName; }
    public void setUniversityName(String universityName) { this.universityName = universityName; }

    public String getUniversityEmail() { return universityEmail; }
    public void setUniversityEmail(String universityEmail) { this.universityEmail = universityEmail; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    @Override
    public String toString() {
        return "Student [email=" + getEmail() + ", universityName=" + universityName + ", universityEmail=" + universityEmail + "]";
    }
}
