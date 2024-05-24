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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const log_service_1 = require("../../logs/log.service");
let LoggingInterceptor = class LoggingInterceptor {
    constructor(logService) {
        this.logService = logService;
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const method = request.method;
        const route = request.url;
        const now = Date.now();
        return next.handle().pipe((0, operators_1.tap)(async () => {
            const responseTime = `${Date.now() - now}ms`;
            const log = { method, route, response_time: responseTime, timestamp: new Date() };
            await this.logService.createLog(log);
            console.log(`After... ${responseTime}`);
        }), (0, operators_1.catchError)(async (err) => {
            const log = { method, route, error_message: err.message, timestamp: new Date() };
            await this.logService.createLog(log);
            throw err;
        }));
    }
};
exports.LoggingInterceptor = LoggingInterceptor;
exports.LoggingInterceptor = LoggingInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [log_service_1.LogService])
], LoggingInterceptor);
//# sourceMappingURL=logging..interceptor.js.map