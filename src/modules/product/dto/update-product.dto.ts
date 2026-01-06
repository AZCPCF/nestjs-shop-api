import {
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { ProductStatus } from 'src/entities/product/product.entity';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsUUID()
  @IsOptional()
  categoryId?: string;

  @IsString()
  @MinLength(20)
  @IsOptional()
  description?: string;

  @IsNumberString()
  @IsOptional()
  price?: number;

  @IsEnum(ProductStatus)
  @IsOptional()
  status?: ProductStatus;
}
