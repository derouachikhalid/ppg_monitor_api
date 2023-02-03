import { Injectable , NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {sign } from 'jsonwebtoken'
import { User, UserRole } from './user.entity';
import { JWT_SECRET } from 'config';


@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo : Repository<User>){}

   async create(body){
    const newUser = new User();
    Object.assign(newUser,body);
    const user = await this.repo.save(newUser);
    return this.buildResponse(user);
    
   }

   generateToken(user : User): string {

    return sign({id :user.id,email : user.email},JWT_SECRET)

   }

   //You should fix any type

   buildResponse(user : User) : any {
    return {
        ...user,
      token : this.generateToken(user)
      
      
    }
    
  }



   findOne(id : number){
    return this.repo.findOne({where :{id}});
   }
   find(email : string){
    return this.repo.find({where : {email}});
   }

   async update(id : number , attrbs : Partial<User>){
     const user = await this.repo.findOne({where :{id}});
     if(!user){
        throw new NotFoundException('user not found')
     }
     Object.assign(user,attrbs);
     return this.repo.save(user)
   }

   async findUsersByRole(role : string){
    let userRole;
    switch (role) {
      case "admin":
        userRole = UserRole.ADMIN
        break;
      case "resp":
        userRole = UserRole.RESP
        break;
    
      default:
        userRole = UserRole.EMPLOYEE
        break;
    }

    
    const users = await this.repo.find({where : {
      role : userRole
    }})
    return users;

   }
   
   async remove(id :number){
    const user = await this.repo.findOne({where : {id}})
    if(!user){
      throw new NotFoundException('user not found')
    }
    return this.repo.softDelete(id);
   }
    
}
