import { Controller, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get(':id')
  get(@Param('id') id: string) {
    console.log(id);
    return this.authService.get(id);
  }
}
