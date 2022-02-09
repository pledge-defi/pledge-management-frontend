import { byteCode } from '@/abis/deployCode';
import type { AddEthereumChainParameter } from '@/constants/ChainBridge.d';
import type { PledgePool } from '@/contracts/PledgePool';
import {
  gasOptions,
  getBscPledgeOracleAbiContract,
  getDebtTokenContract,
  getMultiSignatureContract,
  getPledgePoolContract,
} from './web3';

export type CreatePoolRequestParams = Parameters<PledgePool['createPoolInfo']>;

const MetacoreServer = {
  async getPrice(asset: string, address: string) {
    const contract = getBscPledgeOracleAbiContract(address);
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

  async createApplication(multiSignatureaddress: string, address: string) {
    const contract = getMultiSignatureContract(multiSignatureaddress);
    const options = await gasOptions();
    return await contract.methods.createApplication(address).send(options);
  },

  async getApplicationHash(from: string, to: string, multiSignatureaddress: string) {
    const contract = getMultiSignatureContract(multiSignatureaddress);
    return await contract.methods.getApplicationHash(from, to).call();
  },

  async getValidSignature(hash: string, multiSignatureaddress: string) {
    const contract = getMultiSignatureContract(multiSignatureaddress);
    return await contract.methods.getValidSignature(hash, '0').call();
  },

  async signApplication(hash: string, multiSignatureaddress: string) {
    const contract = getMultiSignatureContract(multiSignatureaddress);
    const options = await gasOptions();
    return await contract.methods.signApplication(hash).send(options);
  },

  async switchNetwork(value: AddEthereumChainParameter) {
    try {
      return await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: value.chainId }],
      });
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          return await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [value],
          });
        } catch (addError) {
          // handle "add" error
        }
      }
      // handle other "switch" errors
    }
  },
};

export default MetacoreServer;
