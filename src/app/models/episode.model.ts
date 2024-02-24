export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[]; 
  url: string;
  created: string;
  watched: boolean; 
  watching: boolean;
  favorite: boolean; 

}
export interface EpisodeResponse {
  info: EpisodeInfo;
  results: Episode[];
}
export interface EpisodeInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}