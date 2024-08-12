import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private cachedData: { [ api: string ]: Observable<any> | null} = {};

  // api: string = 'https://reqres.in/api/users?page=';

  constructor(private http: HttpClient) { }

  getData( api: string): Observable<any> {
    // console.log(page)
    if (!this.cachedData[api]) {
      this.cachedData[api] = this.http.get(api).pipe(
        shareReplay(1)
      );
    }
    return this.cachedData[api];
  }

  clearCache(api: string) {
    if(this.cachedData[api]) {
      delete this.cachedData[api];
    }
  }

  
}
