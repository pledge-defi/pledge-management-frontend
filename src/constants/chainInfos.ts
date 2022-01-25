import { web3 } from '@/services/web3';
import { map } from 'lodash';
import type { AddEthereumChainParameter } from './ChainBridge.d';

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
    PLEDGE_ADDRESS: '0xb996788A2471f34ad301dD5090d85521Da252ED4',
    ORACLE_ADDRESS: '0xd96DBDC193617A0cD4bbf38E78a0fB4799A8E554',
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
    PLEDGE_ADDRESS: '0x78CE5055149Dc30755612209f9d9A98f36fb022E',
    ORACLE_ADDRESS: '0x6cc2B5D12aD1Cc66149F2fb895ca863e9aEbD31e',
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
