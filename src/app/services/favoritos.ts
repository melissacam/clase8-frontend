import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/favoritos';

  getFavoritos(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.apiUrl);
  }

 agregarFavorito(pokemon: Pokemon): Observable<Pokemon> {
  const pokemonReducido = {
    id: pokemon.id,
    name: pokemon.name,
    weight: pokemon.weight,
    height: pokemon.height,
    base_experience: pokemon.base_experience,
    types: pokemon.types,
    sprites: {
      front_default: pokemon.sprites.front_default
    }
  };
  return this.http.post<Pokemon>(this.apiUrl, pokemonReducido);
}

  eliminarFavorito(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}