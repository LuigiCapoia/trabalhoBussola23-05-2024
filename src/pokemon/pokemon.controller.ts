import { Controller, Get, Param } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { Pokemon } from './schemas/pokemon.schema';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get(':name')
  async getPokemon(@Param('name') name: string): Promise<Pokemon> {
    return this.pokemonService.fetchAndSavePokemon(name);
  }
}
