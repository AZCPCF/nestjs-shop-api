// product-query.service.ts
import { Injectable } from '@nestjs/common';
import { SelectQueryBuilder, Repository } from 'typeorm';
import { Product, ProductStatus } from 'src/entities/product/product.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ProductFilterDto } from './dto/product-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductSort, ProductSortDto } from './dto/product-sort.dto';

@Injectable()
export class ProductQueryService {
  constructor(
    @InjectRepository(Product) private readonly repo: Repository<Product>,
  ) {}

  buildQuery({
    filter,
    pagination,
    isAdmin,
    sort: { sort },
  }: {
    filter?: ProductFilterDto;
    pagination?: PaginationDto;
    sort?: ProductSortDto;
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

    qb.take(limit).skip((page - 1) * limit);

    if (sort) {
      switch (sort) {
        case ProductSort.MAX:
          qb.orderBy({ 'product.price': 'DESC' });
          break;
        case ProductSort.MIN:
          qb.orderBy({ 'product.price': 'ASC' });
          break;
        case ProductSort.NEW:
          qb.orderBy({ 'product.createdAt': 'ASC' });
          break;
        case ProductSort.OLD:
          qb.orderBy({ 'product.createdAt': 'DESC' });
          break;
        default:
          qb.orderBy('product.createdAt', 'DESC');
      }
    }
    return qb;
  }
}
