import { Expose } from "class-transformer"

export class UserDto {

    @Expose()
    id :number

    @Expose()
    firstName :string

    @Expose()
    secondName : string

    @Expose()
    familyName : string

    @Expose()
    email :string

    @Expose()
    birthDay : Date

    @Expose()
    birthPlace : String

    @Expose()
    sexe : String

    @Expose()
    role : String
    
    @Expose()
    phone : string;

    @Expose()
    adresse : string;
    
    @Expose()
    token:string

    

}