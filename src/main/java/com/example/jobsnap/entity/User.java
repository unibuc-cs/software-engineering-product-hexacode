package com.example.jobsnap.entity;

import jakarta.persistence.*;

/**
 * User Entity - Base class for both Employer and Student entities.
 */
@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.JOINED) // Using JOINED inheritance strategy
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String email;
    private String password;

    @Version
    private int version; // Optimistic locking field

    public User() {}

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }

    // Getters and Setters
    public long getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public int getVersion() { return version; }
    public void setVersion(int version) { this.version = version; }
}
