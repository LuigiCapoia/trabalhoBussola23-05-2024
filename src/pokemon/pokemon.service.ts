import { HttpServer, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon, PokemonDocument } from './schemas/pokemon.schema';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class PokemonService {
  constructor(
    private httpService: HttpService,
    @InjectModel(Pokemon.name) private pokemonModel: Model<PokemonDocument>
  ) {}

  async fetchAndSavePokemon(pokemonName: string): Promise<Pokemon> {
    const response = await this.httpService
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .toPromise();

    const { name, height, weight, base_experience } = response.data;

    const createdPokemon = new this.pokemonModel({
      name,
      height,
      weight,
      base_experience,
    });

    return createdPokemon.save();
  }
}
