import BigNumber from 'bignumber.js';

export const dealNumber = (num: BigNumber.Value) => {
  if (!num) return undefined;
  const x = new BigNumber(num);
  const y = new BigNumber(1e18);
  return x.multipliedBy(y);
};

export const dealNumber_18 = (num: BigNumber.Value) => {
  if (!num) return undefined;
  const x = new BigNumber(num);
  const y = new BigNumber(1e18);
  return x.dividedBy(y).toFixed();
};

export const dealNumber_8 = (num: BigNumber.Value) => {
  if (!num) return undefined;
  const x = new BigNumber(num);
  const y = new BigNumber(1e8);
  return x.dividedBy(y).toFixed();
};
