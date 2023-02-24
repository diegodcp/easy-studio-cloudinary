import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  defaultImage = '';
  image = 'https://res.cloudinary.com/dsemrnx2w/image/upload/v1677243469/mini_studio/happy_ifzoyk.gif';

  constructor() { }

  ngOnInit(): void {
  }

}
