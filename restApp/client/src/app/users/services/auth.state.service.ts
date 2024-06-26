import { Injectable } from '@angular/core';
import { signal } from '@angular/core';


@Injectable({
    providedIn: 'root'
})

export class AuthStateService {
    logged$ = signal<boolean>(false);
    userName$ = signal<string>('');
    idUser$ = signal<string>('Anonymous')

    setLoggedIn(isLoggedIn: boolean) {
        this.logged$.set(isLoggedIn);
    }
    
    setName(userName: string) {
        this.userName$.set(userName);
    } 

    setId(userId: string) {
        this.idUser$.set(userId)
        console.log(this.idUser$())
    }

}