package com.example.jobsnap.repository;

import com.example.jobsnap.entity.CVTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CVTemplateRepository extends JpaRepository<CVTemplate, Long> {
}
