import { createAction, props } from "@ngrx/store";
import { Book } from "./book";

export const callBookAPI = createAction(
    "[Books API] calls books Fetch API"
);

export const bookFetchSuccess = createAction(
    "[Books API] books Fetch successful",
    props<{allBooks: Book[]}>()
);

export const saveBook = createAction(
    "[Books API] save book API called",
    props<{payload: Book}>()
);

export const saveBookSuccess = createAction(
    "[Books API] save book successful",
    props<{resp: Book}>()
);

export const callUpdateBook = createAction(
    "[Books API] call update book API",
    props<{payload: Book}>()
);

export const updateBookSuccess = createAction(
    "[Books API] update book successful",
    props<{resp: Book}>()
);

export const callDeleteBook = createAction(
    "[Books API] call delete book API",
    props<{id: string}>()
);

export const deleteBookSuccess = createAction(
    "[Books API] delete book successful",
    props<{id : string}>()
);
