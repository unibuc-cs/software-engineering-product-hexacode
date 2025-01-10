package com.example.jobsnap.controller;

import com.example.jobsnap.entity.Profile;
import com.example.jobsnap.repository.ProfileRepository;
import com.example.jobsnap.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profile")
@CrossOrigin(origins = "http://localhost:3000") // Allow connections from the frontend
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @Autowired
    private ProfileRepository profileRepository; // Inject ProfileRepository

    @GetMapping("/{id}")
    public ResponseEntity<Profile> getProfile(@PathVariable int id) {
        Profile profile = profileService.getProfileById(id);
        if (profile == null) {
            return ResponseEntity.notFound().build();  // Return 404 if profile not found
        }
        return ResponseEntity.ok(profile);  // Return 200 OK with the profile data
    }

    @PutMapping("/{userId}")
    public ResponseEntity<Profile> updateProfile(@PathVariable int userId, @RequestBody Profile updatedProfile) {
        // Fetch the existing profile for the user
        Profile existingProfile = profileRepository.findByUserId(userId);

        if (existingProfile != null) {
            // Update profile fields (don't touch user-related fields)
            existingProfile.setFirstName(updatedProfile.getFirstName());
            existingProfile.setLastName(updatedProfile.getLastName());
            existingProfile.setBio(updatedProfile.getBio());
            existingProfile.setContactInfo(updatedProfile.getContactInfo());

            // Save the updated profile
            Profile savedProfile = profileRepository.save(existingProfile);
            return ResponseEntity.ok(savedProfile); // Return the saved profile with 200 OK
        } else {
            // Return a 404 if profile is not found
            return ResponseEntity.notFound().build();
        }
    }
}
