import { Component, Input } from '@angular/core';
import { UserViewModel } from '../../../Shared/ViewModels/UserViewModel';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  @Input() DATA: UserViewModel = new UserViewModel();
}
