import {Entity , Column , PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Timestamp, DeleteDateColumn, BeforeInsert, OneToMany, JoinColumn} from 'typeorm'
import { hash } from 'bcrypt';
import { NodesDeFrais } from 'src/notes-de-frais/notes-de-frais.entity';
import { Report } from 'src/reports/Report.entity';
export enum UserRole {
    ADMIN = "admin",
    DOCTOR = "doctor",
    PATIENT = "patient",
    PROFESSOR = "Professor",
}

export enum Sexe {
    MAN = "man",
    WOMAN = "woman",
}

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id : number ;
    
    @Column()
    email : string;

    @Column()
    phone : string;

    @Column()
    adresse : string;

    
    @Column()
    password : string

    @Column({nullable : true})
    firstName : string

    @Column({nullable : true})
    secondName : string

    @Column({nullable : true})
    familyName : string

    @Column()
    birthDay : Date

    @Column()
    birthPlace : String

    @Column({
        type: "enum",
        enum: Sexe,
        default: Sexe.MAN,
    })
    sexe : Sexe

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.PATIENT,
    })
    role : UserRole

    @OneToMany(() => NodesDeFrais, (note) => note.patient)
    ppgSignals: NodesDeFrais[];

    @Column("simple-array")
    tokens: string[]

    @CreateDateColumn()
    createdAt : Date

    @UpdateDateColumn()
    updatedAt : Date


    @DeleteDateColumn()
    deletedAt : Date

    @BeforeInsert()
    async hashPassword(){
        //Hash password string
        this.password = await hash(this.password,10)

    }





}