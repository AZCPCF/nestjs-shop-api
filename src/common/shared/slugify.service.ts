import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { Repository } from 'typeorm';

@Injectable()
export class Slugify {
  async generate<T>(
    repo: Repository<T>,
    field: keyof T,
    value: string,
  ): Promise<string> {
    const baseSlug = slugify(value, { lower: true, strict: true, trim: true });
    let slug = baseSlug;
    let counter = 1;

    while (await repo.exists({ where: { [field]: slug } as any })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    return slug;
  }
}
