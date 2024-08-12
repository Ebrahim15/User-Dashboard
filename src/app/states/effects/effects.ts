import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  changePage,
  getUsers,
  getUsersFailure,
  getUsersSuccess,
  searchUsers,
} from '../users-slice/users.actions';
import { catchError, map, merge, mergeMap, Observable, of } from 'rxjs';
import { UsersService } from '../../services/users.service';
import { HttpClient } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from '../appState.interface';
import { pageSelector } from '../selectors/selectors';
import { DataService } from '../../services/data.service';

@Injectable()
export class UsersEffect {
  httpClient = inject(HttpClient);


  pageNumber$: Observable<number>;

  api: string = 'https://reqres.in/api/users';

  data$: any = [];

  getUsers$ = createEffect(() => this.actions$.pipe(
    ofType(getUsers),
    // mergeMap(() => {
    //   return this.httpClient.get(`${this.api}?page=2`).pipe(
    //     map((data) => {
    //       this.data$ = data;
    //       console.log(data);
    //       return searchUsers({searchedUsers: this.data$.data})}),
    //       // return getUsersSuccess({users: this.data$.data})}),
    //     catchError((error) => of(getUsersFailure({error: error.message})))
    //   )
    // }),
    mergeMap(() => merge(
       this.dataService.getData(this.api).pipe(
        map((data) => {
          this.data$ = data;
          console.log(data);
          return getUsersSuccess({data: {
            data: this.data$.data,
            total: this.data$.total,
            page: this.data$.page,
            perPage: this.data$.per_page,
            totalPages: this.data$.total_pages
          }})}),
          // return getUsersSuccess({users: this.data$.data})}),
        catchError((error) => of(getUsersFailure({error: error.message})))
      ),
      // this.httpClient.get(this.api).pipe(
      //   map((data) => {
      //     this.data$ = data;
      //     console.log(data);
      //     return searchUsers({searchedUsers: this.data$.data})}),
      //     // return getUsersSuccess({users: this.data$.data})}),
      // ),
      // this.httpClient.get(`${this.api}?page=2`).pipe(
      //   map((data) => {
      //     this.data$ = data;
      //     console.log(data);
      //     return searchUsers({searchedUsers: this.data$.data})}),
      //     // return getUsersSuccess({users: this.data$.data})}),
      // )
      this.dataService.getData(this.api).pipe(
        map((data) => {
              this.data$ = data;
              console.log(data);
              return searchUsers({searchedUsers: this.data$.data})}),
      ),
      this.dataService.getData(`${this.api}?page=2`).pipe(
        map((data) => {
              this.data$ = data;
              console.log(data);
              return searchUsers({searchedUsers: this.data$.data})}),
      )
    )),
    
  ));

  changePage$ = createEffect(() => this.actions$.pipe(
    ofType(changePage),
    mergeMap(() => {
      return this.dataService.getData(`${this.api}?page=2`).pipe(
        map((data) => {
          this.data$ = data;
          console.log(data);
          return getUsersSuccess({data: {
            data: this.data$.data,
            total: this.data$.total,
            page: this.data$.page,
            perPage: this.data$.per_page,
            totalPages: this.data$.total_pages
          }})}),
          // return getUsersSuccess({users: this.data$.data})}),
        catchError((error) => of(getUsersFailure({error: error.message})))
      )
    })
  ));

  constructor(private actions$: Actions, private usersService: UsersService, private store: Store<AppStateInterface>, private dataService: DataService) {
    this.pageNumber$ = this.store.select(pageSelector);
  }
}
