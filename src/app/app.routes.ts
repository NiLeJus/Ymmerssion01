import { Routes } from '@angular/router';
import { BoardScreenComponent } from '../screens/board-screen/board-screen.component';
import { UserScreenComponent } from '../screens/connection-screen/user-screen/user-screen.component';
import { ConnectionScreenComponent } from '../screens/connection-screen/connection-screen.component';
import { LoggingScreenComponent } from '../screens/connection-screen/logging-screen/logging-screen.component';
import { RegisterScreenComponent } from '../screens/connection-screen/register-screen/register-screen.component';
import { ResetPasswordSectionComponent } from '../screens/connection-screen/reset-password-section/reset-password-section.component';

export const routes: Routes = [
  { path: '', component: ConnectionScreenComponent },
  { path: 'board', component: BoardScreenComponent },
  { path: 'user', component: UserScreenComponent },
  { path: 'logging', component: LoggingScreenComponent },
  { path: 'register', component: RegisterScreenComponent },
  { path: 'reset-password', component: ResetPasswordSectionComponent },
];
