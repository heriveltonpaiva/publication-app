import { Component, OnInit } from '@angular/core';
import { AbstractComponent } from '../arq/abstract.component';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from './user.service';
import { MessageService } from '../messages/message.service';
import { Arquivo } from '../arq/arquivo';
import { FileUploadService } from '../arq/fileupload.service';
import { TokenStorage } from '../authentication/token-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent extends AbstractComponent implements OnInit{
  selectedFile: File;
  imagePath: any;
  arquivo: Arquivo;
  arquivoUpload:Boolean;
  form = new FormGroup({
    name: new FormControl(),
    login: new FormControl(),
    password: new FormControl(),
    email: new FormControl(),
    foto: new FormControl(),
    resumo: new FormControl(),
    idArquivo: new FormControl()
  });
  constructor(service: UserService, messageService: MessageService, private router: Router, 
      private fileService: FileUploadService, private tokenStorage: TokenStorage) {
    super(service, messageService)
   }

   ngOnInit(){
    this.arquivoUpload = false;
    this.carregarDadosUsuario();
   }

   salvar() {
    this.validateInputs();
    this.form.value.id = this.usuarioLogado.id;
    if(this.arquivoUpload){
      this.fileService.saveArquivo(this.arquivo).subscribe(idArquivo => 
      {
        this.form.value.idArquivo = idArquivo;
        super.salvar();
      });
    }else if(this.usuarioLogado.foto != null){
        this.getObj().idArquivo = this.usuarioLogado.idArquivo;
        console.log(this.getObj());
        super.salvar();
    }else{
      this.addErrorMessage('Foto: Campo obrigatório não informado.')
    }
  }

   onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    this.arquivoUpload = true;
    this.onUpload();
  }

   onUpload() {
    this.arquivo = new Arquivo();
    const formData: FormData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    this.fileService.getFileBase64(formData).subscribe(retorno => {
      this.arquivo.data = retorno;
      this.imagePath = 'data:image/jpg;base64,'+retorno
    });
    this.arquivo.name = this.selectedFile.name;
    this.arquivo.contentType = this.selectedFile.type;
    this.arquivo.size = this.selectedFile.size;
  }

  carregarDadosUsuario(){
    this.form.patchValue({'name': this.usuarioLogado.name});
    this.form.patchValue({'login': this.usuarioLogado.login});
    //this.form.patchValue({'password': this.usuarioLogado.password});
    this.form.patchValue({'email': this.usuarioLogado.email});
    this.form.patchValue({'resumo': this.usuarioLogado.resumo});
    this.imagePath = this.usuarioLogado.foto;
  }

  validateInputs() {
    this.addValidateRequiredMap('Nome', this.getObj().name);
    this.addValidateRequiredMap('E-mail', this.getObj().email);
    this.addValidateRequiredMap('Resumo', this.getObj().resumo);
  };
}
