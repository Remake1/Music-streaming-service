package com.muz.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Schema(description = "Registration request")
public class CreateUserDto {

    @Email
    @Schema(example = "user@example.com")
    private String email;

    @Size(min = 6, max = 32)
    @Schema(example = "password123")
    private String password;

    @Size(min = 3, max = 15)
    @Schema(example = "johndoe")
    private String username;
}
