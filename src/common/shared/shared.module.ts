import { Global, Module } from '@nestjs/common';
import { Sanitize } from './sanitize.service.js';
import { Slugify } from './slugify.service.js';

@Global()
@Module({ providers: [Sanitize, Slugify], exports: [Sanitize, Slugify] })
export class SharedModule {}
