package com.muz.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Schema(description = "Create song request")
public class CreateSongDto {

    @Size(min = 2, max = 24)
    private String name;

    @Size(min = 2, max = 20)
    private String artist;

    @Size(min = 1, max = 500)
    private String text;
}
