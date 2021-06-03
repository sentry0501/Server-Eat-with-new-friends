import {Entity, Column, PrimaryColumn,ManyToOne,JoinColumn} from "typeorm"
import { RestaurantEntity} from "./restaurantEntity";

@Entity()
export class ProductEntity {
  @PrimaryColumn({type: "varchar", length: 9, nullable: false})
  id: string

  @ManyToOne(type => RestaurantEntity, {
    cascade: true, onDelete: "CASCADE", onUpdate: "CASCADE", eager: true, persistence: true, nullable: false
  })
  @JoinColumn({ name: 'restaurantId', referencedColumnName: 'id'})
  restaurant: RestaurantEntity

  @Column({type: "nvarchar", default: "", nullable: false})
  name: string

  @Column({type: "int", default: 0, nullable: false})
  price: number

  @Column({type: "text", nullable: false})
  description: string

  @Column({type: "varchar", default: "", nullable: false})
  previewUri: string;

  @Column({type: "boolean", default: true, nullable: false})
  isActive: boolean
}