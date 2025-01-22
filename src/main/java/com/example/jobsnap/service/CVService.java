package com.example.jobsnap.service;

import com.example.jobsnap.entity.CV;
import com.example.jobsnap.repository.CVRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CVService {

    @Autowired
    private CVRepository cvRepository;

    // Save a new CV
    public CV saveCV(CV cv) {
        return cvRepository.save(cv); // Save the CV
    }
}
