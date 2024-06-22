import { Body, Controller, Post } from "@nestjs/common";
import { PlaylistsService } from "./playlists.service";
import { CreatePlaylistDTO } from "./dto/create-playlist-dto";
import { Playlist } from "./playlist.entity";

@Controller("playlists")
export class PlaylistsController {
  constructor(private playlistService: PlaylistsService) {}
  @Post()
  async create(@Body() playlistDTO: CreatePlaylistDTO): Promise<Playlist> {
    return await this.playlistService.create(playlistDTO);
  }
}
