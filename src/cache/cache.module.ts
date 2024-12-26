import { Module } from '@nestjs/common';
import { cacheClient } from './cache.client';
import { CacheService } from './cache.service';

@Module({
  providers: [cacheClient, CacheService],
  exports: [CacheService],
})
export class CacheModule {}
