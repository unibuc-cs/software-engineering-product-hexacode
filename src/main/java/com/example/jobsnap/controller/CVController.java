package com.example.jobsnap.controller;

import com.example.jobsnap.entity.CV;
import com.example.jobsnap.service.CVService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cv")
@CrossOrigin(origins = "*")
public class CVController {

    @Autowired
    private CVService cvService;

    // Endpoint pentru a crea un CV nou
    @PostMapping
    public ResponseEntity<CV> createCV(@RequestBody CV cv) {
        System.out.println("Received wdawjdiawdjiawdjioadoiajdoiajdwoiawdaCV: " + cv);
        CV createdCV = cvService.saveCV(cv); // Save the CV based on the provided data
        return ResponseEntity.status(201).body(createdCV); // Return the created CV with a status 201 - Created
    }
}
