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
import { PublicationViewComponent } from './publication/view/publication-view.component';
import { PublicationListComponent } from './publication/list/publication-list.component';
import { AppRoutingModule } from './app-routing.module';
import { MessageComponent } from './core/messages/message.component';
import { MessageService } from './core/messages/message.service';
import { PublicationService } from './publication/publication.service';
import { PublicationInterceptor } from './core/http-utils/publication-interceptor'
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Data } from './core/providers/data';
import { TopicComponent } from './topic/topic.component';
import { TopicService } from './topic/topic-service';
import { CategoryComponent } from './category/category.component';
import { CategoryService } from './category/category-service';
import { NotificationService } from './core/http-utils/notification-service';
import { HttpService } from './core/http-utils/http-service';
import { ErrorExceptionComponent } from './core/error-exception/error-exception.component';
import { ErrorsService } from './core/error-exception/error-exception-service';
import { ErrorsHandler } from './core/error-exception/error-exception-handler';
import { AuthenticationService } from './core/authentication/authentication-service';
import { TokenStorage } from './core/authentication/token-storage';
import { FileUploadService } from './core/arq/fileupload.service';
import { UserComponent } from './core/user/user.component';
import { LoginComponent } from './core/user/login/login.component';
import { CreateAccountComponent } from './core/user/create-account/create-account.component';
import { CreateAccountService } from './core/user/create-account/create-account-service';
import { UserListComponent } from './core/user/list/user-list.component';
import { UserViewComponent } from './core/user/view/user-view.component';
import { DashboardService } from './dashboard/dashboard.service';
import { UserService } from './core/user/user.service';
import { UserPublicService } from './core/user/view/user-public.service';

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
    LoginComponent,
    CreateAccountComponent,
    UserComponent,
    UserListComponent,
    UserViewComponent
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
    PublicationService, TopicService, CategoryService, DashboardService, FileUploadService, CreateAccountService, UserService,
    MessageService, NotificationService, ErrorsService, Data, TokenStorage, HttpService, AuthenticationService, UserPublicService,
   {provide: ErrorHandler, useClass: ErrorsHandler},
   {provide: HTTP_INTERCEPTORS, useClass: PublicationInterceptor,multi: true},
   { provide: APP_BASE_HREF, useValue: window['_app_base'] || '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
