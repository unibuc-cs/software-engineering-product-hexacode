package com.example.jobsnap.controller;

import com.example.jobsnap.service.AuthService;
import com.example.jobsnap.service.AuthService.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Clasa AuthController gestionează autentificarea utilizatorilor.
 */
@RestController
@RequestMapping("/auth")
@CrossOrigin(
        origins = "http://localhost:3000",
        methods = { RequestMethod.POST, RequestMethod.OPTIONS },
        allowedHeaders = "*",
        maxAge = 3600
)
public class AuthController {

    @Autowired
    private AuthService authService;

    /**
     * Endpoint pentru autentificare.
     * @param loginRequest Obiectul care conține email-ul, parola și rolul utilizatorului.
     * @return Un răspuns cu token-ul și datele utilizatorului dacă autentificarea eșuează.
     */
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginRequest loginRequest) {
        try {
            // Apelăm metoda login din AuthService
            LoginResponse loginResponse = authService.login(
                    loginRequest.getEmail(),
                    loginRequest.getPassword()
            );

            // Returnăm răspunsul complet cu token-ul și datele utilizatorului
            return ResponseEntity.ok().body(loginResponse);

        } catch (RuntimeException e) {
            // Returnăm un mesaj de eroare dacă autentificarea eșuează
            return ResponseEntity.status(401).body(new ErrorResponse("Invalid credentials"));
        }
    }


    // DTO pentru cererea de login
    public static class LoginRequest {
        private String email;
        private String password;
        private String role;

        // Getters și Setters
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }

        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
    }

        @PostMapping("/signup")
        public String signUp(@RequestBody SignUpRequest signUpRequest) {
            authService.signUp(
                    signUpRequest.getEmail(),
                    signUpRequest.getPassword(),
                    signUpRequest.getRole(),
                    signUpRequest.getFirstName(),
                    signUpRequest.getLastName(),
                    signUpRequest.getUniversityName(),
                    signUpRequest.getUniversityEmail(),
                    signUpRequest.getPhone(),
                    signUpRequest.getCompanyName(),
                    signUpRequest.getCompanyEmail(),
                    signUpRequest.getCompanyPhone(),
                    signUpRequest.getBio()
            );
            return "User registered successfully!";
        }

        // DTO for sign-up request
        public static class SignUpRequest {
            private String email;
            private String password;
            private String role;
            private String firstName;
            private String lastName;
            private String universityName;
            private String universityEmail;
            private String phone;
            private String companyName;
            private String companyEmail;
            private String companyPhone;
            private String bio;

            // Getters and setters for all fields
            public String getEmail() { return email; }
            public void setEmail(String email) { this.email = email; }

            public String getPassword() { return password; }
            public void setPassword(String password) { this.password = password; }

            public String getRole() { return role; }
            public void setRole(String role) { this.role = role; }

            public String getFirstName() { return firstName; }
            public void setFirstName(String firstName) { this.firstName = firstName; }

            public String getLastName() { return lastName; }
            public void setLastName(String lastName) { this.lastName = lastName; }

            // Student-specific getters and setters
            public String getUniversityName() { return universityName; }
            public void setUniversityName(String universityName) { this.universityName = universityName; }

            public String getUniversityEmail() { return universityEmail; }
            public void setUniversityEmail(String universityEmail) { this.universityEmail = universityEmail; }

            public String getPhone() { return phone; }
            public void setPhone(String phone) { this.phone = phone; }

            // Employer-specific getters and setters
            public String getCompanyName() { return companyName; }
            public void setCompanyName(String companyName) { this.companyName = companyName; }

            public String getCompanyEmail() { return companyEmail; }
            public void setCompanyEmail(String companyEmail) { this.companyEmail = companyEmail; }

            public String getCompanyPhone() { return companyPhone; }
            public void setCompanyPhone(String companyPhone) { this.companyPhone = companyPhone; }

            public String getBio() {
                return bio;
            }

            public void setBio(String bio) { this.bio = bio; }

        }
    }



