import { Component } from '@angular/core';
import { AppSetting } from '../../AppSetting/AppSetting';
import { TabInterface } from '../../Shared/Interfaces/tabInterface';
import { TicketListComponent } from './ticket-list/ticket-list.component';
@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss'
})
export class TicketsComponent {
  setting: AppSetting = new AppSetting();
  defaultTab: TabInterface[] = [
      { id: 'ticketList', title: 'لیست تیکت‌ها', icon: 'bi-envelope', active: true, componentRef: TicketListComponent, data: {}, closable: false },
  ];
}
