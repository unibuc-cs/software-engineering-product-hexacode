package com.example.jobsnap.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

// Clasa Student
@Entity
public class Student {
    @Id
    private int id;
    private String email;
    private String password;

    // Constructor
    public Student(int id, String email, String password) {
        this.id = id;
        this.email = email;
        this.password = password;
    }

    public Student() {

    }

    // Getters
    public int getId() {
        return id;
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

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // Metoda principală pentru testare
    public static void main(String[] args) {
        // Creează un student
        Student student = new Student(1, "student@example.com", "securepassword");

        // Inserează studentul în baza de date
        try {
            insertStudentIntoDatabase(student);
            System.out.println("Student inserat cu succes!");
        } catch (SQLException e) {
            System.out.println("Eroare la inserare: " + e.getMessage());
        }
    }

    // Metoda pentru inserarea studentului în baza de date
    public static void insertStudentIntoDatabase(Student student) throws SQLException {
        // Configurare conexiune baza de date
        String url = "jdbc:oracle:thin:@localhost:1521:xe";
        String user = "c##ana"; // Introduceți utilizatorul bazei de date
        String password = "password"; // Introduceți parola bazei de date

        // Query-ul SQL
        String sql = "INSERT INTO student (id, email, password) VALUES (?, ?, ?)";

        // Conectează-te și inserează datele
        try (Connection connection = DriverManager.getConnection(url, user, password);
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {

            // Setează valorile parametrilor
            preparedStatement.setInt(1, student.getId());
            preparedStatement.setString(2, student.getEmail());
            preparedStatement.setString(3, student.getPassword());

            // Execută comanda
            preparedStatement.executeUpdate();
        }
    }


}
