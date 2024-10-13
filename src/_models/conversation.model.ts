import { Timestamp } from "rxjs";

export type TMessage = {
  user_id: string;
  text: string;
  seen_by: string[];
  timestamp: string;
};

export type TMessageWPic = {
  timestamp: string;
  user_id: string;
  documentRef: string;
  seen_by: string[];
};


export type TConversation = {
  id: string;
  users_id: string[];
  title: string;
  messages: TMessage[];
  timestamp: string
};

export type TConversations = TConversation[]
