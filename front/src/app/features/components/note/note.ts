import { Component, inject, OnInit,signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-note',
  imports: [DatePipe],
  templateUrl: './note.html',
  styleUrl: './note.scss'
})
export class NoteComponent implements OnInit {
  private noteService = inject(NoteService);
  private route = inject(ActivatedRoute);

  note = signal<Note | null>(null);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.noteService.findById(id).subscribe({
        next: data => this.note.set(data),
        error: err => console.error('Failed to fetch note', err)
      });
    }
  }
}
