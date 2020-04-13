import { Injectable } from '@angular/core';
import { AuthModel } from './auth.model';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    
  private isAuthenticated: boolean = false;
  private authStatusListener = new Subject<boolean>();
  
  constructor(private router: Router) { }

  login(formGroup: FormGroup) {
    const authData: AuthModel = formGroup.value;
    this.isAuthenticated = true;
    this.authStatusListener.next(true);
    const now = new Date();
    const expirationDate = new Date(now.getTime() + 12000);
    this.saveAuthData(btoa(formGroup.value), btoa(authData.username), expirationDate);
    this.router.navigate(['exchange/list']);
  }

  logout() {
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearAuthData();
    this.router.navigate(['']);
  }

  private saveAuthData(token: string, username: string, expirationDate) {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', username);
    sessionStorage.setItem('expire', expirationDate.toISOString());
  }

  private clearAuthData() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('expire');
  }
  
  public getIsAuthenticated() {
    const token = sessionStorage.getItem('token');
    const expiration = new Date(sessionStorage.getItem('expire'));
    const user = sessionStorage.getItem('user');
    if (!token || !expiration || !user) {
      return false;
    }
    const now = new Date();
    const expiresIn = expiration.getTime() - now.getTime();
    if (expiresIn > 0) {
      return true;
    } else {
      this.clearAuthData();
      return false;
    }
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  getAuthStatusListner() {
    return this.authStatusListener.asObservable();
  }
}
