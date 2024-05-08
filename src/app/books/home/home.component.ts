import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { bookSelector } from '../store/books.selector';
import { callBookAPI } from '../store/books.action';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit {

  constructor(private _store: Store, private _booksService: BooksService) {}

  booksData = this._store.pipe(select(bookSelector));

  ngOnInit(): void {
    this._store.dispatch(callBookAPI());
  }

  delete(id: string) {
    this._booksService.deleteBook(id).subscribe(res => {
      console.log(res);
    });
    window.location.reload();
  }
}
