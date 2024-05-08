import { Component, OnInit } from '@angular/core';
import { Book } from '../store/book';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { oneBookSelector } from '../store/books.selector';
import { callUpdateBook } from '../store/books.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setAPIStatuss } from 'src/app/shared/store/app.action';
import { AppState } from 'src/app/shared/store/appstate';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit{

  constructor(private _store: Store, private _route: ActivatedRoute, private _router: Router, private _appStore: Store<AppState>) {}

  bookForm: Book = {
    id: '',
    title: '',
    author: '',
    price: 0
  }

  ngOnInit(): void {
    let bookData = this._route.paramMap.pipe(
      switchMap((param) => {
        let id = String(param.get('id'));
        return this._store.pipe(select(oneBookSelector(id)))
      })
    )

    bookData.subscribe((data) => {
      if(data) {
        this.bookForm = {...data}
      }
      else {
        this._router.navigate(['/']);
      }
    })
  }

  update() {
    this._store.dispatch(callUpdateBook({payload: {...this.bookForm}}));
    let appStatus = this._appStore.pipe(select(selectAppState));
    appStatus.subscribe((data) => {
      if(data.apiStatus === 'success') {
        this._appStore.dispatch(setAPIStatuss({apiStatus:{apiStatus:'', apiResponseMessage:''}}));
        this._router.navigate(['/']);
      }
    })
  }
}
