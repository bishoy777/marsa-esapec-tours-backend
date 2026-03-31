import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { IUserResponse } from '@/types/userResponse.Interface';
import { sign } from 'jsonwebtoken';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);

    const userRes = await this.usersRepository.save(user);
    return this.genrateUserResponse(userRes);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  genrateJWT(user: User) {
    return sign(
      {
        id: user.id,
        name: user.name,
      },
      process.env.JWT_SECRET || 'token',
    );
  }
  genrateUserResponse(user: User): any {
    return {
      user: {
        id: user.id,
        name: user.name,
        token: this.genrateJWT(user),
      },
    };
  }
  async findByName(name: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { name } });

    return user;
  }
}
