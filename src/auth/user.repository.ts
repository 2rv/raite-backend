import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AUTH_ERROR } from './errors.enum';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const user = this.create();

    user.username = username;
    user.password = password;
    await user.hashPassword();

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(AUTH_ERROR.AUTH_USER_EXISTS);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async logIn(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { username, password } = authCredentialsDto;

    const user = await this.findOne({ username });
    if (user === undefined) {
      throw new NotFoundException(AUTH_ERROR.AUTH_USER_NOT_FOUND);
    } else {
      const passwordCorrect = await user.validatePassword(password);

      if (passwordCorrect === false) {
        throw new BadRequestException(AUTH_ERROR.AUTH_USER_UNCORRECT_DATA);
      } else {
        return user;
      }
    }
  }
}
