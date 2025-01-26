package com.example.jobsnap.controller;

import com.example.jobsnap.entity.Student;
import com.example.jobsnap.service.StudentService;
import com.example.jobsnap.repository.StudentRepository;
import com.example.jobsnap.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private StudentRepository studentRepository;  // Repository pentru Student
    @Autowired
    private UserRepository userRepository;  // Repository pentru User, pentru a verifica ID-ul utilizatorului

    // Get all students
    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    // Get student profile by ID
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentProfile(@PathVariable Long id) {
        Optional<Student> student = studentRepository.findById(id);
        if (student.isPresent()) {
            return ResponseEntity.ok(student.get());  // Returnează profilul studentului
        } else {
            return ResponseEntity.notFound().build();  // Returnează 404 dacă studentul nu este găsit
        }
    }

    // Create a new student
    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        return studentService.saveStudent(student);
    }

    // Update student profile
    @PutMapping("/update/{id}")
    public ResponseEntity<Student> updateStudentProfile(@PathVariable Long id, @RequestBody Student updatedStudent) {
        Optional<Student> studentOptional = studentRepository.findById(id);
        if (studentOptional.isPresent()) {
            Student student = studentOptional.get();
            // Actualizează informațiile studentului
            student.setFirstName(updatedStudent.getFirstName());
            student.setLastName(updatedStudent.getLastName());
            student.setUniversityName(updatedStudent.getUniversityName());
            student.setUniversityEmail(updatedStudent.getUniversityEmail());
            student.setPhone(updatedStudent.getPhone());
            student.setBio(updatedStudent.getBio());

            return ResponseEntity.ok(studentRepository.save(student));  // Salvează și returnează studentul actualizat
        } else {
            return ResponseEntity.notFound().build();  // Returnează 404 dacă nu găsește studentul
        }
    }

    // Delete student by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        if (studentService.getStudentById(id).isPresent()) {
            studentService.deleteStudent(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
