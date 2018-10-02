const USERNAME_KEY = 'username';
const USER_ID_KEY = 'idUser';
const USER_ADMIN_KEY = 'userAdmin';
const LOGIN_KEY = 'userLogin';
const PASSWORD_KEY = 'userPassword';
const RESUMO_KEY = 'userResumo';
const EMAIL_KEY = 'userEmail';
const PHOTO_KEY = 'userPhoto';
const ID_PHOTO_KEY = 'userIdPhoto';

export class User{
    id: number;
    name : String;
    login: String;
    password: String;
    email: String;
    resumo: String;
    foto: String;
    idArquivo:number;
    admin : Boolean;
    ativo: Boolean;
    constructor(){
      this.id = this.getStorage(USER_ID_KEY);
      this.name = this.getStorage(USERNAME_KEY);
      this.login = this.getStorage(LOGIN_KEY);
      this.password = this.getStorage(PASSWORD_KEY);
      this.resumo = this.getStorage(RESUMO_KEY);
      this.email = this.getStorage(EMAIL_KEY);
      this.foto = this.getStorage(PHOTO_KEY);
      this.admin = this.getStorage(USER_ADMIN_KEY);
      this.idArquivo = this.getStorage(ID_PHOTO_KEY);
    }

    private getStorage(key){
      return <any> localStorage.getItem(key);
    }

}