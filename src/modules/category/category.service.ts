import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category/category.entity';
import { TreeRepository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Slugify } from 'src/common/shared/slugify.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: TreeRepository<Category>,
    private readonly slugify: Slugify,
  ) {}

  async create(dto: CreateCategoryDto): Promise<Category> {
    const slug = await this.slugify.generate(
      this.categoryRepo,
      'slug',
      dto.name,
    );

    const category = this.categoryRepo.create({
      name: dto.name,
      slug,
    });

    if (dto.parentId) {
      const parent = await this.categoryRepo.findOneBy({
        id: dto.parentId,
      });
      if (!parent) {
        throw new NotFoundException('Parent category not found');
      }
      category.parent = parent;
    }

    return this.categoryRepo.save(category);
  }

  async findTree(): Promise<Category[]> {
    return this.categoryRepo.findTrees();
  }

  async findOne(id: string): Promise<Category> {
    const root = await this.categoryRepo.findOneBy({ id });
    if (!root) throw new NotFoundException('Category not found');

    return this.categoryRepo.findDescendantsTree(root);
  }

  async update(id: string, dto: UpdateCategoryDto): Promise<Category> {
    const category = await this.categoryRepo.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (dto.name && dto.name !== category.name) {
      category.name = dto.name;
      category.slug = await this.slugify.generate(
        this.categoryRepo,
        'slug',
        dto.name,
      );
    }

    if (dto.parentId !== undefined) {
      if (dto.parentId === null) {
        category.parent = null;
      } else {
        if (dto.parentId === id) {
          throw new BadRequestException('Category cannot be parent of itself');
        }

        const parent = await this.categoryRepo.findOneBy({
          id: dto.parentId,
        });
        if (!parent) {
          throw new NotFoundException('Parent category not found');
        }

        const descendants = await this.categoryRepo.findDescendants(category);

        if (descendants.some((d) => d.id === dto.parentId)) {
          throw new BadRequestException('Circular parent reference detected');
        }

        category.parent = parent;
      }
    }

    return this.categoryRepo.save(category);
  }

  async remove(id: string): Promise<void> {
    const category = await this.categoryRepo.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const descendants = await this.categoryRepo.findDescendants(category);

    await this.categoryRepo.remove(descendants);
  }
}
