import { Body, Controller , Get, NotFoundException, Param, Query, Patch, Post, Delete, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from '../interceptors/serialize.interceptor'
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
    
    constructor(
        private usersService : UsersService,
        private authService : AuthService,
        ){

    }
    
    
    @Post("/signup")
    signup(@Body() body : CreateUserDto){
        return this.authService.signup(body);
        
    }

    @Post("/signin")
    signin(@Body() body : CreateUserDto){
        return this.authService.signin(body.email,body.password)
    }

    
    @Get('/:id')
    async getUser(@Param('id') id : string){
        const user = await this.usersService.findOne(parseInt(id));
        if(!user){
            throw new NotFoundException('user not found');
        }
        return user;
    }

    @Get()
    
    getAllUsers(@Query('email') email : string , @Query('role') role : string){
        console.log(role)
        if (role) {
            return this.usersService.findUsersByRole(role)
            
        }

        return this.usersService.find(email)
    }

    @Patch('/:id')
    updateUser(@Param('id') id :string , @Body() body : UpdateUserDto){

        return this.usersService.update(parseInt(id),body);

    }

    

    @Delete('/:id')
    removeUser(@Param('id') id :string){
        return this.usersService.remove(parseInt(id));

    }

    
}
