package com.muz.service;

import com.muz.document.UserDocument;
import com.muz.dto.CreateUserDto;
import com.muz.exception.ApiException;
import com.muz.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserDocument createUser(CreateUserDto dto) {
        UserDocument user = new UserDocument();
        user.setEmail(dto.getEmail());
        user.setUsername(dto.getUsername());
        user.setPassword(dto.getPassword());
        return userRepository.save(user);
    }

    public List<UserDocument> getAllUsers() {
        return userRepository.findAll();
    }

    public UserDocument getById(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "User not found"));
    }

    public UserDocument getByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public UserDocument getByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }
}
