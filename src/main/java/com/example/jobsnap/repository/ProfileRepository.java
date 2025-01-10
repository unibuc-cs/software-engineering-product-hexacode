package com.example.jobsnap.repository;

import com.example.jobsnap.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<Profile, Integer> {
    Profile findByUserId(int userId);
}
