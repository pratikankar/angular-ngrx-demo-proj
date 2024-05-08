import { createAction, props } from "@ngrx/store";
import { AppState } from "./appstate";

export const setAPIStatuss = createAction(
    '[API] success or failure status',
    props<{apiStatus: AppState}>()
)
