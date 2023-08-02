import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { LoginResponseI, UserI } from '../../public.interfaces';

export const snackBarConfig: MatSnackBarConfig = {
  duration:2500,
  horizontalPosition: 'right',
  verticalPosition: 'top'
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient,
    private snackBar : MatSnackBar,
  ) { }

  login(user : UserI): Observable<LoginResponseI>{
    return this.httpClient.post<LoginResponseI>('api/users/login',user)
    .pipe(
      tap((res:LoginResponseI) => localStorage.setItem('nest_todo_app',res.access_token)),
      tap(() => this.snackBar.open('Login Successfull','Close',snackBarConfig)),
      catchError( e => {
        this.snackBar.open(`User could not be created : ${e.error.message}`,'Close',snackBarConfig);
        return throwError(e);
      })
    )
  }

  register(user : UserI): Observable<UserI>{
    return this.httpClient.post<UserI>('api/users',user).pipe(
      tap((createdUser:UserI) => this.snackBar.open(`User ${createdUser.username} was created`,'Close',snackBarConfig)),
      catchError( e => {
        this.snackBar.open(`${e.error.message}`,'Close',snackBarConfig);
        return throwError(e);
      })
    )
  }
}
