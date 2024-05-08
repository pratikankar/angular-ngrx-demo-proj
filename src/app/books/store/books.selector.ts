import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Book } from "./book";

export const bookSelector = createFeatureSelector<Book[]>("selectedBooks");

export const oneBookSelector = (id: string) => {
    return createSelector(bookSelector,(book: Book[]) => {
            var bookId = book.filter(_ => _.id == id);
            if(bookId.length == 0) {
                return null;
            }
            return bookId[0];
        }
    )
}
