import services from '@/services';
import { pledge_address } from '@/utils/constants';
import { staticOptions } from '@/utils/staticOptions';
import { PlusOutlined } from '@ant-design/icons';
import {
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
  StepsForm,
  ProFormDigit,
} from '@ant-design/pro-form';
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
  const [visible, setVisible] = useState(false);
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
        pledge_address,
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
      await services.evmServer.addMinter(sp_address, pledge_address);
      await services.evmServer.addMinter(jp_address, pledge_address);
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
        pledge_address,
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

  return (
    <>
      <Button key="button" icon={<PlusOutlined />} type="primary" onClick={() => setVisible(true)}>
        Create pool
      </Button>
      <StepsForm
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
        <StepsForm.StepForm title={'create SP & JP token'} onFinish={handleFinishFirstStep}>
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
            options={staticOptions.lendToken}
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
            options={staticOptions.borrowToken}
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
