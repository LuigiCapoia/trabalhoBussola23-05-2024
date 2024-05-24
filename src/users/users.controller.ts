import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user-dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { LoggingInterceptor } from 'src/common/interceptors/logging..interceptor';
import { LogService } from 'src/logs/log.service';

@UseInterceptors(LoggingInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly logService: LogService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':username')
  findOne(@Param('username') username: string) {
    try {
      return this.usersService.findOne(username);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This is a custom message',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        }
      );
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
