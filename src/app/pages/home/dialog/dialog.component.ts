import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  defaultImage = '';
  image = 'https://res.cloudinary.com/'+environment.CLOUDINARY_CLOUD_NAME+'/image/upload/v1677243469/mini_studio/happy_ifzoyk.gif';

  constructor() { }

  ngOnInit(): void {
  }

}
