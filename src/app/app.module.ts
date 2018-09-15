import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
//npm install angular-froala-wysiwyg npm install froala-editor
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { PublicationComponent } from './publication/publication.component';
import { AppRoutingModule } from './app-routing.module';
import { MessageComponent } from './core/messages/message.component';
import { MessageService } from './core/messages/message.service';
import { PublicationService } from './publication/publication.service';
import { ServerErrorsInterceptor } from './core/http-utils/server-error-interceptor'
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { PublicationListComponent } from './publication-list/publication-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Data } from './providers/data';
import { TopicComponent } from './topic/topic.component';
import { TopicService } from './topic/topic-service';
import { CategoryComponent } from './category/category.component';
import { CategoryService } from './category/category-service';
import { PublicationViewComponent } from './publication-view/publication-view.component';
import { NotificationService } from './core/http-utils/notification-service';
import { HttpService } from './core/http-utils/http-service';
import { ErrorExceptionComponent } from './core/error-exception/error-exception.component';
import { ErrorsService } from './core/error-exception/error-exception-service';
import { ErrorsHandler } from './core/error-exception/error-exception-handler';


@NgModule({
  declarations: [
    AppComponent,
    PublicationComponent,
    MessageComponent,
    HeaderComponent,
    FooterComponent,
    PublicationListComponent,
    DashboardComponent,
    TopicComponent,
    CategoryComponent,
    PublicationViewComponent,
    ErrorExceptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
    FormsModule, 
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [
    PublicationService, TopicService, CategoryService, 
    MessageService, NotificationService, ErrorsService, Data, HttpService, 
   {provide: ErrorHandler, useClass: ErrorsHandler},
   {provide: HTTP_INTERCEPTORS, useClass: ServerErrorsInterceptor,multi: true},
   { provide: APP_BASE_HREF, useValue: window['_app_base'] || '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
