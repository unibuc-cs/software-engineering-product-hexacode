package com.example.jobsnap.controller;

import com.example.jobsnap.repository.EmployerRepository;
import com.example.jobsnap.repository.StudentRepository;
import com.example.jobsnap.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.HashMap;
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

    @GetMapping("/check-email")
    public ResponseEntity<Map<String, Boolean>> checkEmail(@RequestParam String email) {
        System.out.println("Received email check for: " + email);
        boolean exists = userRepository.findByEmail(email).isPresent();

        // Returnează un Map explicit
        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", exists);

        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(response);
    }

    @GetMapping("/check-phone")
    public ResponseEntity<Map<String, String>> checkPhone(@RequestParam String phone) {
        boolean studentExists = studentRepository.findByPhone(phone).isPresent();
        boolean employerExists = employerRepository.findByCompanyPhone(phone).isPresent();

        Map<String, String> response = new HashMap<>();
        if (studentExists) {
            response.put("exists", "Student");
        } else if (employerExists) {
            response.put("exists", "Employer");
        } else {
            response.put("exists", "No");
        }

        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(response);
    }


}
