export type UniswapPools = {
  pools: UniswapPool[];
};
export type UniswapPool = {
  id: string;
  token0Price: string;
  totalValueLockedUSD: string;
};
export type Pool = {
  address: string;
  lastPrice: string;
  reservesEval: string;
};
