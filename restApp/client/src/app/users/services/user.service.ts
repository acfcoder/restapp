import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User } from '../user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httpClient = inject(HttpClient);
  private baseUrl: string;
  users$ = signal<User[]>([]);

    constructor() {
        this.baseUrl = 'http://localhost:5300/api/';
    }

    register(formValue: any) {
      return firstValueFrom(
        this.httpClient.post<any>(`${this.baseUrl}user/register`, formValue)
      )
    };

    login( formValue: any) {
      return firstValueFrom(
        this.httpClient.post<any>(`${this.baseUrl}login`, formValue)
      )
    };

    private refreshUsers() {
      this.httpClient.get<User[]>(`${this.baseUrl}/admin/users`)
        .subscribe(users => {
          this.users$.set(users)
        })
    }

  getUsers(){
    this.refreshUsers();
    return this.users$();
  } 
}
