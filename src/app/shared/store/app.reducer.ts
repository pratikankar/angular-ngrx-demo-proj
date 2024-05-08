import { createReducer, on } from "@ngrx/store";
import { AppState } from "./appstate";
import { setAPIStatuss } from "./app.action";

export const firstState: AppState = {
    apiStatus: '',
    apiResponseMessage: ''
};

export const appReducer = createReducer(
    firstState,
    on(setAPIStatuss, (state, {apiStatus}) => {
        return apiStatus;
    })
)