package com.example.jobsnap.entity;

public class CVTemplate implements Cloneable {
    private String name;
    private String templateData;

    // Constructori, getters și setters

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
}
