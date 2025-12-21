import { Injectable } from '@nestjs/common';
import { PasswordService } from '../password/password.service';

@Injectable()
export class AuthService {
    constructor(private readonly passwordService:PasswordService){}
    get(p:string){
        return this.passwordService.hash(p)
    }
}
