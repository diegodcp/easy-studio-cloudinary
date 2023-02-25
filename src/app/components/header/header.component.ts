import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DialogComponent } from 'src/app/pages/home/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private imageServ: ImageService
  ) { }

  ngOnInit(): void {
  }

  openPremiumDialog() {
    this.dialog.open(DialogComponent);
  }

  downloadImage() {
    let imgUrl = this.imageServ.getImgUrl();
    console.log(imgUrl);

    this.imageServ.getImage(imgUrl).subscribe(
      (res: any) => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(res);
        a.download = 'easy-studio.png';
        document.body.appendChild(a);
        a.click();
      }
    );
  }

}
