// CONTROLLER PENTRU EMPLOYER
package com.example.jobsnap.controller;

import com.example.jobsnap.entity.Employer;
import com.example.jobsnap.service.EmployerService;
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

    // Get all employers
    @GetMapping
    public List<Employer> getAllEmployers() {
        return employerService.getAllEmployers();
    }

    // Get employer by ID
    @GetMapping("/{id}")
    public ResponseEntity<Employer> getEmployerById(@PathVariable Long id) {
        Optional<Employer> employer = employerService.getEmployerById(id);
        return employer.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new employer
    @PostMapping
    public Employer createEmployer(@RequestBody Employer employer) {
        return employerService.saveEmployer(employer);
    }

    // Update employer by ID
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateEmployer(@PathVariable Long id, @RequestBody Employer updatedEmployer) {
        Optional<Employer> employerOptional = employerService.getEmployerById(id);
        if (employerOptional.isPresent()) {
            Employer employer = employerOptional.get();
            employer.setName(updatedEmployer.getName());
            employer.setCompanyName(updatedEmployer.getCompanyName());
            employer.setEmail(updatedEmployer.getEmail());
            employer.setPassword(updatedEmployer.getPassword());
            return ResponseEntity.ok(employerService.saveEmployer(employer));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete employer by ID
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
