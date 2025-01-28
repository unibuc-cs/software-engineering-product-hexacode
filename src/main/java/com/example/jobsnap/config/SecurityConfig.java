package com.example.jobsnap.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // Definim un PasswordEncoder pentru a gestiona parolele
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();  // Hash-uim parolele cu BCrypt
    }

    // Configurăm SecurityFilterChain pentru a defini regulile de acces
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())  // Dezactivăm CSRF (poți să îl configurezi conform necesităților)
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers("/auth/login", "/auth/signup").permitAll()  // Permitem accesul neautentificat la login și signup
                        .anyRequest().authenticated()  // Restul endpoint-urilor necesită autentificare
                );

        return http.build();  // Returnăm configurarea finală
    }
}
