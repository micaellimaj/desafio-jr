import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Role } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest();
    
    if (user?.role !== Role.ADMIN) {
      throw new ForbiddenException('Acesso restrito a administradores');
    }
    
    return true;
  }
}