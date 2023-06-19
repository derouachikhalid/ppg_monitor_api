import { Injectable, NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { NotesDeFraisService } from 'src/notes-de-frais/notes-de-frais.service';
import { UsersService } from 'src/users/users.service';
import { Like, Repository } from 'typeorm';
import { Report } from './Report.entity';

@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(Report) private repo : Repository<Report>,
        private noteServices : NotesDeFraisService,
        private usersServices : UsersService,
    ){}

   async create(body : Partial<Report>){
    if(!body.resume){
        throw new BadRequestException('you should put the resume')
    }
    const newReport = new Report();
    Object.assign(newReport,body)
    const report = await this.repo.save(newReport);
    return report;
   }

   async update(id,attrbs : Partial<Report>){
    const report =await this.findOne(id);
    if(Object.keys(attrbs).length === 0 ){
        throw new BadRequestException('No data to modify')
    }

    // const notes = await this.noteServices.findNotes(attrbs.notesDeFrais);
    // if (notes) {
    //     attrbs.notesDeFrais 
    // }

    Object.assign(report,attrbs);
    await this.repo.save(report);

    console.log("updated")

   }

//    async findResponsables(){
//     const responsables = await this.usersServices.findUsersByRole("resp");
//     return responsables;
//    }

   

   async findOne(id){
    const report = await this.repo.findOne({ where : {id} ,relations :{ } });
    return report;
   }

   async deleteSoft(id){
    const report = await this.findOne({id});
    if(!report){
        throw new NotFoundException('Report not found')
      }

    await this.repo.softDelete(id);
    console.log("Deleted")
   }

   async findAll(){
    
    const reports =await  this.repo.find({
        relations: {},
    });

    return reports;

   }

}
