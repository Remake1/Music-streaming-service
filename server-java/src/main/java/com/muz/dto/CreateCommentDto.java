package com.muz.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Schema(description = "Add comment request")
public class CreateCommentDto {

    @Size(min = 3, max = 15)
    private String username;

    @Size(min = 1, max = 500)
    private String text;

    private String songId;
}
