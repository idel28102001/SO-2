import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../entities/users.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { UsersRegisterDto } from '../dto/users-register.dto';
import { ChangeRoleDto } from '../dto/change-role.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepo: Repository<UsersEntity>,
  ) {}

  async register(dto: UsersRegisterDto) {
    const user = this.userRepo.create(dto);
    return await this.userRepo.save(user);
  }

  async findByOpts(options: FindOneOptions<UsersEntity>) {
    return await this.userRepo.findOne(options);
  }

  async findUserById(id: number) {
    return await this.userRepo.findOne(id);
  }

  async getUserByPag(query) {
    return await this.userRepo.find({
      skip: query.offset || 0,
      take: query.limit || 20,
    });
  }

  async changeRole(id: number, dto: ChangeRoleDto) {
    return await this.userRepo.update(id, { role: dto.role });
  }

  async deleteUser(id: number) {
    return await this.userRepo.delete(id);
  }
}
