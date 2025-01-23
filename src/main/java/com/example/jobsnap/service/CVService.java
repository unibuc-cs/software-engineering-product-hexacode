package com.example.jobsnap.service;

import com.example.jobsnap.entity.CV;
import com.example.jobsnap.repository.CVRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CVService {

    @Autowired
    private CVRepository cvRepository;

    // Save a new CV
    public CV saveCV(CV cv) {
        return cvRepository.save(cv); // Save the CV
    }

    // Get all CVs for a user
    public List<CV> getCVsByUserId(Long userId) {
        return cvRepository.findByUserId(userId); // Query the database for CVs by userId
    }

    public List<CV> findByUserId(Long userId) {
        return cvRepository.findByUserId(userId); // You can use the JPA repository method to find by userId
    }

    public void deleteCV(Long cvId) {
        // Verifică dacă CV-ul există înainte de a-l șterge
        if (!cvRepository.existsById(cvId)) {
            throw new RuntimeException("CV not found with id: " + cvId);
        }
        cvRepository.deleteById(cvId); // Șterge CV-ul din baza de date
    }

    public CV findById(Long cvId) {
        return cvRepository.findById(cvId)
                .orElseThrow(() -> new RuntimeException("CV not found with id: " + cvId));
    }


}
