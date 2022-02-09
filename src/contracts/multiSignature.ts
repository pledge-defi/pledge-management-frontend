import type BN from 'bn.js';
import type BigNumber from 'bignumber.js';
import type {
  PromiEvent,
  TransactionReceipt,
  EventResponse,
  EventData,
  Web3ContractContext,
} from 'ethereum-abi-types-generator';

export interface CallOptions {
  from?: string;
  gasPrice?: string;
  gas?: number;
}

export interface SendOptions {
  from: string;
  value?: number | string | BN | BigNumber;
  gasPrice?: string;
  gas?: number;
}

export interface EstimateGasOptions {
  from?: string;
  value?: number | string | BN | BigNumber;
  gas?: number;
}

export interface MethodPayableReturnContext {
  send: ((options: SendOptions) => PromiEvent<TransactionReceipt>) &
    ((
      options: SendOptions,
      callback: (error: Error, result: any) => void,
    ) => PromiEvent<TransactionReceipt>);
  estimateGas: ((options: EstimateGasOptions) => Promise<number>) &
    ((
      options: EstimateGasOptions,
      callback: (error: Error, result: any) => void,
    ) => Promise<number>);
  encodeABI: () => string;
}

export interface MethodConstantReturnContext<TCallReturn> {
  call: (() => Promise<TCallReturn>) &
    ((options: CallOptions) => Promise<TCallReturn>) &
    ((
      options: CallOptions,
      callback: (error: Error, result: TCallReturn) => void,
    ) => Promise<TCallReturn>);
  encodeABI: () => string;
}

export type MethodReturnContext = MethodPayableReturnContext;

export type ContractContext = Web3ContractContext<
  MultiSignature,
  MultiSignatureMethodNames,
  MultiSignatureEventsContext,
  MultiSignatureEvents
>;
export type MultiSignatureEvents =
  | 'CreateApplication'
  | 'RevokeApplication'
  | 'SignApplication'
  | 'TransferOwner';
export interface MultiSignatureEventsContext {
  CreateApplication: (
    parameters: {
      filter?: {
        from?: string | string[];
        to?: string | string[];
        msgHash?: string | number[] | string | number[][];
      };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ) => EventResponse;
  RevokeApplication: (
    parameters: {
      filter?: {
        from?: string | string[];
        msgHash?: string | number[] | string | number[][];
      };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ) => EventResponse;
  SignApplication: (
    parameters: {
      filter?: {
        from?: string | string[];
        msgHash?: string | number[] | string | number[][];
      };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ) => EventResponse;
  TransferOwner: (
    parameters: {
      filter?: {
        sender?: string | string[];
        oldOwner?: string | string[];
        newOwner?: string | string[];
      };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ) => EventResponse;
}
export type MultiSignatureMethodNames =
  | 'new'
  | 'createApplication'
  | 'getApplicationCount'
  | 'getApplicationHash'
  | 'getApplicationInfo'
  | 'getMultiSignatureAddress'
  | 'getValidSignature'
  | 'revokeSignApplication'
  | 'signApplication'
  | 'signatureMap'
  | 'signatureOwners'
  | 'threshold'
  | 'transferOwner';
export interface CreateApplicationEventEmittedResponse {
  from: string;
  to: string;
  msgHash: string | number[];
}
export interface RevokeApplicationEventEmittedResponse {
  from: string;
  msgHash: string | number[];
  index: string;
}
export interface SignApplicationEventEmittedResponse {
  from: string;
  msgHash: string | number[];
  index: string;
}
export interface TransferOwnerEventEmittedResponse {
  sender: string;
  oldOwner: string;
  newOwner: string;
}
export interface GetApplicationInfoResponse {
  result0: string;
  result1: string[];
}
export interface MultiSignature {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   * @param owners Type: address[], Indexed: false
   * @param limitedSignNum Type: uint256, Indexed: false
   */
  new: (owners: string[], limitedSignNum: string) => MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param to Type: address, Indexed: false
   */
  createApplication: (to: string) => MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param msghash Type: bytes32, Indexed: false
   */
  getApplicationCount: (msghash: string | number[]) => MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: pure
   * Type: function
   * @param from Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   */
  getApplicationHash: (from: string, to: string) => MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param msghash Type: bytes32, Indexed: false
   * @param index Type: uint256, Indexed: false
   */
  getApplicationInfo: (
    msghash: string | number[],
    index: string,
  ) => MethodConstantReturnContext<GetApplicationInfoResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getMultiSignatureAddress: () => MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param msghash Type: bytes32, Indexed: false
   * @param lastIndex Type: uint256, Indexed: false
   */
  getValidSignature: (
    msghash: string | number[],
    lastIndex: string,
  ) => MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param msghash Type: bytes32, Indexed: false
   */
  revokeSignApplication: (msghash: string | number[]) => MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param msghash Type: bytes32, Indexed: false
   */
  signApplication: (msghash: string | number[]) => MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: bytes32, Indexed: false
   * @param parameter1 Type: uint256, Indexed: false
   */
  signatureMap: (
    parameter0: string | number[],
    parameter1: string,
  ) => MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  signatureOwners: (parameter0: string) => MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  threshold: () => MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param index Type: uint256, Indexed: false
   * @param newOwner Type: address, Indexed: false
   */
  transferOwner: (index: string, newOwner: string) => MethodReturnContext;
}
