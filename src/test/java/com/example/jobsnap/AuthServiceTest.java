package com.example.jobsnap;

import com.example.jobsnap.entity.Student;
import com.example.jobsnap.entity.Employer;
import com.example.jobsnap.entity.User;
import com.example.jobsnap.repository.StudentRepository;
import com.example.jobsnap.repository.EmployerRepository;
import com.example.jobsnap.repository.UserRepository;
import com.example.jobsnap.service.AuthService;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;


import javax.crypto.SecretKey;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AuthServiceTest {

    @Mock
    private StudentRepository studentRepository;

    @Mock
    private EmployerRepository employerRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private AuthService authService;

    private SecretKey secretKey;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Inițializare manuală a cheii secrete
        secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    }


    @Test
    void testSignUp_StudentSuccess() {
        // Arrange
        String email = "student@test.com";
        String password = "password";
        String role = "student";
        String firstName = "John";
        String lastName = "Doe";
        String universityName = "Test University";
        String universityEmail = "student@university.com";
        String phone = "1234567890";
        String bio = "Student bio";

        // Act
        authService.signUp(email, password, role, firstName, lastName, universityName, universityEmail, phone, null, null, null, bio);

        // Assert
        verify(studentRepository, times(1)).save(any(Student.class));
        verify(employerRepository, never()).save(any(Employer.class));
    }

    @Test
    void testSignUp_EmployerSuccess() {
        // Arrange
        String email = "employer@test.com";
        String password = "password";
        String role = "employer";
        String firstName = "Jane";
        String lastName = "Smith";
        String companyName = "Test Company";
        String companyEmail = "company@test.com";
        String companyPhone = "0987654321";
        String bio = "Employer bio";

        // Act
        authService.signUp(email, password, role, firstName, lastName, null, null, null, companyName, companyEmail, companyPhone, bio);

        // Assert
        verify(employerRepository, times(1)).save(any(Employer.class));
        verify(studentRepository, never()).save(any(Student.class));
    }

    @Test
    void testSignUp_InvalidRole() {
        // Arrange
        String email = "invalid@test.com";
        String password = "password";
        String role = "invalid";

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> authService.signUp(email, password, role, null, null, null, null, null, null, null, null, null));
        assertEquals("Invalid role", exception.getMessage());
        verify(studentRepository, never()).save(any(Student.class));
        verify(employerRepository, never()).save(any(Employer.class));
    }

    @Test
    void testLogin_Success_Student() {
        // Arrange
        String email = "student@test.com";
        String password = "password";
        User user = new User();
        user.setId(1);
        user.setEmail(email);
        user.setPassword(password);

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        when(studentRepository.findById(1L)).thenReturn(Optional.of(new Student(user, phoneNumber)));

        // Act
        AuthService.LoginResponse response = authService.login(email, password);

        // Assert
        assertNotNull(response);
        assertEquals(email, response.getEmail());
        assertEquals("student", response.getRole());
        verify(userRepository, times(1)).findByEmail(email);
        verify(studentRepository, times(1)).findById(1L);
    }

    @Test
    void testLogin_Success_Employer() {
        // Arrange
        String email = "employer@test.com";
        String password = "password";
        User user = new User();
        user.setId(1);
        user.setEmail(email);
        user.setPassword(password);

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        when(employerRepository.findById(1L)).thenReturn(Optional.of(new Employer(user, phoneNumber)));

        // Act
        AuthService.LoginResponse response = authService.login(email, password);

        // Assert
        assertNotNull(response);
        assertEquals(email, response.getEmail());
        assertEquals("employer", response.getRole());
        verify(userRepository, times(1)).findByEmail(email);
        verify(employerRepository, times(1)).findById(1L);
    }

    @Test
    void testLogin_InvalidCredentials() {
        // Arrange
        String email = "invalid@test.com";
        String password = "password";

        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> authService.login(email, password));
        assertEquals("Invalid credentials", exception.getMessage());
        verify(userRepository, times(1)).findByEmail(email);
    }

    @Test
    void testCreateToken() throws Exception {
        // Arrange
        String email = "test@test.com";

        // Accesează cheia secretă din AuthService prin reflexie
        java.lang.reflect.Field secretKeyField = AuthService.class.getDeclaredField("secretKey");
        secretKeyField.setAccessible(true);
        SecretKey secretKey = (SecretKey) secretKeyField.get(authService);

        // Act
        java.lang.reflect.Method method = AuthService.class.getDeclaredMethod("createToken", String.class);
        method.setAccessible(true); // Permite accesul la metoda privată
        String token = (String) method.invoke(authService, email);

        // Assert
        assertNotNull(token);
        JwtParser parser = Jwts.parserBuilder().setSigningKey(secretKey).build();
        assertEquals(email, parser.parseClaimsJws(token).getBody().getSubject());
    }


}
