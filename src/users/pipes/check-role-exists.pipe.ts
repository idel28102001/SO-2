import { Injectable, PipeTransform } from '@nestjs/common';
import { ChangeRoleDto } from '../dto/change-role.dto';
import { UsersValidateService } from '../services/users-validate.service';

@Injectable()
export class CheckRoleExistsPipe implements PipeTransform {
  constructor(private readonly usersValidate: UsersValidateService) {}

  async transform(dto: ChangeRoleDto) {
    await this.usersValidate.checkRole(dto.role);
    return dto;
  }
}
