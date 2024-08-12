import { Component, SimpleChanges,  OnChanges} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from '../../states/appState.interface';
import { Observable } from 'rxjs';
import { User } from '../../../types';
import { searchedUsersSelector, usersSelector } from '../../states/selectors/selectors';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  users$!: User[];
  inputValue!: string;
  searchResultUser!: any;
  searchResultName: string = '';


  constructor(private store: Store<AppStateInterface>) {
    this.store.select(searchedUsersSelector).subscribe((users) => {
      this.users$ = users;
      console.log(users)
    });
  }
  
  // ngOnChanges(changes: SimpleChanges) {
  //   console.log("changes detected");
  //   console.log(this.users$.filter((user) => user.id !== +this.inputValue))
  // }

  change(event: any) {
    this.inputValue = event.target.value; 
    this.searchResultUser = this.users$.filter((user) => user.id == +this.inputValue)[0] 
    this.inputValue.length != 0 ?
    this.searchResultName = this.searchResultUser ? this.searchResultUser.first_name : "User not found" : this.searchResultName = ""
    console.log(this.searchResultUser)
  }

  onClick() {
    this.inputValue = '';
    this.searchResultUser = null
  }

}
