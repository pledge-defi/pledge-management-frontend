// import BigNumber from 'bignumber.js';
import {
  // getErc20Contract,
  // getBridgeContract,
  // getDefaultAccount,
  // gasOptions,
  // createERCDepositData,
  web3,
} from './web3';
import type { AddEthereumChainParameter, BridgeConfigSimple } from '@/constants/ChainBridge.d';

const MetacoreServer = {
  // async tokenBalance(contractAddress: string) {
  //   const contract = getErc20Contract(contractAddress);
  //   const destAddress = await getDefaultAccount();
  //   const options = await gasOptions();
  //   return await contract.methods.balanceOf(destAddress).call(options);
  // },
  // async approveToken(
  //   tokenAddress: string,
  //   erc20HandlerAddress: string,
  //   erc20Decimals: string,
  //   price: string,
  // ) {
  //   const contract = getErc20Contract(tokenAddress);
  //   const options = await gasOptions();

  //   const ten = new BigNumber(10);
  //   const power = ten.exponentiatedBy(erc20Decimals);
  //   const amount = new BigNumber(price).times(power).toString();

  //   return await contract.methods.approve(erc20HandlerAddress, amount).send(options);
  // },
  // async deposit(
  //   bridgeAddress: string,
  //   destinationChainId: string,
  //   tokenResourceId: string,
  //   erc20Decimals: string,
  //   tokenAmount: string,
  //   recipientAddress: string,
  // ) {
  //   const contract = getBridgeContract(bridgeAddress);
  //   const options = await gasOptions();

  //   const feePrice = await contract.methods._fee().call(options);
  //   const ten = new BigNumber(10);
  //   const power = ten.exponentiatedBy(erc20Decimals);
  //   const feeAmount = new BigNumber(feePrice).times(power).toString();
  //   const bridgeAmount = new BigNumber(tokenAmount).times(power).toString();

  //   const data = createERCDepositData(bridgeAmount, recipientAddress);

  //   await contract.methods
  //     .deposit(destinationChainId, tokenResourceId, data)
  //     .send({ ...options, value: feeAmount });
  // },
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
