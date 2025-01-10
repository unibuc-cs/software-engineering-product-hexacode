package com.example.jobsnap.entity;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.persistence.*;
//@JsonTypeInfo(
//        use = JsonTypeInfo.Id.NAME,
//        include = JsonTypeInfo.As.EXTERNAL_PROPERTY,
//        property = "userType" // This property will help Jackson determine the concrete class
//)
//@JsonSubTypes({
//        @JsonSubTypes.Type(value = Student.class, name = "student"),
//        @JsonSubTypes.Type(value = Employer.class, name = "employer")
//})
@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.JOINED) // Can use SINGLE_TABLE or TABLE_PER_CLASS
public abstract class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String email;

    // Other shared fields

    // Getters and setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
