import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DialogComponent } from 'src/app/pages/home/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openPremiumDialog() {
    this.dialog.open(DialogComponent);
  }

}
