import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, UserPayload } from 'src/entities/user/user.entity';
import { PasswordService } from '../password/password.service';
import { UserService } from '../user/user.service';
import { JwtService } from '../jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    email: string,
    password: string,
    displayName: string,
  ): Promise<{
    payload: UserPayload;
    accessToken: string;
    refreshToken: string;
  }> {
    const hashedPassword = await this.passwordService.hash(password);
    const user = await this.userService.create(
      email,
      hashedPassword,
      displayName,
    );
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      isActive: user.isActive,
      displayName: user.displayName,
      role: user.role,
    };

    const accessToken = this.jwtService.generateAccessToken(payload);
    const refreshToken = this.jwtService.generateRefreshToken({ sub: user.id });
    await this.userService.updateRefreshToken(user, refreshToken);

    return { payload, accessToken, refreshToken };
  }

  async login(
    email: string,
    password: string,
  ): Promise<{
    payload: UserPayload;
    accessToken: string;
    refreshToken: string;
  }> {
    const user = await this.userService.findOne(email);
    const isValid = await this.passwordService.compare(password, user.password);

    if (!isValid) {
      throw new UnauthorizedException();
    }
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      isActive: user.isActive,
      displayName: user.displayName,
      role: user.role,
    };

    const accessToken = this.jwtService.generateAccessToken(payload);
    const refreshToken = this.jwtService.generateRefreshToken(payload);
    await this.userService.updateRefreshToken(user, refreshToken);
    return { payload, accessToken, refreshToken };
  }
}
