package com.example.jobsnap.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Allow cross-origin requests from localhost:3000
        registry.addMapping("/**")  // Allows CORS for all paths
                .allowedOrigins("http://localhost:3000")  // React frontend URL
                .allowedMethods("GET", "POST", "PUT", "DELETE")  // Allowed methods
                .allowedHeaders("*");  // Allow all headers
    }
}

