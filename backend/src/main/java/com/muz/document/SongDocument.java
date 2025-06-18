package com.muz.document;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "songs")
public class SongDocument {

    @Id
    private String id;

    private String name;
    private String artist;
    private String text;
    private int listens = 0;
    private String picture;
    private String audio;

    private List<String> comments = new ArrayList<>();

    private String album;

    private String user;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;
}
