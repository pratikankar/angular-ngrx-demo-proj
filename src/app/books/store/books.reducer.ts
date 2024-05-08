import { createReducer, on } from "@ngrx/store";
import { Book } from "./book";
import { bookFetchSuccess, deleteBookSuccess, saveBookSuccess, updateBookSuccess } from "./books.action";

export const firstState: ReadonlyArray<Book> = [];

export const bookReducer = createReducer(
    firstState,
    on(bookFetchSuccess, (state, {allBooks})=> {
        return allBooks;
    }),
    on(saveBookSuccess, (state, {resp}) => {
        let tempState = [...state];
        tempState.unshift(resp);
        return tempState;
    }),
    on(updateBookSuccess, (state, {resp}) => {
        let tempState = state.filter(_=> _.id !== resp.id);
        tempState.unshift(resp);
        return tempState;
    }),
    on(deleteBookSuccess, (state, {id}) => {
        let tempState = state.filter(_=> _.id !== id);
        return tempState;
    })
);
