package com.example.jobsnap.repository;

import com.example.jobsnap.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    // Metodă personalizată pentru a căuta un user după email
    Optional<User> findByEmail(String email);
}
