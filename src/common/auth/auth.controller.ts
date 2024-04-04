import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDto } from './dto/signinDto';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ProfileDto } from './dto/profileDto';
import { JwtAuthGuard } from './jwt.gaurd';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


@Post('signin')
async signIn(@Body() signInDto:signInDto)  {
  return await this.authService.signIn(signInDto)
}

@ApiUnauthorizedResponse({description: 'Not authorized'})
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Get('profile')
async getUser(@Body() profileDto:ProfileDto) {
  return await this.getUser(profileDto)
}
}
