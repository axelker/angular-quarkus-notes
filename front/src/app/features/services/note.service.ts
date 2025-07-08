import { Injectable } from '@angular/core';
import { PagedResponse } from '../../shared/types/PagedResponse';
import { Note } from '../models/note';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private path: string = "api/notes";
  constructor(private http: HttpClient) { }

  findAll(page?:number,size?:number): Observable<PagedResponse<Note>> {
    const params: any = {};
    if (page !== undefined) {
      params.page = page.toString();
    }
    if (size !== undefined) {
      params.size = size.toString();
    }

    return this.http.get<PagedResponse<Note>>(this.path, { params });
  }

  findById(id:number): Observable<Note> {
    return this.http.get<Note>(`${this.path}/${id}`);
  }

  create(note:Note): Observable<Note> {
    return this.http.post<Note>(`${this.path}`, note);
  }
  update(id:number,note:Note): Observable<Note> {
    return this.http.put<Note>(`${this.path}/${id}`, note);
  }
  delete(id:number): void {
    this.http.delete<Note>(`${this.path}/${id}`);
  }
}
