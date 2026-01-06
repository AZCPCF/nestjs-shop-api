import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entities/category/category.entity';
import { Product } from 'src/entities/product/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
