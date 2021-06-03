import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm"
import { CustomerEntity } from "./customerEntity";
import { RestaurantEntity} from "./restaurantEntity";

@Entity()
export class GroupEntity {
  @PrimaryGeneratedColumn("uuid") 
  id: string

  @Column({type: "nvarchar", default: "", nullable: false})
  name: string

  @Column({type: "int", default: "0", nullable: false})
  members: number
  
  @ManyToOne(type => CustomerEntity, {
    cascade: true, onDelete: "RESTRICT", onUpdate: "CASCADE", eager: true, persistence: true, nullable: false
  })
  @JoinColumn({ name: 'leaderId', referencedColumnName: 'id'})
  leader: CustomerEntity

  @ManyToOne(type => RestaurantEntity, {
    cascade: true, onDelete: "CASCADE", onUpdate: "CASCADE", eager: true, persistence: true, nullable: false
  })
  @JoinColumn({ name: 'restaurantId', referencedColumnName: 'id'})
  restaurant: RestaurantEntity
  
  // @OneToMany(type => GroupCustomerEntity,groupCustomer => groupCustomer.group)
  // groupCustomers: GroupCustomerEntity[]

}