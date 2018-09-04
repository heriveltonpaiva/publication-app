import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PublicationService } from './publication.service';
import { MessageService } from '../core/messages/message.service';

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
  constructor(private newService :PublicationService, private messageService: MessageService) { }

  ngOnInit() {
    this.visualizar = false;
    this.alterar = false;
    this.formPublicacao.reset();
    this.newService.getAll().subscribe(data =>  this.listaPublicacoes = data); 
  }

  preVisualizar(){
    this.visualizar = true;
    this.conteudoPreview = this.formPublicacao.value.conteudo;
    this.tituloPreview = this.formPublicacao.value.titulo;
    this.newService.getAll().subscribe(data =>  this.listaPublicacoes = data); 
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
     console.log(this.validarCampos())
    if(this.validarCampos()){
      return; 
    }
    this.visualizar = false;
    this.formPublicacao.value.resumo = this.formPublicacao.value.conteudo;
    this.newService.update(this.formPublicacao.value).subscribe(data =>  {  
      this.messageService.add(1,'Publicação alterada com sucesso.')
      this.ngOnInit(); 
     }, error => this.errorMessage = error);
  }      

   preAlterarPublicacao(publicacao){  
    console.log(publicacao);
    this.formPublicacao.setValue(
      { id:publicacao._id, 
        titulo: publicacao.titulo,
        conteudo: publicacao.conteudo,
        resumo: publicacao.resumo, 
        categoria: publicacao.categoria,
        subcategoria: publicacao.subcategoria
      });
      this.alterar = true;
   }  
     
   removerPublicacao(id){  
     console.log(id);
    this.newService.delete(id).subscribe(data =>   { 
      this.messageService.add(1,'Publicação removida com sucesso.')
      this.ngOnInit();
    }, error => this.errorMessage = error )   
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
