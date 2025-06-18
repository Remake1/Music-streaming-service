package com.muz.controller;

import com.muz.dto.CreateUserDto;
import com.muz.dto.LoginUserDto;
import com.muz.dto.TokenResponseDto;
import com.muz.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "Auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    @Operation(summary = "Login with email and password")
    public TokenResponseDto login(@RequestBody LoginUserDto dto) {
        return authService.login(dto);
    }

    @PostMapping("/reg")
    @Operation(summary = "Register a new user")
    public TokenResponseDto register(@Valid @RequestBody CreateUserDto dto) {
        return authService.registration(dto);
    }
}
