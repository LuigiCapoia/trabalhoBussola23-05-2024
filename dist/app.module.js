"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const logger_middleware_1 = require("./common/middleware/logger.middleware");
const log_module_1 = require("./logs/log.module");
const core_1 = require("@nestjs/core");
const logging__interceptor_1 = require("./common/interceptors/logging..interceptor");
const pokemon_module_1 = require("./pokemon/pokemon.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes({ path: '*', method: common_1.RequestMethod.POST });
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forRoot('mongodb://0.0.0.0/store-project'), auth_module_1.AuthModule, users_module_1.UsersModule, log_module_1.LogModule, pokemon_module_1.PokemonModule],
        controllers: [],
        providers: [
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: logging__interceptor_1.LoggingInterceptor,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map