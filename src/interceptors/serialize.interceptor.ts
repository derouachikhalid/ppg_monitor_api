import { 
    CallHandler, 
    ExecutionContext, 
    NestInterceptor 
} from "@nestjs/common";
import { UseInterceptors } from "@nestjs/common/decorators";
import { plainToClass } from "class-transformer";
import { 
    map, 
    Observable 
} from "rxjs";
interface ClassConstructer {

    new (...args : any[]) : {};
}

export function Serialize(dto : ClassConstructer){
    return UseInterceptors (new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {

    constructor(private dto : any){}
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>  {
        return next.handle().pipe(
            map((data : any) => {
                // before response
                return plainToClass(this.dto , data , {
                    excludeExtraneousValues : true
                })

            })
        )
         
        
    }
}