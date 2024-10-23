import {
  Component,
  HostBinding,
  HostListener,
  input,
  ViewEncapsulation,
  viewChild,
  ElementRef,
  inject, contentChild, afterRender, afterNextRender
} from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'control',
    '(click)': 'onClick()'
  }
})
export class ControlComponent {
  // @HostBinding('class') className = 'control'; Legacy to bind attributes using host
  // @HostListener('click')
  // onClick() {
  //  console.log('Clicked!');
  // }
  label = input.required<string>();
  private el = inject(ElementRef);
  private control = contentChild.required<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('input');

  constructor() {
    afterRender(() => {

    });
    afterNextRender(() => {

    });
  }

  onClick() {
    console.log('Clicked!');
    console.log(this.el);
    console.log(this.control());
  }
}
