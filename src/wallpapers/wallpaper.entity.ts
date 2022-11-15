import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Wallpaper {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column("varchar", { length: 255 })
  title: string;

  @Column("varchar", { length: 255 })
  description: string;

  @Column("varchar", { length: 255 })
  image: string;

  @CreateDateColumn()
  creation_date: Date;
}