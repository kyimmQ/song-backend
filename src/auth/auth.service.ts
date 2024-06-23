import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { LoginDTO } from "./dto/login-dto";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async login(loginDTO: LoginDTO) {
    const user = await this.usersService.findOne(loginDTO);
    const validatePassword = await bcrypt.compare(
      loginDTO.password,
      user.password
    );
    if (validatePassword) {
      delete user.password;
      return user;
    } else throw new UnauthorizedException("password does not match");
  }
}
