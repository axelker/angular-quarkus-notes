package org.notes.services;
import org.notes.dto.NoteDto;

import jakarta.enterprise.context.ApplicationScoped;

public interface NoteService {

    NoteDto findById(Long id);
    NoteDto create(NoteDto note);
    NoteDto update(Long id,NoteDto note);
    void delete(Long id);
} 
