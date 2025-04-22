import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { HomeComponent } from './Pages/home/home.component';
import { TicketsComponent } from './Pages/tickets/tickets.component';
import { UsersComponent } from './Pages/users/users.component';
import { UserListComponent } from './Pages/users/user-list/user-list.component';
import { UserDetailComponent } from './Pages/users/user-detail/user-detail.component';
import { TicketListComponent } from './Pages/tickets/ticket-list/ticket-list.component';
import { TicketDetailComponent } from './Pages/tickets/ticket-detail/ticket-detail.component';
import { ExploreTabComponent } from './Shared/Components/explore-tab/explore-tab.component';
import { ExpandablePanelComponent } from './Shared/Components/expandable-panel/expandable-panel.component';
import { SimplebarAngularModule } from 'simplebar-angular';
import { ClickOutsideDirective } from './Shared/Directives/click-out-side.directive';
@NgModule({
  declarations: [AppComponent, HomeComponent, TicketsComponent, UsersComponent, UserListComponent, UserDetailComponent, TicketListComponent, TicketDetailComponent, ExploreTabComponent, ExpandablePanelComponent, ClickOutsideDirective],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    SimplebarAngularModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
