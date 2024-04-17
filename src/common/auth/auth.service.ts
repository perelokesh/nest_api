import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { signInDto } from './dto/signinDto';
import * as bcrypt from 'bcrypt'
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userservice: UserService,
    private readonly jwtService: JwtService
  ){}
 async signIn(signInDto: signInDto): Promise<any>{
 const {userName,password} = signInDto
 const user = await this.userservice.getUserByName(userName)
 if(!user){
  throw new NotFoundException(`User: ${user.userName} not found`)
 }
 const isPasswordValid = await bcrypt.compare(password, user.password)
 if(!isPasswordValid){
  throw new NotFoundException(`Wrong password for User: ${userName}`);
 }
 return this.generateToken(user)
 }

 async generateToken(
  user:Partial<User>
 ):Promise<{accessToken:string}>{
   const accessToken = await this.jwtService.signAsync(
    {
      id: user.id,
      username: user.userName,
    },
    {
     expiresIn:'1h',
     secret:'SECRET',
    
    }
  
   )
   return {accessToken}
 }

}
