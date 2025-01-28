package com.example.jobsnap.service;

import com.example.jobsnap.entity.Employer;
import com.example.jobsnap.entity.Student;
import com.example.jobsnap.entity.User;
import com.example.jobsnap.repository.EmployerRepository;
import com.example.jobsnap.repository.StudentRepository;
import com.example.jobsnap.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
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
    private UserRepository userRepository;

    @Autowired
    private EmployerRepository employerRepository;

    // Cream un PasswordEncoder (de exemplu, BCrypt)
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Secret key for JWT signing (should be stored securely in production)
    private final SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    /**
     * Handles sign-up for both students and employers.
     *
     * @param email             the user's email
     * @param password          the user's password
     * @param role              the user's role ("student" or "employer")
     * @param firstName         the user's first name
     * @param lastName          the user's last name
     * @param universityName    the student's university name (if role is student)
     * @param universityEmail   the student's university email (if role is student)
     * @param phone             the student's phone number (if role is student)
     * @param companyName       the employer's company name (if role is employer)
     * @param companyEmail      the employer's company email (if role is employer)
     * @param companyPhone      the employer's company phone (if role is employer)
     * @param bio               the user's bio
     */
    @Transactional
    public void signUp(String email, String password, String role, String firstName, String lastName,
                       String universityName, String universityEmail, String phone,
                       String companyName, String companyEmail, String companyPhone, String bio) {
        // Hash-uim parola folosind BCrypt
        String hashedPassword = passwordEncoder.encode(password);

        if ("student".equalsIgnoreCase(role)) {
            // Create and save a new Student entity with hashed password
            Student student = new Student(email, hashedPassword, universityName, universityEmail, phone, firstName, lastName, bio);
            studentRepository.save(student);  // Save in the 'student' table
        } else if ("employer".equalsIgnoreCase(role)) {
            // Create and save a new Employer entity with hashed password
            Employer employer = new Employer(email, hashedPassword, companyName, companyEmail, companyPhone, firstName, lastName, bio);
            employerRepository.save(employer);  // Save in the 'employer' table
        } else {
            throw new RuntimeException("Invalid role");
        }
    }

    /**
     * Handles login for both students and employers.
     *
     * @param email    the user's email
     * @param password the user's password
     * @return a LoginResponse object containing a JWT token and user details
     */
    public LoginResponse login(String email, String password) {
        logger.info("Attempting login for email: {}", email);

        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent() && passwordEncoder.matches(password, userOptional.get().getPassword())) {
            User user = userOptional.get();
            String token = createToken(user.getEmail());

            // Verificăm rolul utilizatorului
            Optional<Student> studentOptional = studentRepository.findById(user.getId());
            if (studentOptional.isPresent()) {
                logger.info("Login successful for student: {}", user.getEmail());
                return new LoginResponse(token, user.getId(), user.getEmail(), "student");
            }

            Optional<Employer> employerOptional = employerRepository.findById(user.getId());
            if (employerOptional.isPresent()) {
                logger.info("Login successful for employer: {}", user.getEmail());
                return new LoginResponse(token, user.getId(), user.getEmail(), "employer");
            }

            logger.error("No matching role found for email: {}", email);
            throw new RuntimeException("No matching role found for email");
        } else {
            logger.warn("Login failed for email: {}", email);
            throw new RuntimeException("Invalid credentials");
        }
    }

    /**
     * Creates a JWT token.
     *
     * @param email the user's email
     * @return a signed JWT token
     */
    private String createToken(String email) {
        logger.debug("Creating token for email: {}", email);
        return Jwts.builder()
                .setSubject(email)
                .signWith(secretKey)
                .compact();
    }

    /**
     * LoginResponse class to encapsulate the response of a login request.
     */
    public class LoginResponse {
        private String token;
        private long id;
        private String email;
        private String role;

        // Constructor
        public LoginResponse(String token, long id, String email, String role) {
            this.token = token;
            this.id = id;
            this.email = email;
            this.role = role;
        }

        // Getters and Setters
        public String getToken() {
            return token;
        }

        public void setToken(String token) {
            this.token = token;
        }

        public long getId() {
            return id;
        }

        public void setId(long id) {
            this.id = id;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }
    }
}
