package com.example.jobsnap.controller;

import com.example.jobsnap.repository.EmployerRepository;
import com.example.jobsnap.repository.StudentRepository;
import com.example.jobsnap.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private EmployerRepository employerRepository;

    // Endpoint pentru verificarea emailului
    @GetMapping("/check-email")
    public ResponseEntity<Map<String, Boolean>> checkEmail(@RequestParam String email) {
        System.out.println("Received email check for: " + email);  // Log pentru debugging
        boolean exists = userRepository.findByEmail(email).isPresent();
        return ResponseEntity.ok(Collections.singletonMap("exists", exists));
    }


    // Endpoint pentru verificarea numărului de telefon
    @GetMapping("/check-phone")
    public ResponseEntity<Map<String, String>> checkPhone(@RequestParam String phone) {
        // Verifică dacă numărul de telefon există în tabela Student sau Employer
        boolean studentExists = studentRepository.findByPhone(phone).isPresent();
        boolean employerExists = employerRepository.findByCompanyPhone(phone).isPresent();

        if (studentExists) {
            return ResponseEntity.ok(Collections.singletonMap("exists", "Student"));
        } else if (employerExists) {
            return ResponseEntity.ok(Collections.singletonMap("exists", "Employer"));
        } else {
            return ResponseEntity.ok(Collections.singletonMap("exists", "No"));
        }
    }
}
