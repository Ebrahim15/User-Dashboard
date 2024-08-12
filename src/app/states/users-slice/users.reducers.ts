import { createReducer, on } from '@ngrx/store';
import { changePage, getUsers, getUsersFailure, getUsersSuccess, searchUsers, searchUsersFailure } from './users.actions';
import { Users } from '../../../types';
import { UsersState } from '../users.interface';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

export const initialState: UsersState = {
  isLoading: false,
  users: [],
  total: 0,
  page: 0,
  perPage: 0,
  totalPages: 0,
  searchedUsers: [],
  searchError: null,
  error: null,
};

export const usersReducer = createReducer(
  initialState,
  on(getUsers, (state) => ({ ...state, isLoading: true })),
  on(getUsersSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    users: action.data.data,
    total: action.data.total,
    page: action.data.page,
    perPage: action.data.perPage,
    totalPages: action.data.totalPages,
  })),
  on(getUsersFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(changePage, (state, action) => ({
    ...state,
    isLoading: true,
  })),
  on(searchUsers, (state, action) => ({
    ...state,
    isLoading: false,
    searchedUsers: state.searchedUsers.concat(action.searchedUsers)
  })),
  on(searchUsersFailure, (state, action) => ({
    ...state,
    searchError: action.error,
  })),
);
