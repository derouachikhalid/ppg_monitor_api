import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesDeFraisController } from './notes-de-frais.controller';
import { NotesDeFraisService } from './notes-de-frais.service';
import {NodesDeFrais} from './notes-de-frais.entity'
import { CategorieModule } from './categorie/categories.module';
import { CategorieService } from './categorie/categories.service';

@Module({
  imports : [ TypeOrmModule.forFeature([NodesDeFrais]), CategorieModule ],
  controllers: [NotesDeFraisController],
  providers: [NotesDeFraisService],
  exports:[NotesDeFraisService]
})
export class NotesDeFraisModule {}
