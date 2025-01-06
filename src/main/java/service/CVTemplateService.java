package service;

import com.example.jobsnap.entity.CVTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CVTemplateService {
    public List<CVTemplate> getAllCVTemplates() {
        return null;
    }

    public Optional<CVTemplate> getCVTemplateById(Long id) {
        return null;
    }

    public CVTemplate saveCVTemplate(CVTemplate cvTemplate) {
        return cvTemplate;
    }

    public void deleteCVTemplate(Long id) {
    }
    // Implementarea metodelor (getAllCVTemplates, getCVTemplateById, etc.)
}
