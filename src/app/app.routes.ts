import { Routes } from '@angular/router';
import { BoardScreenComponent } from '../screens/board-screen/board-screen.component';
import { UserScreenComponent } from '../screens/user-screen/user-screen.component';
import { ConnectionScreenComponent } from '../screens/connection-screen/connection-screen.component';

export const routes: Routes = [
  { path: '', component: ConnectionScreenComponent },
  { path: 'board', component: BoardScreenComponent },
  { path: 'user-profile', component: UserScreenComponent },
];
