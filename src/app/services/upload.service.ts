import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
    private http: HttpClient
  ) { }

  uploadImage(data: FormData): Observable<any> {
    return this.http
    .post<any>(environment.CLOUDINARY_API, data)
    .pipe(
      map( (response: any) => {
        return response;
      }),
      catchError( (err) => this.handlerError(err))
    );
  }
  
  private handlerError(err: { message: any; status: any; }): Observable<never> {
    let errorMessage:string = 'An error ocurred retriving data from Cloudinary';
    let errorStatus:string = '';
    if(err){
      errorMessage = `Error: code ${err.message}`;
      errorStatus = err.status;
    }
    return throwError({message: errorMessage, code: errorStatus});
  }

}
