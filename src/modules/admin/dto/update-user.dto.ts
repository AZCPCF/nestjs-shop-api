import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { Role } from 'src/entities/user/user.entity';

export class UpdateUserDto {
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true || value == '1')
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
