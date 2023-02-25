import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from '../../../environments/environment';

import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
//Cloudinary actions
import { fill, pad, scale, fit, crop } from "@cloudinary/url-gen/actions/resize";
import { source } from "@cloudinary/url-gen/actions/overlay";
import { byAngle } from "@cloudinary/url-gen/actions/rotate"
import { artisticFilter, Effect, pixelate } from "@cloudinary/url-gen/actions/effect";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
//Cloudinary values
import { text } from "@cloudinary/url-gen/qualifiers/source";
import { Position } from "@cloudinary/url-gen/qualifiers/position";
import { TextStyle } from "@cloudinary/url-gen/qualifiers/textStyle";
import { compass, focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { opacity, saturation } from '@cloudinary/url-gen/actions/adjust';

const IntroJs = require('../../../../node_modules/intro.js/intro.js');

@Component({
  selector: 'app-edition',
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.css']
})
export class EditionComponent implements OnInit {
  cld: any;
  publicId:string = '';
  cloudinaryImg!: CloudinaryImage;
  loading:boolean = false;
  
  filter: string = '';
  resizeType: string = 'fit';
  customText:string = '';

  originHeight:number = 0;
  originWidth:number = 0;
  height:number = 0;
  width:number = 0;
  opacity:number = 100;
  radius:number = 0;
  rotation:number = 0;
  saturation:number = 0;
  pixelate:number = 0;

  effects:string[] = ['incognito', 'quartz', 'primavera', 'sepia', 'outline', 'cartoonify', 'vignette'];

  constructor(
    private route: ActivatedRoute,
    private imageServ: ImageService,
    private storageServ: StorageService
  ) { }

  ngOnInit(): void {
    this.getParams();
    this.cloudinaryInit();
    this.executeIntro();
  }

  getParams() {
    this.publicId = this.route.snapshot.paramMap.get('publicId') || '';
    this.originHeight = +(this.route.snapshot.paramMap.get('imageHeight') || 1024);
    this.originWidth = +(this.route.snapshot.paramMap.get('imageWidth') || 1024);

    console.log(this.originHeight);
    console.log(this.originWidth);
    
    this.height = this.originHeight = (this.originHeight > 1024) ? 1024 : this.originHeight;
    this.width = this.originWidth = (this.originWidth > 1024) ? 1024 : this.originWidth;
    
    console.log(this.originHeight);
    console.log(this.originWidth);
  }

  cloudinaryInit() {
    this.cld = new Cloudinary({
      cloud: {
        cloudName:  environment.CLOUDINARY_CLOUD_NAME
      }
    });
    this.callCustomImg();
  }

  executeIntro() {
    let introStorage = JSON.parse(this.storageServ.getLocalStorage('intro')) || null;

    if(!introStorage) {
      this.storageServ.saveLocalStorage('intro', true);
      IntroJs().setOptions({
        steps:  [{
                    element: '#step1',
                    intro: 'Step one description',
                    position: 'right'
                    },
                    {
                      element: '#step2',
                      intro: 'Step one description',
                      position: 'right'
                    }],
                    showBullets: false,
              showButtons: true,
              exitOnOverlayClick: false
      }).start();
    }
  }

  resize(event: any, option:string) {
    if(option=='width')
      this.width = event.value;
    else if(option=='height')
      this.height = event.value;
    this.callCustomImg();
  }

  changeOpacity(event: any) {
    this.opacity = event.value;
    this.callCustomImg();
  }

  changePixel(event: any) {
    this.pixelate = event.value;
    this.callCustomImg();
  }

  rotate(event: any) {
    this.rotation = event.value;
    this.callCustomImg();
  }

  changeSaturation(event: any) {
    this.saturation = event.value;
    this.callCustomImg();
  }

  callCustomImg():void  {
    this.loading = true;
    this.cloudinaryImg = this.cld.image(this.publicId);
    
    //scale not maintain the ratio, .aspectRatio("1.0")

    if(this.resizeType=='fit')
      this.cloudinaryImg.resize(fit().width(this.width).height(this.height));
    else if(this.resizeType=='fill')
      this.cloudinaryImg.resize(fill().width(this.width).height(this.height));
    else if(this.resizeType=='crop')
      this.cloudinaryImg.resize(crop().width(this.width).height(this.height));

    if(this.pixelate > 0)
      this.cloudinaryImg.effect(pixelate().squareSize(this.pixelate));
      
    if(this.saturation != 0)
      this.cloudinaryImg.adjust(saturation().level(this.saturation));

    this.cloudinaryImg
      .roundCorners(byRadius(this.radius))
      .adjust(opacity(this.opacity))    
      .backgroundColor('#373a3d')
      .rotate(byAngle(this.rotation));

    //.position(new Position().gravity(compass('north')).offsetY(20)))
    //.adjust(hue(-20))
    
    //.border(solid(5, "red")); put a frame, border

    // .roundCorners(max())
    // .effect(outline().mode(outer()).width(100).color('lightblue'))
    // .backgroundColor('lightblue')

    this.addText(this.cloudinaryImg);
    this.addFilters(this.cloudinaryImg);

    this.loading = false;
    this.imageServ.setImgUrl(this.cloudinaryImg.toURL());
  }

  addText(img: CloudinaryImage) {
    let textColor = 'white';
    if(this.customText) {
      // text('Love', new TextStyle('Cookie',40)
      // .fontWeight('bold'))
      img.overlay(
        source(
          text(this.customText, new TextStyle('arial',24))
          .textColor(textColor)
        )
      );
    }
  }

  addFilters(img: CloudinaryImage) {
    const {sepia, outline, cartoonify, vignette} = Effect;
    
    switch(this.filter) { 
      case 'sepia': { 
        img.effect(sepia());
        break; 
      } 
      case 'outline': {
        img.effect(outline());
        break; 
      } 
      case 'cartoonify': {
        img.effect(cartoonify());
        break; 
      }
      case 'vignette': {
        img.effect(vignette());
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
        img.effect(artisticFilter(this.filter));
        break; 
      } 
      default: { 
          break; 
      }
     }
  }

  callFiltersImg(filter:string):void  {
    this.filter = filter;
    this.callCustomImg();
  }

  cropImage(cropType: string):void {
    switch(cropType) { 
      case 'rectangle': {
        this.resizeType = 'fill';
        this.height = Math.round(this.originHeight/3);
        this.width = this.originWidth;
        break; 
      } 
      case 'square': {
        this.resizeType = 'fit';
        this.height = (this.originHeight>this.originWidth) ? this.originHeight : this.originWidth;
        this.width = (this.originHeight>this.originWidth) ? this.originHeight : this.originWidth;
        break; 
      } 
      case 'portrait': {
        this.resizeType = 'fill';
        this.height = this.originHeight;
        this.width = Math.round(this.originWidth/2);
        break; 
      }
      case 'face': { 
        this.resizeType = 'fit';
        //.gravity(focusOn(FocusOn.face())))
        break; 
      } 
      default: { 
          break; 
      }
     }
     this.callCustomImg();
  }

  setCustomText(event: any):void {
    this.customText = event.target.value;
    this.callCustomImg();
  }

}
