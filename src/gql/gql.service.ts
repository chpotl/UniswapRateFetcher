import { Injectable } from '@nestjs/common';
import { gql, GraphQLClient } from 'graphql-request';
import { UniswapPools } from '../uniswap';

@Injectable()
export class GqlService {
  async execute(limit: number) {
    const graphQLClient = new GraphQLClient(
      'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
    );

    const query = gql`
    {
        pools(orderBy: totalValueLockedUSD, orderDirection: desc, first: ${limit}) {
          id
          token0Price
          totalValueLockedUSD
        }
      }
    `;
    const results = await graphQLClient.request<UniswapPools>(query);
    return results;
  }
}
