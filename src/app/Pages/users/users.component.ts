import { Component } from '@angular/core';
import { AppSetting } from '../../AppSetting/AppSetting';
import { TabInterface } from '../../Shared/Interfaces/tabInterface';
import { UserListComponent } from './user-list/user-list.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  setting: AppSetting = new AppSetting();
  defaultTab: TabInterface[] = [
    { id: 'userList', title: 'لیست کاربران', icon: 'bi-people', active: true, componentRef: UserListComponent, data: {}, closable: false },
  ];
}
