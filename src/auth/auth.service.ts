import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/users/entities/user.entity';
import { UsersService } from '@/users/users.service';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { I18nService } from 'nestjs-i18n';
import { compare } from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly i18n: I18nService,
  ) {}
  async loginRequest(createUserDto: CreateUserDto) {
    const userExists = await this.usersRepository.findOne({
      where: { name: createUserDto.name },
      select: ['id', 'name', 'password'],
    });

    if (!userExists) {
      throw new HttpException(
        await this.i18n.translate('common.USER_NOT_FOUND'),
        404,
      );
    }

    const passwordMatch = await compare(
      createUserDto.password,
      userExists.password,
    );

    if (!passwordMatch) {
      throw new HttpException('Invalid credentials', 401);
    }
    const user = this.usersService.genrateUserResponse(userExists);
    return user;
  }
}
