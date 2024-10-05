import { Timestamp } from "rxjs";

export type TMessage = {
  sender_id: string;
  text: string;
  seenBy: string[];
  timeStamp: string
};

export type TConversation = {
  id: string;
  users_id: string[];
  title: string;
  messages: TMessage[];
  timeStamp: string
};

export type TConversations = TConversation[]
