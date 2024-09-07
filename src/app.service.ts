import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Congratulations! Your NestJS app is up and running!';
  }
}
