package org.notes.service.impl;

import io.quarkus.test.InjectMock;
import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;
import org.notes.dto.NoteDto;
import org.notes.entity.NoteEntity;
import org.notes.mapper.NoteMapper;
import org.notes.repository.NoteRepository;

import java.util.NoSuchElementException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@QuarkusTest
public class NoteServiceImplTest {

    @Inject
    NoteServiceImpl noteService;

    @InjectMock
    NoteRepository repository;

    @InjectMock
    NoteMapper mapper;

    @Test
    public void testFindById_Found() {
        NoteEntity entity = new NoteEntity(1L, "Test Name", "Test Content");
        NoteDto dto = NoteDto.builder().name("Test Name").content("Test Content").build();

        when(repository.findById(1L)).thenReturn(entity);
        when(mapper.toDto(entity)).thenReturn(dto);

        NoteDto result = noteService.findById(1L);
        assertNotNull(result);
        assertEquals("Test Name", result.getName());
        assertEquals("Test Content", result.getContent());
    }

    @Test
    public void testFindById_NotFound() {
        when(repository.findById(1L)).thenReturn(null);

        NoSuchElementException exception = assertThrows(NoSuchElementException.class, () -> {
            noteService.findById(1L);
        });
        assertEquals("Note with the ID 1 not found.", exception.getMessage());
    }

    @Test
    public void testCreate_Success() {
        NoteDto inputDto = NoteDto.builder().name("Name").content("Content").build();
        NoteEntity entity = new NoteEntity(null, "Name", "Content");
        NoteDto outputDto = NoteDto.builder().name("Name").content("Content").build();

        when(mapper.toEntity(inputDto)).thenReturn(entity);
        doNothing().when(repository).persistAndFlush(entity);
        when(mapper.toDto(entity)).thenReturn(outputDto);

        NoteDto result = noteService.create(inputDto);

        assertNotNull(result);
        assertEquals("Name", result.getName());
        assertEquals("Content", result.getContent());
    }

    @Test
    public void testDelete_Success() {
        NoteEntity entity = new NoteEntity(1L, "Name", "Content");
        when(repository.findById(1L)).thenReturn(entity);
        when(repository.deleteById(1L)).thenReturn(true);

        assertDoesNotThrow(() -> noteService.delete(1L));

        verify(repository, times(1)).deleteById(1L);
    }

    @Test
    public void testDelete_NotFound() {
        when(repository.findById(1L)).thenReturn(null);

        NoSuchElementException exception = assertThrows(NoSuchElementException.class, () -> {
            noteService.delete(1L);
        });
        assertEquals("Note with the ID 1 not found.", exception.getMessage());
    }
}
