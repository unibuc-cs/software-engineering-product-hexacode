package com.example.jobsnap.service;

import com.example.jobsnap.entity.Employer;
import com.example.jobsnap.entity.Student;
import com.example.jobsnap.entity.User;
import com.example.jobsnap.repository.EmployerRepository;
import com.example.jobsnap.repository.StudentRepository;
import com.example.jobsnap.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private EmployerRepository employerRepository;
    private String phone;
    private String company_phone;

    public void registerUser(User user, String phoneNumber, String role) throws IllegalArgumentException {
        // Verifică unicitatea emailului
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email-ul este deja folosit.");
        }

        // Verifică unicitatea numărului de telefon

        if (studentRepository.findByPhone(phone).isPresent() || employerRepository.findByCompanyPhone(company_phone).isPresent()) {
            throw new IllegalArgumentException("Numărul de telefon este deja folosit.");
        }

        // Salvează utilizatorul
        userRepository.save(user);

        // Salvează studentul sau employerul, în funcție de rol
        if ("student".equals(role)) {
            Student student = new Student(user, phoneNumber);
            studentRepository.save(student);
        } else if ("employer".equals(role)) {
            Employer employer = new Employer(user, phoneNumber);
            employerRepository.save(employer);
        }
    }
}
