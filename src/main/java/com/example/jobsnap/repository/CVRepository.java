package com.example.jobsnap.repository;

import com.example.jobsnap.entity.CV;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CVRepository extends JpaRepository<CV, Long> {


    List<CV> findByUserId(Long userId);
    List<CV> findByCvTypeIgnoreCase(String cvType);


    List<CV> findByUserIdAndIsUploadedTrue(Long userId);
}
