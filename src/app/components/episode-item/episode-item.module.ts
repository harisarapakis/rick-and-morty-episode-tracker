import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpisodeItemComponent } from './episode-item.component';

@NgModule({
  declarations: [EpisodeItemComponent],
  imports: [CommonModule],
  exports: [EpisodeItemComponent]
})
export class EpisodeItemModule {}
