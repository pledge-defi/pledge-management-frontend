import { web3 } from '@/services/web3';
import { map } from 'lodash';
import type { AddEthereumChainParameter } from './ChainBridge.d';
import {
  ORACLE_ADDRESS,
  PLEDGE_ADDRESS,
  DEV_ORACLE_ADDRESS,
  DEV_PLEDGE_ADDRESS,
} from '@/utils/constants';

export type ChainInfo = {
  chainId: number;
  chainName: string;
  chainImageAsset: string;
  chainDesc: string;
  currencyImageAsset: string;
  symbol: string;
  netWorkInfo: AddEthereumChainParameter;
  PLEDGE_ADDRESS: string;
  ORACLE_ADDRESS: string;
};

const chainInfos = [
  {
    chainName: 'BSC_Testnet',
    chainImageAsset: require('@/assets/images/BSC.svg'),
    chainDesc: 'BSC Network',
    currencyImageAsset: require('@/assets/images/PLGR.svg'),
    chainId: 97,
    symbol: 'tBNB',
    PLEDGE_ADDRESS: DEV_PLEDGE_ADDRESS,
    ORACLE_ADDRESS: DEV_ORACLE_ADDRESS,
    netWorkInfo: {
      chainId: web3.utils.toHex(97),
      chainName: 'Binance Smart Chain Testnet',
      nativeCurrency: {
        name: 'BSC',
        symbol: 'BNB',
        decimals: 18,
      },
      rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
      blockExplorerUrls: ['https://testnet.bscscan.com'],
    },
  },
  {
    chainId: 56,
    chainName: 'BSC_Mainnet',
    chainImageAsset: require('@/assets/images/BSC.svg'),
    chainDesc: 'BSC Network',
    currencyImageAsset: require('@/assets/images/PLGR.svg'),
    symbol: 'BNB',
    PLEDGE_ADDRESS: PLEDGE_ADDRESS,
    ORACLE_ADDRESS: ORACLE_ADDRESS,
    netWorkInfo: {
      chainId: web3.utils.toHex(56),
      chainName: 'Smart Chain',
      nativeCurrency: {
        name: 'BSC',
        symbol: 'BNB',
        decimals: 18,
      },
      rpcUrls: ['https://bsc-dataseed.binance.org'],
      blockExplorerUrls: ['https://bscscan.com'],
    },
  },
] as const;

export type ChainInfoKeysType = typeof chainInfos[number]['chainName'];

export const chainInfoKeys: ChainInfoKeysType[] = map(chainInfos, (c) => c.chainName);

export default chainInfos as unknown as ChainInfo[];
