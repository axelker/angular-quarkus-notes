package org.notes.repository;

import org.notes.entity.NoteEntity;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class NoteRepository implements PanacheRepositoryBase<NoteEntity, Long> {}