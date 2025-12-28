import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(AuthGuard('jwt'),RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('me')
  getMe(@Req() req: Request) {
    return req.user;
  }
}
