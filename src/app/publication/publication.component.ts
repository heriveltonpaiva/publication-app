import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PublicationService } from './publication.service';
import { MessageService } from '../core/messages/message.service';
import { Data } from '../providers/data';
import { Router } from '@angular/router';
import { TopicService } from '../topic/topic-service';
import { CategoryService } from '../category/category-service';


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
    idAssunto: new FormControl(''),
    idCategoria: new FormControl('') //atributo usado para o change apenas
  });

  visualizar: boolean;
  alterar: boolean;
  conteudoPreview: String; 
  tituloPreview: String;
  categoriaPreview: String;
  assuntoPreview: String;
  dataPreview: Date;
  errorMessage: String;
  renderComboAssunto : boolean;
  listaPublicacoes;
  listaAssuntos;
  listaCategorias;

  constructor(private router: Router, private newService :PublicationService, private serviceAssunto:TopicService, 
    private serviceCategoria:CategoryService, private messageService: MessageService, private data: Data) {
      this.messageService.clear();
    }

  ngOnInit() {
    this.visualizar = false;
    this.carregarCategorias();
    //verifica se o objeto do provider possui dados, caso possua carregue essas informações (Update Flow)
    if(this.data.storage){
      this.formPublicacao.setValue(this.data.storage);
      this.alterar = true;
      this.renderComboAssunto = true;
      //realiza a busca das categorias
      this.mudarCategoria();      
      //depois seta o id do assunto
      this.formPublicacao.patchValue({'idAssunto': this.formPublicacao.value.idAssunto._id});
    }else{
    // novo cadastro, carrega o formulário limpo (Create Flow)
      this.alterar = false;
      this.renderComboAssunto = false;
      this.formPublicacao.reset();
    }
  }

  preVisualizar(){
    if(this.validarCampos()){
      this.messageService.clear();
      this.messageService.add(2, 'Preencha todos os campos obrigatórios para visualizar a publicação.');
      return;
    }
    this.visualizar = true;
    this.conteudoPreview = this.formPublicacao.value.conteudo;
    this.tituloPreview = this.formPublicacao.value.titulo;
    //faz a busca na base de dados com os id's dos combobox e adiciona a descricao as variáveis criadas para exibição na pré-visualização.
    this.serviceAssunto.findById(this.formPublicacao.value.idAssunto).subscribe(obj =>  this.categoriaPreview = obj.descricao); 
    this.serviceCategoria.findById(this.formPublicacao.value.idCategoria).subscribe(obj => this.assuntoPreview = obj.descricao);
    this.dataPreview = new Date();
    this.messageService.add(3,'Pré-visualização disponível.')
    console.log(this.formPublicacao.value.conteudo);
  }

  salvarPublicacao(){  
    if(this.validarCampos())
      return;
     this.visualizar = false;
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
   if(this.formPublicacao.value.resumo == null){
    this.messageService.add(2,'Resumo: Campo obrigatório não informado.')
    erro = true;
   } 
   if(this.formPublicacao.value.conteudo == null){
     this.messageService.add(2,'Conteúdo: Campo obrigatório não informado.')
     erro = true;
   }  
   if(this.formPublicacao.value.idAssunto == null){
     this.messageService.add(2,'Assunto: Campo obrigatório não informado.')
     erro = true;
   }
   return erro;
   }

   mudarCategoria(){
     this.serviceAssunto.findByAssuntoByCategoria(this.formPublicacao.value.idCategoria).subscribe(lista =>  this.listaAssuntos = lista); 
     this.renderComboAssunto = true;
     console.log(this.listaAssuntos);
   }
  carregarCategorias(){
    this.serviceAssunto.getAllCategorias().subscribe(lista =>  this.listaCategorias = lista); 
  }
}
