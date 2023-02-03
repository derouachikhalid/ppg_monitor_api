import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {

    constructor(private reportService : ReportsService){}
    @Post()
    async createReport(@Body() body : any) {
        return this.reportService.create(body)
    }

    @Patch("/:id")
    async updateReport(@Param('id') id : string , @Body() body : any){

        return this.reportService.update(id,body)
    }

    @Delete("/:id")
    remove(@Param('id') id : string ){
        return this.reportService.deleteSoft(id)
    }

    @Get("/:id")
    getReport(@Param('id') id : string){
        return this.reportService.findOne(id);

    }

    @Get()
    async findAll(){
        
        return this.reportService.findAll();
    }

    
}
