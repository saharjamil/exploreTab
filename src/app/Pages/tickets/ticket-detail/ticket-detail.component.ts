import { Component, Input } from '@angular/core';
import { TicketViewModel } from '../../../Shared/ViewModels/TicketViewModel';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrl: './ticket-detail.component.scss'
})
export class TicketDetailComponent {
  @Input() DATA:TicketViewModel = new TicketViewModel()
}
