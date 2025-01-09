package com.example.jobsnap.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
@Entity
public class Employer {
    @Id
    private int id;
    private String name;
    private String companyName;
    private String email;
    private String password;

    // Constructor
    public Employer(int id, String name, String companyName, String email, String password) {
        this.id = id;
        this.name = name;
        this.companyName = companyName;
        this.email = email;
        this.password = password;
    }

    public Employer() {

    }

    // Getters

    public String getName() {
        return name;
    }

    public String getCompanyName() {
        return companyName;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    // Setters
    public void setId(int id) {
        this.id = id;
    }
    public int getId() {
        return id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // Main method for testing
    public static void main(String[] args) {
        // Create an employer
        Employer employer = new Employer(1, "John Doe", "TechCorp", "employer@example.com", "securepassword");
       // Employer employer = new Employer(2, "Johna Doe", "Microsoft", "johnado@microsoft.com", "employerpass");
        // Insert the employer into the database
        try {
            insertEmployerIntoDatabase(employer);
            System.out.println("Employer inserted successfully!");
        } catch (SQLException e) {
            System.out.println("Error inserting employer: " + e.getMessage());
        }
    }

    // Method to insert employer into the database
    public static void insertEmployerIntoDatabase(Employer employer) throws SQLException {
        // Database connection configuration
        String url = "jdbc:oracle:thin:@localhost:1521:xe";
        String user = "C##letitia"; // Replace with your database user
        String password = "parola26"; // Replace with your database password

        // SQL query
        String sql = "INSERT INTO employer (id, name, company_name, email, password) VALUES (?, ?, ?, ?, ?)";

        // Connect and insert data
        try (Connection connection = DriverManager.getConnection(url, user, password);
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {

            // Set parameter values
            preparedStatement.setInt(1, employer.getId());
            preparedStatement.setString(2, employer.getName());
            preparedStatement.setString(3, employer.getCompanyName());
            preparedStatement.setString(4, employer.getEmail());
            preparedStatement.setString(5, employer.getPassword());

            // Execute the command
            preparedStatement.executeUpdate();
        }
    }



}
