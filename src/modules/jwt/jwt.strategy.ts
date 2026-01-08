import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserInRequest, UserPayload } from 'src/entities/user/user.entity';
import { UserService } from '../user/user.service';
import { DateResponse } from 'src/common/utils/date-response';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('jwt.access'),
      ignoreExpiration: false,
    });
  }

  async validate(payload: UserPayload): Promise<UserInRequest<DateResponse>> {
    const user = await this.userService.findOne({
      fields: { id: payload.sub },
    });
    if (!user || !user.isActive) {
      throw new UnauthorizedException('User not found or inactive');
    }
    return {
      ...user,
      createdAt: DateResponse.from(user.createdAt),
      updatedAt: DateResponse.from(user.updatedAt),
    };
  }
}
