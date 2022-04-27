import { Role } from '../enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChangeRoleDto {
  @ApiProperty()
  @IsNotEmpty()
  role: Role;
}
