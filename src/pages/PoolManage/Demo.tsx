import type { PoolBaseInfoResponse } from '@/contracts/PledgePool';
import services from '@/services';
import { Card, Space, Spin, Table } from 'antd';
import { useEffect, useState } from 'react';
import ModalForm from './ModalForm';

const columns = [
  { title: 'ID', dataIndex: 'id' },
  {
    title: 'pool',
    dataIndex: 'pool',
  },
  { title: 'Underlying Asset', dataIndex: '' },
  { title: 'supply rate', dataIndex: '' },
  { title: 'borrow rate', dataIndex: '' },
  { title: 'Total financing', dataIndex: '' },
  { title: 'Settlement date', dataIndex: 'settleTime' },
  { title: 'length', dataIndex: '' },
  { title: 'Collateralization ratio', dataIndex: 'martgageRate' },
  { title: 'margin ratio', dataIndex: '' },
  {
    title: 'state',
    dataIndex: '',
  },
  { title: 'create time', dataIndex: '' },
];

export default () => {
  const [poolBaseInfoResponse, setPoolBaseInfoResponse] = useState<PoolBaseInfoResponse[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPoolBaseData = async () => {
    setLoading(true);
    const data = await services.evmServer.getPoolBaseData();
    setLoading(false);
    setPoolBaseInfoResponse(data);
  };

  useEffect(() => {
    fetchPoolBaseData();
  }, []);

  return (
    <Spin spinning={loading}>
      <Space direction="vertical">
        <Card>
          <ModalForm />
        </Card>
        <Card>
          <Table dataSource={poolBaseInfoResponse} columns={columns} />
        </Card>
      </Space>
    </Spin>
  );
};
