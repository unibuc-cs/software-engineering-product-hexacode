package com.example.jobsnap.service;

import com.example.jobsnap.entity.JobRole;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class JobRoleService {
    public List<JobRole> getAllJobRoles() {
        return null;
    }

    public Optional<JobRole> getJobRoleById(Long id) {
        return null;
    }

    public JobRole saveJobRole(JobRole jobRole) {
        return jobRole;
    }

    public void deleteJobRole(Long id) {
    }
}
