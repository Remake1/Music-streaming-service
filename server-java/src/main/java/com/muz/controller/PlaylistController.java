package com.muz.controller;

import com.muz.document.PlaylistDocument;
import com.muz.dto.CreatePlaylistDto;
import com.muz.security.JwtPrincipal;
import com.muz.service.PlaylistService;
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
@RequestMapping("/playlists")
@RequiredArgsConstructor
@Tag(name = "Playlists")
public class PlaylistController {

    private final PlaylistService playlistService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Create playlist", security = @SecurityRequirement(name = "bearerAuth"))
    public PlaylistDocument create(
            @RequestPart("name") String name,
            @RequestPart("picture") MultipartFile picture,
            @AuthenticationPrincipal JwtPrincipal principal) {
        CreatePlaylistDto dto = new CreatePlaylistDto();
        dto.setName(name);
        return playlistService.create(dto, principal.getId(), principal.getName(), picture);
    }

    @GetMapping
    @Operation(summary = "Get current user's playlists", security = @SecurityRequirement(name = "bearerAuth"))
    public List<PlaylistDocument> getUserPlaylists(@AuthenticationPrincipal JwtPrincipal principal) {
        return playlistService.getByUser(principal.getId());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get playlist by ID (owner only)", security = @SecurityRequirement(name = "bearerAuth"))
    public Map<String, Object> getOne(@PathVariable String id) {
        return playlistService.getOne(id);
    }

    @GetMapping("/anon/{id}")
    @Operation(summary = "Get public playlist (no auth required)")
    public Map<String, Object> getPublic(@PathVariable String id) {
        return playlistService.getOne(id);
    }

    @PutMapping("/{id}/{songId}")
    @Operation(summary = "Add song to playlist", security = @SecurityRequirement(name = "bearerAuth"))
    public PlaylistDocument addSong(@PathVariable String id, @PathVariable String songId) {
        return playlistService.addSong(id, songId);
    }

    @PatchMapping("/{id}")
    @Operation(summary = "Make playlist public", security = @SecurityRequirement(name = "bearerAuth"))
    public PlaylistDocument makePublic(@PathVariable String id) {
        return playlistService.makePublic(id);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete playlist", security = @SecurityRequirement(name = "bearerAuth"))
    public Map<String, String> delete(@PathVariable String id) {
        return Map.of("id", playlistService.delete(id));
    }
}
