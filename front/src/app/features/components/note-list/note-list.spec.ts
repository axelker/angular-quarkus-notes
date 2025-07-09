import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoteList } from './note-list';
import { NoteService } from '../../services/note.service';
import { of } from 'rxjs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PagedResponse } from '../../../shared/types/PagedResponse';
import { Note } from '../../models/note';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';

describe('NoteList', () => {
  let component: NoteList;
  let fixture: ComponentFixture<NoteList>;
  let noteServiceMock: any;

  const mockNotes: PagedResponse<Note> = {
    items: [
      { id: 1, name: 'Test 1', content: 'Content 1' },
      { id: 2, name: 'Test 2', content: 'Content 2' }
    ],
    total: 2,
    page: 0,
    size: 2
  };

  beforeEach(async () => {
    noteServiceMock = {
      findAll: jest.fn().mockReturnValue(of(mockNotes)),
      create: jest.fn().mockImplementation((note) => of({ ...note, id: 99 })),
      update: jest.fn(),
      delete: jest.fn().mockReturnValue(of(undefined))
    };

    await TestBed.configureTestingModule({
      imports: [NoteList, MatSnackBarModule, FormsModule],
      providers: [
        { provide: NoteService, useValue: noteServiceMock },
        provideRouter([]),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NoteList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load and display notes', () => {
    const noteTitles = fixture.debugElement.queryAll(By.css('[data-testid="input-note-title"]'));
    const noteContents = fixture.debugElement.queryAll(By.css('[data-testid="input-note-content"]'));
    expect(noteTitles.length).toBe(2);
    expect(noteContents.length).toBe(2);
    expect(noteTitles[0].nativeElement.value).toContain('Test 1');
    expect(noteTitles[1].nativeElement.value).toContain('Test 2');
    expect(noteContents[0].nativeElement.value).toContain('Content 1');
    expect(noteContents[1].nativeElement.value).toContain('Content 2');
  });

  it('should show empty state if notes list is empty', () => {
    noteServiceMock.findAll.mockReturnValue(of({ items: [], total: 0 }));
    component.loadNotes();
    fixture.detectChanges();

    const emptyText = fixture.debugElement.query(By.css('[data-testid="text-note-not-found"]')).nativeElement.textContent;
    expect(emptyText).toContain('There are no notes.');
  });

  it('should add a new note when confirmAdd is called', () => {
    component.addEmptyNote();
    fixture.detectChanges();

    component.newNote.set({ id: null, name: 'New note', content: 'New content' });
    component.confirmAdd();
    fixture.detectChanges();

    const notes = component.notes();
    expect(notes?.items.some(n => n.name === 'New note')).toBe(true);
    expect(noteServiceMock.create).toHaveBeenCalled();
  });

  it('should cancel adding a note', () => {
    component.addEmptyNote();
    fixture.detectChanges();
    component.cancelAdd();
    fixture.detectChanges();

    expect(component.isAdding()).toBe(false);
    expect(component.newNote()).toEqual({ id: null, name: '', content: '' });
  });

  it('should delete note when delete is called', () => {
    const noteToDelete = mockNotes.items[0];
    noteServiceMock.delete = jest.fn().mockReturnValue(of(void 0));
    component.delete(noteToDelete);
    fixture.detectChanges();

    const notes = component.notes();
    expect(notes?.items.length).toBe(1);
    expect(notes?.items.find((value => value === noteToDelete))).toBe(undefined);

  });

  it('should update note when update is called', () => {
    const noteUpdated: Note = {
      id: 1,
      name: 'Added note',
      content: 'test add'
    };
    component.notes.set(mockNotes);

    noteServiceMock.update.mockReturnValue(of(noteUpdated));
    component.update(noteUpdated);
    fixture.detectChanges();

    const notes = component.notes();
    const noteResult = notes?.items.find((value => value.id === 1));
    expect(notes?.items.length).toBe(mockNotes.items.length);
    expect(noteResult).toBeDefined();
    expect(noteResult?.name).toBe(noteUpdated.name);
    expect(noteResult?.content).toBe(noteUpdated.content);
  });
});
