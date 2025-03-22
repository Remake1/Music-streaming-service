package com.muz.service;

import com.muz.document.AlbumDocument;
import com.muz.document.SongDocument;
import com.muz.document.UserDocument;
import com.muz.dto.CreateAlbumDto;
import com.muz.exception.ApiException;
import com.muz.repository.AlbumRepository;
import com.muz.repository.SongRepository;
import com.muz.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AlbumService {

    private final AlbumRepository albumRepository;
    private final SongRepository songRepository;
    private final UserRepository userRepository;
    private final FileStorageService fileStorage;

    public AlbumDocument create(CreateAlbumDto dto, String userId, MultipartFile picture) {
        String picturePath = fileStorage.store("image", picture);

        AlbumDocument album = new AlbumDocument();
        album.setName(dto.getName());
        album.setAuthor(dto.getAuthor());
        album.setPicture(picturePath);
        album.setUser(userId);
        AlbumDocument saved = albumRepository.save(album);

        UserDocument user = userRepository.findById(userId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "User not found"));
        user.getAlbums().add(saved.getId());
        userRepository.save(user);

        return saved;
    }

    public List<AlbumDocument> getAll(int count, int offset) {
        return albumRepository.findAll(PageRequest.of(offset / count, count)).getContent();
    }

    public Map<String, Object> getOne(String id) {
        AlbumDocument album = albumRepository.findById(id)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Album not found"));
        List<SongDocument> songs = songRepository.findAllById(album.getSongs());
        return Map.of("album", album, "songs", songs);
    }

    public String delete(String id) {
        AlbumDocument album = albumRepository.findById(id)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Album not found"));

        for (String songId : album.getSongs()) {
            songRepository.findById(songId).ifPresent(song -> {
                song.setAlbum(null);
                songRepository.save(song);
            });
        }

        fileStorage.delete(album.getPicture());
        albumRepository.deleteById(id);
        return id;
    }

    public AlbumDocument addSong(String albumId, String songId) {
        AlbumDocument album = albumRepository.findById(albumId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Album not found"));
        SongDocument song = songRepository.findById(songId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Song not found"));

        if (!album.getSongs().contains(songId)) {
            album.getSongs().add(songId);
        }
        song.setAlbum(albumId);
        albumRepository.save(album);
        songRepository.save(song);
        return album;
    }

    public List<AlbumDocument> search(String query) {
        return albumRepository.searchByNameOrAuthor(query);
    }

    public long getCount() {
        return albumRepository.count();
    }
}
