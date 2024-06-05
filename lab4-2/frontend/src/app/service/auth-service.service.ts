import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private token = '';
  private isLoggedIn: boolean = false

  constructor() {
    const i = localStorage.getItem('token')
    if (i !== null) {
      this.token = i
      this.isLoggedIn = true
    }
  }
  updatetToken(newToken: string): void {
    this.token = newToken;
    this.isLoggedIn = true;
    localStorage.setItem('token', newToken)
  }

  getToken():string {
    return this.token;
  }

  getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }
  logOut(): void {
    localStorage.removeItem('token');
    this.token = '';
    this.isLoggedIn = false;
  }


}
