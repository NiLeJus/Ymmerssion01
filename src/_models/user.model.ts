type Conversation = {
  sender_id: string;
  message: string;
  seenBy: string[];
};

type User = {
  user_id: string;
  username: string;
  mail: string;
  password: string;
  status: 'online' | 'offline';
};
