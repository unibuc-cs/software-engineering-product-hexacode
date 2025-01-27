package com.example.jobsnap;


import com.example.jobsnap.entity.CV;
import com.example.jobsnap.repository.CVRepository;
import com.example.jobsnap.service.CVService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CVServiceTest {

    @Mock
    private CVRepository cvRepository;

    @InjectMocks
    private CVService cvService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this); // Initialize mocks
    }

    @Test
    void testSaveCV() {
        // Arrange
        CV cv = new CV();
        cv.setId(1L);
        when(cvRepository.save(cv)).thenReturn(cv);

        // Act
        CV savedCV = cvService.saveCV(cv);

        // Assert
        assertNotNull(savedCV);
        assertEquals(1L, savedCV.getId());
        verify(cvRepository, times(1)).save(cv);
    }

    @Test
    void testGetCVsByUserId() {
        // Arrange
        Long userId = 1L;
        CV cv1 = new CV();
        CV cv2 = new CV();
        when(cvRepository.findByUserId(userId)).thenReturn(Arrays.asList(cv1, cv2));

        // Act
        List<CV> cvs = cvService.getCVsByUserId(userId);

        // Assert
        assertNotNull(cvs);
        assertEquals(2, cvs.size());
        verify(cvRepository, times(1)).findByUserId(userId);
    }

    @Test
    void testDeleteCV_Success() {
        // Arrange
        Long cvId = 1L;
        when(cvRepository.existsById(cvId)).thenReturn(true);

        // Act
        cvService.deleteCV(cvId);

        // Assert
        verify(cvRepository, times(1)).existsById(cvId);
        verify(cvRepository, times(1)).deleteById(cvId);
    }

    @Test
    void testDeleteCV_NotFound() {
        // Arrange
        Long cvId = 1L;
        when(cvRepository.existsById(cvId)).thenReturn(false);

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> cvService.deleteCV(cvId));
        assertEquals("CV not found with id: 1", exception.getMessage());
        verify(cvRepository, times(1)).existsById(cvId);
        verify(cvRepository, never()).deleteById(cvId);
    }

    @Test
    void testFindById_Success() {
        // Arrange
        Long cvId = 1L;
        CV cv = new CV();
        cv.setId(cvId);
        when(cvRepository.findById(cvId)).thenReturn(Optional.of(cv));

        // Act
        CV foundCV = cvService.findById(cvId);

        // Assert
        assertNotNull(foundCV);
        assertEquals(cvId, foundCV.getId());
        verify(cvRepository, times(1)).findById(cvId);
    }

    @Test
    void testFindById_NotFound() {
        // Arrange
        Long cvId = 1L;
        when(cvRepository.findById(cvId)).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> cvService.findById(cvId));
        assertEquals("CV not found with id: 1", exception.getMessage());
        verify(cvRepository, times(1)).findById(cvId);
    }

    @Test
    void testGetAllCVs() {
        // Arrange
        CV cv1 = new CV();
        CV cv2 = new CV();
        when(cvRepository.findAll()).thenReturn(Arrays.asList(cv1, cv2));

        // Act
        List<CV> allCVs = cvService.getAllCVs();

        // Assert
        assertNotNull(allCVs);
        assertEquals(2, allCVs.size());
        verify(cvRepository, times(1)).findAll();
    }
}
