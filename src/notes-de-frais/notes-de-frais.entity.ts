import { Report } from 'src/reports/Report.entity';
import { User } from 'src/users/user.entity';
import {PrimaryGeneratedColumn , Column , Entity, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, JoinColumn, BaseEntity, ManyToOne} from 'typeorm'
import { Category } from './categorie/categories.entity';


export enum NoteState {
    A_SOUMETTRE = "à soumettre",
    SOUMIS = "soumis",
    CONFIRMER = "confirmé",
    PAYER = "payé",
    REFUSER = "réfusé",
}


@Entity()
export class NodesDeFrais {

    
    
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description : string;

    @Column()
    unit_price : number        
    
    @Column()
    quantity : number        
    
    @Column({nullable : true})
    taxes : boolean;

    @Column({nullable : true})
    notes : string;

    @Column({
        nullable : true,
        type : 'date'
    })
    Date : Date;

    @CreateDateColumn()
    createdAt : number;

    @UpdateDateColumn()
    modifiedAt : number;

    @Column({nullable : true})
    paye_par : number;

    @Column({nullable : true})
    file : string;

    @Column({nullable : true})
    employee : number;

    // We should verify also the type of this column   bool or Multi choices
    @Column({
        type: "enum",
        enum: NoteState,
        default: NoteState.A_SOUMETTRE,
    })
    
    state : NoteState

    @ManyToOne(() => Category,(category)=> category.notesDeFrais)
    @JoinColumn()
    category: Category

    @ManyToOne(() => User , (user)=> user.notesDeFrais)
    @JoinColumn()
    user: User

    @ManyToOne(() => Report , (report)=> report.notesDeFrais)
    @JoinColumn()
    report: Report
    


    @DeleteDateColumn({nullable : true})
    deletedAt : Date

}