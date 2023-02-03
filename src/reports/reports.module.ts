import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'
import { NotesDeFraisModule } from 'src/notes-de-frais/notes-de-frais.module';
import { UsersModule } from 'src/users/users.module';
import { Report } from './Report.entity';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

@Module({
  imports : [ TypeOrmModule.forFeature([Report]),NotesDeFraisModule,UsersModule ],
  controllers: [ReportsController],
  providers: [ReportsService]
})
export class ReportsModule {}
