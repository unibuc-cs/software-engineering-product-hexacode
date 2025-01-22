package com.example.jobsnap.controller;

import com.example.jobsnap.service.AuthService;
import com.example.jobsnap.service.AuthService.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Clasa AuthController gestionează autentificarea utilizatorilor.
 * Prin adnotarea @CrossOrigin, permitem cereri de la http://localhost:3000.
 * În funcție de nevoile tale, poți adăuga sau restrânge atributele (e.g. methods, allowedHeaders).
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
     * @return Un răspuns cu token-ul și datele utilizatorului dacă autentificarea reușește.
     */
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginRequest loginRequest) {
        try {
            // Apelăm metoda login din AuthService, care returnează un LoginResponse
            LoginResponse loginResponse = authService.login(
                    loginRequest.getEmail(),
                    loginRequest.getPassword(),
                    loginRequest.getRole()
            );

            // Returnăm răspunsul complet cu token-ul și datele utilizatorului
            return ResponseEntity.ok().body(loginResponse);

        } catch (RuntimeException e) {

            // Returnăm un mesaj de eroare dacă autentificarea eșuează (ex: user inexistent sau parolă greșită)
            return ResponseEntity.status(401).body(new ErrorResponse("Invalid credentials or role"));
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

    // DTO pentru mesajele de eroare
    public static class ErrorResponse {
        private String message;

        public ErrorResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }
    }
}
