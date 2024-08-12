import { createAction, props } from '@ngrx/store';
import { User, Users } from '../../types';

export const getUsers = createAction('[Home Component] Get Users');
export const getUsersSuccess = createAction(
  '[Home Component] Get Users Success',
  props<{ data: Users }>()
);
export const getUsersFailure = createAction(
  '[Home Component] Get Users Failure',
  props<{ error: string}>()
);
export const changePage = createAction(
  '[Home Component] Change Page',
);
export const searchUsers = createAction(
  '[Home Component] Search Users',
  props<{ searchedUsers: User[] }>()

);

