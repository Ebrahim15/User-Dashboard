import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "../appState.interface";

export const selectFeature = (state: AppStateInterface) => state.data;

export const isLoadingSelector = createSelector(
    selectFeature,
    (state) => state.isLoading
);

export const usersSelector = createSelector(
    selectFeature,
    (state) => state.users
);

export const pageSelector = createSelector(
    selectFeature,
    (state) => state.page
);

export const searchedUsersSelector = createSelector(
    selectFeature,
    (state) => state.searchedUsers
);

export const errorSelector = createSelector(
    selectFeature,
    (state) => state.error
);