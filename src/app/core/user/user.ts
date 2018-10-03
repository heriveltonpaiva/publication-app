import { Arquivo } from "../arq/arquivo";

export class User{
    id: number;
    name : String;
    login: String;
    password: String;
    email: String;
    resumo: String;
    foto: String;
    idArquivo:Arquivo;
    admin : Boolean;
    ativo: Boolean;
    constructor(){
      this.idArquivo = new Arquivo();
    }

}