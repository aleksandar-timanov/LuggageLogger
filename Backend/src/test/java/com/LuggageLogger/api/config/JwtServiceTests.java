package com.LuggageLogger.api.config;

import com.LuggageLogger.config.JwtService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
public class JwtServiceTests {

    @Autowired
    private JwtService jwtService;

    @Test
    public void JwtService_GenerateToken_ReturnsToken() {
        //Arrange
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add((GrantedAuthority) () -> "ROLE_USER");
        UserDetails userDetails = new org.springframework.security.core.userdetails.User("test-username", "test-password", authorities);
        //Act
        String token = jwtService.generateToken(userDetails);

        //Assert
        assertNotNull(token);
    }
}
