import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../../types';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  httpClient = inject(HttpClient);
  api: string = 'https://reqres.in/api/users';
  data: any = [];
  users: User[] = [];

  getUsers(users: User[]): Observable<User[]> {
    return of(users).pipe(delay(2000));
  };

  fetchData(){
    this.httpClient.get(this.api).subscribe((data) => {
      console.log(data);
      this.data = data;
      this.users = this.data.data;
    });
  }

}
