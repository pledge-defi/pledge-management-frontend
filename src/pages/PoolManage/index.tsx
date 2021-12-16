import type { PoolBaseInfoResponse } from '@/contracts/PledgePool';
import services from '@/services';
import { getFieldsLabel, staticOptions } from '@/utils/staticOptions';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Select, Space, Spin, Table } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import ModalForm from './ModalForm';
import type { ColumnsType } from 'antd/lib/table/interface.d';
import moment from 'moment';
import { FORMAT_TIME_STANDARD } from '@/utils/constants';
import styled from 'styled-components';
import { size } from 'lodash';

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const columns: ColumnsType<any> = [
  { title: 'ID', dataIndex: 'id', render: (_: any, __: any, i: number) => i },
  {
    title: 'pool',
    dataIndex: 'lendToken',
    render: (t: string) => getFieldsLabel('lendToken', t),
  },
  {
    title: 'Underlying Asset',
    dataIndex: 'borrowToken',
    render: (t: string) => getFieldsLabel('borrowToken', t),
  },
  { title: 'supply rate', dataIndex: 'interestRate' },
  { title: 'borrow rate', dataIndex: 'interestRate' },
  { title: 'Total financing', dataIndex: 'maxSupply' },
  {
    title: 'Settlement date',
    dataIndex: 'settleTime',
    render: (t) => moment.unix(t).format(FORMAT_TIME_STANDARD),
  },
  { title: 'length', dataIndex: '' },
  {
    title: 'Collateralization ratio',
    dataIndex: 'martgageRate',
    render: (t: string) => {
      return +t / Math.pow(10, 8);
    },
  },
  {
    title: 'margin ratio',
    dataIndex: 'autoLiquidateThreshold',
    render: (t: string) => {
      return +t / Math.pow(10, 8);
    },
  },
  {
    title: 'state',
    dataIndex: 'state',
    render: (t: string) => getFieldsLabel('state', t),
  },
  { title: 'create time', dataIndex: '' },
];

export default () => {
  const [poolBaseInfoResponse, setPoolBaseInfoResponse] = useState<PoolBaseInfoResponse[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [filterLendToken, setFilterLendToken] = useState<string>();
  const [filterState, setfilterState] = useState<string>();

  const fetchPoolBaseData = async () => {
    setLoading(true);
    const data = await services.evmServer.getPoolBaseData();
    setLoading(false);
    setPoolBaseInfoResponse(data);
  };

  const handleChangeLendToken = (v: string) => {
    setFilterLendToken(v);
  };

  const handleChangeState = (v: string) => {
    setfilterState(v);
  };

  const handleClickSearch = () => {
    fetchPoolBaseData();
  };

  const dataSource = useMemo(() => {
    if (size(poolBaseInfoResponse)) {
      return poolBaseInfoResponse
        ?.filter((p) => {
          if (!filterLendToken) {
            return true;
          }
          return filterLendToken === p.lendToken;
        })
        .filter((p) => {
          if (!filterState) {
            return true;
          }
          return filterState === p.state;
        });
    }
    return [];
  }, [filterLendToken, filterState, poolBaseInfoResponse]);

  useEffect(() => {
    fetchPoolBaseData();
  }, []);

  return (
    <PageContainer>
      <Spin spinning={loading}>
        <Space direction="vertical">
          <Card>
            <FlexDiv>
              <ModalForm callback={handleClickSearch} />
              <Space>
                <Select
                  onChange={handleChangeLendToken}
                  options={staticOptions.lendToken}
                  style={{ width: '200px' }}
                  allowClear
                />

                <Select
                  onChange={handleChangeState}
                  options={staticOptions.state}
                  style={{ width: '200px' }}
                  allowClear
                />
                <Button type="primary" onClick={handleClickSearch}>
                  Search
                </Button>
              </Space>
            </FlexDiv>
          </Card>
          <Card>
            <Table dataSource={dataSource} columns={columns} pagination={false} />
          </Card>
        </Space>
      </Spin>
    </PageContainer>
  );
};
