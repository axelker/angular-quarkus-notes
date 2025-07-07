package org.notes.service;

import org.notes.dto.NoteDto;
import org.notes.dto.PagedResponse;


public interface NoteService {

    PagedResponse<NoteDto> findAll(int pageIndex, int pageSize);
    NoteDto findById(Long id);
    NoteDto create(NoteDto note);
    NoteDto update(Long id,NoteDto note);
    void delete(Long id);
} 
