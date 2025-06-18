package com.muz.service;

import com.muz.document.UserDocument;
import com.muz.dto.CreateUserDto;
import com.muz.dto.LoginUserDto;
import com.muz.dto.TokenResponseDto;
import com.muz.exception.ApiException;
import com.muz.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public TokenResponseDto login(LoginUserDto dto) {
        UserDocument user = userService.getByEmail(dto.getEmail());
        if (user == null || !passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new ApiException(HttpStatus.UNAUTHORIZED, "incorrect email or password");
        }
        return new TokenResponseDto(jwtUtil.generateToken(user.getId(), user.getUsername(), user.getEmail()));
    }

    public TokenResponseDto registration(CreateUserDto dto) {
        if (userService.getByEmail(dto.getEmail()) != null) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "user with this email already exists");
        }
        if (userService.getByUsername(dto.getUsername()) != null) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "user with this name already exists");
        }
        dto.setPassword(passwordEncoder.encode(dto.getPassword()));
        UserDocument user = userService.createUser(dto);
        return new TokenResponseDto(jwtUtil.generateToken(user.getId(), user.getUsername(), user.getEmail()));
    }
}
