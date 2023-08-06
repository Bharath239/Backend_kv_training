import { IsDate, IsEmail, IsEnum, IsInt, IsNotEmpty, IsString, ValidateNested} from "class-validator";
import Address from "../entity/address.entity";
import { Type } from "class-transformer";
import CreateAddressDto from "./create.address.dto";
import { Role } from "../utils/role.enum";

class CreateEmployeeDto{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    joiningDate: string;

    @IsNotEmpty()
    @IsInt()
    experience: number;

    // @IsNotEmpty()
    // @IsEmail()
    // email: string;

    @IsNotEmpty()
    @IsInt()
    departmentId: number;

    @IsNotEmpty()
    @IsEnum(Role)
    role: Role;

    @IsNotEmpty()
    @ValidateNested({each: true})
    @Type(() => CreateAddressDto)
    address: Address;
}

export default CreateEmployeeDto;