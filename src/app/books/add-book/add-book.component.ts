import { Component } from '@angular/core';
import { Book } from '../store/book';
import { Store, select } from '@ngrx/store';
import { saveBook } from '../store/books.action';
import { AppState } from 'src/app/shared/store/appstate';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Router } from '@angular/router';
import { setAPIStatuss } from 'src/app/shared/store/app.action';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {

  constructor(private _store: Store, private _appStore:Store<AppState>, private _router: Router) {}

  bookForm: Book = {
    id: Date.now().toString(),
    title: '',
    author: '',
    price: 0
  }

  save() {
    this._store.dispatch(saveBook({payload: {...this.bookForm}}));
    let appStatus = this._appStore.pipe(select(selectAppState));
    appStatus.subscribe((data) => {
      if(data.apiStatus === 'success') {
        this._appStore.dispatch(setAPIStatuss({apiStatus:{apiStatus:'', apiResponseMessage:''}}));
        this._router.navigate(['/']);
      }
    })
  }
}
