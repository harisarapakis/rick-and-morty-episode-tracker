import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Episode } from '../../models/episode.model';
import { CharacterService } from '../../services/character.service';

@Component({
    selector: 'app-episode-item',
    templateUrl: './episode-item.component.html',
    styleUrls: ['./episode-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush 
})
export class EpisodeItemComponent implements OnInit {
    @Input() episode!: Episode;
    characterNames$: Observable<string> | undefined;

    constructor(private characterService: CharacterService) { }

    ngOnInit() {
        this.characterNames$ = this.fetchCharacterNames();
    }

    private fetchCharacterNames(): Observable<string> {
        const characterIds = this.extractCharacterIds(this.episode.characters);

        return this.characterService.getCharactersByIds(characterIds).pipe(
            map(characters => this.extractCharacterNames(characters))
        );
    }

    private extractCharacterIds(characterUrls: string[]): number[] {
        return characterUrls.slice(0, 5).map(url => {
            const id = url.split('/').pop();
            return id ? parseInt(id) : NaN;
        });
    }

    private extractCharacterNames(characters: any[]): string {
        return characters.map(character => character.name).join(', ');
    }

    markAsWatched(): void {
        this.episode.watched = true;
        this.episode.watching = false;
    }

    markAsUnwatched(): void {
        this.episode.watched = false;
        this.episode.watching = false;
    }

    markAsWatching(): void {
        this.episode.watched = false;
        this.episode.watching = true;
    }
    markAsFavorite(): void {
        if (this.episode.watched) {
            this.episode.favorite = true;
        }
    }


}
