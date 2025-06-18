package com.muz.controller;

import com.muz.document.AlbumDocument;
import com.muz.dto.CreateAlbumDto;
import com.muz.security.JwtPrincipal;
import com.muz.service.AlbumService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/album")
@RequiredArgsConstructor
@Tag(name = "Albums")
public class AlbumController {

    private final AlbumService albumService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Create album", security = @SecurityRequirement(name = "bearerAuth"))
    public AlbumDocument create(
            @RequestPart("name") String name,
            @RequestPart("author") String author,
            @RequestPart("picture") MultipartFile picture,
            @AuthenticationPrincipal JwtPrincipal principal) {
        CreateAlbumDto dto = new CreateAlbumDto();
        dto.setName(name);
        dto.setAuthor(author);
        return albumService.create(dto, principal.getId(), picture);
    }

    @GetMapping
    @Operation(summary = "Get all albums with pagination")
    public List<AlbumDocument> getAll(
            @RequestParam(defaultValue = "10") int count,
            @RequestParam(defaultValue = "0") int offset) {
        return albumService.getAll(count, offset);
    }

    @GetMapping("/count")
    @Operation(summary = "Get total album count")
    public Map<String, Long> getCount() {
        return Map.of("count", albumService.getCount());
    }

    @GetMapping("/search")
    @Operation(summary = "Search albums by name or author")
    public List<AlbumDocument> search(@RequestParam String query) {
        return albumService.search(query);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get album by ID with songs")
    public Map<String, Object> getOne(@PathVariable String id) {
        return albumService.getOne(id);
    }

    @PutMapping("/{id}/{songId}")
    @Operation(summary = "Add song to album", security = @SecurityRequirement(name = "bearerAuth"))
    public AlbumDocument addSong(@PathVariable String id, @PathVariable String songId) {
        return albumService.addSong(id, songId);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete album", security = @SecurityRequirement(name = "bearerAuth"))
    public Map<String, String> delete(@PathVariable String id) {
        return Map.of("id", albumService.delete(id));
    }
}
