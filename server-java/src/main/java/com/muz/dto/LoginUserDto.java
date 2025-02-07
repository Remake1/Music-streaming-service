package com.muz.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "Login request")
public class LoginUserDto {
    private String email;
    private String password;
}
