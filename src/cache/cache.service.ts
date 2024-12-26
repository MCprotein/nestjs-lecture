import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { SetOptions } from '@redis/client/dist/lib/commands/SET';
import { RedisClientType } from 'redis';
import { CACHE_CLIENT } from './cache.client';
import { setTimeout } from 'node:timers/promises';

@Injectable()
export class CacheService implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject(CACHE_CLIENT) private readonly client: RedisClientType) {}

  async onModuleInit() {
    await Promise.race([
      this.client.connect(),
      new Promise((_, reject) => {
        setTimeout(1500).then(() =>
          reject(new Error('Redis connection failed')),
        );
      }),
    ]);
  }

  async onModuleDestroy() {
    try {
      await this.client.quit();
    } catch (err) {
      console.log(err);
      await this.client.disconnect();
    }
  }

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
