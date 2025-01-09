package com.example.jobsnap.service;

import com.example.jobsnap.entity.Employer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.jobsnap.repository.EmployerRepository;

import java.util.List;
import java.util.Optional;

@Service
public class EmployerService {

    private final EmployerRepository employerRepository;

    @Autowired
    public EmployerService(EmployerRepository employerRepository) {
        this.employerRepository = employerRepository;
    }

    // Get all employers
    public List<Employer> getAllEmployers() {
        return employerRepository.findAll();
    }

    // Get employer by ID
    public Optional<Employer> getEmployerById(Long id) {
        return employerRepository.findById(id);
    }

    // Save or update employer
    public Employer saveEmployer(Employer employer) {
        return employerRepository.save(employer);
    }

    // Delete employer by ID
    public void deleteEmployer(Long id) {
        employerRepository.deleteById(id);
    }
}
