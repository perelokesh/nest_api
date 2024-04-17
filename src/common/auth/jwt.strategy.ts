import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "../user/user.service";

export class JwtStrategy extends PassportStrategy(Strategy){
  constructor (
    private readonly userService: UserService
  ){
    super({

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'SECRET'
    })
  }

  async validate(payload:any){
    const {userId} = payload;
    const user = await this.userService.findOne(userId);
    if(!user){
      throw new Error('Invalid token');
    }
    console.log(user);
    return user;
    
  }
}