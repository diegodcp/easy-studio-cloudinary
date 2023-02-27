import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';
import { StorageService } from 'src/app/services/storage.service';
import { IntroJsUtil } from 'src/app/utils/introjs';

import { CloudinaryImage, Transformation } from '@cloudinary/url-gen';
//Cloudinary actions
import { fill, pad, scale, fit, crop } from "@cloudinary/url-gen/actions/resize";
import { source } from "@cloudinary/url-gen/actions/overlay";
import { byAngle } from "@cloudinary/url-gen/actions/rotate"
import { artisticFilter, Effect, pixelate } from "@cloudinary/url-gen/actions/effect";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { autoBrightness, autoContrast, brightness, contrast, opacity, saturation } from '@cloudinary/url-gen/actions/adjust';
//Cloudinary values
import { text } from "@cloudinary/url-gen/qualifiers/source";
import { Position } from "@cloudinary/url-gen/qualifiers/position";
import { TextStyle } from "@cloudinary/url-gen/qualifiers/textStyle";
import { autoGravity, compass, focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { face, FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";


@Component({
  selector: 'app-edition',
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.css']
})
export class EditionComponent implements OnInit {
  publicId:string = '';
  cloudinaryImg!: CloudinaryImage;
  originalCloudinaryImg!: CloudinaryImage;
  loading:boolean = false;
  showWand:boolean = false;
  resizeError:boolean = false;
  showOriginalImage:boolean=false;
  
  filter: string = '';
  resizeType: string = 'fit';
  aspectRatio: string = '1.1';
  customText:string = '';
  customTextPosition:string = 'center';

  originHeight:number = 0;
  originWidth:number = 0;
  height:number = 0;
  width:number = 0;
  opacity:number = 100;
  radius:number = 0;
  rotation:number = 0;
  saturation:number = 0;
  pixelate:number = 0;
  brightness:number = 0;
  contrast:number = 0;

  effects:string[] = ['incognito', 'quartz', 'primavera', 'sepia', 'outline', 'cartoonify', 'vignette'];

  constructor(
    private route: ActivatedRoute,
    private imageServ: ImageService,
    private storageServ: StorageService,
    private introJS: IntroJsUtil
  ) { }

  ngOnInit(): void {
    this.getParams();
    this.cloudinaryImg = this.imageServ.cloudinaryInit(this.publicId);
    this.originalCloudinaryImg = this.cloudinaryImg;
    this.executeIntro();
  }

  getParams() {
    this.publicId = this.route.snapshot.paramMap.get('publicId') || '';
    this.originHeight = +(this.route.snapshot.paramMap.get('imageHeight') || 1024);
    this.originWidth = +(this.route.snapshot.paramMap.get('imageWidth') || 1024);

    this.height = this.originHeight = (this.originHeight > 1024) ? 1024 : this.originHeight;
    this.width = this.originWidth = (this.originWidth > 1024) ? 1024 : this.originWidth;
  }

  executeIntro() {
    let introStorage = JSON.parse(this.storageServ.getLocalStorage('intro')) || null;
    if(!introStorage) {
      this.storageServ.saveLocalStorage('intro', true);
      this.introJS.initIntroJS();
    }
  }

  callCustomImg():void  {
    this.loading = true;
    let image = this.imageServ.cloudinaryInit(this.publicId);

    image.adjust(opacity(this.opacity))
      .rotate(byAngle(this.rotation))
      .backgroundColor('#373a3d')
      .roundCorners(byRadius(this.radius));

    if(this.brightness>0)
      image.adjust(brightness().level(this.brightness));
    if(this.contrast>0)
      image.adjust(contrast().level(this.contrast));

    if(this.pixelate > 0)
      image.effect(pixelate().squareSize(this.pixelate));
    if(this.saturation != 0)
      image.adjust(saturation().level(this.saturation));

    if(this.resizeType=='fit')
      image.resize(fit().width(this.width).height(this.height).aspectRatio(this.aspectRatio));
    else if(this.resizeType=='fill')
      image.resize(fill().gravity(autoGravity()).width(this.width).height(this.height).aspectRatio(this.aspectRatio));
    else if(this.resizeType=='crop')
      image.resize(crop().gravity(focusOn(face())).width(this.width).height(this.height).aspectRatio(this.aspectRatio));
    
    this.addText(image);

    //.adjust(hue(-20))
    //.border(solid(5, "red")); put a frame, border

    this.cloudinaryImg = this.addFilters(image);
    this.imageServ.setImgUrl(this.cloudinaryImg.toURL());
  }
  
  setImageLoaded(){
    this.loading = false;
  }

  resize(event: any, option:string) {
    if(event.target.value >= 1 && event.target.value <= 1024){
      this.resizeError = false;
      if(option=='width')
        this.width = event.target.value;
      else if(option=='height')
        this.height = event.target.value;
    } else {
      this.resizeError = true;
    }
  }

  changeOpacity(event: any) {
    this.opacity = event.value;
  }

  changePixel(event: any) {
    this.pixelate = event.value;
  }

  rotate(event: any) {
    this.rotation = event.value;
  }

  changeSaturation(event: any) {
    this.saturation = event.value;
  }

  setCustomText(event: any) {
    this.customText = event.target.value;
  }
  setCustomTextPosition(position: string) {
    this.customTextPosition = position;
  }

  round(event: any) {
    this.radius = event.value;
  }
  
  changeBrightness(event: any) {
    this.brightness = event.value;
  }
  
  changeContrast(event: any) {
    this.contrast = event.value;
  }

  addText(image: CloudinaryImage) {
    let textColor = 'white';
    let textSize = (this.width<300) ? 20 : ((this.width<500) ? 40 : (this.width<800) ? 60 : 80);

    if(this.customText) {
      image.overlay(
        source(
          text(this.customText, 
            new TextStyle('arial',textSize)
            .fontWeight('bold'))
          .textColor(textColor)
          .transformation(new Transformation())
        )
        .position(new Position().gravity(compass(this.customTextPosition)).offsetY(20))
      );
    }
  }

  addFilters(img: CloudinaryImage): CloudinaryImage {
    const {sepia, outline, cartoonify, vignette} = Effect;
    switch(this.filter) { 
      case 'sepia': { 
        img.effect(sepia());
        break; 
      } 
      case 'outline': {
        // .effect(outline().mode(outer()).width(100).color('lightblue'))
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
     return img;
  }

  callFiltersImg(filter:string):void  {
    this.filter = filter;
    this.callCustomImg();
  }

  cropImage(cropType: string):void {
    switch(cropType) { 
      case 'rectangle': {
        this.resizeType = 'fill';
        this.height = Math.round(this.originHeight/2);
        this.width = this.originWidth;
        this.aspectRatio = '16.9';
        break; 
      } 
      case 'square': {
        this.resizeType = 'fit';
        this.height = (this.originHeight>this.originWidth) ? this.originHeight : this.originWidth;
        this.width = (this.originHeight>this.originWidth) ? this.originHeight : this.originWidth;
        this.aspectRatio = '1.1';
        break; 
      } 
      case 'portrait': {
        this.resizeType = 'fill';
        this.height = this.originHeight;
        this.width = Math.round(this.originWidth/1.5);
        this.aspectRatio = '4.3';
        break; 
      }
      case 'face': { 
        this.resizeType = 'crop';
        this.height = this.originHeight;
        this.width = this.originWidth;
        this.aspectRatio = '1.1';
        break; 
      } 
      default: { 
          break; 
      }
     }
     this.callCustomImg();
  }

  magicOptimize(): void{
    this.loading = true;
    this.showWand = true;
    
    (async () => { 
      await new Promise(resolve => setTimeout(resolve, 2000));
      this.showWand = false;
      this.cloudinaryImg = this.imageServ.cloudinaryInit(this.publicId);
      this.cloudinaryImg.format('auto')
        .quality('auto')
        .adjust(autoContrast())
        .adjust(autoBrightness());
    })();

    this.loading = false;
  }

  loadOriginalImage(press: boolean) {
    this.showOriginalImage = press;
  }


}
