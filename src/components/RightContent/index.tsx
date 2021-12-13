import { Space } from 'antd';
import React from 'react';
import { useModel } from 'umi';
import ConnectWallet from '../ConnectWallet';
import Avatar from './AvatarDropdown';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 5000;
  return library;
}

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Space className={className}>
        <ConnectWallet />
        <Avatar />
        {/* <SelectLang className={styles.action} /> */}
      </Space>
    </Web3ReactProvider>
  );
};
export default GlobalHeaderRight;
