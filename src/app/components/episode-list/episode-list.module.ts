import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpisodeListComponent } from './episode-list.component';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule if you're making HTTP requests
import { EpisodeItemModule } from '../episode-item/episode-item.module';

@NgModule({
  declarations: [
    EpisodeListComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    EpisodeItemModule
  ],
  exports: [
    EpisodeListComponent
  ]
})
export class EpisodeListModule { }
