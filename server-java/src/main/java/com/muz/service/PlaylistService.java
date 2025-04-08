package com.muz.service;

import com.muz.document.PlaylistDocument;
import com.muz.document.SongDocument;
import com.muz.dto.CreatePlaylistDto;
import com.muz.exception.ApiException;
import com.muz.repository.PlaylistRepository;
import com.muz.repository.SongRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PlaylistService {

    private final PlaylistRepository playlistRepository;
    private final SongRepository songRepository;
    private final FileStorageService fileStorage;

    public PlaylistDocument create(CreatePlaylistDto dto, String userId, String userName, MultipartFile picture) {
        String picturePath = fileStorage.store("image", picture);

        PlaylistDocument playlist = new PlaylistDocument();
        playlist.setName(dto.getName());
        playlist.setUser(userId);
        playlist.setUserName(userName);
        playlist.setPicture(picturePath);
        playlist.setPub(false);
        return playlistRepository.save(playlist);
    }

    public Map<String, Object> getOne(String id) {
        PlaylistDocument playlist = playlistRepository.findById(id)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Playlist not found"));
        List<SongDocument> songs = songRepository.findAllById(playlist.getSongs());
        return Map.of("playlist", playlist, "songs", songs);
    }

    public PlaylistDocument addSong(String playlistId, String songId) {
        PlaylistDocument playlist = playlistRepository.findById(playlistId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Playlist not found"));
        songRepository.findById(songId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Song not found"));

        if (!playlist.getSongs().contains(songId)) {
            playlist.getSongs().add(songId);
        }
        return playlistRepository.save(playlist);
    }

    public String delete(String id) {
        playlistRepository.findById(id)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Playlist not found"));
        playlistRepository.deleteById(id);
        return id;
    }

    public List<PlaylistDocument> getByUser(String userId) {
        return playlistRepository.findByUser(userId);
    }

    public PlaylistDocument makePublic(String id) {
        PlaylistDocument playlist = playlistRepository.findById(id)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Playlist not found"));
        playlist.setPub(true);
        return playlistRepository.save(playlist);
    }
}
