import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { setFetchMethod, enable as enableDarkMode, disable as disableDarkMode } from 'darkreader';

@Component({
  selector: 'app-darkbutton',
  templateUrl: './darkbutton.component.html',
  styleUrls: ['./darkbutton.component.css']
})
export class DarkbuttonComponent {
  active:boolean
  constructor(@Inject(DOCUMENT) private document: Document) {
    this.active = localStorage.getItem('dark') === 'true'
    setFetchMethod(window.fetch)
    if(this.active){
      this.dark()
    }
    else{
      this.light()
    }
  }

  isDark(){
    return this.active
  }

  isLight(){
    return !this.active
  }

  modeToggle() {
    if (this.active || this.document.querySelector('body')?.classList.contains('dark-mode')) {
      this.light()
    }
    else {
      this.dark()
    }
    this.active = !this.active
  }

  dark() {
    enableDarkMode({
      brightness: 100,
      contrast: 100,
      sepia: 0
    })
    localStorage.setItem('dark','true')
  }

  light() {
    disableDarkMode()
    localStorage.setItem('dark','false')
  }

}