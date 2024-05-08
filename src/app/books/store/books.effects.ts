import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BooksService } from "../books.service";
import { bookFetchSuccess, callBookAPI, callDeleteBook, callUpdateBook, deleteBookSuccess, saveBook, saveBookSuccess, updateBookSuccess } from "./books.action";
import { EMPTY, map, switchMap, withLatestFrom } from "rxjs";
import { Store, select } from "@ngrx/store";
import { AppState } from "src/app/shared/store/appstate";
import { setAPIStatuss } from "src/app/shared/store/app.action";
import { bookSelector } from "./books.selector";

@Injectable()
export class BooksEffects {
    constructor(private _actions:Actions, private _bookService:BooksService, private _appStore: Store<AppState>, private _store: Store) {}

    getAllBooks = createEffect(() => this._actions.pipe(
        ofType(callBookAPI),
        withLatestFrom(this._store.pipe(select(bookSelector))),
        switchMap(([,data]) => {
            if(data.length > 0) {
                return EMPTY;
            }
            return this._bookService.getBooks()
            .pipe(map((data) => bookFetchSuccess({allBooks: data})))
        })
    )
  );

    addNewBook = createEffect(() => 
        this._actions.pipe(
            ofType(saveBook),
            switchMap((action) => {
                this._appStore.dispatch(setAPIStatuss({apiStatus:{apiResponseMessage:'', apiStatus:''}}))
                return this._bookService.addBook(action.payload)
                .pipe(map((data) => {
                    this._appStore.dispatch(setAPIStatuss({apiStatus:{apiResponseMessage:'', apiStatus:'success'}}))
                    return saveBookSuccess({resp:data})
                }))
            })
        )
    );

    updateBook = createEffect(() => 
        this._actions.pipe(
            ofType(callUpdateBook),
            switchMap((action) => {
                this._appStore.dispatch(setAPIStatuss({apiStatus:{apiResponseMessage:'', apiStatus:''}}))
                return this._bookService.updateBook(action.payload)
                .pipe(map((data) => {
                    this._appStore.dispatch(setAPIStatuss({apiStatus:{apiResponseMessage:'', apiStatus:'success'}}))
                    return updateBookSuccess({resp:data})
                }))
            })
        )
    );

    deleteBook = createEffect(() => 
        this._actions.pipe(
            ofType(callDeleteBook),
            switchMap((action) => {
                this._appStore.dispatch(setAPIStatuss({apiStatus:{apiResponseMessage:'', apiStatus:''}}))
                return this._bookService.deleteBook(action.id)
                .pipe(map((data) => {
                    this._appStore.dispatch(setAPIStatuss({apiStatus:{apiResponseMessage:'', apiStatus:'success'}}))
                    return deleteBookSuccess({id: action.id})
                }))
            })
        )
    );
}
