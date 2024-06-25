import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { LoginDTO } from "./dto/login-dto";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { ArtistsService } from "src/artists/artists.service";
import { PayloadType } from "src/types/payload.type";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private artistsService: ArtistsService
  ) {}

  async login(loginDTO: LoginDTO): Promise<{ accessToken: string }> {
    const user = await this.usersService.findOne(loginDTO);
    const validatePassword = await bcrypt.compare(
      loginDTO.password,
      user.password
    );
    if (validatePassword) {
      delete user.password;

      const payload: PayloadType = { email: user.email, userId: user.id };

      const artist = this.artistsService.findArtist(user.id);
      if (artist) payload.artistId = (await artist).id;

      return {
        accessToken: this.jwtService.sign(payload),
      };
    } else throw new UnauthorizedException("password does not match");
  }
}
