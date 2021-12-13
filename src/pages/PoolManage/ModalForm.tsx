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
      <ProFormSelect name="id" label="underly asset" />
      <ProFormText name="id" label="Maximun deposit" />
      <ProFormText name="id" label="fixed rate(%)" />
      <ProFormText name="id" label="Collateralization ratio(%)" />
      <ProFormText name="id" label="Margin ratio(%)" />
      <ProFormText name="id" label="Minimun deposit" />
      <ProFormText name="id" label="Minimun loan" />
      <ProFormDateRangePicker name="id" label="Settlement date" />
      <ProFormDateRangePicker name="id" label="maturity date" />
    </ModalForm>
  );
};
