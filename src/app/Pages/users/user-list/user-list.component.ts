import { Component } from '@angular/core';
import { UserViewModel } from '../../../Shared/ViewModels/UserViewModel';
import { TabInterface } from '../../../Shared/Interfaces/tabInterface';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { ExploreTabsService } from '../../../Shared/Services/explore-tabs.service';
import { AppSetting } from '../../../AppSetting/AppSetting';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  setting: AppSetting = new AppSetting();
  userList: UserViewModel[] =
    [
      {
        "ID": 1072,
        "UserName": "AliKarimi",
        "FullName": "علی کریمی",
        "Email": "test@test.com",
        "PhoneNumber": "09121231212",
      },
      {
        "ID": 1092,
        "UserName": "a-ghadiri",
        "FullName": "علی قدیری",
        "Email": "a-ghadiri@test.com",
        "PhoneNumber": "09121231515",
      },
      {
        "ID": 1096,
        "UserName": "parisa-miri",
        "FullName": "پریسا میری",
        "Email": "parisamiri@gtest.com",
        "PhoneNumber": "02185522763",
      },
      {
        "ID": 1097,
        "UserName": "t-client",
        "FullName": "مریم امیری",
        "Email": "test@test.com",
        "PhoneNumber": "23528988",
      },
      {
        "ID": 1099,
        "UserName": "t-operator",
        "FullName": "سینا کشتزار",
        "Email": "test@test.com",
        "PhoneNumber": "321321321",
      },
      {
        "ID": 1112,
        "UserName": "iman-amini",
        "FullName": "ایمان امینی",
        "Email": "test@test.com",
        "PhoneNumber": "09355609580",
      },
      {
        "ID": 1073,
        "UserName": "AliKarimi",
        "FullName": "علی کریمی",
        "Email": "test@test.com",
        "PhoneNumber": "09121231212",
      },
      {
        "ID": 1093,
        "UserName": "a-ghadiri",
        "FullName": "علی قدیری",
        "Email": "a-ghadiri@test.com",
        "PhoneNumber": "09121231515",
      },
      {
        "ID": 1016,
        "UserName": "parisa-miri",
        "FullName": "پریسا میری",
        "Email": "parisamiri@gtest.com",
        "PhoneNumber": "02185522763",
      },
      {
        "ID": 1017,
        "UserName": "t-client",
        "FullName": "مریم امیری",
        "Email": "test@test.com",
        "PhoneNumber": "23528988",
      },
    ]
  constructor(private tabsService: ExploreTabsService) { }
  onUserSelected(user: UserViewModel) {
    const tab: TabInterface = {
      id: user.ID.toString(),
      title: '#' + user.FullName,
      componentRef: UserDetailComponent,
      active: true,
      closable: true,
      data: user,
    }
    this.tabsService.openTab(this.setting.userPageTabsKey, tab);
  }
}
