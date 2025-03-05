package com.muz.service;

import com.muz.document.AlbumDocument;
import com.muz.document.CommentDocument;
import com.muz.document.SongDocument;
import com.muz.document.UserDocument;
import com.muz.dto.CreateCommentDto;
import com.muz.dto.CreateSongDto;
import com.muz.exception.ApiException;
import com.muz.repository.AlbumRepository;
import com.muz.repository.CommentRepository;
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
public class SongService {

    private final SongRepository songRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final AlbumRepository albumRepository;
    private final FileStorageService fileStorage;

    public SongDocument create(CreateSongDto dto, String userId, MultipartFile picture, MultipartFile audio) {
        String picturePath = fileStorage.store("image", picture);
        String audioPath = fileStorage.store("audio", audio);

        SongDocument song = new SongDocument();
        song.setName(dto.getName());
        song.setArtist(dto.getArtist());
        song.setText(dto.getText());
        song.setPicture(picturePath);
        song.setAudio(audioPath);
        song.setUser(userId);
        SongDocument saved = songRepository.save(song);

        UserDocument user = userRepository.findById(userId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "User not found"));
        user.getSongs().add(saved.getId());
        userRepository.save(user);

        return saved;
    }

    public List<SongDocument> getAll(int count, int offset, String filter) {
        PageRequest page = PageRequest.of(offset / count, count);
        return switch (filter) {
            case "new" -> songRepository.findAllByOrderByCreatedAtDesc(page);
            case "aph" -> songRepository.findAllByOrderByNameAsc(page);
            case "art" -> songRepository.findAllByOrderByArtistAsc(page);
            default -> songRepository.findAll(page).getContent();
        };
    }

    public Map<String, Object> getOne(String id) {
        SongDocument song = songRepository.findById(id)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Song not found"));
        List<CommentDocument> comments = commentRepository.findAllByIdIn(song.getComments());
        return Map.of("song", song, "comments", comments);
    }

    public String delete(String id) {
        SongDocument song = songRepository.findById(id)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Song not found"));

        if (song.getAlbum() != null) {
            albumRepository.findById(song.getAlbum()).ifPresent(album -> {
                album.getSongs().remove(song.getId());
                albumRepository.save(album);
            });
        }

        songRepository.deleteById(id);
        fileStorage.delete(song.getAudio());
        fileStorage.delete(song.getPicture());
        return id;
    }

    public CommentDocument addComment(CreateCommentDto dto) {
        SongDocument song = songRepository.findById(dto.getSongId())
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Song not found"));

        CommentDocument comment = new CommentDocument();
        comment.setUsername(dto.getUsername());
        comment.setText(dto.getText());
        comment.setTrack(dto.getSongId());
        CommentDocument saved = commentRepository.save(comment);

        song.getComments().add(saved.getId());
        songRepository.save(song);
        return saved;
    }

    public void listen(String id) {
        SongDocument song = songRepository.findById(id)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Song not found"));
        song.setListens(song.getListens() + 1);
        songRepository.save(song);
    }

    public List<SongDocument> search(String term) {
        return songRepository.searchByNameOrArtist(term);
    }

    public long getCount() {
        return songRepository.count();
    }

    public List<SongDocument> getAllUserSongs(String userId) {
        return songRepository.findUserSongsWithoutAlbum(userId);
    }
}
