// product-query.service.ts
import { Injectable } from '@nestjs/common';
import { SelectQueryBuilder, Repository } from 'typeorm';
import { Product, ProductStatus } from 'src/entities/product/product.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ProductFilterDto } from './dto/product-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductQueryService {
  constructor(
    @InjectRepository(Product) private readonly repo: Repository<Product>,
  ) {}

  buildQuery({
    filter,
    pagination,
    isAdmin,
  }: {
    filter?: ProductFilterDto;
    pagination?: PaginationDto;
    isAdmin: boolean;
  }): SelectQueryBuilder<Product> {
    const qb = this.repo.createQueryBuilder('product');

    if (!isAdmin) {
      qb.andWhere('product.status = :status', {
        status: ProductStatus.PUBLISHED,
      });
    }

    if (filter?.minPrice !== undefined) {
      qb.andWhere('product.price >= :minPrice', {
        minPrice: filter.minPrice,
      });
    }

    if (filter?.maxPrice !== undefined) {
      qb.andWhere('product.price <= :maxPrice', {
        maxPrice: filter.maxPrice,
      });
    }

    if (filter?.categoryId) {
      qb.andWhere('product.category.id = :category', {
        category: filter.categoryId,
      });
    }

    if (filter?.search) {
      qb.andWhere('product.title ILIKE :search', {
        search: `%${filter.search}%`,
      });
    }

    const page = pagination?.page ?? 1;
    const limit = pagination?.limit ?? 10;

    qb.take(limit)
      .skip((page - 1) * limit)
      .orderBy('product.createdAt', 'DESC');

    return qb;
  }
}
