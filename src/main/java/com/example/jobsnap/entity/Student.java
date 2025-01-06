package com.example.jobsnap.entity;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

// Clasa Student
public class Student {
    private String nume;
    private int ani;

    // Constructor
    public Student(String nume, int ani) {
        this.nume = nume;
        this.ani = ani;
    }

    // Getters
    public String getNume() {
        return nume;
    }

    public int getAni() {
        return ani;
    }

    // Metoda principală pentru testare
    public static void main(String[] args) {
        // Creează un student
        Student student = new Student("Ion Popescu", 21);

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
        //va puneti iar datele de la baza voastra de date (din -> application.properties)
        String url = "jdbc:oracle:thin:@localhost:1521:xe";
        String user = "";
        String password = "";

        // Query-ul SQL
        String sql = "INSERT INTO student (nume, ani) VALUES (?, ?)";

        // Conectează-te și inserează datele
        try (Connection connection = DriverManager.getConnection(url, user, password);
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {

            // Setează valorile parametrilor
            preparedStatement.setString(1, student.getNume());
            preparedStatement.setInt(2, student.getAni());

            // Execută comanda
            preparedStatement.executeUpdate();
        }
    }

    public void setAni(int ani) {
    }

    public void setNume(String nume) {
    }
}
