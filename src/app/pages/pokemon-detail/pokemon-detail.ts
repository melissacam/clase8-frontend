import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon';
import { Pokemon } from '../../interfaces/pokemon.interface';

@Component({
  selector: 'app-pokemon-detail',
  imports: [CommonModule],
  templateUrl: './pokemon-detail.html',
  styleUrl: './pokemon-detail.css'
})
export class PokemonDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private pokemonService = inject(PokemonService);

  pokemon: Pokemon | null = null;
  error: string = '';
  cargando: boolean = false;

  ngOnInit(): void {
    const nombre = this.route.snapshot.paramMap.get('nombre');
    if (nombre) {
      this.buscar(nombre);
    }
  }

  buscar(nombre: string): void {
    this.cargando = true;
    this.pokemonService.getPokemon(nombre)
      .subscribe({
        next: (data) => {
          this.pokemon = data;
          this.cargando = false;
        },
        error: () => {
          this.error = 'Pokémon no encontrado';
          this.cargando = false;
        }
      });
  }

  volver(): void {
    this.router.navigate(['/']);
  }
}