import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon.interface';

// @Injectable: permite que Angular inyecte este servicio en cualquier componente
// providedIn: 'root' → instancia única compartida en toda la app 
@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon'; // URL base de la PokéAPI

  // HttpClient se inyecta para hacer peticiones HTTP
  constructor(private http: HttpClient) { }

  // Llama a la API con el nombre del pokémon y devuelve un Observable<Pokemon>
  // Observable: flujo de datos asíncrono — el componente se suscribe para recibir la respuesta
  getPokemon(nombre: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}/${nombre}`);
  }
}