package org.notes.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.AccessLevel;



@Builder(toBuilder = true)
@NoArgsConstructor
@Getter
@Entity
@Table(name = "notes")
public class NoteEntity  {
    @Id @GeneratedValue private Long id;
    private String name;
    private String content;
}
