import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { bookSelector } from '../store/books.selector';
import { callBookAPI, callDeleteBook } from '../store/books.action';
import { BooksService } from '../books.service';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setAPIStatuss } from 'src/app/shared/store/app.action';
import { AppState } from 'src/app/shared/store/appstate';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit {

  constructor(private _store: Store, private _booksService: BooksService, private _appStore: Store<AppState>) {}

  booksData = this._store.pipe(select(bookSelector));

  ngOnInit(): void {
    this._store.dispatch(callBookAPI());
  }

  delete(id: string) {
    this._store.dispatch(callDeleteBook({id: id}));
    let appStatus = this._appStore.pipe(select(selectAppState));
    appStatus.subscribe((data) => {
      if(data.apiStatus === 'success') {
        this._appStore.dispatch(setAPIStatuss({apiStatus:{apiStatus:'', apiResponseMessage:''}}));
      }
    })
  }
}
