import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

export const connection1 = 'lecture';
export const connection2 = 'lecture2';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
