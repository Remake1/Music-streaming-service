package com.muz.document;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "playlists")
public class PlaylistDocument {

    @Id
    private String id;

    private String name;
    private String userName;
    private String picture;
    private boolean pub = false;
    private String user;

    private List<String> songs = new ArrayList<>();
}
