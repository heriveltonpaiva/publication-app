import { Component, OnInit } from '@angular/core';
import { PublicationService } from '../publication/publication.service';
import { MessageService } from '../core/messages/message.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { Data } from '../providers/data';
import { Location } from '@angular/common';

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
    categoria: new FormControl(''),
    subcategoria: new FormControl(''),
  });
  listaPublicacoes;
  constructor(private router: Router, 
    private newService :PublicationService, private messageService: MessageService, private data: Data) {}

  ngOnInit() {
    this.newService.getAll().subscribe(lista =>  this.listaPublicacoes = lista); 
  }

  preAlterarPublicacao(publicacao){  
      this.data.storage = {
        id:publicacao._id, 
        titulo: publicacao.titulo,
        conteudo: publicacao.conteudo,
        resumo: publicacao.resumo, 
        categoria: publicacao.categoria,
        subcategoria: publicacao.subcategoria
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