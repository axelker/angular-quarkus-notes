package org.notes.mapper;

import org.mapstruct.*;
import org.notes.dto.NoteDto;
import org.notes.entity.NoteEntity;


@Mapper(componentModel = "cdi",
    nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    public interface NoteMapper {

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)
  NoteEntity toEntity(NoteDto dto);

  NoteDto toDto(NoteEntity entity);
}