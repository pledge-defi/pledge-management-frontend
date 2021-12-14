import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';
import { Button, message } from 'antd';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title="Create pool"
      trigger={
        <Button key="button" icon={<PlusOutlined />} type="primary">
          Create pool
        </Button>
      }
      autoFocusFirstInput
      modalProps={{
        onCancel: () => console.log('run'),
      }}
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values.name);
        message.success('提交成功');
        return true;
      }}
    >
      <ProFormSelect name="id" label="pool" />
      <ProFormSelect name="id" label="underlying asset" />
      <ProFormText name="id" label="Total financing" />
      <ProFormText name="id" label="fixed rate（%）" />
      <ProFormText name="id" label="Collateralization ratio（%）" />
      <ProFormText name="id" label="Margin ratio（%）" />
      <ProFormText name="id" label="Minimum deposit" />
      <ProFormText name="id" label="Minimum loan" />
      <ProFormDateRangePicker name="id" label="Settlement date" />
      <ProFormSelect name="id" label="length" />
    </ModalForm>
  );
};
