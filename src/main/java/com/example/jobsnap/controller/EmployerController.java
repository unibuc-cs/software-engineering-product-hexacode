package com.example.jobsnap.controller;

import com.example.jobsnap.entity.Employer;
import com.example.jobsnap.service.EmployerService;
import com.example.jobsnap.repository.EmployerRepository;
import com.example.jobsnap.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/employers")
public class EmployerController {

    @Autowired
    private EmployerService employerService;

    @Autowired
    private EmployerRepository employerRepository;
    @Autowired
    private UserRepository userRepository;

    // Get all employers
    @GetMapping
    public List<Employer> getAllEmployers() {
        return employerService.getAllEmployers();
    }

    // Get employer profile by ID
    @GetMapping("/{id}")
    public ResponseEntity<Employer> getEmployerProfile(@PathVariable Long id) {
        Optional<Employer> employer = employerRepository.findById(id);
        if (employer.isPresent()) {
            return ResponseEntity.ok(employer.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Employer createEmployer(@RequestBody Employer employer) {
        System.out.println("Email primit în backend: " + employer.getEmail());
        if (employer.getEmail() == null || employer.getEmail().isEmpty()) {
            throw new RuntimeException("Email is required");
        }
        return employerService.saveEmployer(employer);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Employer> updateEmployerProfile(@PathVariable Long id, @RequestBody Employer updatedEmployer) {
        Optional<Employer> employerOptional = employerRepository.findById(id);
        if (employerOptional.isPresent()) {
            Employer employer = employerOptional.get();
            employer.setFirstName(updatedEmployer.getFirstName());
            employer.setLastName(updatedEmployer.getLastName());
            employer.setCompanyName(updatedEmployer.getCompanyName());
            employer.setCompanyEmail(updatedEmployer.getCompanyEmail());
            employer.setCompanyPhone(updatedEmployer.getCompanyPhone());
            employer.setBio(updatedEmployer.getBio());
            return ResponseEntity.ok(employerRepository.save(employer));
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployer(@PathVariable Long id) {
        if (employerService.getEmployerById(id).isPresent()) {
            employerService.deleteEmployer(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
