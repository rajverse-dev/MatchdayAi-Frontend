package com.matchdayai.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.matchdayai.security.JwtAuthenticationFilter;

@EnableMethodSecurity
@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
                // Enable CORS configuration
                .cors(cors -> {})

                // Disable CSRF because we use JWT
                .csrf(csrf -> csrf.disable())

                // JWT applications should not use server sessions
                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                // API access rules
                .authorizeHttpRequests(auth -> auth

                        // Register and login are public
                        .requestMatchers("/api/auth/**")
                        .permitAll()

                        // Temporarily public for connection testing
                        .requestMatchers("/api/dashboard/**")
                        .permitAll()

                        .requestMatchers("/api/crowd/**")
                        .permitAll()

                        .requestMatchers("/api/queues/**")
                        .permitAll()

                        .requestMatchers("/api/transport/**")
                        .permitAll()

                        .requestMatchers("/api/emergency", "/api/emergency/**")
                        .permitAll()

                                // Admin APIs
                        .requestMatchers("/api/admin/**")
                        .hasRole("ADMIN")

                                 // Operator APIs
                        .requestMatchers("/api/operator/**")
                        .hasAnyRole("ADMIN", "OPERATOR")

                          // Visitor APIs
                        .requestMatchers("/api/visitor/**")
                        .hasAnyRole("ADMIN", "OPERATOR", "VISITOR")
                        
                        .requestMatchers("/api/navigation/**")
                        .permitAll()

                        .requestMatchers("/api/navigation/**")
                        .permitAll()  
                        
                        .requestMatchers( "/api/chat","/api/chat/**")
                        .permitAll()

                        .requestMatchers("/api/recommendations")
                        .permitAll()

                        // All other APIs require JWT
                        .anyRequest()
                        .authenticated()
                )

                // Run JWT filter before Spring's authentication filter
                .addFilterBefore(
                        jwtFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}
