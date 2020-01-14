import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { AuthService } from './auth.service';
import { LoginInfo } from './interface/login-info.interface';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorator/get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/login')
  logIn(
    @Body(ValidationPipe) loginCredentialsDto: LoginCredentialsDto,
  ): Promise<LoginInfo> {
    return this.authService.logIn(loginCredentialsDto);
  }

  @Get('/token')
  @UseGuards(AuthGuard())
  checkToken(@GetUser() user: User): void {}
}
