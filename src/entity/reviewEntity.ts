import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm"
import { CustomerEntity } from "./customerEntity";
import { RestaurantEntity} from "./restaurantEntity";

@Entity()
export class ReviewEntity {
  @PrimaryGeneratedColumn("uuid") 
  id: string

  @Column({type: "text", nullable: false})
  content: string

  @Column({type: "int", default: "0", nullable: false})
  star: number

  @Column({type: "date", nullable: false})
  date: Date
  
  @ManyToOne(type => CustomerEntity, {
    cascade: true, onDelete: "RESTRICT", onUpdate: "CASCADE", eager: true, persistence: true, nullable: false
  })
  @JoinColumn({ name: 'customerId', referencedColumnName: 'id'})
  customer: CustomerEntity

  @ManyToOne(type => RestaurantEntity, {
    cascade: true, onDelete: "CASCADE", onUpdate: "CASCADE", eager: true, persistence: true, nullable: false
  })
  @JoinColumn({ name: 'restaurantId', referencedColumnName: 'id'})
  restaurant: RestaurantEntity

}