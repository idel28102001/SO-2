import { Injectable, PipeTransform } from '@nestjs/common';
import { UsersRegisterDto } from '../dto/users-register.dto';
import { UsersValidateService } from '../services/users-validate.service';

@Injectable()
export class UserExistsPipe implements PipeTransform {
  constructor(private readonly usersValidate: UsersValidateService) {}

  async transform(dto: UsersRegisterDto) {
    await this.usersValidate.checkUserExistsByEmail(dto.email);
    return dto;
  }
}
