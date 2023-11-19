import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from "rxjs";
import { map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { User } from '../_models';



export interface AuthReqData {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
};



@Injectable({ providedIn: 'root' })

export class AccountService {
  public isLoggedIn: boolean;
   userSubject = new BehaviorSubject<User | null>(null);
  public user: Observable<User | null>;
  private tokenExpTimer: any;



  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();

  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(`${environment.SIGN_IN_URL + environment.AUTH_API_KEY}`, { email, password, returnSecureToken: true})
    .pipe(tap((res) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      const { email, localId, idToken, expiresIn} = res;
      this.handleAuth(email, localId, idToken, +expiresIn);

      // this.userSubject.next();


    }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.isLoggedIn = false;
    this.router.navigate(['/account/login']);
  }

  // register(user: User) {
  //   return this.http.post(`${environment.apiUrl}/users/register`, user);
  // }

  register(email:string, password:string) {

    // this.saveUser(user)
    return this.http.post<AuthResponseData>(environment.SIGN_UP_URL + environment.AUTH_API_KEY, {email, password, returnSecureToken: true})
    .pipe(
      tap((res) => {
        const { email, localId, idToken, expiresIn } = res;

        this.handleAuth(email, localId, idToken, +expiresIn);




      })
    )

    // this.http.post(`${environment.apiUrl}/users/register`, user)
  }

  autoSignInFromLocalStorage() {
    const userData = localStorage.getItem('userData');

    if(!userData) return;

    const lsUser: {
      id: string;
      email: string;
      _token: string;
      _tokenExpDate: string;
    } = JSON.parse(userData);

    const newUser = new User(
      lsUser.id,
      lsUser.email,
      lsUser._token,
      new Date(lsUser._tokenExpDate)
    );

    if (newUser.token) {
      this.userSubject.next(newUser);

      const expDuration =
      new Date(lsUser._tokenExpDate).getTime() - new Date().getTime();
      this.autoSignOut(expDuration);
    }
  }

  autoSignOut(expDuration: number) {
    this.tokenExpTimer = setTimeout(() => {
      this.logout();
    }, expDuration);
  }





  saveUser(user: User) {
    return this.http.post(`${environment.apiUrl}/users/register.json`, user)
  }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  getById(id: string) {
    // console.log("user:", this.http.get<User>(`${environment.apiUrl}/users/${id}`))
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }

  update(id: string, params: any) {
    return this.http.put(`${environment.apiUrl}/users/${id}`, params)
    .pipe(map(x => {
      // update stored user if the logged in user updated their own record
      if (id == this.userValue?.id) {
        // update local storage
        const user = { ...this.userValue, ...params };
        localStorage.setItem('user', JSON.stringify(user));

        // publish updated user to subscribers
        this.userSubject.next(user);
      }
      return x;
    }));
  }

  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`)
    .pipe(map(x => {
      // auto logout if the logged in user deleted their own record
      if ( id == this.userValue?.id) {
        this.logout();
      }
      return x;
    }));
  }

  private handleAuth(
    email: string,
    userId: string,
    token: string,
    expiresIn: number,
    ) {
      const expDate= new Date(new Date().getTime() + expiresIn * 1000);

      console.log('expDate:', expDate);

      const newUser = new User(userId, email, token, expDate);

      this.userSubject.next(newUser);

      this.autoSignOut(expiresIn *1000);

      localStorage.setItem('userData', JSON.stringify(newUser))
    }


  }
