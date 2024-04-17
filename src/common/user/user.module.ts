import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/common/user/entities/user.entity';
import { JwtStrategy } from '../auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:[    
    ConfigModule.forRoot(),
    // JwtModule.registerAsync({
    //   imports:[ConfigModule],
    //   inject:[ConfigService],
    //   useFactory:(config:ConfigService) => ({
    //     secret:config.get('JWT_SECRET'),
    //     signOptions:{
    //       expiresIn:'1h'
    //     }
    //   })
    // }),
    JwtModule.register({
      secret: 'SECRET',
      signOptions:{
        expiresIn:'1h'
      }
    }),
    PassportModule,
    TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule {}
