import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PublicationComponent } from './publication/publication.component';
import { AppRoutingModule } from './app-routing.module';
import { MessageComponent } from './messages/message.component';



@NgModule({
  declarations: [
    AppComponent,
    PublicationComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
