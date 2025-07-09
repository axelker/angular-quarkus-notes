import { TestBed } from '@angular/core/testing';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing'
import { NoteService } from './note.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Note } from '../models/note';
import { PagedResponse } from '../../shared/types/PagedResponse';

describe('Note', () => {
  let service: NoteService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        provideHttpClient(),
        provideHttpClientTesting() ,
        NoteService
      ]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(NoteService);
  });

 afterEach(() => {
    httpTestingController.verify(); // Vérifie qu'il n'y a pas de requêtes HTTP non traitées
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all notes with pagination params', () => {
    const mockResponse: PagedResponse<Note> = {
      items: [{
        id: 1, name: 'Test Note',
        content: ''
      }],
      page: 0,
      size: 10,
      total: 100
    };

    service.findAll(0, 10).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(req => 
      req.method === 'GET' &&
      req.url === 'api/notes' &&
      req.params.get('page') === '0' &&
      req.params.get('size') === '10'
    );

    req.flush(mockResponse);
  });

  it('should fetch note by id', () => {
    const mockNote: Note = {
      id: 1, name: 'Note 1',
      content: ''
    };

    service.findById(1).subscribe(note => {
      expect(note).toEqual(mockNote);
    });

    const req = httpTestingController.expectOne('api/notes/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockNote);
  });

  it('should create a note', () => {
    const newNote: Note = {
      name: 'New Note',
      id: null,
      content: ''
    };
    const createdNote: Note = {
      id: 1, name: 'New Note',
      content: ''
    };

    service.create(newNote).subscribe(note => {
      expect(note).toEqual(createdNote);
    });

    const req = httpTestingController.expectOne('api/notes');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newNote);
    req.flush(createdNote);
  });

  it('should update a note', () => {
    const updatedNote: Note = {
      id: 1, name: 'Updated name',
      content: ''
    };

    service.update(1, updatedNote).subscribe(note => {
      expect(note).toEqual(updatedNote);
    });

    const req = httpTestingController.expectOne('api/notes/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedNote);
    req.flush(updatedNote);
  });

  it('should delete a note', () => {
    service.delete(1).subscribe(response => {
      expect(response).toBeUndefined();
    });

    const req = httpTestingController.expectOne('api/notes/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
