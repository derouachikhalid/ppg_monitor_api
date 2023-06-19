import { BadRequestException, Injectable ,NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import {NodesDeFrais} from './notes-de-frais.entity'
import { MailerService } from '@nestjs-modules/mailer';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class NotesDeFraisService {

    constructor(
        @InjectRepository(NodesDeFrais) private repo : Repository<NodesDeFrais>,private readonly mailerservice : MailerService, private userService : UsersService
    ){}

async createNoteFrais(attrbs : Partial<NodesDeFrais>){
    
    
    console.log(attrbs)
    const note = await  this.repo.create(attrbs);
    return this.repo.save(note);
   }

async getNote(id){
    
    let note =await this.repo.findOne({
        where : {id},
            relations : {
                patient : true
            }});

    
    return {
        ...note,
        ppgRed : this.arrayStoN(note.ppgRed),
        ppgInfraRed : this.arrayStoN(note.ppgInfraRed)
    };

}


arrayStoN(stringArr) {
    
    var output = stringArr.replace("[","").replace("]","");
    
    output = output.split(",");
    
    return output = output.map(kha=>Number(kha));
}

async getNotes(){
    const notes = await this.repo.find({
        relations : {
            patient : true
        }});
    return notes;

}

async updateNote(id : string,attrbs : Partial<NodesDeFrais>){
    if(Object.keys(attrbs).length === 0){
        throw new BadRequestException('There is no way to modify')
    }
    const note =await this.repo.findOne({where : {id},relations : {patient : true}});
    Object.assign(note,attrbs)
    const ppg =await this.repo.save(note);
    //const crnt = await this.userService.findOne(authId);
    console.log(ppg)
    const subject = `Rapport du Diagnostic [${new Date(ppg.createdAt).toDateString()}]`;
    const html = `
    <p>       Bonjour ${ppg.patient.sexe==='man' ? 'monsieur' : 'madame' } <b>${ppg.patient.familyName}</b>,</p>
    <hr/>
    <p> Votre rapport du diagnostic pour l'enregistrement <b>${ppg.id}</b>, enregistré le <b>${new Date(ppg.createdAt).toDateString()}</b> est disponible sur
    l'application mobile <b>"PPG Monitor"</b>.</p>
    <hr/>
    <p> Cordialement. </p>
    `;


    return await this.sendMail(ppg.patient.email,subject,'',html);
    

}

async sendMail(to,subject,text,html,from='ppgmonitor@gmail.com',){
    this.mailerservice.sendMail({
        to,
        from,
        subject,
        text,
        html
    })
    

}

async remove(id : string) {
    const user = await this.repo.findOne({where : {id}})
    if(!user){
      throw new NotFoundException()
    }
    return this.repo.softDelete(id);
}

async getColumns(){
    const fields = await this.repo.metadata;
    console.log(fields)
}

async findAll(){

    let fetchedNote = await this.repo.find({

        relations : {
            patient : true
        }
    });
    
      return fetchedNote;
}


async findNotes(report){
    
    const notes = await this.repo.find({
        where : {},
        relations : {}
    });
    return notes;
}
}
