package com.example.jobsnap.service;

import com.example.jobsnap.entity.CVTemplate;
import com.example.jobsnap.repository.CVTemplateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CVTemplateService {

    @Autowired
    private CVTemplateRepository cvTemplateRepository;

    // Obține toate CVTemplate-urile
    public List<CVTemplate> getAllCVTemplates() {
        return cvTemplateRepository.findAll(); // Folosim metoda findAll() din JpaRepository
    }

    // Obține un CVTemplate după ID
    public Optional<CVTemplate> getCVTemplateById(Long id) {
        return cvTemplateRepository.findById(id); // Folosim metoda findById() din JpaRepository
    }

    // Salvează un nou CVTemplate sau actualizează unul existent
    public CVTemplate saveCVTemplate(CVTemplate cvTemplate) {
        return cvTemplateRepository.save(cvTemplate); // Folosim metoda save() din JpaRepository
    }

    // Șterge un CVTemplate după ID
    public void deleteCVTemplate(Long id) {
        cvTemplateRepository.deleteById(id); // Folosim metoda deleteById() din JpaRepository
    }
}
