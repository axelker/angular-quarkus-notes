package org.notes.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class NoteDto {
    private Long id;
    private String name;
    private String content;
}
