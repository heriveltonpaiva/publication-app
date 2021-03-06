import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TopicService } from './topic-service';
import { MessageService } from '../core/messages/message.service';
import { AbstractComponent } from '../core/arq/abstract.component';
import { AbstractValidator } from '../core/arq/abstract.validator';
import { CategoryService } from '../category/category-service';
import { PublicationService } from '../publication/publication.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent extends AbstractComponent implements AbstractValidator {
  form = new FormGroup({
    id: new FormControl(),
    descricao: new FormControl(''),
    idCategoria: new FormControl(''),
    areaPublica: new FormControl(false)
  });
  collection;
  listaCategorias;
  constructor(service :TopicService, private serviceCategoria:CategoryService, 
      private publicacaoService:PublicationService,  messageService: MessageService){
    super(service, messageService);
  }

  ngOnInit() {
    this.setPagination(true);
    this.setFormulario(this.form);
    this.carregarListagem(1);
    this.carregarCategorias();
    this.validateInputs();
    this.inicializarCombo();
  }
  
  salvar(){
    this.validateInputs();
    super.salvar();
  }

  carregarCategorias(){
    this.serviceCategoria.getAll().subscribe(lista =>  this.listaCategorias = lista); 
  }
  
  preAlterar(assunto){  
    this.form.patchValue({'id': assunto._id});
    this.form.patchValue({'descricao': assunto.descricao});
    this.form.patchValue({'idCategoria': assunto.idCategoria._id});
  }  
  
  remover(id){
    this.clearMensagens();
      this.publicacaoService.findByAssunto(id).subscribe(retorno => {
        if(retorno.length > 0){
          this.addErrorMessage('Não é possível realizar a remoção por violar a integridade dos dados. Há '
          +retorno.length+ (retorno.length == 1 ? ' publicação relacionada' :' publicações relacionadas')+ ' ao assunto.');
        }else{
          super.remover(id);
        }
      })
    }

  validateInputs(){
    this.addValidateRequiredMap('Descrição', this.getObj().descricao);
    this.addValidateRequiredMap('Categoria', this.getObj().idCategoria);
  };

  inicializarCombo(){
    this.form.patchValue({'idCategoria': null});
  }
}
