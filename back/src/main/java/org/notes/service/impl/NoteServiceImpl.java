package org.notes.services.impl;
import jakarta.enterprise.context.ApplicationScoped;
import org.notes.dto.NoteDto;
import org.notes.entity.NoteEntity;
import jakarta.inject.Inject;
import java.util.NoSuchElementException;
import org.notes.mapper.NoteMapper;
import org.notes.repository.NoteRepository;
import org.notes.services.NoteService;
import java.util.NoSuchElementException;
import jakarta.transaction.Transactional;


@ApplicationScoped
public class NoteServiceImpl implements NoteService {
    
    @Inject
    private NoteRepository repository;
    @Inject
    private NoteMapper mapper;

    @Override
    public NoteDto findById(Long id) {
        var entity = repository.findById(id);
        if (null == entity) {
            throw new NoSuchElementException("Note with the ID " + id + " not found.");
        }
        return mapper.toDto(entity);
    }

    @Override
    @Transactional
    public NoteDto create(NoteDto note){
        try {
            NoteEntity entity = mapper.toEntity(note);
            repository.persistAndFlush(entity);

            if (entity.getId() == null) {
                throw new RuntimeException("Failed to create note: no ID generated.");
            }

            return mapper.toDto(entity);
        } catch (Exception e) {
            throw new RuntimeException("An unexpected error occurred while creating the note.");
        }
    }

    @Override
    @Transactional
    public NoteDto update(Long id,NoteDto note){
        var entity = repository.findById(id);
        if (null == entity) {
            throw new NoSuchElementException("Note with the ID " + id + " not found.");
        }
        try {
            var entityToUpdate = NoteEntity.builder()
            .id(entity.getId())
            .name(note.getName())
            .content(note.getContent())
            .build();
        
            repository.persistAndFlush(entityToUpdate);
            return mapper.toDto(entityToUpdate);
            
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while updating note with ID " + id + ".");
        }

    }

    @Override
    @Transactional
    public void delete(Long id){
        var entity = repository.findById(id);
        if (null == entity) {
            throw new NoSuchElementException("Note with the ID " + id + " not found.");
        }
        repository.deleteById(id);
    }
}
