import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoteComponent } from './note';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note';
import { DatePipe } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('NoteComponent', () => {
  let component: NoteComponent;
  let fixture: ComponentFixture<NoteComponent>;

  const mockNote: Note = {
    id: 1,
    name: 'Test Note',
    content: 'Lorem ipsum',
    createdAt: new Date()
  };

  let noteServiceMock: any;
  let activatedRouteMock: any;

  beforeEach(async () => {
    noteServiceMock = {
      findById: jest.fn()
    };

    activatedRouteMock = {
      snapshot: {
        paramMap: {
          get: jest.fn()
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [NoteComponent, DatePipe],
      providers: [
        { provide: NoteService, useValue: noteServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NoteComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and render note if id is valid', () => {
    activatedRouteMock.snapshot.paramMap.get.mockReturnValue('1');
    noteServiceMock.findById.mockReturnValue(of(mockNote));

    fixture.detectChanges();

    fixture.componentInstance.note

    const title = fixture.debugElement.query(By.css('[data-testid="text-note-title"]'))?.nativeElement.textContent;
    const createdDate = fixture.debugElement.query(By.css('[data-testid="text-note-createdat"]'))?.nativeElement.textContent;
    const content = fixture.debugElement.query(By.css('[data-testid="text-note-content"]'))?.nativeElement.textContent;

    expect(fixture.componentInstance.note()).toEqual(mockNote);
    expect(title).toContain(mockNote.name);
    const datePipe = new DatePipe('en-US');
    const expectedDate = datePipe.transform(mockNote.createdAt, 'short');
    expect(createdDate).toContain(expectedDate);
    expect(content).toContain(mockNote.content);
    expect(noteServiceMock.findById).toHaveBeenCalledWith(1);
  });

  it('should NOT call noteService if id is missing', () => {
    activatedRouteMock.snapshot.paramMap.get.mockReturnValue(null);

    fixture.detectChanges();

    expect(noteServiceMock.findById).not.toHaveBeenCalled();

    const fallback = fixture.debugElement.query(By.css('[data-testid="text-note-not-found"]'))?.nativeElement.textContent;
    expect(fallback).toContain('Note not found.');
  });

  it('should show "Note not found" if note is null from service', () => {
    activatedRouteMock.snapshot.paramMap.get.mockReturnValue('1');
    noteServiceMock.findById.mockReturnValue(of(null));

    fixture.detectChanges();

    const fallback = fixture.debugElement.query(By.css('[data-testid="text-note-not-found"]'))?.nativeElement.textContent;
    expect(fallback).toContain('Note not found.');
  });
});
