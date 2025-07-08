import { Component, inject, NgModule, OnInit, signal } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { PagedResponse } from '../../../shared/types/PagedResponse';
import { Note } from '../../models/note';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-note-list',
  imports: [MatListModule, MatButtonModule, MatIconModule, FormsModule,RouterLink],
  templateUrl: './note-list.html',
  styleUrl: './note-list.scss'
})
export class NoteList implements OnInit {
  private noteService: NoteService = inject(NoteService);
  private snackBar: MatSnackBar = inject(MatSnackBar);
  
  notes = signal<PagedResponse<Note> | null>(null);
  isAdding = signal(false);

  newNote = signal<Note>({
    id:null,
    name: '',
    content: ''
  });

  ngOnInit(): void {
    this.loadNotes();
  }

  addEmptyNote() {
    this.isAdding.set(true);
  }

  cancelAdd() {
    this.isAdding.set(false);
    this.newNote.set({ id: null, name: '', content: '' });
  }

  confirmAdd() {
    const note = this.newNote();
    this.noteService.create(note).subscribe(created => {
      this.notes.update(paged => {
        if (!paged) return paged;
        return {
          ...paged,
          items: [created, ...paged.items]
        };
      });
      this.cancelAdd();
    });
  }


  loadNotes(page?: number, size?: number) {
    this.noteService.findAll(page, size).subscribe({
      next: data => this.notes.set(data),
      error: err => this.showError(err)
    });
  }

  delete(note:Note) {
    if (!note.id) {
      return;
    }
    this.noteService.delete(note.id).subscribe({
      next: () => {
        this.notes.update(paged => {
          if (!paged) return paged;

          return {
            ...paged,
            items: paged.items.filter(note =>
              note.id !== note.id
            )
          };
        });
      },
      error: err => {
        console.error(err);
        this.showError("Delete failed.");
      }
    });
  }

  save(note: Note) {
    if (note.id) {
      this.update(note.id, note);
      return;
    }
    this.create(note);
  }

  private create(note: Note) {
    this.noteService.create(note).subscribe({
      next: (newNote) => {
        this.notes.update(paged => {
          if (!paged) return paged;

          return {
            ...paged,
            items: [...paged.items, newNote]
          };
        });
      },
      error: err => {
        console.error(err);
        this.showError("Creation failed.");
      }
    });
  }

  private update(id: number, note: Note) {
    this.noteService.update(id, note).subscribe({
      next: (newNote) => {
        this.notes.update(paged => {
          if (!paged) return paged;

          return {
            ...paged,
            items: paged.items.map(note =>
              note.id === id ? newNote : note
            )
          };
        });
      },
      error: err => {
        console.error(err);
        this.showError("Update failed.");
      }
    });
  }

  showError(err:string) {
    this.snackBar.open(err, 'Close', {
        duration: 3000,
        panelClass: ['bg-red-400']
    })
  }

}
