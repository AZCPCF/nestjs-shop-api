import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [UserModule],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
