import { Component, OnInit } from '@angular/core';
import { Episode } from '../../models/episode.model';
import { EpisodeService } from '../../services/episode.service';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-episode-list',
  templateUrl: './episode-list.component.html',
  styleUrls: ['./episode-list.component.scss']
})
export class EpisodeListComponent implements OnInit {
  episodes: Episode[] = [];
  filteredEpisodes: Episode[] = [];
  nextPageUrl: string | null = null;
  page: number = 1;
  loading: boolean = false;
  error: string | null = null;

  constructor(private episodeService: EpisodeService) {}

  ngOnInit(): void {
    this.loadEpisodes(this.page);
  }

  loadEpisodes(page: number): void {
    this.loading = true;
    this.episodeService.getAllEpisodes(page).pipe(
      catchError(error => {
        this.error = 'Error loading episodes. Please try again later.';
        return throwError(error);
      }),
      finalize(() => {
        this.loading = false;
      })
    ).subscribe(
      episodes => {
        this.episodes.push(...episodes.results);
        this.nextPageUrl = episodes.info.next;
        this.filteredEpisodes = [...this.episodes];
      }
    );
  }

  loadMoreEpisodes(): void {
    if (this.nextPageUrl) {
      this.page++;
      this.loadEpisodes(this.page);
    }
  }

  filterEpisodes(filterType: string): void {
    switch (filterType) {
      case 'all':
        this.filteredEpisodes = [...this.episodes];
        break;
      case 'watched':
        this.filteredEpisodes = this.episodes.filter(episode => episode.watched);
        break;
      case 'unwatched':
        this.filteredEpisodes = this.episodes.filter(episode => !episode.watched && !episode.watching);
        break;
      case 'watching':
        this.filteredEpisodes = this.episodes.filter(episode => episode.watching);
        break;
      case 'favorites':
        this.filteredEpisodes = this.episodes.filter(episode => episode.favorite);
        break;
      default:
        this.filteredEpisodes = [...this.episodes];
        break;
    }
  }
}
