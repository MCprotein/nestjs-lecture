import { Inject, Injectable } from '@nestjs/common';
import { SetOptions } from '@redis/client/dist/lib/commands/SET';
import { RedisClientType } from 'redis';
import { CACHE_CLIENT } from './cache.client';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_CLIENT) private readonly client: RedisClientType) {}

  async get(key: string): Promise<string> {
    return await this.client.get(key);
  }

  async set(
    key: string,
    value: string | any[] | Record<string, any>,
    options?: SetOptions,
  ): Promise<string> {
    return await this.client.set(key, JSON.stringify(value), options);
  }

  async del(key: string): Promise<number> {
    return await this.client.del(key);
  }
}
