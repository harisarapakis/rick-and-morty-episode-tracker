import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Character} from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private baseUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) {}

  getAllCharacters(page: number = 1): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.baseUrl}/character?page=${page}`);
  }

  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.baseUrl}/character/${id}`);
  }

  getCharactersByIds(ids: number[]): Observable<Character[]> {
    const idParams = ids.join(',');
    return this.http.get<Character[]>(`${this.baseUrl}/character/${idParams}`);
  }

  filterCharacters(filters: { [key: string]: string }): Observable<Character[]> {
    const queryParams = new URLSearchParams(filters).toString();
    return this.http.get<Character[]>(`${this.baseUrl}/character/?${queryParams}`);
  }
}
