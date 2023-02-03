import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CategorieService } from './categories.service';

@Controller('/categorie')
export class CategorieController {
    constructor(private categoryService : CategorieService){}
    @Post()
    createCategory(@Body() body : any){
        return this.categoryService.createCategory(body)
    }

    @Get("/:id")
    async findCategory(@Param("id") id :number){
        return await this.categoryService.findCategory(id)

    }

    @Get()
    findAllCategories(){
        return this.categoryService.findAllCategories();
    }
}
