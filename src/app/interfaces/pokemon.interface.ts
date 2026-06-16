// Representa un tipo de pokémon (ej: fuego, agua)
export interface PokemonTipo {
    slot: number;        // Posición del tipo (1 = tipo primario, 2 = secundario)
    type: {
        name: string;    // Nombre del tipo: "fire", "water", etc.
        url: string;     // URL de la API con detalles del tipo
    };
}

// Estructura principal del Pokémon que devuelve la API
export interface Pokemon {
    id: number;               
    name: string;             
    height: number;           
    weight: number;           
    base_experience: number;  
    types: PokemonTipo[];     
    sprites: {
        front_default: string; 
    };
}