import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-expandable-panel',
  templateUrl: './expandable-panel.component.html',
  styleUrl: './expandable-panel.component.scss',
  animations: [
    trigger('slideDown', [
      state('void', style({
        height: '0px',
        opacity: 0,
        overflow: 'hidden'
      })),
      state('*', style({
        height: '*',
        opacity: 1
      })),
      transition('void => *', [
        animate('300ms ease-out')
      ]),
      transition('* => void', [
        animate('300ms ease-in')
      ])
    ])
  ]
})
export class ExpandablePanelComponent {
  @Input() isOpen = false;
  @Input() position: { left?: number; top?: number, bottom?:number, right?:number } | null = null;
  @Input() content!: TemplateRef<any>;
  @Input() borderColor?: string;
  @Input() alignFromBottom?: boolean = false;
  @Input() minWidth?: number = 0;
  ngOnInit() {}
}
