package com.example.jobsnap.service;

import com.example.jobsnap.entity.Profile;
import com.example.jobsnap.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    public Profile getProfileById(int id) {
        // This returns the profile if found, or null if not found
        return profileRepository.findById(id).orElse(null); // Return null if no profile is found
    }

    public Profile updateProfile(int id, Profile updatedProfile) {
        // Fetch the existing profile
        Profile existingProfile = profileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        // Update fields
        existingProfile.setFirstName(updatedProfile.getFirstName());
        existingProfile.setLastName(updatedProfile.getLastName());
        existingProfile.setBio(updatedProfile.getBio());
        existingProfile.setContactInfo(updatedProfile.getContactInfo());

        // Associate the CV and User if provided
        if (updatedProfile.getCv() != null) {
            existingProfile.setCv(updatedProfile.getCv());
        }

        // Save and return the updated profile
        return profileRepository.save(existingProfile);
    }

}
