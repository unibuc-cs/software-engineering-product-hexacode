package com.example.jobsnap.entity;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class CVTemplate implements Cloneable {
    private String name;
    private String templateData;
    @Id
    private Long id;



    @Override
    public Object clone() throws CloneNotSupportedException {
        return super.clone(); // Clonare simplă
    }

    // Getters și setters pentru name și templateData
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTemplateData() {
        return templateData;
    }

    public void setTemplateData(String templateData) {
        this.templateData = templateData;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
