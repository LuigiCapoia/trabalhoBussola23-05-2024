"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const pokemon_schema_1 = require("./schemas/pokemon.schema");
const axios_1 = require("@nestjs/axios");
let PokemonService = class PokemonService {
    constructor(httpService, pokemonModel) {
        this.httpService = httpService;
        this.pokemonModel = pokemonModel;
    }
    async fetchAndSavePokemon(pokemonName) {
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
};
exports.PokemonService = PokemonService;
exports.PokemonService = PokemonService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(pokemon_schema_1.Pokemon.name)),
    __metadata("design:paramtypes", [axios_1.HttpService,
        mongoose_2.Model])
], PokemonService);
//# sourceMappingURL=pokemon.service.js.map