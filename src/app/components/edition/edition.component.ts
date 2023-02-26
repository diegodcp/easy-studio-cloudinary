import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';
import { StorageService } from 'src/app/services/storage.service';

import { CloudinaryImage, Transformation } from '@cloudinary/url-gen';
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
import { autoGravity, compass, focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { face, FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { autoBrightness, autoContrast, brightness, contrast, opacity, saturation } from '@cloudinary/url-gen/actions/adjust';
import { delay } from 'rxjs';

const IntroJs = require('../../../../node_modules/intro.js/intro.js');

@Component({
  selector: 'app-edition',
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.css']
})
export class EditionComponent implements OnInit {
  publicId:string = '';
  cloudinaryImg!: CloudinaryImage;
  loading:boolean = false;
  showWand:boolean = false;
  
  filter: string = '';
  resizeType: string = 'fit';
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
    private storageServ: StorageService
  ) { }

  ngOnInit(): void {
    this.getParams();
    this.cloudinaryImg = this.imageServ.cloudinaryInit(this.publicId);
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
      IntroJs().setOptions({
        steps:  [{
                    element: '#step1',
                    intro: 'Select the layout you prefer, for example \'Portrait\' for your social media.',
                    title: 'Step 1',
                    position: 'bottom'
                  },
                  {
                    element: '#step2',
                    intro: 'Resize, change the opacity, the saturation, add overlay text and much more!'+
                     ' But if you want we can do all for you, just click on the \'Magic button\' to get the best format and quality.',
                    title: 'Step 2',
                    position: 'bottom'
                  },
                  {
                    element: '#step3',
                    intro: 'After changes click the button to make them take effect.',
                    title: 'Step 3',
                    position: 'right'
                  },
                  {
                    element: '#step4',
                    intro: 'In this section you have several options to apply amazing filters.',
                    title: 'Step 3',
                    position: 'top'
                  },
                  {
                    element: '#step5',
                    intro: 'Once your image is beautiful and perfect, click the \'Download image\' button at the right-top.',
                    title: 'Step 4',
                    position: 'right'
                  }],
                  showBullets: false,
                  showButtons: true,
                  exitOnOverlayClick: false
      }).start();
    }
  }

  callCustomImg():void  {
    this.loading = true;
    console.log(this.loading);
    
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

    //.aspectRatio("1.0")
    if(this.resizeType=='fit')
      image.resize(fit().width(this.width).height(this.height));
    else if(this.resizeType=='fill')
      image.resize(fill().gravity(autoGravity()).width(this.width).height(this.height));
    else if(this.resizeType=='crop')
      image.resize(crop().gravity(focusOn(face())).width(this.width).height(this.height));
    
    this.addText(image);

    //.adjust(hue(-20))
    //.border(solid(5, "red")); put a frame, border

    this.cloudinaryImg = this.addFilters(image);

    console.log(this.cloudinaryImg);
    this.imageServ.setImgUrl(this.cloudinaryImg.toURL());
    this.loading = false;
  }

  resize(event: any, option:string) {
    if(option=='width')
      this.width = event.value;
    else if(option=='height')
      this.height = event.value;
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
    if(this.customText) {
      image.overlay(
        source(
          text(this.customText, 
            new TextStyle('arial',80)
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
        this.resizeType = 'crop';
        this.height = Math.round(this.originHeight/2);
        this.width = Math.round(this.originWidth/2);
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


}
