import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Slugify } from 'src/common/shared/slugify.service';
import { Product } from 'src/entities/product/product.entity';
import { Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Paginated, PaginationDto } from 'src/common/dto/pagination.dto';
import { ProductQueryService } from './product-query.service';
import { ProductFilterDto } from './dto/product-filter.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly slugify: Slugify,
    private readonly productQueryService: ProductQueryService,
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

  async findAll(options?: {
    filter?: ProductFilterDto;
    pagination?: PaginationDto;
    isAdmin: boolean;
  }): Promise<Paginated<Product>> {
    const qb = this.productQueryService.buildQuery(options);

    const [data, total] = await qb.getManyAndCount();

    const page = options.pagination?.page ?? 1;
    const limit = options.pagination?.limit ?? 10;

    return {
      data,
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
