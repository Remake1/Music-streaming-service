package com.muz.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "Create album request")
public class CreateAlbumDto {
    private String name;
    private String author;
}
