import {Pipe, PipeTransform} from '@angular/core';
import {Cloudinary, CloudinaryImage} from "@cloudinary/url-gen";
import { Effect } from '@cloudinary/url-gen/actions';
import { artisticFilter } from '@cloudinary/url-gen/actions/effect';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'getImg'
})
export class ImagePipe implements PipeTransform {

  private with: number = 150;
  private height: number = 150;
  private radius: number = 10;

  constructor(
  ) { }

  transform(publicId: string, filter: string): CloudinaryImage {
    let cld = new Cloudinary({
      cloud: {
        cloudName:  environment.CLOUDINARY_CLOUD_NAME
      }
    });

    let filterCloudImg = cld.image(publicId).resize(fill().width(60).height(80));
    
    const {sepia, outline, cartoonify, vignette} = Effect;
    switch(filter) { 
      case 'sepia': { 
        filterCloudImg.effect(sepia());
          break; 
      } 
      case 'cartoonify': { 
        filterCloudImg.effect(cartoonify());
          break; 
      } 
      case 'outline': { 
        filterCloudImg.effect(outline());
          break; 
      }
      case 'vignette': { 
        filterCloudImg.effect(vignette());
          break; 
      } 
      case 'zorro':
      case 'quartz':
      case 'incognito':
      case 'primavera':
      case 'ukelele':
      case 'eucalyptus':
      case 'fes':
      case 'audrey': { 
        filterCloudImg.effect(artisticFilter(filter));
        break; 
      } 
      default: { 
          break; 
      }
     } 

    return filterCloudImg;
  }
  
}