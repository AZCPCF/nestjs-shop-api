import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  Tree,
  TreeChildren,
  TreeParent,
  OneToMany,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { Product } from '../product/product.entity';
import { Transform } from 'class-transformer';
import { DateResponse } from '../../common/utils/date-response';

@Tree('closure-table')
@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Index({ unique: true })
  @Column()
  slug: string;

  @TreeParent()
  parent: Category;

  @TreeChildren()
  children: Category[];

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

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
