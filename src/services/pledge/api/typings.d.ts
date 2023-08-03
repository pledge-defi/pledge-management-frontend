declare namespace API {
  type DebtTokenData = {
    count?: number;
    rows?: Symbol[];
  };

  type DebtTokenError = {
    code?: number;
    message?: string;
  };

  type DebtTokenList = {
    code?: number;
    message?: string;
    data?: DebtTokenData;
  };

  type LoginData = {
    token_id?: string;
  };

  type LoginError = {
    code?: number;
    message?: string;
  };

  type LoginRequest = {
    name: string;
    password: string;
  };

  type LoginResponse = {
    code?: number;
    message?: string;
    data?: LoginData;
  };

  type LogoutRequest = {
    token_id?: string;
  };

  type LogoutResponse = {
    code?: number;
    message?: string;
  };

  type PoolInfo = {
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
    poolData?: {
      settleAmountLend?: string;
      settleAmountBorrow?: string;
      finishAmountLend?: string;
      finishAmountBorrow?: string;
      liquidationAmounLend?: string;
      liquidationAmounBorrow?: string;
    };
  };

  type PoolListRequest = {
    chainID?: string;
  };

  type SearchData = {
    count?: number;
    rows?: PoolInfo[];
  };

  type SearchError = {
    code?: number;
    message?: string;
  };

  type SearchRequest = {
    chainID?: string;
    poolID?: number;
    state?: string;
    page?: number;
    pageSize?: number;
  };

  type SearchResponse = {
    code?: number;
    message?: string;
    data?: SearchData;
  };

  type Symbol = {
    symbol?: string;
    address?: string;
  };
}
