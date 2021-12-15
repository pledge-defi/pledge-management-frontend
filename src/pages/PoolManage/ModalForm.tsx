import services from '@/services';
import { PlusOutlined } from '@ant-design/icons';
import { ProFormDatePicker, ProFormSelect, ProFormText, StepsForm } from '@ant-design/pro-form';
import { Button, Form, message, Modal } from 'antd';
import { get } from 'lodash';
import moment from 'moment';
import { useState } from 'react';

export default () => {
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
        pledge_address: '0x7980AEA60bc71977Ab61cFD7F0FaB4E75b808371',
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

  const handleFinishSecondStep = async ({ sp_address, jp_address, pledge_address }: any) => {
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
    try {
      await services.evmServer.createPoolInfo(
        '0x7980AEA60bc71977Ab61cFD7F0FaB4E75b808371',
        moment(_settleTime).valueOf().toString(),
        moment(_endTime).valueOf().toString(),
        _interestRate,
        _maxSupply,
        _martgageRate,
        _lendToken,
        _borrowToken,
        sp_address,
        jp_address,
        _autoLiquidateThreshold,
      );
      message.success('Created successfully');
      setVisible(false);
      return true;
    } catch (err: any) {
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
          <ProFormText name="sp_name" label="SP_token name" />
          <ProFormText name="_spToken" label="SP_token symbol" />
          <ProFormText name="jp_name" label="JP_token name" />
          <ProFormText name="_jpToken" label="JP_token symbol" />
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
            label="contractAddress"
            options={[
              { label: 'BUSD', value: '0xDc6dF65b2fA0322394a8af628Ad25Be7D7F413c2' },
              { label: 'DAI', value: '0xf2bDB4ba16b7862A1bf0BE03CD5eE25147d7F096' },
            ]}
          />
          <ProFormSelect
            name="_borrowToken"
            label="underlying asset"
            options={[
              { label: 'BTC', value: '0xF592aa48875a5FDE73Ba64B527477849C73787ad' },
              { label: 'BNB', value: '0x0000000000000000000000000000000000000000' },
            ]}
          />

          <ProFormText name="_maxSupply" label="Maximum deposit" />
          <ProFormText name="_interestRate" label="fixed rate（%）" />
          <ProFormText name="_martgageRate" label="Collateralization ratio（%）" />
          <ProFormText name="_autoLiquidateThreshold" label="Margin ratio（%）" />
          <ProFormDatePicker name="_settleTime" label="Settlement date" />
          <ProFormDatePicker name="_endTime" label="maturity date" />
        </StepsForm.StepForm>
      </StepsForm>
    </>
  );
};
