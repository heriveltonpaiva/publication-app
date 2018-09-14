import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from '../core/messages/message.service';
import { CategoryService } from './category-service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  form = new FormGroup({
    id: new FormControl(),
    descricao: new FormControl(),
  });
categorias;
constructor(private router: Router, private newService :CategoryService, private messageService: MessageService) { }

ngOnInit() {
  this.carregarListagem();
  this.form.reset();
}
  
salvar(){  
  if(this.validarCampos())
    return;
  if(this.form.value.id == null){
    this.newService.save(this.form.value).subscribe(data =>  {  
      this.messageService.add(1,'Categoria cadastrada com sucesso.')
    this.ngOnInit(); 
    }, error => error); 
  }else{
    console.log(this.form.value);
    this.newService.update(this.form.value).subscribe(data =>  {  
      this.messageService.add(1,'Categoria alterado com sucesso.')
    this.ngOnInit(); 
    }, error => error);
  }
  }

carregarListagem(){
  this.newService.getAll().subscribe(lista =>  this.categorias = lista); 
}
  
preAlterar(categoria){  
  this.form.patchValue({'id': categoria._id});
  this.form.patchValue({'descricao': categoria.descricao});
  console.log(this.form.value);
}  
   
 remover(id){  
  this.newService.delete(id).subscribe(data =>   { 
    this.messageService.add(1,'Categoria removida com sucesso.')
    this.ngOnInit();
  }, error => error )   
} 

private validarCampos(){
  let erro = false;
  if(this.form.value.descricao == null){
    this.messageService.add(2,'Descrição: Campo obrigatório não informado.')
    erro = true;
  } 
  return erro;
 }
}
