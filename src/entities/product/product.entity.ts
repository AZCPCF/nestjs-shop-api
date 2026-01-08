import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../category/category.entity';
import { Transform } from 'class-transformer';
import { DateResponse } from '../../common/utils/date-response';

export enum ProductStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
}

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'enum', enum: ProductStatus, default: ProductStatus.DRAFT })
  status: ProductStatus;

  @ManyToOne(() => Category, (category) => category.products, {
    nullable: false,
    eager: true,
  })
  category: Category;

  @CreateDateColumn()
  @Transform(({ value }) => DateResponse.from(value), {
    toPlainOnly: true,
  })
  createdAt: Date;

  @UpdateDateColumn()
  @Transform(({ value }) => DateResponse.from(value), {
    toPlainOnly: true,
  })
  updatedAt: Date;
}
