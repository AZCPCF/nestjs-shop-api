import {
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { ProductStatus } from 'src/entities/product/product.entity';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @IsString()
  @MinLength(20)
  @IsNotEmpty()
  description: string;

  @IsNumberString()
  @IsNotEmpty()
  price: number;

  @IsEnum(ProductStatus)
  status: ProductStatus;
}
