import ChainBridge from '@/constants/ChainBridge';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import type { InjectedConnector } from '@web3-react/injected-connector';
import { Button, notification } from 'antd';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import services from '@/services';
import { injected } from './connector';
import './index.less';
import { useEagerConnect, useInactiveListener } from './WalletHooks';

export interface IConnectWallet {
  typeUI?: 'header' | 'metamask';
  className?: string;
  style?: React.CSSProperties;
}

const ConnectWallet: React.FC<IConnectWallet> = ({ typeUI, className, style, children }) => {
  const triedEager = useEagerConnect();
  const { connector, chainId, account, activate, deactivate, error } = useWeb3React();
  const [activatingConnector, setActivatingConnector] = useState<InjectedConnector>();
  console.log('====chainId', chainId);

  async function activatingConnectorFn() {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    } else {
      if (error instanceof UnsupportedChainIdError) {
        const fraNetworkDefault = ChainBridge.chains
          .filter((item) => item.type === 'Ethereum')
          .find((item) => item.networkId === 525);
        try {
          await services.evmServer.switchNetwork(fraNetworkDefault);
        } catch {
          notification.warning({
            message: error?.name,
            description: error?.message,
            top: 80,
          });
        }
      }
    }
  }

  useEffect(() => {
    activatingConnectorFn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activatingConnector, connector]);

  const activating = injected === activatingConnector;
  const connected = injected === connector;
  // const disabled = !triedEager || !!activatingConnector || !!error;
  const isDisconnect = !error && chainId;

  useInactiveListener(!triedEager || !!activatingConnector);

  function handleOnCLickConnectWallet() {
    if (!isDisconnect) {
      setActivatingConnector(injected);
      activate(injected);
    } else {
      deactivate();
    }
  }

  function ButtonSwitchComponent() {
    if (connected && isDisconnect) {
      //TODO: move `typeUI` outside
      if (typeUI === 'header') {
        return (
          <div className="wallet-connected wallet-header">
            <img
              src={require('@/assets/images/wallet.svg')}
              alt=""
              style={{ marginRight: '12px' }}
            />
            <span className="address">{`${account?.slice(0, 8)}···${account?.slice(-6)}`}</span>
            <Button
              onClick={async () => {
                try {
                  const aa = await services.evmServer.createPoolInfo(
                    '0x08a5125c84c3dab4834a28e73a35f4b6d895e7aa',
                    '1639037124',
                    '1639037724',
                    '1000000',
                    '10000',
                    '200000000',
                    '0xDc6dF65b2fA0322394a8af628Ad25Be7D7F413c2',
                    '0xF592aa48875a5FDE73Ba64B527477849C73787ad',
                    '0xBEF7dF09BBE87487D0Aa29FB06957D48f2033D2a',
                    '0x0A1ec9DAF76A5917C8AEa5317Bb7c27dC705eB56',
                    '20000000',
                  );
                  console.log(aa);
                } catch (err: unknown) {
                  console.error('createPoolInfo', err);
                }
              }}
            >
              {' '}
              Create Pool
            </Button>
          </div>
        );
      }
      return <div className="wallet-connected">{children}</div>;
    }

    if (activating) {
      return <div className="connect-no-connected">CONNECTING</div>;
    }
    return (
      <div className="connect-no-connected" onClick={handleOnCLickConnectWallet}>
        {typeUI !== 'header' && (
          <img style={{ marginRight: '12px' }} src={require('@/assets/images/wallet.svg')} />
        )}
        CONNECT WALLET
      </div>
    );
  }
  return (
    <div
      style={style}
      className={classNames('components-connect-wallet', className, {
        'header-wallet': typeUI === 'header',
      })}
    >
      {ButtonSwitchComponent()}
    </div>
  );
};

ConnectWallet.defaultProps = {
  typeUI: 'header',
};

export default ConnectWallet;
