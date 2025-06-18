package com.muz.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Schema(description = "Create playlist request")
public class CreatePlaylistDto {

    @Size(min = 2, max = 24)
    private String name;
}
