import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { authConstant } from "./auth.constants";
import { PayloadType } from "src/types/payload.type";

// Create the JWTStrategy service, extending it with PassportStrategy. When applying
// @AuthGuard('jwt'), the validate function will be called, automatically adding the userId
// and email to the req.user object.

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConstant.secret,
    });
  }
  async validate(payload: PayloadType) {
    return {
      email: payload.email,
      userId: payload.userId,
      artistId: payload.artistId,
    };
  }
}
