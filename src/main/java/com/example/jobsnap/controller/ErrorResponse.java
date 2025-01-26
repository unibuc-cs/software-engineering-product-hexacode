package com.example.jobsnap.controller;

// DTO pentru mesajele de eroare
    public class ErrorResponse {
        private String message;

        public ErrorResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }
    }
