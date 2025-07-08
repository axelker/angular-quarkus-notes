import { Component } from '@angular/core';
import { NoteList } from '../../components/note-list/note-list';

@Component({
  selector: 'app-note-list-page',
  imports: [NoteList],
  templateUrl: './note-list-page.html',
  styleUrl: './note-list-page.scss'
})
export class NoteListPage {

}
