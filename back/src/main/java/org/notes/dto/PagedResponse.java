package org.notes.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PagedResponse<T> {
    private List<T> items;
    private long total;
    private int page;
    private int size;
}
