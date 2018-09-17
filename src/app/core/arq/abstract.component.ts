import { OnInit } from "@angular/core";
import { AbstractService } from "./abstract.service";
import { FormGroup } from "@angular/forms";
import { MessageType } from "../messages/message.type.enum";
import { MessageComponent } from "../messages/message.component";
import { MessageService } from "../messages/message.service";

/**
 * @author Herivelton Paiva 
 * Componente genérico para o CRUD e demais operações
 * como tratamento de erros e exibição de mensagens do sistema
 */
export class AbstractComponent implements OnInit{
  messages;
  collection;
  form;
  validacoes = new Map<any, any>();

  constructor(public service :AbstractService, public messageService: MessageService) {
    this.clearMensagens();
  }

  ngOnInit(){
    this.resetForm();
  }

  /* Cria ou atualiza o registro na base de dados */
  salvar(){  
    this.clearMensagens();
    if(this.validate())
      return;
      if(!this.isAlteracao()){
        console.log('[Cadastro]');
        this.service.save(this.getObj()).subscribe(retorno =>  
        {  
          this.addSuccessMessage(retorno.toString())
          this.resetForm();
          this.carregarListagem();
        }, error => this.addException(error)); 
      
      }else{
        console.log('[Alteração]');
        this.atualizar();
      }         
  }

  /** carrega todos os objetos para exibir na listagem  */
  carregarListagem(){
    this.service.getAll().subscribe(lista =>  {this.collection = lista}); 
  }

  /* Atualiza os valores do item, Método chamado no #Salvar()  */
  private atualizar(){
    this.clearMensagens();
    this.service.update(this.getObj()).subscribe(retorno =>  
      {  
        this.addSuccessMessage(retorno.toString());
        this.resetForm(); 
        this.carregarListagem();
      }, error => this.addException(error));
  }  
  
  /** Realiza a remoção por id */
  remover(id){  
    console.log('[Remoção]');
    this.clearMensagens();
    this.service.delete(id).subscribe(retorno =>
    { 
      this.addSuccessMessage(retorno.toString());
      this.resetForm();
      this.carregarListagem();
    }, error => this.addException(error))  
  } 

  /* Adiciona o campo exibido no form na pré-atualização */
  addInputValuesMap(nameControl:String, value:Object){
    this.validacoes.set(nameControl, value);
  }

  /* Adiciona o campo a ser validado */
  addValidateRequiredMap(label:String, input:Object){
    this.validacoes.set(label, input);
  }

  /* Realiza validações dos campos obrigatórios */
  private validate(){
    console.log('[Validação]');
    for (let obj of Array.from(this.validacoes.entries())) {
      this.validateNotNull(obj[0], obj[1]);  
    }
    this.validacoes = new Map<any, any>();
    return this.messageService.getAllMessages().length > 0;
  }

   /* Adiciona o formulário do component */
   setFormulario(form: FormGroup){
      this.form = form;
   }
   /** Lança exceção exibindo o stacktrace na tela */
   addException(error){
    this.messageService.tratarException(error)
   }
   /** Limpar o formulário */
   resetForm(){
    this.form.reset()
   }
   /* Adiciona mensagem de sucesso */
   addSuccessMessage(msg: String){
    this.messageService.add(MessageType.SUCCESS, msg.toString());
   }
   /* Adiciona mensagem de erro */
   addErrorMessage(msg: String){
    this.messageService.add(MessageType.ERROR, msg.toString());
   }
   /* Valida obrigatoriedade do campo */
  validateNotNull(inputName: String, input){
    if(input == null || input == ''){
      this.messageService.add(MessageType.ERROR, inputName+': Campo obrigatório não informado.')
    } 
   }
   private isAlteracao(){
     return this.getObj().id != null;
   }
   /** Retorna o objeto do formulário  */
  getObj(){
    return this.form.value;
   }

   clearMensagens(){
    this.messageService.clear();
   }

}
