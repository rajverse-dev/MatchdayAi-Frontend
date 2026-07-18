package com.matchdayai.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtService {

    // Generate a secure secret key once for development.
    private static final SecretKey SECRET_KEY =
            Keys.hmacShaKeyFor(
                    "matchdayaisupersecretkeymatchdayaisupersecretkey"
                            .getBytes());

    // Token valid for 24 hours
    private static final long EXPIRATION = 1000 * 60 * 60 * 24;

    /**
     * Generate JWT Token
     */
    public String generateToken(String email, String role) {

        return Jwts.builder()
                .subject(email)
                .claim("role", role)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(SECRET_KEY)
                .compact();
    }

    /**
     * Extract all claims
     */
    public Claims extractClaims(String token) {

        return Jwts.parser()
                .verifyWith(SECRET_KEY)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    /**
     * Extract Email
     */
    public String extractEmail(String token) {

        return extractClaims(token).getSubject();
    }

    /**
     * Extract Role
     */
    public String extractRole(String token) {

        return extractClaims(token)
                .get("role", String.class);
    }

    /**
     * Check Token Expiry
     */
    public boolean isTokenExpired(String token) {

        return extractClaims(token)
                .getExpiration()
                .before(new Date());
    }

    /**
     * Validate Token
     */
    public boolean isValid(String token, String email) {

        return extractEmail(token).equals(email)
                && !isTokenExpired(token);
    }
}