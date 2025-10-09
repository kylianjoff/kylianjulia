import { Component } from '@angular/core';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-about',
  imports: [NgIf],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {
  menuCV: boolean = false;

  toggleMenuCV() {
    this.menuCV = !this.menuCV;
  }
}
