package org.notes.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;



@NoArgsConstructor
@AllArgsConstructor
@Getter
@Entity
@Builder(toBuilder = true)
@Table(name = "notes")
public class NoteEntity  {
    @Id @GeneratedValue private Long id;
    private String name;
    private String content;
}
