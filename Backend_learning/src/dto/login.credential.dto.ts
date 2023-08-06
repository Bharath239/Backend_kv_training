import { IsNotEmpty, IsString } from "class-validator";

class LoginCredentialsDto{
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}

export default LoginCredentialsDto;