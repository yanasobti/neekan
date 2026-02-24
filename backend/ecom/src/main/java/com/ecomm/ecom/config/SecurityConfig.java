package com.ecomm.ecom.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final ApiKeyAuthFilter apiKeyAuthFilter;

    public SecurityConfig(ApiKeyAuthFilter apiKeyAuthFilter) {
        this.apiKeyAuthFilter = apiKeyAuthFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // Use our existing CORS config
            .cors(cors -> cors.configurationSource(request -> {
                var config = new org.springframework.web.cors.CorsConfiguration();
                config.addAllowedOriginPattern("https://*.netlify.app");
                config.addAllowedOriginPattern("https://*.vercel.app");
                config.addAllowedOriginPattern("http://localhost:5173");
                config.addAllowedOriginPattern("http://localhost:3000");
                config.addAllowedMethod("*");
                config.addAllowedHeader("*");
                config.setAllowCredentials(true);
                return config;
            }))
            // Disable CSRF — stateless REST API
            .csrf(AbstractHttpConfigurer::disable)
            // Stateless sessions
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // ── Public endpoints ──────────────────────────────────────
                .requestMatchers(HttpMethod.GET,  "/api/products").permitAll()
                .requestMatchers(HttpMethod.GET,  "/api/products/{id}").permitAll()
                .requestMatchers(HttpMethod.POST, "/contact").permitAll()
                .requestMatchers(HttpMethod.GET,  "/contact/track/**").permitAll()
                // ── Admin / write endpoints require ADMIN role ────────────
                .anyRequest().hasRole("ADMIN")
            )
            // Inject API-key filter before the default username/password filter
            .addFilterBefore(apiKeyAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}


