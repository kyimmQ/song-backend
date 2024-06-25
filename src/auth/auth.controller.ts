import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDTO } from "src/users/dto/create-user-dto";
import { User } from "src/users/user.entity";
import { UsersService } from "src/users/users.service";

@Controller("auth")
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService
  ) {}

  @Post("signup")
  async signup(@Body() userDTO: CreateUserDTO): Promise<User> {
    return this.userService.create(userDTO);
  }

  @Post("login")
  async login(@Body() loginDTO): Promise<{ accessToken: string }> {
    return await this.authService.login(loginDTO);
  }
}
