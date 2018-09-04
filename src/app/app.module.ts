import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//npm install angular-froala-wysiwyg npm install froala-editor
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PublicationComponent } from './publication/publication.component';
import { AppRoutingModule } from './app-routing.module';
import { MessageComponent } from './core/messages/message.component';
import { MessageService } from './core/messages/message.service';
import { PublicationService } from './publication/publication.service';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';



@NgModule({
  declarations: [
    AppComponent,
    PublicationComponent,
    MessageComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
    FormsModule, 
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [PublicationService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
