export type TMessage = {
  sender_id: string;
  text: string;
  seenBy: string[];
};

export type TConversation = {
  id: string;
  users_id: string[];
  title: string;
  messages: TMessage[];
};

export type TConversations = TConversation[] 