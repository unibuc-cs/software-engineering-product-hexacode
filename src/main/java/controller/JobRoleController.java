
// CONTROLLER PENTRU JobRole
package controller;

import com.example.jobsnap.entity.JobRole;
import com.example.jobsnap.service.JobRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/job-roles")
public class JobRoleController {

    @Autowired
    private JobRoleService jobRoleService;

    @GetMapping
    public List<JobRole> getAllJobRoles() {
        return jobRoleService.getAllJobRoles();
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobRole> getJobRoleById(@PathVariable Long id) {
        Optional<JobRole> jobRole = jobRoleService.getJobRoleById(id);
        return jobRole.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public JobRole createJobRole(@RequestBody JobRole jobRole) {
        return jobRoleService.saveJobRole(jobRole);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateJobRole(@PathVariable Long id, @RequestBody JobRole updatedJobRole) {
        Optional<JobRole> jobRoleOptional = jobRoleService.getJobRoleById(id);
        if (jobRoleOptional.isPresent()) {
            JobRole jobRole = jobRoleOptional.get();
            jobRole.setName(updatedJobRole.getName());
            jobRole.setDescription(updatedJobRole.getDescription());
            return ResponseEntity.ok(jobRoleService.saveJobRole(jobRole));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJobRole(@PathVariable Long id) {
        if (jobRoleService.getJobRoleById(id).isPresent()) {
            jobRoleService.deleteJobRole(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}