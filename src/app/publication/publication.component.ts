import { Component, OnInit, ViewChild, HostListener, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PublicationService } from './publication.service';
import { MessageService } from '../core/messages/message.service';
import { Data } from '../core/providers/data';
import { TopicService } from '../topic/topic-service';
import { CategoryService } from '../category/category-service';
import { AbstractComponent } from '../core/arq/abstract.component';
import { AbstractValidator } from '../core/arq/abstract.validator';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent extends AbstractComponent implements AbstractValidator {

  form = new FormGroup({
    id: new FormControl(),
    titulo: new FormControl(''),
    conteudo: new FormControl(''),
    resumo: new FormControl(''),
    idAssunto: new FormControl([Validators.required]),
    idCategoria: new FormControl('') //atributo usado para o change apenas
  });
  
  conteudoPreview: String;
  tituloPreview: String;
  categoriaPreview: String;
  assuntoPreview: String;
  dataPreview: Date;

  renderComboAssunto: boolean;
  listaAssuntos;
  listaCategorias;
  visualizar: boolean;
  alterar: boolean;
  pageAlteracao:number;
 
  constructor(service: PublicationService, messageService: MessageService,
    private serviceAssunto: TopicService, private serviceCategoria: CategoryService, 
    private router :Router, private route: ActivatedRoute, private data: Data) {
    super(service, messageService);
  }

  ngOnInit() {
    this.visualizar = false;
    this.alterar = false;
    this.renderComboAssunto = false;
    this.setPagination(false);
    this.validateInputs();
    this.carregarCategorias();
   
    this.route.queryParams.subscribe(params => {
        if(params['page']){
          this.pageAlteracao = params['page'];
          this.carregarObjAlteracao();   
        } 
    });
  }

  carregarObjAlteracao(){
    if(this.data.storage){
      this.form.setValue(this.data.storage);
      this.alterar = true;
      this.renderComboAssunto = true;
      this.carregarAssuntosByCategoria(); 
      this.form.patchValue({'idAssunto': this.getObj().idAssunto._id});
    }
  }

  /**  
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
  */


  preVisualizar() {
    this.clearMensagens();
    this.validateInputs();
    if (!this.validate()) {
      this.visualizar = true;
      this.conteudoPreview = this.getObj().conteudo;
      this.tituloPreview = this.getObj().titulo;
      this.dataPreview = new Date();
      this.addInfoMessage('Pré-visualização disponível.')
    }
  }

  salvar() {
    this.visualizar = false;
    this.validateInputs();
    super.salvar();
    if(this.isAlteracao()){
       this.data.storage = this.getObj();
       event.preventDefault();
       this.router.navigate(['publicacao/list'], { queryParams: { page: this.pageAlteracao } });
    }
  }
  /** 
  alterarPublicacao(){ 
   if(this.validarCampos()){
     return; 
   }
   this.visualizar = false;
   this.newService.update(this.formPublicacao.value).subscribe(data =>  {  
     this.messageService.add(1,'Publicação alterada com sucesso.')
     this.ngOnInit(); 
    }, error => this.errorService.tratarException(error));
    this.data.storage = null;
    event.preventDefault();
 }*/

  validateInputs() {
    this.addValidateRequiredMap('Título', this.getObj().titulo);
    this.addValidateRequiredMap('Resumo', this.getObj().resumo);
    this.addValidateRequiredMap('Conteúdo', this.getObj().conteudo);
    this.addValidateRequiredMap('Categoria', this.getObj().idCategoria);
  };

  /* Carrega o combo de assuntos de acordo com a categoria selecionada */
  carregarAssuntosByCategoria() {
    this.serviceAssunto.findByAssuntoByCategoria(this.getObj().idCategoria).subscribe(lista => {
      this.listaAssuntos = lista
    }, error => this.addException(error));
    this.renderComboAssunto = true;
  }
  /** Carrega o combo com todas as categorias */
  carregarCategorias() {
    this.serviceAssunto.getAllCategorias().subscribe(lista => {
      this.listaCategorias = lista
    }, error => error);
  }
  /* Método chamado na view quando selecionado o assunto o objeto é carregado */
  carregaObjAssunto() {
    this.serviceAssunto.findById(this.getObj().idAssunto).subscribe(retorno => {
      this.assuntoPreview = retorno.descricao;
    }, error => this.addException(error));
    this.carregarObjCategoria();
  }
  /* Carrega o objeto categoria selecionado */
  private carregarObjCategoria() {
    this.serviceCategoria.findById(this.getObj().idCategoria).subscribe(retorno => {
      this.categoriaPreview = retorno.descricao;
    }, error => this.addException(error));
  }
}
