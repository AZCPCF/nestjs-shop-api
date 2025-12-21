import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/entities/user/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('displayName') displayName: string,
  ): Promise<User> {
    return this.authService.register(email, password, displayName);
  }

  @Post('login')
  login(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<User> {
    return this.authService.login(email, password);
  }
  
}
