package org.notes.mapper;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;
import org.notes.dto.NoteDto;
import org.notes.entity.NoteEntity;

import io.quarkus.test.junit.QuarkusTest;

@QuarkusTest
public class NoteMapperTest {
    private final NoteMapper noteMapper = Mappers.getMapper(NoteMapper.class);

    @Test
    void shouldMapNoteDtoNullToNull() {
        NoteDto noteDto = null;
        NoteEntity entity = noteMapper.toEntity(noteDto);
        assertEquals(null, entity);
    }

    @Test
    void shouldMapNotDtoToNoteEntity() {
        NoteDto noteDto = NoteDto.builder().id(5L).name("name").content("content").build();
        NoteEntity entity = noteMapper.toEntity(noteDto);
        assertFalse(null == entity);
        assertTrue(null == entity.getId());
        assertEquals("name", entity.getName());
        assertEquals("content", entity.getContent());
    }

    @Test
    void shouldMapNoteEntityNullToNull() {
        NoteEntity entity = null;
        NoteDto dto = noteMapper.toDto(entity);
        assertEquals(null, dto);
    }

    @Test
    void shouldMapNoteEntityToNoteDto() {
        NoteEntity entity = NoteEntity.builder()
            .id(5L)
            .name("Test name")
            .content("Test content")
            .build();

        NoteDto dto = noteMapper.toDto(entity);
        assertNotNull(dto);
        assertEquals(5, dto.getId());
        assertEquals("Test name", dto.getName());
        assertEquals("Test content", dto.getContent());
    }
}
