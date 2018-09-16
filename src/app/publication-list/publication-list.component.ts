import { Component, OnInit } from '@angular/core';
import { PublicationService } from '../publication/publication.service';
import { MessageService } from '../core/messages/message.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { Data } from '../providers/data';
import { ErrorsService } from '../core/error-exception/error-exception-service';

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.css']
})
export class PublicationListComponent implements OnInit {
  formPublicacao = new FormGroup({
    id: new FormControl(),
    titulo: new FormControl(''),
    conteudo: new FormControl(''),
    resumo: new FormControl(''),
    idAssunto: new FormControl('')
  });
  listaPublicacoes;
  constructor(private router: Router, private route : ActivatedRoute, private errorService: ErrorsService,
    private newService :PublicationService, private messageService: MessageService, private data: Data) {
      this.messageService.clear();
      this.ngOnInit();
    }

  ngOnInit() {
    this.newService.getAll().subscribe(lista =>  {this.listaPublicacoes = lista}, 
      error => this.errorService.tratarException(error)); 
  }

  visualizarConteudoCompleto(id){
    this.router.navigate([ '../'+id], { relativeTo: this.route });
  }

  preAlterarPublicacao(publicacao){  
      this.data.storage = {
        id:publicacao._id, 
        titulo: publicacao.titulo,
        conteudo: publicacao.conteudo,
        resumo: publicacao.resumo, 
        idAssunto: publicacao.idAssunto,
        idCategoria: publicacao.idAssunto.idCategoria._id
      }
      event.preventDefault();
      this.router.navigate(['publicacao/form']);
   }  
     
   removerPublicacao(id){  
    this.newService.delete(id).subscribe(data =>   { 
      this.messageService.add(1,'Publicação removida com sucesso.')
      this.ngOnInit();
    }, error => error )   
   }  

}
