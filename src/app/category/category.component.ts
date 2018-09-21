import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoryService } from './category-service';
import { AbstractComponent } from '../core/arq/abstract.component';
import { AbstractValidator } from '../core/arq/abstract.validator';
import { MessageService } from '../core/messages/message.service';
import { TopicService } from '../topic/topic-service';
import { FileUploadService } from '../core/arq/fileupload.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent extends AbstractComponent implements AbstractValidator {
  selectedFile: File;
  imagePath: any;
  form = new FormGroup({
    id: new FormControl(),
    descricao: new FormControl(),
    areaPublica: new FormControl(false)
  });

  constructor(service: CategoryService, messageService: MessageService, private topicService: TopicService, private fileService: FileUploadService) {
    super(service, messageService);
  }

  ngOnInit() {
    this.setPagination(true);
    this.setFormulario(this.form);
    this.carregarListagem(1);
    this.validateInputs();
  }

  salvar() {
    this.validateInputs();
    super.salvar();
  }

  remover(id) {
    this.clearMensagens();
    this.topicService.findByAssuntoByCategoria(id).subscribe(retorno => {
      if (retorno.length > 0) {
        this.addErrorMessage('Não é possível realizar a remoção por violar a integridade dos dados. Há '
          + retorno.length + ' assunto(s) relacionado a categoria.');
      } else {
        super.remover(id);
      }
    })
  }

  preAlterar(obj) {
    this.form.patchValue({ 'id': obj._id });
    this.form.patchValue({ 'descricao': obj.descricao });
    this.validateInputs();
  }

  validateInputs() {
    this.addValidateRequiredMap('Descrição', this.getObj().descricao);
  };

  onFileChanged(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    this.onUpload();
  }

  onUpload() {
    const formData: FormData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    this.fileService.getFileBase64(formData).subscribe(retorno => {this.imagePath = 'data:image/jpg;base64,'+retorno});
  }

}
