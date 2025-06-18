package com.muz.document;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "comments")
public class CommentDocument {

    @Id
    private String id;

    private String username;
    private String text;
    private String track;
}
