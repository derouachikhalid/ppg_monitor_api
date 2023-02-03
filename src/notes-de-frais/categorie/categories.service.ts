import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './categories.entity';

@Injectable()
export class CategorieService {

    constructor(@InjectRepository(Category) private repo : Repository<Category>){}

    createCategory(attrbs : Partial<Category>){
        const category = this.repo.create(attrbs);
        return this.repo.save(category);
    }

    async findCategory(id){
        const category = await this.repo.findOne({where : {id}});
        return category;

    }
    async findAllCategories(){
        const categories = await this.repo.find();
        return categories;

    }
}
