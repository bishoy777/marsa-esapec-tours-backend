import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }

    const token = authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      throw new UnauthorizedException('Token missing');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'token');

      request.user = decoded; // attach user to request

      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
