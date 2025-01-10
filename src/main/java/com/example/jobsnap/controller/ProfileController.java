package com.example.jobsnap.controller;

import com.example.jobsnap.service.ProfileService;
import com.example.jobsnap.entity.Profile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profile")
@CrossOrigin(origins = "http://localhost:3000") // Permite conexiuni din frontend
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @GetMapping("/{id}")
    public ResponseEntity<Profile> getProfile(@PathVariable int id) {
        Profile profile = profileService.getProfileById(id);  // Using user_id
        if (profile == null) {
            return ResponseEntity.notFound().build();  // Return 404 if profile not found
        }
        return ResponseEntity.ok(profile);  // Return 200 OK with the profile data
    }

    @PutMapping("/{id}")
    public ResponseEntity<Profile> updateProfile(@PathVariable int id, @RequestBody Profile updatedProfile) {
        Profile profile = profileService.updateProfile(id, updatedProfile);
        return ResponseEntity.ok(profile);
    }
}
