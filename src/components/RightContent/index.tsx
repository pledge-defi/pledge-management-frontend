import currencyInfos from '@/constants/currencyInfos';
import { currencyState } from '@/model/global';
import services from '@/services';
import { useWeb3React } from '@web3-react/core';
import { Space } from 'antd';
import { find, get } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useModel } from 'umi';
import ConnectWallet from '../ConnectWallet';
import SwitchNetWork from '../SwitchNetWork';
import Avatar from './AvatarDropdown';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  const [currency, setCurrency] = useRecoilState(currencyState);
  const { chainId } = useWeb3React();
  const [currentChainId, setCurrentChainId] = useState<number>();

  const handleClick = async (v: any) => {
    const netWorkInfo = get(currencyInfos, [v.key, 'netWorkInfo']);
    await services.evmServer.switchNetwork(netWorkInfo);
    setCurrency(v.key);
  };

  useEffect(() => {
    if (chainId !== currentChainId && currentChainId === undefined) {
      setCurrentChainId(chainId);
      const chainName = find(Object.values(currencyInfos), { chainId })?.chainName;
      setCurrency(chainName || 'BSC');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId]);

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }
  return (
    <Space className={className}>
      <SwitchNetWork currency={currency} onClick={handleClick} />
      <ConnectWallet />
      <Avatar />
      {/* <SelectLang className={styles.action} /> */}
    </Space>
  );
};
export default GlobalHeaderRight;
