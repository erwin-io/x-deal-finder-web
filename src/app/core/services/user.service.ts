import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ApiResponse } from '../model/api-response.model';
import { environment } from '../../../environments/environment';
import { IServices } from './interface/iservices';
import { AppConfigService } from './app-config.service';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService implements IServices {

  constructor(private http: HttpClient, private appconfig: AppConfigService) { }

  getAllAdminUserType(): Observable<ApiResponse<User[]>> {
    return this.http.get<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.user.getAllAdminUserType)
    .pipe(
      tap(_ => this.log('user')),
      catchError(this.handleError('user', []))
    );
  }

  getAllClientUserType(): Observable<ApiResponse<User[]>> {
    return this.http.get<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.user.getAllClientUserType)
    .pipe(
      tap(_ => this.log('user')),
      catchError(this.handleError('user', []))
    );
  }

  getById(userId: string): Observable<any> {
    return this.http.get<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.user.getById + userId)
    .pipe(
      tap(_ => this.log('user')),
      catchError(this.handleError('user', []))
    );
  }

  update(data: any): Observable<ApiResponse<User>> {
    return this.http.put<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.user.update, data)
    .pipe(
      tap(_ => this.log('user')),
      catchError(this.handleError('user', []))
    );
  }

  updatePassword(data: any): Observable<ApiResponse<User>> {
    return this.http.put<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.user.updatePassword, data)
    .pipe(
      tap(_ => this.log('user')),
      catchError(this.handleError('user', []))
    );
  }

  toggleLock(data: any): Observable<ApiResponse<User>> {
    return this.http.put<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.user.toggleLock, data)
    .pipe(
      tap(_ => this.log('user')),
      catchError(this.handleError('user', []))
    );
  }

  approvedAdminUser(data: any): Observable<ApiResponse<User>> {
    return this.http.put<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.user.approveAdminUser, data)
    .pipe(
      tap(_ => this.log('user')),
      catchError(this.handleError('user', []))
    );
  }

  // createClient(data: any): Observable<ApiResponse<Staff>> {
  //   return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.user.createClient, data)
  //   .pipe(
  //     tap(_ => this.log('user')),
  //     catchError(this.handleError('user', []))
  //   );
  // }

  // createStaff(data: any): Observable<ApiResponse<Staff>> {
  //   return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.user.createStaff, data)
  //   .pipe(
  //     tap(_ => this.log('user')),
  //     catchError(this.handleError('user', []))
  //   );
  // }

  // udpdateClient(data: any): Observable<ApiResponse<Client>> {
  //   return this.http.put<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.user.udpdateClient, data)
  //   .pipe(
  //     tap(_ => this.log('user')),
  //     catchError(this.handleError('user', []))
  //   );
  // }

  // udpdateStaff(data: any): Observable<ApiResponse<Staff>> {
  //   return this.http.put<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.user.udpdateStaff, data)
  //   .pipe(
  //     tap(_ => this.log('user')),
  //     catchError(this.handleError('user', []))
  //   );
  // }

  // toggleEnable(data: any): Observable<ApiResponse<Staff>> {
  //   return this.http.put<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.user.toggleEnable, data)
  //   .pipe(
  //     tap(_ => this.log('user')),
  //     catchError(this.handleError('user', []))
  //   );
  // }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${Array.isArray(error.error.message) ? error.error.message[0] : error.error.message}`);
      return of(error.error as T);
    };
  }

  log(message: string) {
    console.log(message);
  }
}
