import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDto } from './dto/signinDto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


@Post('signin')
async signIn(@Body() signInDto:signInDto)  {
  return await this.authService.signIn(signInDto)
}
}
