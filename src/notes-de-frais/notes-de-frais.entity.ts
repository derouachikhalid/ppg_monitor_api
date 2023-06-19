import { Report } from 'src/reports/Report.entity';
import { User } from 'src/users/user.entity';
import {PrimaryGeneratedColumn , Column , Entity, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, JoinColumn, BaseEntity, ManyToOne} from 'typeorm'


export enum spo2State {
    NORMAL = "normal",
    NOT_NORMAL = "pas normal",
    URGENCE = "urgence"
}


@Entity()
export class NodesDeFrais {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        type : 'text'
    })
    ppgRed : Number[];

    @Column({
        type : 'text'
    })
    ppgInfraRed : Number[];

    @Column()
    bpm_value : number
    
    @Column()
    spo2_value : number

    @Column()
    report : string;
    
    @Column({
        type: "enum",
        enum: spo2State,
        nullable : true
    })
    state : spo2State

    @ManyToOne(() => User, (user) => user.ppgSignals)
    patient: User;

    @CreateDateColumn()
    createdAt : number;

    @UpdateDateColumn()
    modifiedAt : number;

    @DeleteDateColumn({nullable : true})
    deletedAt : Date

}