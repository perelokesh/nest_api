import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "../user/user.service";

export class JwtStrategy extends PassportStrategy(Strategy){
  constructor (
    private readonly userService: UserService
  ){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret'
    })
  }

  async validate(payload:any){
    
  }
}