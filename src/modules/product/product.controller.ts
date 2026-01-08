import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Paginated } from 'src/common/dto/pagination.dto';
import { OptionalJwtAuthGuard } from 'src/common/guards/optional-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Product, ProductStatus } from 'src/entities/product/product.entity';
import { Role } from 'src/entities/user/user.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductFilterDto } from './dto/product-filter.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  createProduct(@Body() dto: CreateProductDto): Promise<Product> {
    return this.productService.create(dto);
  }

  @Get()
  @UseGuards(OptionalJwtAuthGuard)
  getProducts(
    @Req() { user }: Request,
    @Query() queries: ProductFilterDto,
  ): Promise<Paginated<Product>> {
    const { sort, page, limit, ...filter } = queries;

    return this.productService.findAll({
      filter,
      pagination: { page, limit },
      sort: { sort },
      isAdmin: user?.role === Role.ADMIN,
    });
  }

  @Get(':slug')
  @UseGuards(OptionalJwtAuthGuard)
  getProduct(
    @Param('slug') slug: string,
    @Req() { user }: Request,
  ): Promise<Product> {
    if (user?.role === Role.ADMIN) {
      return this.productService.findOne({ slug });
    }
    return this.productService.findOne({
      slug,
      status: ProductStatus.PUBLISHED,
    });
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  updateProduct(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  removeProduct(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.productService.remove(id);
  }
}
