import Web3 from 'web3';
import type { AddressPrivileges } from '@/contracts/AddressPrivileges';
import type { BscPledgeOracle } from '@/contracts/BscPledgeOracle';
import type { DebtToken } from '@/contracts/DebtToken';
import type { PledgePool } from '@/contracts/PledgePool';

import { ethers } from 'ethers';

const AddressPrivilegesAbi = require('@/abis/AddressPrivileges.json');
const BscPledgeOracleAbi = require('@/abis/BscPledgeOracle.json');
const DebtTokenAbi = require('@/abis/DebtToken.json');
const PledgePoolAbi = require('@/abis/PledgePool.json');

const web3 = new Web3(Web3.givenProvider);

const getAddressPrivilegesContract = (address: string) => {
  return new web3.eth.Contract(AddressPrivilegesAbi, address) as unknown as {
    methods: AddressPrivileges;
  };
};

const getBscPledgeOracleAbiContract = (address: string) => {
  return new web3.eth.Contract(BscPledgeOracleAbi, address) as unknown as {
    methods: BscPledgeOracle;
  };
};

const getDebtTokenContract = (address: string) => {
  return new web3.eth.Contract(DebtTokenAbi, address) as unknown as {
    methods: DebtToken;
  };
};

const getPledgePoolContract = (address: string) => {
  return new web3.eth.Contract(PledgePoolAbi, address) as {
    methods: PledgePool;
  };
};

const getDefaultAccount = async () => {
  const accounts = await web3.eth.getAccounts();
  if (accounts.length > 0) {
    return accounts[0];
  }
  return '';
};

const gasOptions = async (params = {}) => {
  const gasLimit = Web3.utils.toHex(500000);
  const from = await getDefaultAccount();
  return {
    from,
    gasLimit,
    ...params,
  };
};

const toHex = (covertThis: string, padding: number) => {
  const temp1 = ethers.utils.hexZeroPad(ethers.utils.hexlify(BigInt(covertThis)), padding);
  // const temp2 = web3.utils.leftPad(web3.utils.toHex(covertThis), padding);
  // console.log('toHex', temp2, temp1);

  return temp1;
};

const createERCDepositData = (tokenAmount: string, recipientAddress: string) => {
  const lenRecipientAddress = `${(recipientAddress.length - 2) / 2}`;
  console.log('createERCDepositData', tokenAmount, recipientAddress);
  return `0x${toHex(tokenAmount, 32).substr(2)}${toHex(lenRecipientAddress, 32).substr(
    2,
  )}${recipientAddress.substr(2)}`;
};

export {
  web3,
  getAddressPrivilegesContract,
  getBscPledgeOracleAbiContract,
  getDebtTokenContract,
  getPledgePoolContract,
  gasOptions,
  getDefaultAccount,
  createERCDepositData,
};
