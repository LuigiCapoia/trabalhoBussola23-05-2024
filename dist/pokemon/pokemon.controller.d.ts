import { PokemonService } from './pokemon.service';
import { Pokemon } from './schemas/pokemon.schema';
export declare class PokemonController {
    private readonly pokemonService;
    constructor(pokemonService: PokemonService);
    getPokemon(name: string): Promise<Pokemon>;
}
