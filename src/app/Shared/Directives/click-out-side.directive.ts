import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[ClickOutside]'
})
export class ClickOutsideDirective {
  @Input() excludeElement?: HTMLElement;
  @Output() clickOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  onClick(targetElement: HTMLElement): void {
    if (!document.body.contains(event?.target as HTMLElement)) return;
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    const clickedOnExclude = this.excludeElement?.contains(targetElement);
    if (!clickedInside && !clickedOnExclude) {
      this.clickOutside.emit();
    }
  }
}
