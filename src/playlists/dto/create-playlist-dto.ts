import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  isNumber,
} from "class-validator";
import { Song } from "src/songs/song.entity";
import { User } from "src/users/user.entity";

export class CreatePlaylistDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  readonly songs: number[];

  @IsNumber()
  @IsNotEmpty()
  readonly user: number;
}
