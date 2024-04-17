import { ApiProperty } from "@nestjs/swagger";
import { IS_ALPHANUMERIC, IsAlphanumeric, IsNotEmpty, IsString, Length, isAlphanumeric } from "class-validator";

export class CreateUserDto {
@ApiProperty()
@IsString()
@IsNotEmpty()
userName:string

@ApiProperty()
@IsString()
@IsNotEmpty()
password:string;

}
