import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PasswordModule } from 'src/modules/password/password.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, PasswordModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
