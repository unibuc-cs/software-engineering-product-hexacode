package service;

import com.example.jobsnap.entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repository.StudentRepository;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService<StudentDto, LoginRequest> {

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

    public void deleteStudent(Long id) {
    }

    public Optional<Object> getStudentById(Long id) {
        return null;
    }

    public Object saveStudent(Student student) {
        return null;
    }

    public List<Student> getAllStudents() {
        return null;
    }
}
