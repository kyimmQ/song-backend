import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { PayloadType } from "src/types/payload.type";

@Injectable()
export class JwtArtistGuard extends AuthGuard("jwt") {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }
  handleRequest<TUser = PayloadType>(err: any, user: any): TUser {
    // If there is an error or no user then it will send the unauthorized error
    if (err || !user) throw err || new UnauthorizedException();
    if (user.artistId) return user;
    throw err || new UnauthorizedException();
  }
}
