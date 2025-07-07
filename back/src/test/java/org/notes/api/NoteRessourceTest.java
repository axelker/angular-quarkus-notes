package org.notes.api;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static jakarta.ws.rs.core.Response.Status.*;

import jakarta.ws.rs.core.Response;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.notes.dto.NoteDto;
import org.notes.dto.PagedResponse;
import org.notes.service.NoteService;

import java.net.URI;

class NoteResourceTest {

    @InjectMocks
    NoteResource noteResource;

    @Mock
    NoteService noteService;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAll() {
        PagedResponse<NoteDto> pagedResponse = new PagedResponse<>();
        when(noteService.findAll(0, 10)).thenReturn(pagedResponse);

        Response response = noteResource.getAll(0, 10);

        assertEquals(OK.getStatusCode(), response.getStatus());
        assertEquals(pagedResponse, response.getEntity());
        verify(noteService).findAll(0, 10);
    }

    @Test
    void testGetById() {
        NoteDto note = NoteDto.builder().id(1L).name("Test").content("Content").build();
        when(noteService.findById(1L)).thenReturn(note);

        Response response = noteResource.getById(1L);

        assertEquals(OK.getStatusCode(), response.getStatus());
        assertEquals(note, response.getEntity());
        verify(noteService).findById(1L);
    }

    @Test
    void testCreate() {
        NoteDto input = NoteDto.builder().name("New Note").content("Content").build();
        NoteDto created = NoteDto.builder().id(1L).name("New Note").content("Content").build();

        when(noteService.create(input)).thenReturn(created);

        Response response = noteResource.create(input);

        assertEquals(Response.Status.CREATED.getStatusCode(), response.getStatus());
        assertEquals(created, response.getEntity());
        assertEquals(URI.create("/notes/1"), response.getLocation());
        verify(noteService).create(input);
    }

    @Test
    void testUpdate() {
        NoteDto input = NoteDto.builder().name("Updated Note").content("Updated").build();
        NoteDto updated = NoteDto.builder().id(1L).name("Updated Note").content("Updated").build();

        when(noteService.update(1L, input)).thenReturn(updated);

        Response response = noteResource.update(1L, input);

        assertEquals(OK.getStatusCode(), response.getStatus());
        assertEquals(updated, response.getEntity());
        verify(noteService).update(1L, input);
    }

    @Test
    void testDelete() {
        doNothing().when(noteService).delete(1L);

        Response response = noteResource.delete(1L);

        assertEquals(Response.Status.NO_CONTENT.getStatusCode(), response.getStatus());
        verify(noteService).delete(1L);
    }
}
