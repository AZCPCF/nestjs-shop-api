import { Global, Module } from '@nestjs/common';
import { Sanitize } from './sanitize.service';

@Global()
@Module({ providers: [Sanitize], exports: [Sanitize] })
export class SharedModule {}
