import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { UsersValidateService } from './services/users-validate.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  providers: [UsersService, UsersValidateService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
