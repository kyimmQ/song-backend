import { Injectable } from "@nestjs/common";

@Injectable()
export class SongsService {
  private readonly songs = [];

  create(song) {
    // Save the song in the database
    this.songs.push(song);
    return this.songs;
  }

  findAll() {
    // fetch the songs from the db
    // Errors comes while fetching the data from DB

    return this.songs;
  }
}
