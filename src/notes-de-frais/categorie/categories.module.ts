import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategorieController } from './categories.controller';
import { Category } from './categories.entity';
import { CategorieService } from './categories.service';

@Module({
  imports : [TypeOrmModule.forFeature([Category])],
  controllers: [CategorieController],
  providers: [CategorieService],
  exports : [CategorieService]
})
export class CategorieModule {}
