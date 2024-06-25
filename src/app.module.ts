import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SongsModule } from "./songs/songs.module";
import { LoggerMiddleware } from "./common/middleware/logger.middleware";
import { SongsController } from "./songs/songs.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { Song } from "./songs/song.entity";
import { Artist } from "./artists/artist.entity";
import { User } from "./users/user.entity";
import { PlaylistsModule } from "./playlists/playlists.module";
import { Playlist } from "./playlists/playlist.entity";
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ArtistsModule } from './artists/artists.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      database: "spotify-clone",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "caclepg",
      entities: [Song, Artist, User, Playlist],
      synchronize: true,
    }),
    SongsModule,
    PlaylistsModule,
    UsersModule,
    AuthModule,
    ArtistsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {
    console.log("connect to database successfully");
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(SongsController);
  }
}
