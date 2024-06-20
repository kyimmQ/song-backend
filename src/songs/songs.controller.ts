import {
  Controller,
  Get,
  Put,
  Delete,
  Post,
  Res,
  Param,
  ParseIntPipe,
  HttpStatus,
  Body,
  Scope,
} from "@nestjs/common";
import { SongsService } from "./songs.service";
import { CreateSongDTO } from "./dto/create-song-dto";
import { Song } from "./song.entity";
import { Response } from "express";

@Controller({ path: "songs", scope: Scope.REQUEST })
export class SongsController {
  constructor(private songsService: SongsService) {}

  @Post()
  create(@Body() createSongDTO: CreateSongDTO): Promise<Song> {
    return this.songsService.create(createSongDTO);
  }
  @Get()
  async findAll(
    @Res() res: Response
  ): Promise<
    Response<
      { msg: string; data: Song[] },
      Record<string, { msg: string; data: Song[] }>
    >
  > {
    try {
      const allSongs = await this.songsService.findAll();
      return res.status(200).json({
        msg: "SUCCESS",
        data: allSongs,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "FAILED",
        error: error.name,
        data: [],
      });
    }
  }
  @Get(":id")
  findOne(
    @Param(
      "id",
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
    )
    id: number
  ) {
    return `fetch song on the based on id ${typeof id}`;
  }

  @Put(":id")
  update() {
    return "update song on the based on id";
  }

  @Delete(":id")
  delete() {
    return "delete song on the based on id";
  }
}
