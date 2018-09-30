import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractComponent } from '../../core/arq/abstract.component';
import { PublicationService } from '../publication.service';
import { MessageService } from '../../core/messages/message.service';
import { Data } from '../../core/providers/data';

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.css']
})
export class PublicationListComponent extends AbstractComponent {
  form = new FormGroup({
    id: new FormControl(),
    titulo: new FormControl(''),
    conteudo: new FormControl(''),
    resumo: new FormControl(''),
    idAssunto: new FormControl('')
  });
  constructor(service: PublicationService, messageService: MessageService, private router: Router, 
    private route: ActivatedRoute, private data: Data) {
    super(service, messageService);
  }

  ngOnInit() {
    this.setPagination(true);
    this.carregarListagem(1);
    if (this.data.storage) { 
       this.carregarListaAfterUpdate() 
    }
  }

  carregarListaAfterUpdate() {
    this.route.queryParams.subscribe(params => {
      if (params['page']) {
        this.service.getAllPagination(params['page']).subscribe(lista => {
          this.pagination.setItems(lista);
          this.collection = this.pagination.getItems()
        });
      }
    });
    this.data.storage = null;
  }

  preAlterarRedirectForm(publicacao) {
    this.data.storage = {
      id: publicacao._id,
      titulo: publicacao.titulo,
      conteudo: publicacao.conteudo,
      resumo: publicacao.resumo,
      idAssunto: publicacao.idAssunto,
      idCategoria: publicacao.idAssunto.idCategoria._id
    }
    event.preventDefault();
    this.router.navigate(['publicacao/form'], { queryParams: { page: this.pagination.getPage() } });
  }
}
