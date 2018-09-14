import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TopicService } from './topic-service';
import { MessageService } from '../core/messages/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {

  form = new FormGroup({
    id: new FormControl(),
    descricao: new FormControl(''),
    idCategoria: new FormControl('')
  });
  listaAssuntos;
  listaCategorias;
  constructor(private router: Router, private newService :TopicService, private messageService: MessageService) { 
    this.messageService.clear();
   }

  ngOnInit() {
    this.carregarListagem();
    this.carregarCategorias();
    this.form.reset();
  }
  
  salvar(){  
    if(this.validarCampos())
      return;
      console.log(this.form.value)
      if(this.form.value.id == null){
        this.newService.save(this.form.value).subscribe(data =>  {  
        this.messageService.add(1,'Assunto cadastrado com sucesso.')
        this.ngOnInit(); 
        }, error => error);  
      }else{
        this.newService.update(this.form.value).subscribe(data =>  {  
          this.messageService.add(1,'Assunto alterado com sucesso.')
          this.ngOnInit(); 
          }, error => error);  
      }
   }


  carregarListagem(){
    this.newService.getAll().subscribe(lista =>  this.listaAssuntos = lista); 
  }

  carregarCategorias(){
    this.newService.getAllCategorias().subscribe(lista =>  this.listaCategorias = lista); 
  }
  
  preAlterar(assunto){  
    this.form.patchValue({'id': assunto._id});
    this.form.patchValue({'descricao': assunto.descricao});
    this.form.patchValue({'idCategoria': assunto.idCategoria._id});
 }  
   
 remover(id){  
  this.newService.delete(id).subscribe(data =>   { 
    this.messageService.add(1,'Assunto removido com sucesso.')
    this.ngOnInit();
  }, error => error )   
 } 

  private validarCampos(){
    let erro = false;
    if(this.form.value.descricao == null){
      this.messageService.add(2,'Descrição: Campo obrigatório não informado.')
      erro = true;
   } 
   if(this.form.value.idCategoria == null){
     this.messageService.add(2,'Categoria: Campo obrigatório não informado.')
     erro = true;
   }
   return erro;
   }
}
