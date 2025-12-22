import { Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';

@Injectable()
export class PasswordService {
  private readonly saltRounds = 10;

  async hash(password: string) {
    return await bcrypt.hash(password, this.saltRounds);
  }

  async validate(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}
