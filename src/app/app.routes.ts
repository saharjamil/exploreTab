import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { TicketsComponent } from './Pages/tickets/tickets.component';
import { UsersComponent } from './Pages/users/users.component';

export const routes: Routes = [
    { path: '', redirectTo:'users', pathMatch:'full' },
    { path: 'tickets', component: TicketsComponent },
    { path: 'users', component: UsersComponent },
];
