import { byteCode } from '@/abis/deployCode';
import type { AddEthereumChainParameter, BridgeConfigSimple } from '@/constants/ChainBridge.d';
import type { PledgePool } from '@/contracts/PledgePool';
import { ORACLE_ADDRESS, PLEDGE_ADDRESS } from '@/utils/constants';
import {
  gasOptions,
  getBscPledgeOracleAbiContract,
  getDebtTokenContract,
  getPledgePoolContract,
  web3,
} from './web3';

export type CreatePoolRequestParams = Parameters<PledgePool['createPoolInfo']>;

const MetacoreServer = {
  async getPoolBaseData() {
    const contract = getPledgePoolContract(PLEDGE_ADDRESS);
    const length = await contract.methods.poolLength().call();
    const poolbaseData = [];
    for (let i = 0; i < +length; i++) {
      const data = await contract.methods.poolBaseInfo(i.toString()).call();
      poolbaseData.push(data);
    }
    return poolbaseData;
  },

  async getPrice(asset: string) {
    const contract = getBscPledgeOracleAbiContract(ORACLE_ADDRESS);
    return await contract.methods.getPrice(asset).call();
  },

  async getSymbol(asset: string) {
    const contract = getDebtTokenContract(asset);
    return await contract.methods.symbol().call();
  },

  async createPoolInfo(contractAddress: string, ...arg: CreatePoolRequestParams) {
    const contract = getPledgePoolContract(contractAddress);
    const options = await gasOptions();
    return await contract.methods.createPoolInfo(...arg).send(options);
  },

  async addMinter(contractAddress: string, _addMinter: string) {
    const contract = getDebtTokenContract(contractAddress);
    const options = await gasOptions();
    return await contract.methods.addMinter(_addMinter).send(options);
  },

  async deployContract(name: string, symbol: string) {
    const contract = getDebtTokenContract();
    const options = await gasOptions();
    return await contract.deploy({ data: byteCode, arguments: [name, symbol] }).send(options);
  },

  async switchNetwork(value: BridgeConfigSimple) {
    return await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: web3.utils.toHex(value.networkId),
          chainName: value.name,
          nativeCurrency: {
            name: value.nativeTokenSymbol,
            symbol: value.nativeTokenSymbol,
            decimals: value.decimals,
          },
          rpcUrls: [value.rpcUrl],
          blockExplorerUrls: [value.explorerUrl],
        } as AddEthereumChainParameter,
      ],
    });
  },
};

export default MetacoreServer;
