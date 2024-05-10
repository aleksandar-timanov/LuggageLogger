package com.LuggageLogger.api.config;

import com.LuggageLogger.config.ApplicationConfig;
import com.LuggageLogger.model.User;
import com.LuggageLogger.repository.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Optional;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ApplicationConfigTests {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ApplicationConfig applicationConfig;

    @Test
    public void ApplicationConfig_UserDetailsService_ReturnsUserObjectFromUsername() {
        //Arrange
        String username = "test-name";
        User userToCompareWith = User
                .builder()
                .username(username)
                .build();

        // Mock repository
        when(userRepository.findByUsername(Mockito.anyString())).thenReturn(Optional.ofNullable(userToCompareWith));

        //Act
        UserDetailsService userDetailsService = applicationConfig.userDetailsService();
        UserDetails userFromUserDetailsService = userDetailsService.loadUserByUsername(username);

        //Assert
        Assertions.assertEquals(userToCompareWith, userFromUserDetailsService);
    }

    @Test
    public void ApplicationConfig_UserDetailsService_ThrowsExceptionWhenUserNotFound() {
        //Arrange
        String username = "test-name";

        // Mock repository
        when(userRepository.findByUsername(Mockito.anyString())).thenReturn(Optional.empty());

        //Act
        UserDetailsService userDetailsService = applicationConfig.userDetailsService();

        //Assert
        Assertions.assertThrows(Exception.class, () -> userDetailsService.loadUserByUsername(username));
    }
    
    @Test
    public void ApplicationConfig_AuthenticationProvider_ReturnsDaoAuthenticationProvider() {
        //Act
        var authenticationProvider = applicationConfig.authenticationProvider();

        //Assert
        Assertions.assertNotNull(authenticationProvider);
    }

    @Test
    public void ApplicationConfig_AuthenticationManager_CallsGetAuthenticationManager() throws Exception {
        // Arrange
        AuthenticationConfiguration mockAuthenticationConfiguration = Mockito.mock(AuthenticationConfiguration.class);

        // Act
        applicationConfig.authenticationManager(mockAuthenticationConfiguration);

        // Assert
        //Mockito.verify is used to verify that a method was called but doesn't check the return value
        Mockito.verify(mockAuthenticationConfiguration).getAuthenticationManager();
    }

    @Test
    public void ApplicationConfig_PasswordEncoder_ReturnsBCryptPasswordEncoder() {
        //Act
        var passwordEncoder = applicationConfig.passwordEncoder();

        //Assert
        Assertions.assertNotNull(passwordEncoder);
    }
}
