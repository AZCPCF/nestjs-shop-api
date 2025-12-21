import { Body, Controller, Post } from '@nestjs/common';
import { User, UserPayload } from 'src/entities/user/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('displayName') displayName: string,
  ): Promise<{ payload: UserPayload; accessToken: string }> {
    return this.authService.register(email, password, displayName);
  }

  @Post('login')
  login(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<{ payload: UserPayload; accessToken: string }> {
    return this.authService.login(email, password);
  }
}
