import {Entity, Column, PrimaryColumn, Unique, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Index} from "typeorm"
import { CustomerEntity } from "./customerEntity";
import { GroupEntity } from "./groupEntity";


@Entity()
export class GroupCustomerEntity {
  @ManyToOne(type => GroupEntity, {
    cascade: true, onDelete: "CASCADE", onUpdate: "CASCADE", eager: true, persistence: true, nullable: false, primary: true
  })
  @JoinColumn({ name: 'groupId', referencedColumnName: 'id'})
  group: GroupEntity

  @ManyToOne(type => CustomerEntity, {
    cascade: true, onDelete: "CASCADE", onUpdate: "CASCADE", eager: true, persistence: true, nullable: false, primary: true
  })
  @JoinColumn({ name: 'customerId', referencedColumnName: 'id'})
  customer: CustomerEntity

  @Column({type: "nvarchar", default: "", nullable: false})
  restaurantId: string

}