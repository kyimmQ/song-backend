import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "src/users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { authConstant } from "./auth.constants";
import { PassportModule } from "@nestjs/passport";
import { JWTStrategy } from "./jwt.strategy";

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: authConstant.secret,
      signOptions: {
        expiresIn: "1d",
      },
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JWTStrategy],
  exports: [AuthService],
})
export class AuthModule {}
