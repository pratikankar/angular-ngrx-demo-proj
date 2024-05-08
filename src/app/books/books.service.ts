import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from './store/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  
  url: string = 'http://localhost:3000/books';

  constructor(private _http:HttpClient) { }

  getBooks() {
    return this._http.get<Book[]>(this.url);
  }

  addBook(payload: Book) {
    return this._http.post<Book>(this.url,payload)
  }

  updateBook(payload: Book) {
    return this._http.put<Book>(`${this.url}/${payload.id}`, payload)
  }

  deleteBook(id: string) {
    return this._http.delete(`${this.url}/${id}`);
  }
}
