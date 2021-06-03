import {Entity, Column, PrimaryColumn, Unique, PrimaryGeneratedColumn, BeforeInsert} from "typeorm"
import AuthorGroupRole from "../config/authorGroupRoleConfig"

@Entity()
export class RestaurantEntity {
  @PrimaryColumn({type: "varchar", length: 9, nullable: false})
  id: string

  @Column({type: "nvarchar", default: "", nullable: false})
  name: string

  @Column({type: "text", default: "", nullable: false})
  description: string

  @Column({type: "nvarchar", default: "", nullable: true})
  address: string

  @Column({type: "int", default: AuthorGroupRole.CUSTOMER, nullable: false})
  roleCode: number

  @Column({type: "varchar", default: "", nullable: false})
  avatarUri: string;

  @Column({type: "varchar", default: "", nullable: false})
  coverUri: string;

  @Column({type: "boolean", default: true, nullable: false})
  isActive: boolean

  @Column({type: "varchar", nullable: false, unique: true})
  account: string  

  @Column({type: "varchar", nullable: false})
  hashPassword: string

  @Column({type: "varchar", nullable: false})
  password: string
}