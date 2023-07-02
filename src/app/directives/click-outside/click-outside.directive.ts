import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {

  @Output() public clickOutside = new EventEmitter<void>();

  constructor(private eRef: ElementRef) {
  }

  @HostListener('document:click', ['$event'])
    clicked(event) {
      if(!this.eRef.nativeElement.contains(event.target)) {
        // clicked outside
        this.clickOutside.emit();
      } else {
        // clicked inside
      }
    }
}
