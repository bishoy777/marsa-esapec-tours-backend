import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers['authorization']) {
      console.log('Authorization header:', req.headers['authorization']);
      console.log('Authorization header:', res);
    } else {
      throw new UnauthorizedException('Invalid or missing token');
    }

    next();
  }
}
