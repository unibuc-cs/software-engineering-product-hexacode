package com.example.jobsnap.unit;

import com.example.jobsnap.entity.Profile;
import com.example.jobsnap.repository.ProfileRepository;
import com.example.jobsnap.service.ProfileService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProfileServiceTest {

    @Mock
    private ProfileRepository profileRepository;

    @InjectMocks
    private ProfileService profileService;

    public ProfileServiceTest() {
        MockitoAnnotations.openMocks(this); // Initialize mocks
    }

    @Test
    void testGetProfileById_ProfileExists() {
        // Arrange
        Profile profile = new Profile();
        profile.setId(1);
        profile.setFirstName("John");
        profile.setLastName("Doe");

        when(profileRepository.findById(1)).thenReturn(Optional.of(profile));

        // Act
        Profile result = profileService.getProfileById(1);

        // Assert
        assertNotNull(result);
        assertEquals("John", result.getFirstName());
        assertEquals("Doe", result.getLastName());
    }

    @Test
    void testGetProfileById_ProfileDoesNotExist() {
        // Arrange
        when(profileRepository.findById(1)).thenReturn(Optional.empty());

        // Act
        Profile result = profileService.getProfileById(1);

        // Assert
        assertNull(result);
    }

    @Test
    void testUpdateProfile_Success() {
        // Arrange
        Profile existingProfile = new Profile();
        existingProfile.setId(1);
        existingProfile.setFirstName("John");
        existingProfile.setLastName("Doe");

        Profile updatedProfile = new Profile();
        updatedProfile.setFirstName("Jane");
        updatedProfile.setLastName("Smith");

        when(profileRepository.findById(1)).thenReturn(Optional.of(existingProfile));
        when(profileRepository.save(existingProfile)).thenReturn(existingProfile);

        // Act
        Profile result = profileService.updateProfile(1, updatedProfile);

        // Assert
        assertNotNull(result);
        assertEquals("Jane", result.getFirstName());
        assertEquals("Smith", result.getLastName());
        verify(profileRepository, times(1)).save(existingProfile);
    }

    @Test
    void testUpdateProfile_ProfileNotFound() {
        // Arrange
        Profile updatedProfile = new Profile();
        updatedProfile.setFirstName("Jane");
        updatedProfile.setLastName("Smith");

        when(profileRepository.findById(1)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(RuntimeException.class, () -> profileService.updateProfile(1, updatedProfile));
    }
}
