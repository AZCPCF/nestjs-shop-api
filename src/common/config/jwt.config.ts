import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  access: process.env.JWT_SECRET_ACCESS,
  refresh: process.env.JWT_SECRET_REFRESH,
}));
