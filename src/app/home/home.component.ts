import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { UserComponent } from '../components/user/user.component';
import { CommonModule } from '@angular/common';
import { User, Users } from '../../types';
import { select, Store } from '@ngrx/store';
// import { changePage, getUsers } from '../users-slice/users.actions';
import { errorSelector, isLoadingSelector, usersSelector } from '../states/selectors/selectors';
import { Observable } from 'rxjs';
import { AppStateInterface } from '../states/appState.interface';
import { PaginatorModule } from 'primeng/paginator';
import { changePage, getUsers } from '../states/users-slice/users.actions';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, UserComponent, CommonModule, PaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  users$: Observable<User[]>;

  onPageChange(event: any) {
    console.log(event)
    if(event.page === 1) {
      this.store.dispatch(changePage())
    } 
    else {
      this.store.dispatch(getUsers())
    }
  }

  constructor(private store: Store<AppStateInterface>) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.users$ = this.store.select(usersSelector);
    this.error$ = this.store.select(errorSelector);
  }
  
  // httpClient = inject(HttpClient);
  // api: string = 'https://reqres.in/api/users';
  // data: any = [];
  // users: User[] = [];

  // fetchData() {
  //   this.httpClient.get(this.api).subscribe((data) => {
  //     console.log(data);
  //     this.data = data;
  //     this.users = this.data.data;
  //   })
  // }


  ngOnInit() {
    // this.fetchData()
    this.store.dispatch(getUsers());
  }
}
