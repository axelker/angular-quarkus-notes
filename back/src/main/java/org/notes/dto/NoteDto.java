package org.notes.dto;

import lombok.Getter;
import lombok.Builder;

@Builder
@Getter
public class NoteDto {
    private String name;
    private String content;
}
