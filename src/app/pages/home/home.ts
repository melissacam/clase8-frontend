import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon';
import { FavoritosService } from '../../services/favoritos';
import { Pokemon } from '../../interfaces/pokemon.interface';
import { PokemonCard } from '../../components/pokemon-card/pokemon-card';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule, PokemonCard],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  private pokemonService = inject(PokemonService);
  private favoritosService = inject(FavoritosService);
  private router = inject(Router);

  busqueda: string = '';
  pokemon: Pokemon | null = null;
  error: string = '';
  cargando: boolean = false;
  favoritos: Pokemon[] = [];

  ngOnInit(): void {
    this.cargarFavoritos();
  }

  cargarFavoritos(): void {
    this.favoritosService.getFavoritos().subscribe({
      next: (data) => {
        this.favoritos = data;
      },
      error: (err) => {
        console.error('Error cargando favoritos:', err);
      }
    });
  }

  buscar(): void {
    if (!this.busqueda.trim()) return;

    this.cargando = true;
    this.error = '';
    this.pokemon = null;

    this.pokemonService.getPokemon(this.busqueda.toLowerCase())
      .subscribe({
        next: (data) => {
          this.pokemon = data;
          this.cargando = false;
        },
        error: (err) => {
          this.error = 'Pokémon no encontrado';
          this.cargando = false;
        }
      });
  }

  onAgregarFavorito(pokemon: Pokemon): void {
    this.favoritosService.agregarFavorito(pokemon).subscribe({
      next: () => {
        this.cargarFavoritos();
      },
      error: (err) => {
        console.error('Error agregando favorito:', err);
      }
    });
  }

  eliminarFavorito(id: number): void {
    this.favoritosService.eliminarFavorito(id).subscribe({
      next: () => {
        this.cargarFavoritos();
      },
      error: (err) => {
        console.error('Error eliminando favorito:', err);
      }
    });
  }

  verDetalle(nombre: string): void {
    this.router.navigate(['/pokemon', nombre]);
  }
}