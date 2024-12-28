package service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repository.StudentRepository;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    @Autowired
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public void registerStudent(StudentDto studentDto) {
        studentRepository.save(studentDto);
    }

    public String loginStudent(LoginRequest loginRequest) {
        return studentRepository.login(loginRequest);
    }
}
