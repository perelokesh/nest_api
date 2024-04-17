import { Column, Entity, BaseEntity, PrimaryGeneratedColumn } from "typeorm";
import bcrypt from 'bcrypt';
@Entity()
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ type: 'varchar', unique:true})
  userName: string;

  @Column({ type: 'varchar', unique: true})
  password: string;

}