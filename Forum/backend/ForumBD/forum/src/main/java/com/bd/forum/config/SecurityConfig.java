package com.bd.forum.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(Customizer.withDefaults()) // Włączenie CORS z domyślną konfiguracją
            .csrf(csrf -> csrf.disable()) // Wyłączenie CSRF (jeśli konieczne)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/users/**").permitAll() 
                .requestMatchers("/posts/**").permitAll()
                .anyRequest().authenticated() // Wszystkie inne endpointy wymagają uwierzytelnienia
            );
        return http.build();
    }
}
