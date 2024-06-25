import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Artist } from "./artist.entity";
import { Repository } from "typeorm";

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistRepo: Repository<Artist>
  ) {}

  findArtist(userID: number): Promise<Artist> {
    return this.artistRepo.findOneBy({ user: { id: userID } });
  }
}
