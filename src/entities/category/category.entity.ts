import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  Tree,
  TreeChildren,
  TreeParent,
  OneToMany,
} from 'typeorm';
import { Product } from '../product/product.entity';

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
}
