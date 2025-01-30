package com.example.jobsnap.integration;

import com.example.jobsnap.entity.CV;
import com.example.jobsnap.repository.CVRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class CVIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private CVRepository cvRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testSaveCvIntegration() throws Exception {
        // Creăm un obiect CV pentru testare
        CV cv = new CV();
        cv.setFullName("Popescu Alex");
        cv.setEmail("alex.popescu@example.com");
        cv.setPhone("0712345678");
        cv.setEducation("Universitatea București, Informatica");
        cv.setExperience("Internship la ABC Tech");
        cv.setSkills("Java, Spring Boot, React");
        cv.setProjects("Proiectul X, Proiectul Y");
        cv.setSummary("Un profesionist pasionat de tehnologie.");
        cv.setTechnologies("Java, SQL, HTML");
        cv.setCertifications("Certificat Java");
        cv.setTools("Eclipse, IntelliJ");
        cv.setPortfolio("www.portofoliu.ro");
        cv.setClinicalExperience("Asistent medical stagiar");
        cv.setDegree("Licență în Informatică");
        cv.setAwards("Premiul I la Olimpiada de Informatică");
        cv.setCvType("Software Developer");
        cv.setUserId(1L);
        cv.setUploaded(1);

        // Convertim obiectul CV în JSON
        String cvJson = objectMapper.writeValueAsString(cv);

        // Trimitere request POST pentru a salva CV-ul
        mockMvc.perform(post("/api/cv")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(cvJson))
                .andExpect(status().isCreated()) // Verificăm că răspunsul este 201 Created
                .andExpect(jsonPath("$.fullName").value("Popescu Alex"))
                .andExpect(jsonPath("$.email").value("alex.popescu@example.com"));

        // Verificăm dacă CV-ul a fost salvat în baza de date
        var savedCVs = cvRepository.findByUserId(1L);
        assertThat(savedCVs).isNotEmpty();
        assertThat(savedCVs.get(0).getFullName()).isEqualTo("Popescu Alex");
        assertThat(savedCVs.get(0).getEmail()).isEqualTo("alex.popescu@example.com");
    }
}
