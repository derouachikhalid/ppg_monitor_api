import {Entity , Column , PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Timestamp, DeleteDateColumn, BeforeInsert, OneToMany, JoinColumn} from 'typeorm'
import { hash } from 'bcrypt';
import { NodesDeFrais } from 'src/notes-de-frais/notes-de-frais.entity';
import { Report } from 'src/reports/Report.entity';
export enum UserRole {
    ADMIN = "admin",
    RESP = "responsable",
    EMPLOYEE = "employee",
}

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id : number ;
    
    @Column()
    email : string;

    
    @Column()
    password : string

    @Column({nullable : true})
    firstName : string

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.EMPLOYEE,
    })
    role : UserRole

    @Column("simple-array")
    tokens: string[]

    @CreateDateColumn()
    createdAt : Date

    @UpdateDateColumn()
    updatedAt : Date

    
    @OneToMany(() => NodesDeFrais , (notes)=> notes.user)
    @JoinColumn()
    notesDeFrais: NodesDeFrais[]

    @OneToMany(() => Report , (report)=> report.owner)
    @JoinColumn()
    ownerReports: Report[]

    @DeleteDateColumn()
    deletedAt : Date

    @BeforeInsert()
    async hashPassword(){
        //Hash password string
        this.password = await hash(this.password,10)

    }





}