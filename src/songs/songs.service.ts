import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Song } from "./song.entity";
import { Repository, UpdateResult } from "typeorm";
import { CreateSongDTO } from "./dto/create-song-dto";
import { UpdateSongDTO } from "./dto/update-song.dto";
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from "nestjs-typeorm-paginate";

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songRepository: Repository<Song>
  ) {}

  async create(songDTO: CreateSongDTO): Promise<Song> {
    const song = new Song();
    song.title = songDTO.title;
    song.artists = songDTO.artists;
    song.duration = songDTO.duration;
    song.lyrics = songDTO.lyrics;
    song.releasedDate = songDTO.releasedDate;

    return await this.songRepository.save(song);
  }

  // replace with paginate method
  // async findAll(): Promise<Song[]> {
  //   return await this.songRepository.find();
  // }
  async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    const queryBuilder = this.songRepository.createQueryBuilder("c");
    queryBuilder.orderBy("c.releasedDate", "DESC");
    return await paginate<Song>(queryBuilder, options);
  }

  async findOne(id: number): Promise<Song> {
    return await this.songRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.songRepository.delete(id);
  }

  async update(id: number, newRecord: UpdateSongDTO): Promise<UpdateResult> {
    return await this.songRepository.update(id, newRecord);
  }
}
