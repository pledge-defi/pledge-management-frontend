import type { ChainInfoKeysType } from '@/constants/chainInfos';
import { atom } from 'recoil';

export const chainInfoKeyState = atom<ChainInfoKeysType>({
  key: 'chainInfoKeyState',
  default: 'BSC_Testnet',
});

export const globalTokenState = atom<Global.Option[]>({
  key: 'globalTokenState',
  default: [],
});
