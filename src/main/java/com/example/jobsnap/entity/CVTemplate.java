package com.example.jobsnap.entity;

import java.util.List;

public class CVTemplate {
    private String templateId;
    private String name;
    private String layout;
    private List<String> fields;

    public CVTemplate(String templateId, String name, String layout, List<String> fields) {
        this.templateId = templateId;
        this.name = name;
        this.layout = layout;
        this.fields = fields;
    }

    public String getTemplateId() {
        return templateId;
    }

    public void setTemplateId(String templateId) {
        this.templateId = templateId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLayout() {
        return layout;
    }

    public void setLayout(String layout) {
        this.layout = layout;
    }

    public List<String> getFields() {
        return fields;
    }

    public void setFields(List<String> fields) {
        this.fields = fields;
    }
}