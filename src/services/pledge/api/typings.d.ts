declare namespace API {
  type LoginRequest = {
    name: string;
    password: string;
  };

  type LoginResponse = {
    code?: number;
    message?: string;
    data?: LoginData;
  };

  type LoginError = {
    code?: number;
    message?: string;
  };

  type LoginData = {
    token_id?: string;
  };

  type LogoutRequest = {
    token_id?: string;
  };

  type SetMultiSignRequest = {
    chain_id?: number;
    p_name?: string;
    _spToken?: string;
    jp_name?: string;
    _jpToken?: string;
    sp_address?: string;
    jp_address?: string;
    spHash?: string;
    jpHash?: string;
    multi_sign_account?: any[];
  };

  type SetMultiSignResponse = {
    code?: number;
    message?: string;
  };

  type GetMultiSignRequest = {
    chain_id?: number;
  };

  type GetMultiSignResponse = {
    code?: number;
    message?: string;
    data?: GetMultiSignData;
  };

  type LogoutResponse = {
    code?: number;
    message?: string;
  };

  type DebtTokenList = {
    code?: number;
    message?: string;
    data?: DebtTokenData;
  };

  type GetMultiSignData = {
    chain_id?: string;
    p_name?: string;
    _spToken?: string;
    jp_name?: string;
    _jpToken?: string;
    sp_address?: string;
    jp_address?: string;
    spHash?: string;
    jpHash?: string;
    multi_sign_account?: any[];
  };

  type DebtTokenData = {
    count?: number;
    rows?: Symbol[];
  };

  type DebtTokenError = {
    code?: number;
    message?: string;
  };

  type Symbol = {
    symbol?: string;
    address?: string;
  };

  type SearchRequest = {
    chainID?: string;
    poolID?: number;
    state?: string;
    page?: number;
    pageSize?: number;
  };

  type PoolListRequest = {
    chainID?: string;
  };

  type SearchResponse = {
    code?: number;
    message?: string;
    data?: SearchData;
  };

  type SearchData = {
    count?: number;
    rows?: PoolInfo[];
  };

  type SearchError = {
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
}
