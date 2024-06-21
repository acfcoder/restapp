import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User } from '../user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httpClient = inject(HttpClient);
  private baseUrl: string;

    constructor() {
        this.baseUrl = 'http://localhost:5300/api/';
    }

    register(formValue: any) {
      return firstValueFrom(
        this.httpClient.post<any>(`${this.baseUrl}user/new`, formValue)
      )
    }

}
