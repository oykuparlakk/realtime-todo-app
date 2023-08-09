import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { UserService } from './user/services/user.service';
import { UserI } from './user/user.interfaces';
import { NextFunction } from 'express';
import { AuthService } from './auth/services/auth.service';
import { Response } from 'express';

export interface RequestModel {
  path: string;
  user: UserI;
  headers: any;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  async use(request: RequestModel, response: Response, next: NextFunction) {
    try {
      console.log('request:', request.headers);

      if (request.headers['authorization']) {
        const tokenArray: string[] =
          request.headers['authorization'].split(' ');

        if (
          tokenArray.length === 2 &&
          tokenArray[0].toLowerCase() === 'bearer'
        ) {
          const decodedToken = await this.authService.verifyJwt(tokenArray[1]);

          const user: UserI = await this.userService.getOneById(
            decodedToken.user.id,
          );

          if (user) {
            request.user = user;
            next();
          } else {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
          }
        }
      } else {
        next();
      }
    } catch {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
