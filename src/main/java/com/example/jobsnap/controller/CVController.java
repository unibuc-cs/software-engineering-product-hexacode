package com.example.jobsnap.controller;

import com.example.jobsnap.entity.CV;
import com.example.jobsnap.service.CVService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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



    // Endpoint pentru a obține un CV pe baza ID-ului
    @GetMapping("/{cvId}")
    public ResponseEntity<CV> getCVById(@PathVariable Long cvId) {
        System.out.println("Received GET request for CV with ID: " + cvId);
        CV cv = cvService.findById(cvId);
        if (cv == null) {
            System.out.println("CV not found with ID: " + cvId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Dacă nu găsește CV-ul
        }
        return ResponseEntity.ok(cv); // Returnează CV-ul găsit
    }

    // Endpoint pentru a obține toate CV-urile unui utilizator
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CV>> getCVsByUserId(@PathVariable Long userId) {
        List<CV> cvs = cvService.getCVsByUserId(userId);
        if (cvs.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(cvs);
    }


//    @GetMapping("/allcvs")
//    public ResponseEntity<List<CV>> getAllCVs() {
//        try {
//            List<CV> allCVs = cvService.getAllCVs(); // Apelează serviciul pentru a obține toate CV-urile
//            if (allCVs.isEmpty()) {
//                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null); // Dacă nu sunt CV-uri
//            }
//            return ResponseEntity.ok(allCVs); // Returnează lista de CV-uri
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // Dacă apare o eroare
//        }
//    }





    // Endpoint pentru a descărca CV-ul ca fișier (PDF sau alt format)
    @GetMapping("/download/{cvId}")
    public ResponseEntity<byte[]> downloadCV(@PathVariable Long cvId) {
        CV cv = cvService.findById(cvId);
        // Logică pentru generarea și returnarea fișierului PDF
        return null;
    }

    // Endpoint pentru a șterge un CV
    @DeleteMapping("/{cvId}")
    public ResponseEntity<Void> deleteCV(@PathVariable Long cvId) {
        System.out.println("Attempting to delete CV with ID: " + cvId);
        cvService.deleteCV(cvId);
        System.out.println("CV deleted successfully");
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }


    @PutMapping("/{cvId}")
    public ResponseEntity<CV> updateCV(@PathVariable Long cvId, @RequestBody CV updatedCV) {
        System.out.println("Attempting to update CV with ID: " + cvId);
        CV existingCV = cvService.findById(cvId); // Verificăm dacă CV-ul există
        if (existingCV == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Dacă nu există CV-ul
        }

        // Actualizează câmpurile CV-ului existent în funcție de tipul CV-ului
        switch (existingCV.getCvType()) {
            case "it":
                existingCV.setFullName(updatedCV.getFullName());
                existingCV.setEmail(updatedCV.getEmail());
                existingCV.setPhone(updatedCV.getPhone());
                existingCV.setSummary(updatedCV.getSummary());
                existingCV.setEducation(updatedCV.getEducation());
                existingCV.setExperience(updatedCV.getExperience());
                existingCV.setSkills(updatedCV.getSkills());
                existingCV.setTechnologies(updatedCV.getTechnologies());
                existingCV.setCertifications(updatedCV.getCertifications());
                existingCV.setProjects(updatedCV.getProjects());

                break;

            case "business":
                existingCV.setFullName(updatedCV.getFullName());
                existingCV.setEmail(updatedCV.getEmail());
                existingCV.setPhone(updatedCV.getPhone());
                existingCV.setSummary(updatedCV.getSummary());
                existingCV.setEducation(updatedCV.getEducation());
                existingCV.setExperience(updatedCV.getExperience());
                existingCV.setSkills(updatedCV.getSkills());
                existingCV.setCertifications(updatedCV.getCertifications());
                existingCV.setProjects(updatedCV.getProjects());

                break;

            case "marketing":
                existingCV.setFullName(updatedCV.getFullName());
                existingCV.setEmail(updatedCV.getEmail());
                existingCV.setPhone(updatedCV.getPhone());
                existingCV.setSummary(updatedCV.getSummary());
                existingCV.setEducation(updatedCV.getEducation());
                existingCV.setExperience(updatedCV.getExperience());
                existingCV.setSkills(updatedCV.getSkills());
                existingCV.setTools(updatedCV.getTools());
                existingCV.setcampaignExperience(updatedCV.getcampaignExperience());
                existingCV.settargetAudience(updatedCV.gettargetAudience());
                existingCV.setCertifications(updatedCV.getCertifications());
                existingCV.setProjects(updatedCV.getProjects());

                break;

            case "healthcare":
                existingCV.setFullName(updatedCV.getFullName());
                existingCV.setEmail(updatedCV.getEmail());
                existingCV.setPhone(updatedCV.getPhone());
                existingCV.setSummary(updatedCV.getSummary());
                existingCV.setEducation(updatedCV.getEducation());
                existingCV.setExperience(updatedCV.getExperience());
                existingCV.setSkills(updatedCV.getSkills());
                existingCV.setTools(updatedCV.getTools());
                existingCV.setClinicalExperience(updatedCV.getClinicalExperience());
                existingCV.setCertifications(updatedCV.getCertifications());
                existingCV.setProjects(updatedCV.getProjects());

                break;

            case "education":
                existingCV.setFullName(updatedCV.getFullName());
                existingCV.setEmail(updatedCV.getEmail());
                existingCV.setPhone(updatedCV.getPhone());
                existingCV.setSummary(updatedCV.getSummary());
                existingCV.setEducation(updatedCV.getEducation());
                existingCV.setDegree(updatedCV.getDegree());
                existingCV.setAwards(updatedCV.getAwards());

                break;

            case "graphicdesign":
                existingCV.setFullName(updatedCV.getFullName());
                existingCV.setEmail(updatedCV.getEmail());
                existingCV.setPhone(updatedCV.getPhone());
                existingCV.setSummary(updatedCV.getSummary());
                existingCV.setEducation(updatedCV.getEducation());
                existingCV.setExperience(updatedCV.getExperience());
                existingCV.setSkills(updatedCV.getSkills());
                existingCV.setTools(updatedCV.getTools());
                existingCV.setPortfolio(updatedCV.getPortfolio());
                existingCV.setCertifications(updatedCV.getCertifications());
                existingCV.setProjects(updatedCV.getProjects());

                break;

            default:
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // Tipul de CV nu este valid
        }

        // Actualizează imagePath dacă există
        if (updatedCV.getImagePath() != null) {
            System.out.println("Updating imagePath: " + updatedCV.getImagePath());
            existingCV.setImagePath(updatedCV.getImagePath()); // Salvează noul imagePath
        }

        CV savedCV = cvService.saveCV(existingCV);
        return ResponseEntity.ok(savedCV);
    }

    @GetMapping("/allcvs")
    public ResponseEntity<List<CV>> getAllCVs(@RequestParam(value = "cvType", required = false) String cvType) {
        try {
            System.out.println("CvType: " + cvType);
            List<CV> allCVs;

            // If cvType is provided, filter by cvType
            if (cvType != null && !cvType.isEmpty()) {
                allCVs = cvService.getCVsByType(cvType);
                System.out.println("CvType: " + cvType);
            } else {
                allCVs = cvService.getAllCVs();
            }

            if (allCVs.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null); // If no CVs found
            }
            return ResponseEntity.ok(allCVs); // Return the list of CVs
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // Handle error
        }
    }





}
