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

    // Secret key for JWT signing (should be stored securely in production)
    private final SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    /**
     * Handles login for both students and employers.
     *
     * @param email    the user's email
     * @param password the user's password
     * @param role     the user's role ("student" or "employer")
     * @return a LoginResponse object containing a JWT token and user details
     */
    public LoginResponse login(String email, String password, String role) {
        if ("student".equalsIgnoreCase(role)) {
            Optional<Student> studentOptional = studentRepository.findByEmail(email);
            if (studentOptional.isPresent() && studentOptional.get().getPassword().equals(password)) {
                Student student = studentOptional.get();
                String token = createToken(student.getEmail(), "student");
                return new LoginResponse(token, student.getId(), student.getName(), student.getEmail());
            }
        } else if ("employer".equalsIgnoreCase(role)) {
            Optional<Employer> employerOptional = employerRepository.findByEmail(email);
            if (employerOptional.isPresent() && employerOptional.get().getPassword().equals(password)) {
                Employer employer = employerOptional.get();
                String token = createToken(employer.getEmail(), "employer");
                return new LoginResponse(token, employer.getId(), employer.getName(), employer.getEmail());
            }
        }

        throw new RuntimeException("Invalid credentials or role");
    }

    /**
     * Handles login for students.
     */
    private LoginResponse handleStudentLogin(String email, String password) {
        Optional<Student> studentOptional = studentRepository.findByEmail(email);

        if (studentOptional.isEmpty()) {
            System.out.println("No student found with email: " + email);
            throw new RuntimeException("Invalid email or password");
        }

        Student student = studentOptional.get();

        if (!student.getPassword().equals(password)) {
            System.out.println("Invalid password for email: " + email);
            throw new RuntimeException("Invalid email or password");
        }

        System.out.println("Student login successful for email: " + email);
        String token = createToken(student.getEmail(), "student");
        return new LoginResponse(token, student.getId(), student.getName(), student.getEmail());
    }

    /**
     * Handles login for employers.
     */
    private LoginResponse handleEmployerLogin(String email, String password) {
        Optional<Employer> employerOptional = employerRepository.findByEmail(email);

        if (employerOptional.isEmpty()) {
            System.out.println("No employer found with email: " + email);
            throw new RuntimeException("Invalid email or password");
        }

        Employer employer = employerOptional.get();

        if (!employer.getPassword().equals(password)) {
            System.out.println("Invalid password for email: " + email);
            throw new RuntimeException("Invalid email or password");
        }

        System.out.println("Employer login successful for email: " + email);
        String token = createToken(employer.getEmail(), "employer");
        return new LoginResponse(token, employer.getId(), employer.getName(), employer.getEmail());
    }

    /**
     * Creates a JWT token.
     *
     * @param email the user's email
     * @param role  the user's role
     * @return a signed JWT token
     */
    private String createToken(String email, String role) {
        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .signWith(secretKey)
                .compact();
    }

    /**
     * LoginResponse class to encapsulate the response of a login request.
     */
    public class LoginResponse {
        private String token;
        private int id;
        private String name;
        private String email;

        public LoginResponse(String token, int id, String name, String email) {
            this.token = token;
            this.id = id;
            this.name = name;
            this.email = email;
        }

        // Getters și Setters
        public String getToken() {
            return token;
        }

        public void setToken(String token) {
            this.token = token;
        }

        public int getId() {
            return id;
        }

        public void setId(int id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }
    }

}
