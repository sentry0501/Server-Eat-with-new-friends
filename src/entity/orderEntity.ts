import {Entity, Column, PrimaryColumn,ManyToOne,JoinColumn} from "typeorm"
import { GroupEntity} from "./groupEntity";

@Entity()
export class OrderEntity {
  @PrimaryColumn({type: "varchar", length: 9, nullable: false})
  id: string

  @ManyToOne(type => GroupEntity, {
    cascade: true, onDelete: "CASCADE", onUpdate: "CASCADE", eager: true, persistence: true, nullable: false
  })
  @JoinColumn({ name: 'groupId', referencedColumnName: 'id'})
  group: GroupEntity

  @Column({type: "datetime", nullable: false})
  time: Date

  @Column({type: "text", nullable: true})
  note: string

  @Column({type: "int", default: 0, nullable: false})
  approve: number 

  @Column({type: "nvarchar", nullable: false})
  restaurantId: string
}