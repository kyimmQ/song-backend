import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDTO } from "./dto/create-user-dto";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}
  async create(userDTO: CreateUserDTO): Promise<User> {
    //  the salt number to encrypt the password
    const salt = await bcrypt.genSalt();
    // encrypted the password and set it to userDTO password property
    userDTO.password = await bcrypt.hash(userDTO.password, salt);
    // save to the db
    const user = await this.userRepository.save(userDTO);
    // prevent the password to be sent back
    delete user.password;
    return user;
  }
}
