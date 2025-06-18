package com.muz.controller;

import com.muz.document.CommentDocument;
import com.muz.document.SongDocument;
import com.muz.dto.CreateCommentDto;
import com.muz.dto.CreateSongDto;
import com.muz.security.JwtPrincipal;
import com.muz.service.SongService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/songs")
@RequiredArgsConstructor
@Tag(name = "Songs")
public class SongController {

    private final SongService songService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Upload a song", security = @SecurityRequirement(name = "bearerAuth"))
    public SongDocument create(
            @RequestPart("name") String name,
            @RequestPart("artist") String artist,
            @RequestPart("text") String text,
            @RequestPart("picture") MultipartFile picture,
            @RequestPart("audio") MultipartFile audio,
            @AuthenticationPrincipal JwtPrincipal principal) {
        CreateSongDto dto = new CreateSongDto();
        dto.setName(name);
        dto.setArtist(artist);
        dto.setText(text);
        return songService.create(dto, principal.getId(), picture, audio);
    }

    @GetMapping
    @Operation(summary = "Get all songs with pagination and optional filter (new/aph/art)")
    public List<SongDocument> getAll(
            @RequestParam(defaultValue = "10") int count,
            @RequestParam(defaultValue = "0") int offset,
            @RequestParam(defaultValue = "") String filter) {
        return songService.getAll(count, offset, filter);
    }

    @GetMapping("/user")
    @Operation(summary = "Get user's songs not in any album", security = @SecurityRequirement(name = "bearerAuth"))
    public List<SongDocument> getUserSongs(@RequestParam String id) {
        return songService.getAllUserSongs(id);
    }

    @GetMapping("/search")
    @Operation(summary = "Search songs by name or artist")
    public List<SongDocument> search(@RequestParam String search) {
        return songService.search(search);
    }

    @GetMapping("/number")
    @Operation(summary = "Get total song count")
    public Map<String, Long> getCount() {
        return Map.of("count", songService.getCount());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get song by ID with comments")
    public Map<String, Object> getOne(@PathVariable String id) {
        return songService.getOne(id);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a song", security = @SecurityRequirement(name = "bearerAuth"))
    public Map<String, String> delete(@PathVariable String id) {
        return Map.of("id", songService.delete(id));
    }

    @PostMapping("/comment")
    @Operation(summary = "Add comment to a song")
    public CommentDocument addComment(@Valid @RequestBody CreateCommentDto dto) {
        return songService.addComment(dto);
    }

    @PostMapping("/listen/{id}")
    @Operation(summary = "Increment listen counter")
    public void listen(@PathVariable String id) {
        songService.listen(id);
    }
}
