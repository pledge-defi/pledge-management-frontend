declare namespace API {
  type LoginRequest = {
    chain_id: string;
  };

  type DebtTokenListRequest = {
    chain_id: number;
  };

  type DebtTokenListResponse = {
    code?: number;
    message?: string;
    data?: DebtTokenListResData[];
  };

  type DebtTokenListData = DebtTokenListResData;

  type DebtTokenListResData = {
    symbol?: string;
    token?: string;
    chain_id?: number;
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
    chain_id?: string;
    sp_name?: string;
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
    chain_id?: string;
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

  type GetMultiSignData = {
    chain_id?: string;
    sp_name?: string;
    _spToken?: string;
    jp_name?: string;
    _jpToken?: string;
    sp_address?: string;
    jp_address?: string;
    spHash?: string;
    jpHash?: string;
    multi_sign_account?: any[];
  };

  type DebtTokenError = {
    code?: number;
    message?: string;
  };

  type SearchRequest = {
    chainID?: string;
    lend_token_symbol?: string;
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
    lend_token_symbol?: string;
    borrow_token_symbol?: string;
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
