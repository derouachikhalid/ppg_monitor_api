import {Injectable , BadRequestException, NotFoundException, HttpException, HttpStatus} from '@nestjs/common'
import { scrypt as _scrypt } from 'crypto';
import { compare} from 'bcrypt'
import { promisify } from 'util';
import { UsersService } from './users.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private userService : UsersService) {}


    async signup(body){
        // verify if the email is already exist
        const users = await this.userService.find(body.email);
        if(users.length){
            throw new BadRequestException('email is already exist')
        }

        return await this.userService.create(body);

    }
    async signin(email : string , password : string){
        const [user] = await this.userService.find(email);
        if(!user){
            throw new NotFoundException("user not found")
        }
        //hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
        const isTruePassword =await compare(password,user.password);

        if(!isTruePassword){
            throw new HttpException('error Credenials',HttpStatus.UNPROCESSABLE_ENTITY)
        }
        //hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
        return this.userService.buildResponse(user)

    }
}