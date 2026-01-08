import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export enum ProductSort {
  MIN = 'min',
  MAX = 'max',
  OLD = 'old',
  NEW = 'new',
}
export class ProductSortDto extends PaginationDto {
  @IsOptional()
  @IsEnum(ProductSort)
  sort?: ProductSort;
}
