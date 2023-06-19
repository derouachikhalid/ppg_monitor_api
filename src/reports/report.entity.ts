import { NodesDeFrais } from 'src/notes-de-frais/notes-de-frais.entity';
import { User } from 'src/users/user.entity';
import {PrimaryGeneratedColumn , Column , Entity, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, JoinColumn, ManyToMany, ManyToOne} from 'typeorm'


enum ReportState {
    CONFIRME = "comfirmed",
    SOUMIS = "soumis",
    TRASH = "trashed",
}

enum ReportPaymentState {
    PAYED = "Payed",
    NOT_PAYED = "Not Payed"
    
}


@Entity()
export class Report {
    
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    resume : string;

    @Column({
        type: "enum",
        enum: ReportState,
        default: ReportState.SOUMIS,
    })
    state : ReportState;

    @Column({
        type: "enum",
        enum: ReportPaymentState,
        default: ReportPaymentState.NOT_PAYED,
    })
    paymentState : ReportPaymentState;

    @CreateDateColumn()
    createdAt : Date

    @UpdateDateColumn()
    updatedAt : Date

    @DeleteDateColumn({nullable:true})
    deletedAt: Date;

}