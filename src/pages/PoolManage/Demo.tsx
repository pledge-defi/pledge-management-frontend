import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { useRef } from 'react';
import request from 'umi-request';
import ModalForm from './ModalForm';

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

const columns: ProColumns<GithubIssueItem>[] = [
  { title: 'ID', dataIndex: 'id', search: false },
  {
    title: 'pool',
    dataIndex: 'pool',
    // valueType: 'select',
    // valueEnum: {
    //   BUSD: {
    //     text: 'BUSD',
    //   },
    // },
  },
  { title: 'Underlying Asset', dataIndex: '', search: false },
  { title: 'supply rate', dataIndex: '', search: false },
  { title: 'borrow rate', dataIndex: '', search: false },
  { title: 'Total financing', dataIndex: '', search: false },
  { title: 'Settlement date', dataIndex: '', search: false },
  { title: 'length', dataIndex: '', search: false },
  { title: 'Collateralization ratio', dataIndex: '', search: false },
  { title: 'margin ratio', dataIndex: '', search: false },
  {
    title: 'state',
    dataIndex: '',
    // valueType: 'select',
    // valueEnum: {
    //   running: {
    //     text: 'running',
    //   },
    // },
  },
  { title: 'create time', dataIndex: '', search: false },
  {
    title: 'option',
    valueType: 'option',
    render: () => <a>detail</a>,
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<GithubIssueItem>
      columns={columns}
      actionRef={actionRef}
      request={async (params = {}, sort, filter) => {
        console.log(sort, filter);
        return request<{
          data: GithubIssueItem[];
        }>('https://proapi.azurewebsites.net/github/issues', {
          params,
        });
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
      }}
      dateFormatter="string"
      toolBarRender={() => [<ModalForm />]}
    />
  );
};
