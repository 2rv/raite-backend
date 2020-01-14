import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtConfig } from '../config/jwt.config';
import { JwtPayload } from './interface/jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JwtConfig.secret,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username, id } = payload;
    const user = await this.userRepository.findOne({ username, id });

    if (user === undefined) {
      throw new UnauthorizedException();
    } else {
      return user;
    }
  }
}
