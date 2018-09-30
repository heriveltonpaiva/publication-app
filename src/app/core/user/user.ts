const USERNAME_KEY = 'username';
const USER_ID_KEY = 'idUser';
const USER_ADMIN_KEY = 'userAdmin';

export class User{
    id: number;
    name : String;
    admin : Boolean;

    constructor(){
      this.id = <any> localStorage.getItem(USER_ID_KEY);
      this.name = localStorage.getItem(USERNAME_KEY);
      this.admin = <any> localStorage.getItem(USER_ADMIN_KEY);
    }

}