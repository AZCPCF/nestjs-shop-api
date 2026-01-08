import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Slugify } from 'src/common/shared/slugify.service';
import { Product } from 'src/entities/product/product.entity';
import { Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Paginated, PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly slugify: Slugify,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async create(dto: CreateProductDto): Promise<Product> {
    const slug = await this.slugify.generate(
      this.productRepo,
      'slug',
      dto.title,
    );
    const category = await this.categoryService.findOne(dto.categoryId);
    const product = this.productRepo.create({
      ...dto,
      slug,
      category,
      price: +dto.price,
    });

    return this.productRepo.save(product);
  }

  async findAll(
    fields?: Partial<Product>,
    options?: { pagination?: PaginationDto },
  ): Promise<Paginated<Product>> {
    const { pagination } = options;
    const { page, limit } = pagination;
    const skip = (page - 1) * limit;

    const [items, total] = await this.productRepo.findAndCount({
      where: fields,
      take: limit,
      skip,
    });

    return {
      data: items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(fields?: Partial<Product>): Promise<Product> {
    const product = await this.productRepo.findOneBy(fields);
    if (!product) {
      throw new NotFoundException('product not found');
    }
    return product;
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne({ id });

    const { title, categoryId, ...rest } = dto;
    Object.assign(product, rest);

    if (title && title !== product.title) {
      product.title = title;
      product.slug = await this.slugify.generate(
        this.productRepo,
        'slug',
        title,
      );
    }

    if (categoryId) {
      product.category = await this.categoryService.findOne(categoryId);
    }

    await this.productRepo.save(product);

    return this.productRepo.findOne({
      where: { id: product.id },
      relations: {
        category: true,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne({ id });
    await this.productRepo.remove(product);
  }
}
