import { Injectable } from '@angular/core';
import { signal } from '@angular/core';


@Injectable({
    providedIn: 'root'
})

export class AuthStateService {
    logged$ = signal<boolean>(false);
    userName$ = signal<string | undefined>('');

    setLoggedIn(isLoggedIn: boolean) {
        this.logged$.set(isLoggedIn);
        console.log (this.logged$());
    }
    
    setName(userName: string | undefined) {
        this.userName$.set(userName);
        console.log(this.userName$());
    } 

}