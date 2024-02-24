import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Episode, EpisodeResponse } from '../models/episode.model';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {
  private baseUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) {}

  getAllEpisodes(page: number = 1): Observable<EpisodeResponse> {
    return this.http.get<EpisodeResponse>(`${this.baseUrl}/episode?page=${page}`)
  }


  getEpisode(id: number): Observable<Episode> {
    return this.http.get<Episode>(`${this.baseUrl}/episode/${id}`);
  }

  getEpisodesByIds(ids: number[]): Observable<Episode[]> {
    const idParams = ids.join(',');
    return this.http.get<Episode[]>(`${this.baseUrl}/episode/${idParams}`);
  }
}
