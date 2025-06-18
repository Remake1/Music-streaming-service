package com.muz.repository;

import com.muz.document.PlaylistDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PlaylistRepository extends MongoRepository<PlaylistDocument, String> {
    List<PlaylistDocument> findByUser(String userId);
}
