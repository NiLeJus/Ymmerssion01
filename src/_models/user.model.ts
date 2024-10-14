export type TUser = {
  name: string;
  username : string,
  user_id: string;
  mail: string;
  password: string;
  status: 'online' | 'offline';
};



export class User {
  constructor(
    public name: string,
    public user_id: string,
    public mail: string,
    public password: string,
    public status: 'online' | 'offline'
  ) {}
}
