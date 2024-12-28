
// CONTROLLER PENTRU EMPLOYER
package controller;

import com.example.jobsnap.entity.Employer;
import com.example.jobsnap.service.EmployerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/employers")
public class EmployerController {

    @Autowired
    private EmployerService employerService;

    @GetMapping
    public List<Employer> getAllEmployers() {
        return employerService.getAllEmployers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employer> getEmployerById(@PathVariable Long id) {
        Optional<Employer> employer = employerService.getEmployerById(id);
        return employer.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Employer createEmployer(@RequestBody Employer employer) {
        return employerService.saveEmployer(employer);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateEmployer(@PathVariable Long id, @RequestBody Employer updatedEmployer) {
        Optional<Employer> employerOptional = employerService.getEmployerById(id);
        if (employerOptional.isPresent()) {
            Employer employer = employerOptional.get();
            employer.setName(updatedEmployer.getName());
            employer.setCompany(updatedEmployer.getCompany());
            return ResponseEntity.ok(employerService.saveEmployer(employer));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployer(@PathVariable Long id) {
        if (employerService.getEmployerById(id).isPresent()) {
            employerService.deleteEmployer(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

