import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  userName: string;

  @Column({ type: 'varchar' })
  password: string;
}