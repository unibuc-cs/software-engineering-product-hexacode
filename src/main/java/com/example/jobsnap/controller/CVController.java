package com.example.jobsnap.controller;

import com.example.jobsnap.entity.CV;
import com.example.jobsnap.service.CVService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cv")
@CrossOrigin(origins = "*")
public class CVController {

    @Autowired
    private CVService cvService;

    // Endpoint pentru a crea un CV nou

    @PostMapping
    public ResponseEntity<CV> createCV(@RequestBody CV cv) {
        System.out.println("Received CV: " + cv);
        CV createdCV = cvService.saveCV(cv); // Save the CV based on the provided data
        return ResponseEntity.status(201).body(createdCV); // Return the created CV
    }
    // Endpoint pentru a obține CV-urile unui utilizator
    @GetMapping("/{userId}")
    public ResponseEntity<List<CV>> getCVsByUserId(@PathVariable Long userId) {
        List<CV> cvs = cvService.findByUserId(userId);
        if (cvs.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(cvs);
    }

    @GetMapping("/download/{cvId}")
    public ResponseEntity<byte[]> downloadCV(@PathVariable Long cvId) {
        CV cv = cvService.findById(cvId);
        // Lógica pentru generarea și returnarea fișierului PDF
        return null;
    }

    @DeleteMapping("/{cvId}")
    public ResponseEntity<Void> deleteCV(@PathVariable Long cvId) {
        cvService.deleteCV(cvId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
