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


    public CV saveCV(CV cv) {
        return cvRepository.save(cv);
    }


    public List<CV> getCVsByUserId(Long userId) {
        return cvRepository.findByUserId(userId);
    }

    public List<CV> findByUserId(Long userId) {
        return cvRepository.findByUserId(userId);
    }

    public void deleteCV(Long cvId) {

        if (!cvRepository.existsById(cvId)) {
            throw new RuntimeException("CV not found with id: " + cvId);
        }
        cvRepository.deleteById(cvId);
    }


    public CV findById(Long cvId) {
        return cvRepository.findById(cvId)
                .orElseThrow(() -> new RuntimeException("CV not found with id: " + cvId));
    }


    // Metoda care returnează toate CV-urile
    public List<CV> getAllCVs() {
        return cvRepository.findAll(); // Apelează repository-ul pentru a obține toate CV-urile
    }
}
