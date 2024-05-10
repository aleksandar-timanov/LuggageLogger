package com.LuggageLogger.api.config;

import com.LuggageLogger.config.AuthenticationService;
import com.LuggageLogger.config.JwtService;
import com.LuggageLogger.controller.AuthenticationRequest;
import com.LuggageLogger.controller.AuthenticationResponse;
import com.LuggageLogger.controller.RegisterRequest;
import com.LuggageLogger.repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.LuggageLogger.model.Role;
import com.LuggageLogger.model.User;

import java.util.Optional;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class AuthenticationServiceTests {

    @Mock
    private UserRepository userRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private JwtService jwtService;
    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    AuthenticationService authenticationService;

    @Test
public void AuthenticationService_Register_ReturnsAuthenticationResponse() {
        //Arrange
        when(passwordEncoder.encode(Mockito.anyString())).thenReturn("test-password");
        User user = User.builder()
                .username("test-username")
                .email("test-email@email.com")
                .password("test-password")
                .role(Role.USER)
                .build();
        RegisterRequest registerRequest = RegisterRequest.builder()
                .username("test-username")
                .email("test-email@email.com")
                .password(passwordEncoder.encode("test-password"))
                .build();

        when(userRepository.save(Mockito.any(User.class))).thenReturn(user);
        when(jwtService.generateToken(Mockito.any(User.class))).thenReturn("test-token");
        when(userRepository.findByUsername(Mockito.anyString())).thenReturn(Optional.ofNullable(user));
        //Act
        AuthenticationResponse resp = authenticationService.register(registerRequest);

        //Assert
        Assertions.assertThat(userRepository.findByUsername("username").isPresent() ?
                userRepository.findByUsername("username").get().getUsername() : null)
                .isEqualTo("test-username");

        Assertions.assertThat(resp.getToken()).isEqualTo("test-token");

    }

    @Test
    public void AuthenticationService_Register_ThrowsExceptionWhenUserAlreadyExists() {
        //Arrange
        User user = User.builder()
                .username("test-username")
                .email("test-email@email.com")
                .password("test-password")
                .role(Role.USER)
                .build();
        RegisterRequest registerRequest = RegisterRequest.builder()
                .username("test-username")
                .email("test-email@email.com")
                .password("test-password")
                .build();

        when(userRepository.save(Mockito.any(User.class))).thenThrow(new RuntimeException("User already exists"));

        //Assert
        Assertions.assertThatThrownBy(() -> authenticationService.register(registerRequest))
                .isInstanceOf(Exception.class)
                .hasMessage("User already exists");
    }


    @Test
    public void AuthenticationService_Login_ReturnsAuthenticationResponse() {
        //Arrange
        User user = User.builder()
                .username("test-username")
                .email("test-email@email.com")
                .password("test-password")
                .role(Role.USER)
                .build();
        AuthenticationRequest registerRequest = AuthenticationRequest.builder()
                .username("test-username")
                .password("test-password")
                .build();

        when(userRepository.findByUsername(Mockito.anyString())).thenReturn(Optional.ofNullable(user));
        when(jwtService.generateToken(Mockito.any(User.class))).thenReturn("test-token");
        when(authenticationManager.authenticate(Mockito.any(UsernamePasswordAuthenticationToken.class))).thenReturn(null);

        //Act
        AuthenticationResponse resp = authenticationService.authenticate(registerRequest);

        //Assert
        Mockito.verify(authenticationManager, Mockito.times(1)).authenticate(Mockito.any(UsernamePasswordAuthenticationToken.class));
        Mockito.verify(userRepository, Mockito.times(1)).findByUsername(Mockito.anyString());
        Assertions.assertThat(resp.getToken()).isEqualTo("test-token");
    }

    @Test
    public void AuthenticationService_Login_ThrowsExceptionWhenUserNotFound() {
        //Arrange
        AuthenticationRequest registerRequest = AuthenticationRequest.builder()
                .username("test-username")
                .password("test-password")
                .build();

        when(userRepository.findByUsername(Mockito.anyString())).thenReturn(Optional.empty());

        //Act
        //Assert
        Assertions.assertThatThrownBy(() -> authenticationService.authenticate(registerRequest))
                .isInstanceOf(Exception.class)
                .hasMessage("User not found");
    }
}
