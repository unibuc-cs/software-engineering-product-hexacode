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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.crypto.SecretKey;
import java.util.Optional;

@Service
public class AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

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

    public void signUp(String email, String password, String role, String name) {
        if ("student".equalsIgnoreCase(role)) {
            if (studentRepository.findByEmail(email).isPresent()) {
                throw new RuntimeException("Email already registered as student");
            }
            Student student = new Student();
            student.setEmail(email);
            student.setPassword(password); // Adaugă criptare parolei în producție!

            studentRepository.save(student);
        } else if ("employer".equalsIgnoreCase(role)) {
            if (employerRepository.findByEmail(email).isPresent()) {
                throw new RuntimeException("Email already registered as employer");
            }
            Employer employer = new Employer();
            employer.setEmail(email);
            employer.setPassword(password); // Adaugă criptare parolei în producție!

            employerRepository.save(employer);
        } else {
            throw new RuntimeException("Invalid role");
        }
    }

    public LoginResponse login(String email, String password, String role) {
        logger.info("Attempting login for email: {}", email);

        if ("student".equalsIgnoreCase(role)) {
            Optional<Student> studentOptional = studentRepository.findByEmail(email);
            if (studentOptional.isPresent() && studentOptional.get().getPassword().equals(password)) {
                Student student = studentOptional.get();
                String token = createToken(student.getEmail(), "student");
                logger.info("Login successful for student: {}", student.getEmail());
                return new LoginResponse(token, student.getId(), "Student", student.getEmail());
            } else {
                logger.warn("Student login failed for email: {}", email);
            }
        } else if ("employer".equalsIgnoreCase(role)) {
            Optional<Employer> employerOptional = employerRepository.findByEmail(email);
            if (employerOptional.isPresent() && employerOptional.get().getPassword().equals(password)) {
                Employer employer = employerOptional.get();
                String token = createToken(employer.getEmail(), "employer");
                logger.info("Login successful for employer: {}", employer.getEmail());
                return new LoginResponse(token, employer.getId(), employer.getName(), employer.getEmail());
            } else {
                logger.warn("Employer login failed for email: {}", email);
            }
        }

        logger.error("Invalid credentials or role for email: {}", email);
        throw new RuntimeException("Invalid credentials or role");
    }

    /**
     * Creates a JWT token.
     *
     * @param email the user's email
     * @param role  the user's role
     * @return a signed JWT token
     */
    private String createToken(String email, String role) {
        logger.debug("Creating token for email: {}, role: {}", email, role);
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

        // Getters and Setters
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
