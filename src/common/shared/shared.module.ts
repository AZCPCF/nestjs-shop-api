import { Global, Module } from '@nestjs/common';
import { Sanitize } from './sanitize.service';
import { Slugify } from './slugify.service';

@Global()
@Module({ providers: [Sanitize, Slugify], exports: [Sanitize, Slugify] })
export class SharedModule {}
