import { Artist } from "src/artists/artist.entity";
import { Playlist } from "src/playlists/playlist.entity";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("songs")
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  // @Column("varchar", { array: true })
  // artists: string[];

  @ManyToMany(() => Artist, (artist) => artist.songs, { cascade: true })
  @JoinTable({ name: "songs_artists" })
  artists: Artist[];

  @Column("date")
  releasedDate: Date;

  @Column("time")
  duration: Date;

  @Column("text")
  lyrics: string;

  @ManyToOne(() => Playlist, (playlist) => playlist.songs)
  playList: Playlist;
}
