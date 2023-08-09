import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { MatSnackBar,  MatSnackBarConfig} from "@angular/material/snack-bar";
import {LoginResponseI, UserI} from "../../public.interfaces";
import {catchError, Observable, tap, throwError} from "rxjs";
import {LOCALSTORAGE_KEY_NESTJS_TODO_APP} from "../../../app.module";
import {JwtHelperService} from "@auth0/angular-jwt";

export const snackBarConfig: MatSnackBarConfig = {
  duration: 2500,
  horizontalPosition: 'right',
  verticalPosition: 'top'
};

export interface RequestModel {
  path: string;
  user: UserI;
  headers: {
    'Content-Type': string;
    'Authorization': string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'http://localhost:3000';
  

  constructor(
    private httpClient: HttpClient,
    private snackbar: MatSnackBar,
    private jwtService: JwtHelperService
  ) { }

  login(user: UserI): Observable<LoginResponseI> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
  
    return this.httpClient.post<LoginResponseI>(`${this.apiUrl}/api/users/login`, user, httpOptions).pipe(
      tap((res: LoginResponseI) => {
        localStorage.setItem(LOCALSTORAGE_KEY_NESTJS_TODO_APP, res.access_token);
      }),
      tap(() => this.snackbar.open('Login Successful', 'Close', snackBarConfig)),
      catchError(e => {
        this.snackbar.open(`${e.error.message}`, 'Close', snackBarConfig);
        return throwError(e);
      })
    );
  }
  
  register(user: UserI): Observable<UserI> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  
    return this.httpClient.post<UserI>(`${this.apiUrl}/api/users`, user, httpOptions).pipe(
      tap((createdUser: UserI) => this.snackbar.open(`User ${createdUser.username} was created`, 'Close', snackBarConfig)),
      catchError(e => {
        this.snackbar.open(`User could not be created because: ${e.error.message}`, 'Close', snackBarConfig);
        return throwError(e);
      })
    );
  }

  getLoggedInUser() {
    const decodedToken = this.jwtService.decodeToken();
    return decodedToken.user;
  }
}
