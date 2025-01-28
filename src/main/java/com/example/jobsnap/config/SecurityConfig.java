package com.example.jobsnap.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // Definim un PasswordEncoder pentru a gestiona parolele
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();  // Hash-uim parolele cu BCrypt
    }

    // Configurăm SecurityFilterChain pentru a defini regulile de acces și CORS
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Activează CORS
                .csrf(csrf -> csrf.disable())  // Dezactivăm CSRF (opțional)
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers("/auth/login", "/auth/signup").permitAll()  // Permitem accesul neautentificat la login și signup
                        .requestMatchers("/api/**").permitAll() // Permitem accesul pentru toate endpoint-urile API
                        .anyRequest().authenticated()  // Restul endpoint-urilor necesită autentificare
                );

        return http.build();  // Returnăm configurarea finală
    }

    // Configurăm sursa CORS
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000")); // Permite accesul din frontend
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")); // Permite metodele HTTP specifice
        configuration.setAllowedHeaders(List.of("*")); // Permite toate anteturile
        configuration.setAllowCredentials(true); // Permite cookie-uri sau alte credențiale
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
