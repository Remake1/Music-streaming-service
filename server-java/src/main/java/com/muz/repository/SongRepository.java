package com.muz.repository;

import com.muz.document.SongDocument;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface SongRepository extends MongoRepository<SongDocument, String> {

    @Query("{ '$or': [ { 'name': { '$regex': ?0, '$options': 'i' } }, { 'artist': { '$regex': ?0, '$options': 'i' } } ] }")
    List<SongDocument> searchByNameOrArtist(String term);

    @Query("{ '$or': [ { 'user': ?0, 'album': { '$exists': false } }, { 'user': ?0, 'album': null } ] }")
    List<SongDocument> findUserSongsWithoutAlbum(String userId);

    List<SongDocument> findAllByOrderByCreatedAtDesc(Pageable pageable);
    List<SongDocument> findAllByOrderByNameAsc(Pageable pageable);
    List<SongDocument> findAllByOrderByArtistAsc(Pageable pageable);
}
