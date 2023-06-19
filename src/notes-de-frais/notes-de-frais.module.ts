import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesDeFraisController } from './notes-de-frais.controller';
import { NotesDeFraisService } from './notes-de-frais.service';
import {NodesDeFrais} from './notes-de-frais.entity'
import { MailerModule } from '@nestjs-modules/mailer';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports : [
     TypeOrmModule.forFeature([NodesDeFrais]),
    MailerModule.forRoot({
      transport : {
        service: 'gmail',
                port:465,
                secure: true, // true for 465, false for other ports
                logger: true,
                debug: true,
        auth : {
          user : 'ppgmonitor@gmail.com',
          pass : 'lzgdynmexohtrpaz'
        },
        tls:{
          rejectUnauthorized:true
      }
      }
    }),
  UsersModule],
  controllers: [NotesDeFraisController],
  providers: [NotesDeFraisService],
  exports:[NotesDeFraisService]
})
export class NotesDeFraisModule {}
