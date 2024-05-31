package com.LuggageLogger.api.config;

import com.LuggageLogger.config.JwtService;
import io.jsonwebtoken.Claims;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

public class JwtServiceTests {

    private JwtService jwtService;

    @BeforeEach
    public void setUp() {
        jwtService = new JwtService();
    }

    @Test
    public void generateToken_ReturnsValidToken() {
        UserDetails userDetails = new User("test-username", "test-password", Collections.emptyList());
        String token = jwtService.generateToken(userDetails);
        assertNotNull(token);
    }

    @Test
    public void generateTokenWithCustomClaims_ReturnsValidToken() {
        UserDetails userDetails = new User("test-username", "test-password", Collections.emptyList());
        Map<String, Object> claims = new HashMap<>();
        claims.put("customClaim", "customValue");
        String token = jwtService.generateToken(claims, userDetails);
        assertNotNull(token);
    }

    @Test
    public void extractUsername_ReturnsCorrectUsername() {
        UserDetails userDetails = new User("test-username", "test-password", Collections.emptyList());
        String token = jwtService.generateToken(userDetails);
        String username = jwtService.extractUsername(token);
        assertEquals("test-username", username);
    }

    @Test
    public void isTokenValid_ReturnsTrueForValidToken() {
        UserDetails userDetails = new User("test-username", "test-password", Collections.emptyList());
        String token = jwtService.generateToken(userDetails);
        assertTrue(jwtService.isTokenValid(token, userDetails));
    }
}