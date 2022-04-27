import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from '../services/users.service';
import { UserExistsPipe } from '../pipes/user.exists.pipe';
import { UsersRegisterDto } from '../dto/users-register.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { UserExistsByIdPipe } from '../pipes/user-exists-by-id.pipe';
import { Role } from '../enums/role.enum';
import { Roles } from '../../auth/decorators/roles.decorator';
import { CheckRoleExistsPipe } from '../pipes/check-role-exists.pipe';
import { ChangeRoleDto } from '../dto/change-role.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async registerUser(@Body(UserExistsPipe) dto: UsersRegisterDto) {
    return await this.usersService.register(dto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async getUser(@Param('id', UserExistsByIdPipe, ParseIntPipe) id: number) {
    return await this.usersService.findUserById(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async getUsers(@Query() query) {
    return await this.usersService.getUserByPag(query);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async changeRole(
    @Param('id', UserExistsByIdPipe, ParseIntPipe) id: number,
    @Body(CheckRoleExistsPipe) dto: ChangeRoleDto,
  ) {
    return await this.usersService.changeRole(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async deleteUser(@Param('id', UserExistsByIdPipe, ParseIntPipe) id: number) {
    return await this.usersService.deleteUser(id);
  }
}
