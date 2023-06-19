import { IsDate, IsEmail,IsOptional,IsString } from "class-validator"

export class CreateUserDto {
    @IsEmail()
    email : string
    
    @IsString()
    password : string
    
    @IsString()
    @IsOptional()
    firstName : string
    
    @IsString()
    @IsOptional()
    adresse : string;
    
    @IsString()
    @IsOptional()
    secondName : string

    @IsString()
    @IsOptional()
    familyName : string

    @IsDate()
    @IsOptional()
    birthDay : Date

    @IsString()
    @IsOptional()
    birthPlace : String

    @IsString()
    @IsOptional()
    sexe : String

    @IsString()
    @IsOptional()
    role : String
    
    @IsString()
    @IsOptional()
    phone : string;
    
}