package com.example.jobsnap.controller;

import com.example.jobsnap.entity.CVTemplate;
import com.example.jobsnap.service.CVTemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cv-templates")
public class CVTemplateController {

    @Autowired
    private CVTemplateService cvTemplateService;

    // Endpoint pentru a obține toate CVTemplate-urile
    @GetMapping
    public List<CVTemplate> getAllCVTemplates() {
        return cvTemplateService.getAllCVTemplates();
    }

    // Endpoint pentru a obține un CVTemplate după ID
    @GetMapping("/{id}")
    public ResponseEntity<CVTemplate> getCVTemplateById(@PathVariable Long id) {
        Optional<CVTemplate> cvTemplate = cvTemplateService.getCVTemplateById(id);
        return cvTemplate.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Endpoint pentru a crea un nou CVTemplate
    @PostMapping
    public ResponseEntity<CVTemplate> createCVTemplate(@RequestBody CVTemplate cvTemplate) {
        CVTemplate createdCVTemplate = cvTemplateService.saveCVTemplate(cvTemplate);
        return ResponseEntity.status(201).body(createdCVTemplate); // Răspuns cu status 201 - Created
    }

    // Endpoint pentru a actualiza un CVTemplate existent
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateCVTemplate(@PathVariable Long id, @RequestBody CVTemplate updatedCVTemplate) {
        Optional<CVTemplate> cvTemplateOptional = cvTemplateService.getCVTemplateById(id);
        if (cvTemplateOptional.isPresent()) {
            try {
                CVTemplate cvTemplate = cvTemplateOptional.get(); // Nu mai este necesară clonarea
                cvTemplate.setTemplateData(updatedCVTemplate.getTemplateData());
                return ResponseEntity.ok(cvTemplateService.saveCVTemplate(cvTemplate));
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Eroare la actualizarea CVTemplate-ului");
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint pentru a șterge un CVTemplate
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCVTemplate(@PathVariable Long id) {
        Optional<CVTemplate> cvTemplate = cvTemplateService.getCVTemplateById(id);
        if (cvTemplate.isPresent()) {
            cvTemplateService.deleteCVTemplate(id);
            return ResponseEntity.noContent().build(); // Răspuns fără conținut
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
