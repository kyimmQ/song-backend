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
  Query,
  DefaultValuePipe,
  UseGuards,
  Req,
} from "@nestjs/common";
import { SongsService } from "./songs.service";
import { CreateSongDTO } from "./dto/create-song-dto";
import { Song } from "./song.entity";
import { UpdateSongDTO } from "./dto/update-song.dto";
import { JwtArtistGuard } from "src/auth/jwt-artist.guard";

@Controller({ path: "songs", scope: Scope.REQUEST })
export class SongsController {
  constructor(private songsService: SongsService) {}

  @Post()
  @UseGuards(JwtArtistGuard) // 1
  create(@Body() createSongDTO: CreateSongDTO, @Req() req): Promise<Song> {
    console.log(req.user);
    return this.songsService.create(createSongDTO);
  }
  @Get()
  async findAll(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe)
    page: number = 1,
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe)
    limit: number = 10
  ) {
    limit = limit > 100 ? 100 : limit;
    return this.songsService.paginate({ page, limit });
  }
  @Get(":id")
  findOne(
    @Param("id", ParseIntPipe)
    id: number
  ): Promise<Song> {
    return this.songsService.findOne(id);
  }

  @Put(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateSongDTO: UpdateSongDTO
  ) {
    return this.songsService.update(id, updateSongDTO);
  }

  @Delete(":id")
  delete(
    @Param("id", ParseIntPipe)
    id: number
  ) {
    return this.songsService.remove(id);
  }
}
