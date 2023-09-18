import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UniswapService } from './uniswap.service';
import { UniswapController } from './uniswap.controller';
import { GqlModule } from '../gql/gql.module';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ttl: configService.get('TTL', 60000),
      }),
      inject: [ConfigService],
    }),
    GqlModule,
  ],
  providers: [UniswapService],
  controllers: [UniswapController],
})
export class UniswapModule {}
