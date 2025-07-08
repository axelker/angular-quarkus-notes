import { Component, inject, OnInit, signal } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { PagedResponse } from '../../../shared/types/PagedResponse';
import { Note } from '../../models/note';

@Component({
  selector: 'app-note-list',
  imports: [],
  templateUrl: './note-list.html',
  styleUrl: './note-list.scss'
})
export class NoteList implements OnInit {
  private noteService: NoteService = inject(NoteService);
  notes = signal<PagedResponse<Note> | null>(null);

  ngOnInit(): void {
    this.noteService.findAll(0, 10).subscribe({
      next: data => this.notes.set(data),
      error: err => console.error(err)
    });
  }
}
