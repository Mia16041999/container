import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuNavBarComponent } from './menu-nav-bar/menu-nav-bar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ankiclone';
  constructor() {

  }
  ngOnInit(): void {

  }
  ngOnDestroy() {

  }
}
