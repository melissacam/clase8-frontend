import { CommonModule } from '@angular/common';

// Component permite crear componentes
// Input permite recibir datos del componente padre
// Output permite enviar eventos al componente padre
// EventEmitter permite emitir eventos personalizados
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Pokemon } from '../../interfaces/pokemon.interface';

@Component({

  // Nombre de la etiqueta HTML del componente
  selector: 'app-pokemon-card',

  // Módulos necesarios dentro del HTML de este componente
  imports: [CommonModule],

  // Archivo HTML asociado al componente
  templateUrl: './pokemon-card.html',

  // Archivo CSS asociado al componente
  styleUrl: './pokemon-card.css',
})

export class PokemonCard {

  // @Input permite recibir información desde el componente padre
  // Aquí recibe un objeto Pokémon
  // El ! indica que Angular inicializará la variable después
  @Input() pokemon!: Pokemon;


  // @Output permite enviar eventos desde el hijo hacia el padre
  // aggFavorito será el nombre del evento que escuchará el padre
  //
  // EventEmitter<Pokemon> indica que el evento enviará
  // un objeto del tipo Pokemon
  @Output() aggFavorito = new EventEmitter<Pokemon>();


  // Método que se ejecuta normalmente al hacer click
  // en un botón de "Agregar a favoritos"
  onFavorito(): void {

    // emit() envía el Pokémon actual al componente padre
    //
    // this.pokemon contiene el Pokémon recibido por @Input
    //
    // El padre puede capturar este evento usando:
    // (aggFavorito)="onAgregarFavorito($event)"
    this.aggFavorito.emit(this.pokemon);
  }

}