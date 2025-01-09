package com.example.jobsnap.controller;

import com.example.jobsnap.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginRequest loginRequest) {
        try {
            // Call the login function in AuthService
            String token = authService.login(loginRequest.getEmail(), loginRequest.getPassword(), loginRequest.getRole());
            return ResponseEntity.ok().body(new LoginResponse(token));  // Custom response object
        } catch (RuntimeException e) {
            // Return error message and status
            return ResponseEntity.status(401).body(new ErrorResponse("Invalid credentials or role"));
        }
    }

    // Request DTO for login
    public static class LoginRequest {
        private String email;
        private String password;
        private String role;

        // Getters and Setters
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }

        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
    }

    // Response DTO classes
    public static class LoginResponse {
        private String token;
        public LoginResponse(String token) { this.token = token; }
        public String getToken() { return token; }
    }

    public static class ErrorResponse {
        private String message;
        public ErrorResponse(String message) { this.message = message; }
        public String getMessage() { return message; }
    }
}
