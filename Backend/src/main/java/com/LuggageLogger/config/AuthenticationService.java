package com.LuggageLogger.config;

import com.LuggageLogger.controller.AuthenticationRequest;
import com.LuggageLogger.controller.AuthenticationResponse;
import com.LuggageLogger.controller.RegisterRequest;
import com.LuggageLogger.model.Role;
import com.LuggageLogger.model.User;
import com.LuggageLogger.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        var user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        repository.save(user);

        var jwtToken = jwtService.generateToken(user);
        var expiresAt = jwtService.extractExpiration(jwtToken);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .expiresAt(expiresAt)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        var user = repository.findByUsername(request.getUsername())
                .orElseThrow(
                        () -> new RuntimeException("User not found")
                );

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .expiresAt(jwtService.extractExpiration(jwtToken))
                .build();
    }

}
