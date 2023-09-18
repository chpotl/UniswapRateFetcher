import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { Pool } from './types';
import { GqlService } from '../gql/gql.service';

@Injectable()
export class UniswapService {
  constructor(
    private gqlService: GqlService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configService: ConfigService,
  ) {}

  async getPools(n: number) {
    let poolsData: Pool[];
    const MAX_POOLS = this.configService.get<number>('MAX_POOLS');
    const CACHE_KEY = this.configService.get<string>('CACHE_KEY');

    const cache = await this.cacheManager.get<string>(CACHE_KEY);

    if (cache) {
      poolsData = JSON.parse(cache);
    } else {
      const UniswapPools = await this.gqlService.execute(MAX_POOLS);
      poolsData = UniswapPools.pools.map((pool) => {
        return {
          address: pool.id,
          lastPrice: pool.token0Price,
          reservesEval: pool.totalValueLockedUSD,
        };
      });

      await this.cacheManager.set(CACHE_KEY, JSON.stringify(poolsData));
    }

    const response = poolsData.slice(0, n);
    return response;
  }
}
