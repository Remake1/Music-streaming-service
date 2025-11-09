package com.muz.controller;

import com.muz.service.FileStorageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;

@RestController
@RequiredArgsConstructor
@Tag(name = "Files")
public class FileController {

    private final FileStorageService fileStorage;

    @GetMapping("/image/{name}")
    @Operation(summary = "Stream an uploaded image from object storage")
    public ResponseEntity<InputStreamResource> getImage(@PathVariable String name) {
        return serve("image/" + name);
    }

    @GetMapping("/audio/{name}")
    @Operation(summary = "Stream an uploaded audio file from object storage")
    public ResponseEntity<InputStreamResource> getAudio(@PathVariable String name) {
        return serve("audio/" + name);
    }

    private ResponseEntity<InputStreamResource> serve(String key) {
        ResponseInputStream<GetObjectResponse> stream = fileStorage.load(key);
        GetObjectResponse meta = stream.response();

        MediaType contentType = meta.contentType() != null
                ? MediaType.parseMediaType(meta.contentType())
                : MediaType.APPLICATION_OCTET_STREAM;

        return ResponseEntity.ok()
                .contentType(contentType)
                .contentLength(meta.contentLength())
                .header(HttpHeaders.CACHE_CONTROL, "public, max-age=31536000")
                .body(new InputStreamResource(stream));
    }
}
