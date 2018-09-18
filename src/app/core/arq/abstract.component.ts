import { OnInit } from "@angular/core";
import { AbstractService } from "./abstract.service";
import { FormGroup } from "@angular/forms";
import { MessageType } from "../messages/message.type.enum";
import { MessageComponent } from "../messages/message.component";
import { MessageService } from "../messages/message.service";
import { HttpParams } from "@angular/common/http";
import { Pagination } from "./pagination";
import { IfObservable } from "rxjs/observable/IfObservable";

/**
 * @author Herivelton Paiva 
 * Componente genérico para o CRUD e demais operações
 * como tratamento de erros e exibição de mensagens do sistema
 */
export class AbstractComponent implements OnInit {
  messages;
  collection;
  showPagination;
  pagination = new Pagination();
  form;
  validacoes = new Map<any, any>();

  constructor(public service: AbstractService, public messageService: MessageService) {
    this.clearMensagens();
  }

  ngOnInit() {
    this.resetForm();
  }

  /* Cria ou atualiza o registro na base de dados */
  salvar() {
    this.clearMensagens();
    if (this.validate())
      return;
    if (!this.isAlteracao()) {
      console.log('[Cadastro]');
      this.service.save(this.getObj()).subscribe(retorno => {
        this.addSuccessMessage(retorno.toString())
        this.resetForm();
        this.afterSalvar();
      }, error => this.addException(error));

    } else {
      console.log('[Alteração]');
      this.atualizar();
    }
  }

  /** carrega todos os objetos para exibir na listagem  */
  carregarListagem(page) {
    this.service.getAllPagination(page).subscribe(lista => {
      this.pagination.setItems(lista);
      this.collection = this.pagination.getItems()
      this.pagination.setPage(page);
      console.log('Página ' + this.pagination.getPage() + ' de ' + this.pagination.getTotalPages() + ' - Total de Registros: ' + this.pagination.getTotal())
    });
  }

  /* Atualiza os valores do item, Método chamado no #Salvar()  */
  private atualizar() {
    this.clearMensagens();
    this.service.update(this.getObj()).subscribe(retorno => {
      this.addSuccessMessage(retorno.toString());
      this.resetForm();
      this.carregarListagem(this.pagination.getPage());
    }, error => this.addException(error));
  }

  /** Realiza a remoção por id */
  remover(id) {
    console.log('[Remoção]');
    this.clearMensagens();
    this.service.delete(id).subscribe(retorno => {
      this.addSuccessMessage(retorno.toString());
      this.resetForm();
      this.afterRemover();
    }, error => this.addException(error))
  }

  /* Adiciona o campo exibido no form na pré-atualização */
  addInputValuesMap(nameControl: String, value: Object) {
    this.validacoes.set(nameControl, value);
  }

  /* Adiciona o campo a ser validado */
  addValidateRequiredMap(label: String, input: Object) {
    this.validacoes.set(label, input);
  }

  /* Realiza validações dos campos obrigatórios */
  private validate() {
    console.log('[Validação]');
    for (let obj of Array.from(this.validacoes.entries())) {
      this.validateNotNull(obj[0], obj[1]);
    }
    this.validacoes = new Map<any, any>();
    return this.messageService.getAllMessages().length > 0;
  }

  /* Adiciona o formulário do component */
  setFormulario(form: FormGroup) {
    this.form = form;
  }
  /** Lança exceção exibindo o stacktrace na tela */
  addException(error) {
    this.messageService.tratarException(error)
  }
  /** Limpar o formulário */
  resetForm() {
    this.form.reset()
  }
  /* Adiciona mensagem de sucesso */
  addSuccessMessage(msg: String) {
    this.messageService.add(MessageType.SUCCESS, msg.toString());
  }
  /* Adiciona mensagem de erro */
  addErrorMessage(msg: String) {
    this.messageService.add(MessageType.ERROR, msg.toString());
  }
  /* Adiciona mensagem de informação */
  addInfoMessage(msg: String) {
    this.messageService.add(MessageType.INFO, msg.toString());
  }
  /* Valida obrigatoriedade do campo */
  validateNotNull(inputName: String, input) {
    if (input == null || input == '') {
      this.messageService.add(MessageType.ERROR, inputName + ': Campo obrigatório não informado.')
    }
  }
  private isAlteracao() {
    return this.getObj().id != null;
  }
  /** Retorna o objeto do formulário  */
  getObj() {
    return this.form.value;
  }

  clearMensagens() {
    this.messageService.clear();
  }

  setPagination(value) {
    this.showPagination = value;
  }

  /* Habilita visualização na área pública */
  habilitarView(id) {
    this.getObj().id = id; 
    this.getObj().areaPublica = true;
    this.clearMensagens();
    this.service.updatePublicArea(this.getObj()).subscribe(() => {
      this.carregarListagem(this.pagination.getPage());
      this.addInfoMessage('Visualização na Área Pública Ativada! O item poderá ser visualizado no Dashboard.')
    }, error => this.addException(error));
    
  }
  /* Desabilita visualização na área pública */
  desabilitarView(id) { 
    this.getObj().id = id;
    this.getObj().areaPublica = false;
    this.clearMensagens();
    this.service.updatePublicArea(this.getObj()).subscribe(() => {
    this.carregarListagem(this.pagination.getPage());
    this.addInfoMessage('Visualização na Área Pública Desativada! O item não poderá ser visualizado no Dashboard.')
   }, error => this.addException(error));
  }

  //validacao caso seja o último elemento, para voltar para a página anterior
  afterRemover() {
    let page = this.pagination.getTotalPages();
    if (this.collection.length == 1) {
      this.carregarListagem(page - 1);
    } else {
      this.carregarListagem(this.pagination.getPage());
    }
  }
  //validacao caso o próximo elemento seja exibido na outra lista, para avançar para a próxima página
  afterSalvar() {
    let page = this.pagination.getTotalPages();
    if (this.collection.length == this.pagination.getTamanho()) {
      this.carregarListagem(page + 1);
    } else {
      this.carregarListagem(page);
    }
  }
}
