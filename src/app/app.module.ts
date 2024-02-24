import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { EpisodeListModule } from './components/episode-list/episode-list.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    EpisodeListModule // Import EpisodeListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
