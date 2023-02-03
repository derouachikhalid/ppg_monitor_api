import { Controller, Post, Body, Get, Param, Patch, Query } from '@nestjs/common';
import { CategorieService } from './categorie/categories.service';
import { NodesDeFrais } from './notes-de-frais.entity';
import { NotesDeFraisService } from './notes-de-frais.service';

@Controller('notes-de-frais')
export class NotesDeFraisController {

    constructor(
        private notesDeFraisService : NotesDeFraisService,
        private categoryServices : CategorieService){}

    @Post()
    async createNote(@Body() body : Partial<NodesDeFrais> ){
        body.id = undefined;
        
         if (body.description && body.description !== "" ){
             return this.notesDeFraisService.createNoteFrais(body)
         }
        

    }

    @Get('/:id')
    getNote(@Param('id') id :string){
        return this.notesDeFraisService.getNote(id);
    }

    @Patch('/:id')
    updateNote(@Param('id') id : number,@Body() body : any){

        
        return this.notesDeFraisService.updateNote(id,body);

    }

    @Get()
    getNotes(@Query('submit') submit : string){
        
        return this.notesDeFraisService.findAll(submit);

    }

    @Get("/columns")
    getColumns(){

        
        return this.notesDeFraisService.getColumns();
    }
}
