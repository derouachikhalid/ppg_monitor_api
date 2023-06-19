import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/Report.entity';
import { NotesDeFraisModule } from './notes-de-frais/notes-de-frais.module';
import { NodesDeFrais } from './notes-de-frais/notes-de-frais.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "t2s_notes_db",
      entities:[User,Report,NodesDeFrais],
      synchronize : true,
    }) ,
    UsersModule, 
    ReportsModule, NotesDeFraisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
