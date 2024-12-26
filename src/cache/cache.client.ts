import { FactoryProvider } from '@nestjs/common/interfaces/modules/provider.interface';
import { createClient } from 'redis';

export const CACHE_CLIENT = Symbol('CACHE_CLIENT');

export const cacheClient: FactoryProvider = {
  provide: CACHE_CLIENT,
  useFactory: async () => {
    const client = createClient({
      url: 'redis://localhost:6379',
    });

    await client.connect();

    return client;
  },
};
