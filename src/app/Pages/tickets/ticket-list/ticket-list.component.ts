import { Component } from '@angular/core';
import { TicketViewModel } from '../../../Shared/ViewModels/TicketViewModel';
import { TabInterface } from '../../../Shared/Interfaces/tabInterface';
import { TicketDetailComponent } from '../ticket-detail/ticket-detail.component';
import { ExploreTabsService } from '../../../Shared/Services/explore-tabs.service';
import { AppSetting } from '../../../AppSetting/AppSetting';
@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.scss'
})
export class TicketListComponent {
  ticketList: TicketViewModel[] = [
    {
      "ID": 4178,
      "SectionTitle": "عضویت در سامانه",
      "StatusTypeTitle": "ایجاد",
      "PriorityTypeTitle": "آنی",
      "TicketTypeTitle": "ایجاد / ویرایش نام کاربری یا رمز عبور",
      "Subject": "خطای ناشناخته",
      "TrackingCode": "SPS1924178",
      "CreatorFullName": "مهگل عرب",
      "CreationDateTime": "1404/02/01 | 15:47:51",
    },
    {
      "ID": 4177,
      "SectionTitle": "عرضه ",
      "StatusTypeTitle": "ایجاد",
      "PriorityTypeTitle": "آنی",
      "TicketTypeTitle": "حذف/ ویرایش عرضه",
      "Subject": "راهنمایی کار با سامانه",
      "TrackingCode": "SPS11114177",
      "CreatorFullName": "فربد پویافرد",
      "CreationDateTime": "1404/01/31 | 17:48:02",

    },
    {
      "ID": 4170,
      "SectionTitle": "عضویت در سامانه",
      "StatusTypeTitle": "ایجاد",
      "PriorityTypeTitle": "آنی",
      "TicketTypeTitle": "ایجاد / ویرایش نام کاربری یا رمز عبور",
      "Subject": "خطای ناشناخته",
      "TrackingCode": "SPS1924170",
      "CreatorFullName": "نیلوفر عظیمی",
      "CreationDateTime": "1404/01/31 | 12:24:02",
    },
    {
      "ID": 4167,
      "SectionTitle": "عضویت در سامانه",
      "StatusTypeTitle": " اختتام با یادداشت",
      "PriorityTypeTitle": "فوری",
      "TicketTypeTitle": "ایجاد / ویرایش نام کاربری یا رمز عبور",
      "Subject": "تفکیک تیکت های در وضعیت ایجاد",
      "TrackingCode": "SPS1924167",
      "CreatorFullName": "مینا احمدی",
      "CreationDateTime": "1404/01/31 | 10:46:11",
    },
  ];
  setting: AppSetting = new AppSetting();
  constructor(private tabsService: ExploreTabsService) { }
  onTicketSelected(ticket: TicketViewModel) {
    const tab: TabInterface = {
      id: ticket.ID.toString(),
      title: '#' + ticket.Subject,
      componentRef: TicketDetailComponent,
      active: true,
      closable: true,
      data: ticket,
    }
    this.tabsService.openTab(this.setting.ticketPageTabsKey, tab);
  }
}
