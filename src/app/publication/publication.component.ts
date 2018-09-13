import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PublicationService } from './publication.service';
import { MessageService } from '../core/messages/message.service';
import { Data } from '../providers/data';
import { isUndefined } from 'util';
import { Router } from '@angular/router';
import { PublicationListComponent } from '../publication-list/publication-list.component';


@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {

  formPublicacao = new FormGroup({
    id: new FormControl(),
    titulo: new FormControl(''),
    conteudo: new FormControl(''),
    resumo: new FormControl(''),
    categoria: new FormControl(''),
    subcategoria: new FormControl(''),
  });

  visualizar: boolean;
  alterar: boolean;
  conteudoPreview: String; 
  tituloPreview: String;
  errorMessage: String;
  listaPublicacoes;

  constructor(private router: Router, private newService :PublicationService, private messageService: MessageService, private data: Data) {}

  ngOnInit() {
    this.visualizar = false;
    //verifica se o objeto do provider possui dados, caso possua carregue essas informações (Update Flow)
    if(this.data.storage){
      this.formPublicacao.setValue(this.data.storage);
      this.alterar = true;
    }else{
    // novo cadastro, carrega o formulário limpo (Create Flow)
      this.alterar = false;
      this.formPublicacao.reset();
    }
  }

  preVisualizar(){
    this.visualizar = true;
    this.conteudoPreview = this.formPublicacao.value.conteudo;
    this.tituloPreview = this.formPublicacao.value.titulo;
    this.messageService.add(3,'Pré-visualização disponível.')
  }

  salvarPublicacao(){  
    if(this.validarCampos())
      return;
     this.visualizar = false;
     this.formPublicacao.value.resumo = this.formPublicacao.value.conteudo;
     console.log(this.formPublicacao.value);
      this.newService.save(this.formPublicacao.value).subscribe(data =>  {  
        this.messageService.add(1,'Publicação cadastrada com sucesso.')
        this.ngOnInit(); 
        }, error => this.errorMessage = error);  
   }

   alterarPublicacao(){ 
    if(this.validarCampos()){
      return; 
    }
    this.visualizar = false;
    this.formPublicacao.value.resumo = this.formPublicacao.value.conteudo;
    this.newService.update(this.formPublicacao.value).subscribe(data =>  {  
      this.messageService.add(1,'Publicação alterada com sucesso.')
      this.ngOnInit(); 
     }, error => this.errorMessage = error);
     this.data.storage = null;
     event.preventDefault();
  }
  
  private validarCampos(){
    let erro = false;
    if(this.formPublicacao.value.titulo == null){
      this.messageService.add(2,'Título: Campo obrigatório não informado.')
      erro = true;
   }
   if(this.formPublicacao.value.conteudo == null){
     this.messageService.add(2,'Conteúdo: Campo obrigatório não informado.')
     erro = true;
   }  
   if(this.formPublicacao.value.categoria == null){
     this.messageService.add(2,'Categoria: Campo obrigatório não informado.')
     erro = true;
   }
   if(this.formPublicacao.value.subcategoria == null){
     this.messageService.add(2,'Subcategoria: Campo obrigatório não informado.')
     erro = true;
   }
   return erro;
   }

}
