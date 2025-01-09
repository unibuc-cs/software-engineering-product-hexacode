package com.example.jobsnap.service;

import com.example.jobsnap.entity.Student;
import com.example.jobsnap.entity.Employer;
import com.example.jobsnap.repository.StudentRepository;
import com.example.jobsnap.repository.EmployerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private EmployerRepository employerRepository;

    /**
     * Handles login for both students and employers.
     *
     * @param email    the user's email
     * @param password the user's password
     * @param role     the user's role ("student" or "employer")
     * @return a JWT token if authentication is successful
     */
    public String login(String email, String password, String role) {
        // Use a local variable for the secret key
        SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);

        if ("student".equalsIgnoreCase(role)) {
            Optional<Student> studentOptional = studentRepository.findByEmail(email);
            if (studentOptional.isPresent() && studentOptional.get().getPassword().equals(password)) {
                // Create JWT for Student
                return createToken(studentOptional.get().getEmail(), "student", secretKey);
            }
        } else if ("employer".equalsIgnoreCase(role)) {
            Optional<Employer> employerOptional = employerRepository.findByEmail(email);
            if (employerOptional.isPresent() && employerOptional.get().getPassword().equals(password)) {
                // Create JWT for Employer
                return createToken(employerOptional.get().getEmail(), "employer", secretKey);
            }
        }

        throw new RuntimeException("Invalid credentials or role");
    }


    private String createToken(String email, String role, SecretKey secretKey) {
        String token = Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .signWith(secretKey)  // Sign using the SecretKey
                .compact();
        System.out.println("Generated JWT: " + token);  // Debugging
        return token;
    }
}
