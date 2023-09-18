import {
  BadRequestException,
  Controller,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { UniswapService } from './uniswap.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('uniswap')
@Controller('uniswap')
export class UniswapController {
  constructor(private readonly uniswapService: UniswapService) {}

  @Get('pools')
  async fetchUniswap(@Query('limit', ParseIntPipe) limit: number) {
    if (isNaN(limit) || limit <= 0) {
      throw new BadRequestException('Invalid or missing "limit" parameter.');
    }

    const pools = await this.uniswapService.getPools(limit);
    return pools;
  }
}
