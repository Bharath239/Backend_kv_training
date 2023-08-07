import { Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional, IsString, ValidateNested } from "class-validator";
import { Role } from "../utils/role.enum";
import Address from "../entity/address.entity";
import PatchAddressDto from "./patch.address.dto";

class PatchEmployeeDto{
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    username: string;

    @IsOptional()
    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    joiningDate: string;

    @IsOptional()
    @IsInt()
    experience: number;

    // @IsNotEmpty()
    // @IsEmail()
    // email: string;

    @IsOptional()
    @IsInt()
    departmentId: number;

    @IsOptional()
    @IsEnum(Role)
    role: Role;

    @IsOptional()
    @ValidateNested({each: true})
    @Type(() => PatchAddressDto)
    address: Address;

}

export default PatchEmployeeDto;