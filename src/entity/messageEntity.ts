import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm"
import { CustomerEntity } from "./customerEntity";
import { GroupEntity} from "./groupEntity";

@Entity()
export class MessageEntity {
  @PrimaryGeneratedColumn("uuid") 
  id: string

  @Column({type: "nvarchar", nullable: false})
  content: string

  @Column({type: "datetime", nullable: false})
  date: Date
  
  @ManyToOne(type => CustomerEntity, {
    cascade: true, onDelete: "CASCADE", onUpdate: "CASCADE", eager: true, persistence: true, nullable: false
  })
  @JoinColumn({ name: 'customerId', referencedColumnName: 'id'})
  customer: CustomerEntity

  @ManyToOne(type => GroupEntity, {
    cascade: true, onDelete: "CASCADE", onUpdate: "CASCADE", eager: true, persistence: true, nullable: false
  })
  @JoinColumn({ name: 'groupId', referencedColumnName: 'id'})
  group: GroupEntity

}