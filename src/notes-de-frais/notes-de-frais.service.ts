import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CategorieService } from './categorie/categories.service';
import {NodesDeFrais, NoteState} from './notes-de-frais.entity'

@Injectable()
export class NotesDeFraisService {

    constructor(
        @InjectRepository(NodesDeFrais) private repo : Repository<NodesDeFrais>,
        private catService : CategorieService
    ){}

async createNoteFrais(attrbs : Partial<NodesDeFrais>){
    
      if(attrbs.category.id !== null){
          const category = await this.catService.findCategory(attrbs.category.id);
          attrbs.category = category;
      }
      console.log(attrbs)
    const note = await  this.repo.create(attrbs);
    return this.repo.save(note);
   }

async getNote(id){
    const note =await this.repo.findOne({
        where : {
            id
        },
            relations : {
                category : true
            }});
    return note;

}

async getNotes(id){
    const notes =await this.repo.find({
        where : id});
    return notes;

}

async updateNote(id : number,attrbs : Partial<NodesDeFrais>){
    if(Object.keys(attrbs).length === 0){
        throw new BadRequestException('There is no way to modify')
    }
    const note =await this.repo.findOneBy({id} );
    if(attrbs.category.unit_price){
        attrbs.unit_price = attrbs.category.unit_price;
    }
    if(attrbs.category.id){
        const category = await this.catService.findCategory(attrbs.category.id);
        attrbs.category = category;
    }

    
    Object.assign(note,attrbs)
    console.log(note)
    return this.repo.save(note);

}

async getColumns(){
    const fields = await this.repo.metadata;
    console.log(fields)
}

async findAll(submit){

    if(submit==="false"){
        const fetchedNote = await this.repo.find({
            where :{
                state : NoteState.A_SOUMETTRE
            },
            relations : {
                category : true
            }
        });
        return fetchedNote;

    }
    const fetchedNote = await this.repo.find({
        relations : {
            category : true
        }
    });
    
      return fetchedNote;
}


async findNotes(report){
    
    const notes = await this.repo.find({
        where : {
            report
        },
        relations : {
            report:true
        }
    });
    return notes;
}
}
