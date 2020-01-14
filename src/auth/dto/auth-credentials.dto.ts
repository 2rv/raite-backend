import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class AuthCredentialsDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, {
    message: 'username must contain only symbols',
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,20}$/, {
    message: 'password must container 0-9, a-z, A-Z, and #$^+=!*()@%&',
  })
  password: string;
}
