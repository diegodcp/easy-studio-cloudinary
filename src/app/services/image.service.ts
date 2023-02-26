import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  imgUrl:string = '';
  cld!: Cloudinary;
  image!: CloudinaryImage;


  constructor(
    private http: HttpClient
  ) { }

  getImageByUrl(imageUrl: string) {
    return this.http.get(imageUrl, {observe: 'response', responseType: 'blob'})
    .pipe(
      map((res: any) => {
        return new Blob([res.body], {type: res.headers.get('Content-Type')});
      })
    );
  }

  getImgUrl(): string{
    return this.imgUrl;
  }
  setImgUrl(imgUrl: string) {
    this.imgUrl = imgUrl;
  }

  cloudinaryInit(publicId: string): CloudinaryImage {
    this.cld = new Cloudinary({
      cloud: {
        cloudName:  environment.CLOUDINARY_CLOUD_NAME
      }
    });
    this.image = this.cld.image(publicId);
    return this.image;
  }

  getImage(): CloudinaryImage{
    return this.image;
  }
  setImage(image: CloudinaryImage){
    this.image = image;
  }

  

}
