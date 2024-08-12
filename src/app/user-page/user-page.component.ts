import { Component, inject, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../types';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppStateInterface } from '../states/appState.interface';
import { searchedUsersSelector } from '../states/selectors/selectors';
import { catchError, Observable } from 'rxjs';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent {
  user: any | undefined;


  constructor(private router: Router, private route: ActivatedRoute, private store: Store<AppStateInterface>,) {
  }
  
  httpClient = inject(HttpClient);
  api: string = 'https://reqres.in/api/users';
  data: any = [];

  fetchUser(id: number) {
    this.httpClient.get(`${this.api}/${id}`).subscribe((data) => {
      this.data = data
      this.user = this.data.data
    }, (error) => {
      this.router.navigateByUrl('/404')
      console.log(error)
    })
  }

  ngOnInit() {
    // const routeParams = this.route.snapshot.paramMap;
    const routeParams = this.route.params.subscribe((params) => this.fetchUser(params['userId']));
    // const userId = Number(routeParams.get('userId'))

    // this.fetchUser(userId);
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes[])
  }
}
