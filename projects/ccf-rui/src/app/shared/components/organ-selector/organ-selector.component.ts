import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ccf-organ-selector',
  templateUrl: './organ-selector.component.html',
  styleUrls: ['./organ-selector.component.scss']
})
export class OrganSelectorComponent implements OnInit {

  moveLeft = false;
  moveRight = false;

  constructor() { }

  ngOnInit(): void {
  }

  shiftLeft(): void {
    this.moveLeft = true;
    const element = document.getElementsByClassName('carousel-item-list')[0] as HTMLElement;
    const val=(parseInt(element.style.left, 10) || 0) - 40;
    element.style.left =  val+'px';
    // element.style.transform = 'translate(-40px,0)';
    element.style.transition = 'all .5s ease-in-out';
    console.log(element.style.left)
  }
  shiftRight(): void {
    this.moveRight = true;
    const element = document.getElementsByClassName('carousel-item-list')[0] as HTMLElement;
    const val=(parseInt(element.style.left, 10) || 0) + 40;
    element.style.left =  val+'px';
    console.log(element.style.left)
  }

}
