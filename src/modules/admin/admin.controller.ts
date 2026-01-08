import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role, UserInRequest } from 'src/entities/user/user.entity';
import { AdminService } from './admin.service';
import { UpdateUserDto } from './dto/update-user.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('admin')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  getUsers(): Promise<UserInRequest[]> {
    return this.adminService.getAllUsers();
  }

  @Get('users/:id')
  getUserById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<UserInRequest> {
    return this.adminService.findUserById(id);
  }
  @Put('users/:id')
  updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserInRequest> {
    return this.adminService.updateUser(id, dto);
  }
}
