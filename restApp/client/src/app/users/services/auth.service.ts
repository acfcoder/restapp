import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



const baseUrl: string = 'http://localhost:5300/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) {}

  login(mail: any, pass: any)
  {
    try{
      return this.http.post( baseUrl + 'login', { 
          mail,
          pass
        }, 
          httpOptions
        );
      }
    catch {
      return console.log('Problem login authService');
    }  

    }
    

  register(formValue: any ): Observable<any>
  {
    return this.http.post( 
      baseUrl + 'user/register',
      {
        formValue
      },
      httpOptions
    );
  }

  logout() {
    localStorage.removeItem('access-token');
    return this.http.post( 
      baseUrl + 'logout',
      {},httpOptions
    );
  }
}