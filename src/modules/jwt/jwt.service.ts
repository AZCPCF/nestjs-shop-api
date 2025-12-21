import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { UserPayload } from 'src/entities/user/user.entity';
@Injectable()
export class JwtService {
  constructor(
    private readonly nestJwtService: NestJwtService,
    private readonly configService: ConfigService,
  ) {}
  generateAccessToken(payload: UserPayload) {
    return this.nestJwtService.sign(payload);
  }
  generateRefreshToken(payload: Pick<UserPayload, 'sub'>) {
    return this.nestJwtService.sign(payload, {
      expiresIn: '7d',
      secret: this.configService.get('jwt.refresh'),
    });
  }
}
