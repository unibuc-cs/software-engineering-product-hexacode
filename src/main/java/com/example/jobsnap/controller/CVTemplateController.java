// CONTROLLER PENTRU CVTemplate
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

    @GetMapping
    public List<CVTemplate> getAllCVTemplates() {
        return cvTemplateService.getAllCVTemplates();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CVTemplate> getCVTemplateById(@PathVariable Long id) {
        Optional<CVTemplate> cvTemplate = cvTemplateService.getCVTemplateById(id);
        return cvTemplate.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public CVTemplate createCVTemplate(@RequestBody CVTemplate cvTemplate) {
        return cvTemplateService.saveCVTemplate(cvTemplate);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateCVTemplate(@PathVariable Long id, @RequestBody CVTemplate updatedCVTemplate) {
        Optional<CVTemplate> cvTemplateOptional = cvTemplateService.getCVTemplateById(id);
        if (cvTemplateOptional.isPresent()) {
            try {
                CVTemplate cvTemplate = (CVTemplate) cvTemplateOptional.get().clone(); // Clonare
                cvTemplate.setTemplateData(updatedCVTemplate.getTemplateData());
                return ResponseEntity.ok(cvTemplateService.saveCVTemplate(cvTemplate));
            } catch (CloneNotSupportedException e) {
                return ResponseEntity.status(500).build(); // Eroare de clonare
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCVTemplate(@PathVariable Long id) {
        if (cvTemplateService.getCVTemplateById(id).isPresent()) {
            cvTemplateService.deleteCVTemplate(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
