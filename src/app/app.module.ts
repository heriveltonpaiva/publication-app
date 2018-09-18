import { LoggerModule, NgxLoggerLevel, NGXLogger } from 'ngx-logger';
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
import { PublicationInterceptor } from './core/http-utils/publication-interceptor'
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { PublicationListComponent } from './publication-list/publication-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Data } from './core/providers/data';
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
import { AuthenticationService } from './core/authentication/authentication-service';
import { LoginComponent } from './login/login.component';
import { TokenStorage } from './core/authentication/token-storage';
import { PublicService } from './public/public.service';


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
    ErrorExceptionComponent,
    LoginComponent
  ],
  imports: [
    LoggerModule.forRoot({level: NgxLoggerLevel.DEBUG, serverLogLevel: NgxLoggerLevel.ERROR}),
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
    PublicationService, TopicService, CategoryService, PublicService,
    MessageService, NotificationService, ErrorsService, Data, TokenStorage,  HttpService, AuthenticationService, 
   {provide: ErrorHandler, useClass: ErrorsHandler},
   {provide: HTTP_INTERCEPTORS, useClass: PublicationInterceptor,multi: true},
   { provide: APP_BASE_HREF, useValue: window['_app_base'] || '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
