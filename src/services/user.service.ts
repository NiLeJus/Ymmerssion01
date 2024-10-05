import {TConversation, TMessage, TConversations } from '../_models/conversation.model';
import { Injectable } from '@angular/core';
import { TUser } from '../_models/user.model';

@Injectable({providedIn: 'root'})
export class UserService {
  private _thisUser: any = 
  {user_id: '1'}


  setThisUser(newValue : string) {
    this._thisUser.user_id = newValue;
  }

  getThisUserId(): string {
    return this._thisUser.user_id
  }
}
