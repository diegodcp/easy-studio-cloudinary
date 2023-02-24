import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UploadService } from '../../services/upload.service';
import { Router } from '@angular/router';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UploadService],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  files: File[] = [];
  loadImage: boolean = false;

  constructor(
    private snackBar: MatSnackBar,
    private UploadServ: UploadService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadImage = false;
  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  onUpload() {
    this.loadImage = true;
    if(!this.files[0]) {
      this.snackBar.open("Select a image, please.", "", {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 5000,
        panelClass: ['danger-snackbar']
      });
      this.loadImage = false;
      return;
    }

    const file_data = this.files[0];
    const data = new FormData();

    data.append('file', file_data);
    data.append('upload_preset', 'angular_cloudinary');
    data.append('cloud_name', 'dsemrnx2w');

    this.UploadServ.uploadImage(data).subscribe( response => {
      if(response){
        // console.log(response);
        this.router.navigate(['/edition', { publicId: response.public_id, imageWidth: response.width, imageHeight: response.height }]);
        this.loadImage = false;
      }
    });
  }

  openPremiumDialog() {
    this.dialog.open(DialogComponent);
  }

}
