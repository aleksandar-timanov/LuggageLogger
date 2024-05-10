package com.LuggageLogger.api.config;

import com.LuggageLogger.config.JwtAuthenticationFilter;
import com.LuggageLogger.config.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class JwtAuthenticationFilterTests {
    @Mock
    private JwtService jwtService;
    @Mock
    private UserDetailsService userDetailsService;

    @InjectMocks
    JwtAuthenticationFilter jwtAuthenticationFilter;

    @Test
public void doFilterInternal_ShouldContinueFilterChain_WhenAuthHeaderIsNull() throws ServletException, IOException, IOException {
    // Mocks
    HttpServletRequest request = mock(HttpServletRequest.class);
    HttpServletResponse response = mock(HttpServletResponse.class);
    FilterChain filterChain = mock(FilterChain.class);

    // When
    when(request.getHeader("Authorization")).thenReturn(null);

    // Call
    jwtAuthenticationFilter.doFilterInternal(request, response, filterChain);

    // Verify
    verify(filterChain, times(1)).doFilter(request, response);
}

@Test
public void doFilterInternal_ShouldContinueFilterChain_WhenAuthHeaderDoesNotStartWithBearer() throws ServletException, IOException {
    // Mocks
    HttpServletRequest request = mock(HttpServletRequest.class);
    HttpServletResponse response = mock(HttpServletResponse.class);
    FilterChain filterChain = mock(FilterChain.class);

    // When
    when(request.getHeader("Authorization")).thenReturn("Invalid header");

    // Call
    jwtAuthenticationFilter.doFilterInternal(request, response, filterChain);

    // Verify
    verify(filterChain, times(1)).doFilter(request, response);
}

@Test
public void doFilterInternal_ShouldSetAuthentication_WhenTokenIsValid() throws ServletException, IOException {
    // Mocks
    HttpServletRequest request = mock(HttpServletRequest.class);
    HttpServletResponse response = mock(HttpServletResponse.class);
    FilterChain filterChain = mock(FilterChain.class);
    UserDetails userDetails = mock(UserDetails.class);

    // When
    when(request.getHeader("Authorization")).thenReturn("Bearer validToken");
    when(jwtService.extractUsername("validToken")).thenReturn("testUser");
    when(userDetailsService.loadUserByUsername("testUser")).thenReturn(userDetails);
    when(jwtService.isTokenValid("validToken", userDetails)).thenReturn(true);

    // Call
    jwtAuthenticationFilter.doFilterInternal(request, response, filterChain);

    // Verify
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    assertNotNull(authentication);
    assertEquals(userDetails, authentication.getPrincipal());
}

    @Test
    public void doFilterInternal_ShouldNotSetAuthentication_WhenTokenIsInvalid() throws ServletException, IOException {
        // Mocks
        HttpServletRequest request = mock(HttpServletRequest.class);
        HttpServletResponse response = mock(HttpServletResponse.class);
        FilterChain filterChain = mock(FilterChain.class);

        // When
        when(request.getHeader("Authorization")).thenReturn("Bearer invalidToken");
        when(jwtService.extractUsername("invalidToken")).thenThrow(new RuntimeException("Invalid token"));

        // Call
        Assertions.assertThrows(RuntimeException.class, () -> jwtAuthenticationFilter.doFilterInternal(request, response, filterChain));

        // Verify
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        assertNull(authentication);

    }

}
