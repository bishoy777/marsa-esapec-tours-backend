import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async loginRequest(createUserDto: CreateUserDto) {
    const userExists = await this.usersService.findByName(createUserDto.name);

    if (!userExists) {
      throw new HttpException('User not found', 404);
    }

    const passwordMatch = await compare(
      createUserDto.password,
      userExists.password,
    );
    console.log(passwordMatch);
    console.log(userExists.password);
    console.log(createUserDto.password);
    if (!passwordMatch) {
      throw new HttpException('Invalid credentials', 401);
    }
    const user = this.usersService.genrateUserResponse(userExists);
    return user;
  }
}
