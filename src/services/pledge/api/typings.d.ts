declare namespace API {
  type Login = {
    name: string;
    password: string;
  };

  type LoginResponse = {
    token_id: string;
  };

  type TokenName = {
    symbols?: Symbol[];
  };

  type Symbol = {
    symbol?: string;
    address?: string;
  };

  type SearchResponse = {
    totalNum?: string;
    poolList?: PoolData[];
  };

  type PoolData = {
    settleTime?: string;
    endTime?: string;
    interestRate?: string;
    maxSupply?: string;
    lendSupply?: string;
    borrowSupply?: string;
    martgageRate?: string;
    lendToken?: string;
    borrowToken?: string;
    state?: string;
    spCoin?: string;
    jpCoin?: string;
    autoLiquidateThreshold?: string;
    settleAmountLend?: string;
    settleAmountBorrow?: string;
    finishAmountLend?: string;
    finishAmountBorrow?: string;
    liquidationAmounLend?: string;
    liquidationAmounBorrow?: string;
  };

  type getPoolByConditionsParams = {
    /** Pool ID  */
    poolID: number;
    /** Pool status */
    poolStatus: 'match' | 'running' | 'expired' | 'liquidation';
    /** current page */
    page?: number;
    /** page size */
    pageSize?: number;
  };
}
