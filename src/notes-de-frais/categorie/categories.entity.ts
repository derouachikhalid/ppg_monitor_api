import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { NodesDeFrais } from "../notes-de-frais.entity";


@Entity()
export class Category {


    @PrimaryGeneratedColumn()
    id : number 

    @Column()
    name : string

    @Column({nullable : true})
    unit_price : number

    @Column({nullable : true})
    notes : string

    @CreateDateColumn()
    createdAt : Date

    @UpdateDateColumn()
    updatedAt : Date

    @OneToMany(() => NodesDeFrais , (notes)=> notes.category)
    @JoinColumn()
    notesDeFrais: NodesDeFrais[]


    @DeleteDateColumn({nullable : true})
    deletedAt : Date

}