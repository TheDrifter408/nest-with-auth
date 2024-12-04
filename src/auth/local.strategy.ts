import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }
  async validate(email: string, password: string): Promise<User | string> {
    console.log(email, password);
    const user = await this.authService.signIn(email, password);
    if (!user) {
      return `Unauthorized or doesn't exist`;
    }
    return user;
  }
}
