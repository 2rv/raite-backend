import { Injectable, Inject, forwardRef, Scope } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interface/jwt-payload.interface';
import { LoginInfo } from './interface/login-info.interface';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialDto);
  }

  async logIn(loginCredentialDto: LoginCredentialsDto): Promise<LoginInfo> {
    const userData = await this.userRepository.logIn(loginCredentialDto);
    const { username, id } = userData;

    const payload: JwtPayload = { username, id };
    const accessToken = await this.jwtService.sign(payload);

    const loginInfo: LoginInfo = { accessToken, username, id };
    return loginInfo;
  }
}
