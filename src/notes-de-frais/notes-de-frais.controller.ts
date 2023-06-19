import { Controller, Post, Body, Get, Param, Patch, Session, Delete } from '@nestjs/common';
import { NodesDeFrais } from './notes-de-frais.entity';
import { NotesDeFraisService } from './notes-de-frais.service';

@Controller('notes-de-frais')
export class NotesDeFraisController {

    constructor(
        private notesDeFraisService : NotesDeFraisService){}

    @Post()
    async createNote(@Body() body : Partial<NodesDeFrais> ){
        return this.notesDeFraisService.createNoteFrais(body);
        
    }

    @Get('/:id')
    getNote(@Param('id') id :string){
        return this.notesDeFraisService.getNote(id);
    }

    @Patch('/:id')
    updateNote(@Session() session : any,@Param('id') id : string,@Body() body : any){

        
        return this.notesDeFraisService.updateNote(id,body);

    }

    @Delete('/:id')
    deleteNote(@Param('id') id : string){
        return this.notesDeFraisService.remove(id);

    }



    @Get()
    getNotes(){
        
        return this.notesDeFraisService.findAll();

    }
}
