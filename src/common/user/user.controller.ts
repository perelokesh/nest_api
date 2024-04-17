import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt.gaurd';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('createUser')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('getUsers')
  findAll() {
    return this.userService.findAll();
  }

  @ApiUnauthorizedResponse({description: 'Not authorized'})
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('getUser/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @ApiUnauthorizedResponse({description: 'Not authorized'})
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('getUser/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiUnauthorizedResponse({description: 'Not authorized'})
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('getUser/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Get("viewUser/:id")
  viewProfile(@Param('id') id: string){
    return this.userService.getUserById(+id);
  }
}
