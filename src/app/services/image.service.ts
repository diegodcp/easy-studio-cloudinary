import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  imgUrl:string = '';

  constructor(
    private http: HttpClient
  ) { }

  getImage(imageUrl: string) {
    return this.http.get(imageUrl, {observe: 'response', responseType: 'blob'})
    .pipe(
      map((res: any) => {
        return new Blob([res.body], {type: res.headers.get('Content-Type')});
      })
    );
  }

  setImgUrl(imgUrl: string) {
    this.imgUrl = imgUrl;
  }

  getImgUrl(): string{
    return this.imgUrl;
  }

}
