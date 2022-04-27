import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { AuthLoginDto } from '../dto/auth-login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(dto: AuthLoginDto) {
    const {
      id: userId,
      email,
      role,
    } = await this.usersService.findByOpts({
      where: { email: dto.email },
      select: ['id', 'email', 'role'],
    });
    const some = { userId, email, role };
    return {
      access_token: this.jwtService.sign(some),
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByOpts({
      where: { email },
      select: ['password'],
    });
    const check = bcrypt.compareSync(password, user?.password);
    if (!(user && check))
      throw new UnauthorizedException('Неверный email или пароль');
    else return true;
  }
}
