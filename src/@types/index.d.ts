import { UserInRequest } from 'src/entities/user/user.entity';

declare global {
  interface Request {
    user?: UserInRequest;
  }
}
