import services from '@/services';
import { PLEDGE_ADDRESS } from '@/utils/constants';
import { PlusOutlined } from '@ant-design/icons';
import {
  ProFormDatePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  StepsForm,
} from '@ant-design/pro-form';
import type { SelectProps } from 'antd';
import { Button, Form, message, Modal } from 'antd';
import { get } from 'lodash';
import moment from 'moment';
import { useState } from 'react';

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
  const [visible, setVisible] = useState<boolean>(false);
  const [lendTokenOption, setLendTokenOption] = useState<SelectProps<any>['options']>();
  const [borrowTokenOption, setBorrowTokenOption] = useState<SelectProps<any>['options']>();
  const [loading, setLoading] = useState<boolean>(false);
  const [formStep2] = Form.useForm();
  const [formStep3] = Form.useForm();

  const handleFinishFirstStep = async ({ sp_name, _spToken, jp_name, _jpToken }: any) => {
    // 部署合约
    try {
      const sp_contract = await services.evmServer.deployContract(sp_name, _spToken);
      const jp_contract = await services.evmServer.deployContract(jp_name, _jpToken);

      formStep2.setFieldsValue({
        sp_address: get(sp_contract, '_address'),
        jp_address: get(jp_contract, '_address'),
        pledge_address: PLEDGE_ADDRESS,
      });
      formStep3.setFieldsValue({
        _spToken,
        _jpToken,
      });
      return true;
    } catch (err: unknown) {
      console.error('deployContract', err);
      return false;
    }
  };

  const handleFinishSecondStep = async ({ sp_address, jp_address }: any) => {
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

  const handleFinishThirdStep = async ({
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
        _maxSupply,
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
    if (value) {
      setLoading(true);
      try {
        const price = await services.evmServer.getPrice(value);
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

  return (
    <>
      <Button key="button" icon={<PlusOutlined />} type="primary" onClick={() => setVisible(true)}>
        Create pool
      </Button>
      <StepsForm
        current={2}
        submitter={{ resetButtonProps: { style: { display: 'none' } } }}
        onFinish={handleFinishThirdStep}
        stepsFormRender={(dom, submitter) => {
          return (
            <Modal
              title="Create Pool"
              width={800}
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
        <StepsForm.StepForm
          title={'create SP & JP token'}
          onValuesChange={async ({ pledge_address }) => {
            try {
              await services.evmServer.getPrice(pledge_address);
              await services.evmServer.getSymbol(pledge_address);
            } catch (err: any) {
              console.log(err);
            }
          }}
          onFinish={handleFinishFirstStep}
        >
          <ProFormText name="pledge_address" label={'pledge contract address'} />

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
          name="id"
          title={'SP & JP token Authorization'}
          onFinish={handleFinishSecondStep}
          form={formStep2}
        >
          <ProFormText name="sp_address" label={'SP_token contract address'} disabled />
          <ProFormText name="jp_address" label={'JP_token contract address'} disabled />
          <ProFormText name="pledge_address" label={'pledge contract address'} disabled />
        </StepsForm.StepForm>
        <StepsForm.StepForm title={'create pool'} form={formStep3}>
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
          <ProFormDatePicker
            name="_settleTime"
            label="Settlement date"
            rules={[
              {
                required: true,
                message: 'Please select a date',
              },
            ]}
          />
          <ProFormDatePicker
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
