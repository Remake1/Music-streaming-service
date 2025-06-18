package com.muz.repository;

import com.muz.document.AlbumDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface AlbumRepository extends MongoRepository<AlbumDocument, String> {

    @Query("{ '$or': [ { 'name': { '$regex': ?0, '$options': 'i' } }, { 'author': { '$regex': ?0, '$options': 'i' } } ] }")
    List<AlbumDocument> searchByNameOrAuthor(String query);
}
