import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

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
}
