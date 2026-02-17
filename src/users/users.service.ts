import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
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
  genrateUserResponse(user: User): IUserResponse {
    return {
      user: {
        ...user,
        token: this.genrateJWT(user),
      },
    };
  }
  async findByName(name: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { name } });

    return user;
  }
}
