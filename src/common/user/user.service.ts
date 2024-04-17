import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/common/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
     private readonly userRepository: Repository<User>,
  ){}
  async create(createUserDto: CreateUserDto):Promise<User> {
    const {userName} = createUserDto;
    const existUser = await this.userRepository.findOne({
      where:{userName},
    })
    if(existUser){
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)
    }     
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user)
  }

  async findAll():Promise<User[]> {
    return await this.userRepository.find()
  }

  async findOne(id: number) {
    const user =  await this.userRepository.findOneBy({id});
    if(!user){
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({id});
    if(!user){
       throw new NotFoundException()
    }
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }
  async remove(id: number) {
    const user = await this.userRepository.findOneBy({id});
    if(!user){
       throw new NotFoundException()
    }
    return await this.userRepository.remove(user);
  }
  async getUserById(id:number): Promise<User> {
    const user = await this.userRepository.findOneBy({id});
    if(!user){
      throw new NotFoundException(`User with id " ${id} " not found`)
    }
    return user;
  }
  async getUserByName(userName:string): Promise<User> {
    const user = await this.userRepository.findOneBy({userName})
    if(!user){
      throw new NotFoundException(`User with name " ${userName} " not found`)
    }
    return user;
  }
}
