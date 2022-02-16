import type { ChainInfo } from '@/constants/chainInfos';
import chainInfos from '@/constants/chainInfos';
import { chainInfoKeyState } from '@/model/global';
import services from '@/services';
import { postPoolGetMultiSign, postPoolSetMultiSign } from '@/services/pledge/api/pool';
import { BNB_ADDRESS } from '@/utils/constants';
import { dealNumber } from '@/utils/public';
import { PlusOutlined } from '@ant-design/icons';
import {
  ProFormDateTimePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  StepsForm,
} from '@ant-design/pro-form';
import { useWeb3React } from '@web3-react/core';
import type { SelectProps } from 'antd';
import { Button, Form, Input, message, Modal } from 'antd';
import { find, get, map, size } from 'lodash';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useLocation } from 'umi';

const validator = async (_: any, value: string) => {
  if (value && value.length > 11) {
    return Promise.reject(new Error('The number of characters cannot exceed 11'));
  }
  return Promise.resolve();
};

type Props = {
  callback?: () => void;
};

export default ({ callback }: Props) => {
  const { pathname } = useLocation();
  const chainInfoKey = useRecoilValue(chainInfoKeyState);
  const [visible, setVisible] = useState<boolean>(false);
  const [lendTokenOption, setLendTokenOption] = useState<SelectProps<any>['options']>();
  const [borrowTokenOption, setBorrowTokenOption] = useState<SelectProps<any>['options']>();
  const [loading, setLoading] = useState<boolean>(false);
  const [current, setCurrent] = useState<number>();
  const [authorizedStatus, setAuthorizedStatus] = useState<boolean>(false);
  const [authorizedloading, setAuthorizedloading] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<API.GetMultiSignData>({});
  const { account } = useWeb3React();
  const [formStep2] = Form.useForm();
  const [formStep3] = Form.useForm();
  const [formStep4] = Form.useForm();
  const [formStep5] = Form.useForm();
  const { PLEDGE_ADDRESS, ORACLE_ADDRESS, MULTISIGNATURE_ADDRESS, DEPLOYMENT_ACCOUNT, chainId } =
    useMemo(
      () => find(chainInfos, { chainName: chainInfoKey }) as unknown as ChainInfo,
      [chainInfoKey],
    );

  const setFormValues = ({ sp_address, jp_address, _spToken, _jpToken }: API.GetMultiSignData) => {
    formStep2.setFieldsValue({
      sp_address,
      jp_address,
      multisignature_address: MULTISIGNATURE_ADDRESS,
    });

    formStep3.setFieldsValue({
      sp_address,
      jp_address,
    });

    formStep4.setFieldsValue({
      sp_address,
      jp_address,
      pledge_address: PLEDGE_ADDRESS,
    });

    formStep5.setFieldsValue({
      _spToken,
      _jpToken,
    });
  };

  const fetchInitialValues = async () => {
    const res = await postPoolGetMultiSign({ chain_id: chainId });
    const v = get(res, ['data']);
    setInitialValues(v || {});
    if (size(v)) {
      setFormValues(v!);
    }
  };

  const handleCurrentChange = (v: number) => {
    setCurrent(v);
  };

  const handleFinishCreateSPJPToken = async ({ sp_name, _spToken, jp_name, _jpToken }: any) => {
    // 部署合约
    try {
      const sp_contract = await services.evmServer.deployContract(
        sp_name,
        _spToken,
        MULTISIGNATURE_ADDRESS,
      );
      const jp_contract = await services.evmServer.deployContract(
        jp_name,
        _jpToken,
        MULTISIGNATURE_ADDRESS,
      );
      const sp_address = get(sp_contract, '_address');
      const jp_address = get(jp_contract, '_address');

      setFormValues({ sp_address, jp_address, _spToken, _jpToken });
      setInitialValues((init) => ({ ...init, sp_name, _spToken, jp_name, _jpToken }));
      postPoolSetMultiSign({ sp_name, _spToken, jp_name, _jpToken, chain_id: chainId });
      return true;
    } catch (err: unknown) {
      console.log('deployContract', err);
      return false;
    }
  };

  const handleFinishBindMultiSignature = async ({ sp_address, jp_address }: any) => {
    // 绑定多签合约
    try {
      await services.evmServer.createApplication(MULTISIGNATURE_ADDRESS, sp_address);
      await services.evmServer.createApplication(MULTISIGNATURE_ADDRESS, jp_address);
      setInitialValues((init) => ({ ...init, sp_address, jp_address }));
      postPoolSetMultiSign({ ...initialValues, sp_address, jp_address, chain_id: chainId });
      return true;
    } catch (err: unknown) {
      console.error('deployContract', err);
      return false;
    }
  };

  const handleClickAuthorized = async () => {
    // 多签授权
    const { sp_address, jp_address } = initialValues;
    setAuthorizedloading(true);
    try {
      const spHash = await services.evmServer.getApplicationHash(
        DEPLOYMENT_ACCOUNT,
        sp_address!,
        MULTISIGNATURE_ADDRESS,
      );
      await services.evmServer.signApplication(spHash, MULTISIGNATURE_ADDRESS);
      const jpHash = await services.evmServer.getApplicationHash(
        DEPLOYMENT_ACCOUNT,
        jp_address!,
        MULTISIGNATURE_ADDRESS,
      );
      await services.evmServer.signApplication(jpHash, MULTISIGNATURE_ADDRESS);
      setInitialValues((init) => ({
        ...init,
        spHash,
        jpHash,
        multi_sign_account: [...(init?.multi_sign_account || []), account],
      }));
      postPoolSetMultiSign({
        ...initialValues,
        spHash,
        jpHash,
        multi_sign_account: [...(initialValues?.multi_sign_account || []), account],
        chain_id: chainId,
      });

      setAuthorizedloading(false);
    } catch (err: unknown) {
      console.error('deployContract', err);
      setAuthorizedloading(false);
    }
  };

  const handleFinishAddAdmin = async ({ sp_address, jp_address }: any) => {
    // 添加管理员
    try {
      await services.evmServer.addMinter(sp_address, PLEDGE_ADDRESS);
      await services.evmServer.addMinter(jp_address, PLEDGE_ADDRESS);
      return true;
    } catch (err: unknown) {
      console.error('addMinter', err);
      return false;
    }
  };

  const handleFinishCreatePool = async ({
    _settleTime,
    _endTime,
    _interestRate,
    _maxSupply,
    _martgageRate,
    _lendToken,
    _borrowToken,
    _autoLiquidateThreshold,
    sp_address,
    jp_address,
  }: any) => {
    // create pool
    try {
      await services.evmServer.createPoolInfo(
        PLEDGE_ADDRESS,
        moment(_settleTime).unix().toString(),
        moment(_endTime).unix().toString(),
        (_interestRate * Math.pow(10, 6)).toString(),
        dealNumber(_maxSupply)?.toFixed(),
        (_martgageRate * Math.pow(10, 6)).toString(),
        _lendToken,
        _borrowToken,
        sp_address,
        jp_address,
        (_autoLiquidateThreshold * Math.pow(10, 6)).toString(),
      );
      message.success('Created successfully');
      callback?.();
      setVisible(false);
      return true;
    } catch (err: any) {
      console.log(err);
      message.error('createPoolInfo', err.toString());
      return false;
    }
  };

  const searchContractDetail = async (v: string | undefined) => {
    // 0xDc6dF65b2fA0322394a8af628Ad25Be7D7F413c2
    const value = v?.trim();
    if (v === BNB_ADDRESS) {
      return [{ label: 'BNB', value: BNB_ADDRESS }];
    }
    if (value) {
      setLoading(true);
      try {
        const price = await services.evmServer.getPrice(value, ORACLE_ADDRESS);
        if (price) {
          const symbol = await services.evmServer.getSymbol(value);
          if (symbol) {
            setLoading(false);

            return [{ label: symbol, value }];
          }
        }
      } catch (error) {
        setLoading(false);
        // console.log(error);
        return undefined;
      }
    }
    return undefined;
  };

  const handleLendTokenSearch = async (v: string | undefined) => {
    const value = await searchContractDetail(v);
    setLendTokenOption(value);
  };

  const handleBorrowTokenSearch = async (v: string | undefined) => {
    const value = await searchContractDetail(v);
    setBorrowTokenOption(value);
  };

  const verifyAuthorizedStatus = async () => {
    console.log(1);

    // 验证多签状态
    try {
      const { jpHash, spHash } = initialValues;
      const jpResult = await services.evmServer.getValidSignature(jpHash!, MULTISIGNATURE_ADDRESS);
      const sPresult = await services.evmServer.getValidSignature(spHash!, MULTISIGNATURE_ADDRESS);
      console.log(jpResult, sPresult);

      setAuthorizedStatus(jpResult === '1' && sPresult === '1');
    } catch (err: unknown) {
      console.error('verifyAuthorizedStatus', err);
    }
  };

  const submitButtonDisabled = useMemo(() => {
    if (current === 2) {
      return !authorizedStatus;
    }
    return false;
  }, [authorizedStatus, current]);

  useEffect(() => {
    if (current === 2 && size(initialValues) !== 0) {
      verifyAuthorizedStatus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, initialValues]);

  useEffect(() => {
    if (pathname === '/poolManage/authorizedMultiSignature') {
      fetchInitialValues();
      setVisible(true);
      setCurrent(2);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Button key="button" icon={<PlusOutlined />} type="primary" onClick={() => setVisible(true)}>
        Create pool
      </Button>
      <StepsForm
        current={current}
        onCurrentChange={handleCurrentChange}
        submitter={{
          resetButtonProps: { style: { display: 'none' } },
          submitButtonProps: { disabled: submitButtonDisabled },
        }}
        onFinish={handleFinishCreatePool}
        stepsFormRender={(dom, submitter) => {
          return (
            <Modal
              title="Create Pool"
              width={1200}
              onCancel={() => setVisible(false)}
              visible={visible}
              footer={submitter}
              destroyOnClose
            >
              {dom}
            </Modal>
          );
        }}
      >
        <StepsForm.StepForm title={'create SP & JP token'} onFinish={handleFinishCreateSPJPToken}>
          <ProFormText
            name="sp_name"
            label="SP_token name"
            rules={[
              {
                validator,
              },
            ]}
          />
          <ProFormText
            name="_spToken"
            label="SP_token symbol"
            rules={[
              {
                validator,
              },
            ]}
          />
          <ProFormText
            name="jp_name"
            label="JP_token name"
            rules={[
              {
                validator,
              },
            ]}
          />
          <ProFormText
            name="_jpToken"
            label="JP_token symbol"
            rules={[
              {
                validator,
              },
            ]}
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm
          title={'SP & JP token bind the Multi-signature Authorization'}
          onFinish={handleFinishBindMultiSignature}
          form={formStep2}
        >
          <ProFormText name="sp_address" label={'SP_token contract address'} disabled />
          <ProFormText name="jp_address" label={'JP_token contract address'} disabled />
          <ProFormText
            name="multisignature_address"
            label={'Multi-signature contract address'}
            disabled
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm
          title={'Authorized multi-signature accounts'}
          form={formStep3}
          stepProps={{ disabled: true }}
        >
          <div>Currently Multi-signature account</div>
          <Input disabled value={account as string} />

          <ProFormText name="sp_address" label={'SP_token contract address'} disabled />
          <ProFormText name="jp_address" label={'JP_token contract address'} disabled />
          <Button type="primary" onClick={handleClickAuthorized} loading={authorizedloading}>
            Authorized
          </Button>
          {initialValues.multi_sign_account && (
            <div>
              <h3>Currently verified account</h3>
              {map(initialValues.multi_sign_account, (act, index) => {
                return (
                  <div>
                    {index + 1}. {act}
                  </div>
                );
              })}
            </div>
          )}
        </StepsForm.StepForm>
        <StepsForm.StepForm
          title={'SP & JP token Authorization'}
          onFinish={handleFinishAddAdmin}
          form={formStep4}
        >
          <ProFormText name="sp_address" label={'SP_token contract address'} disabled />
          <ProFormText name="jp_address" label={'JP_token contract address'} disabled />
          <ProFormText name="pledge_address" label={'pledge contract address'} disabled />
        </StepsForm.StepForm>
        <StepsForm.StepForm title={'create pool'} form={formStep5}>
          <ProFormText name="_spToken" label="SP_token symbol" disabled />
          <ProFormText name="_jpToken" label="JP_token symbol" disabled />
          <ProFormSelect
            name="_lendToken"
            label="pool"
            showSearch
            fieldProps={{ onSearch: handleLendTokenSearch, optionFilterProp: 'value', loading }}
            options={lendTokenOption}
            rules={[
              {
                required: true,
                message: 'The token information was not found',
              },
            ]}
          />
          <ProFormSelect
            name="_borrowToken"
            label="underlying asset"
            showSearch
            fieldProps={{ onSearch: handleBorrowTokenSearch, optionFilterProp: 'value', loading }}
            options={borrowTokenOption}
            rules={[
              {
                required: true,
                message: 'The token information was not found',
              },
            ]}
          />

          <ProFormDigit
            name="_maxSupply"
            label="Maximum deposit"
            placeholder={'Greater than 0'}
            min={0}
            rules={[
              {
                required: true,
                message: 'Please enter a number greater than 0',
              },
            ]}
          />
          <ProFormDigit
            name="_interestRate"
            label="fixed rate（%）"
            placeholder={'(0 ~ 100)'}
            min={0}
            max={100}
            rules={[
              {
                required: true,
                message: 'Please enter a number from 0 to 100',
              },
            ]}
          />
          <ProFormDigit
            name="_martgageRate"
            label="Collateralization ratio（%）"
            placeholder={'Greater than 0'}
            min={0}
            rules={[
              {
                required: true,
                message: 'Please enter a number greater than 0',
              },
            ]}
          />
          <ProFormDigit
            name="_autoLiquidateThreshold"
            label="Margin ratio（%）"
            placeholder={'(0 ~ 100)'}
            min={0}
            max={100}
            rules={[
              {
                required: true,
                message: 'Please enter a number from 0 to 100',
              },
            ]}
          />
          <ProFormDateTimePicker
            fieldProps={{ showTime: { format: 'HH:mm' } }}
            name="_settleTime"
            label="Settlement date"
            rules={[
              {
                required: true,
                message: 'Please select a date',
              },
            ]}
          />
          <ProFormDateTimePicker
            fieldProps={{ showTime: { format: 'HH:mm' } }}
            name="_endTime"
            label="maturity date"
            rules={[
              {
                required: true,
                message: 'Please select a date',
              },
            ]}
          />
        </StepsForm.StepForm>
      </StepsForm>
    </>
  );
};
