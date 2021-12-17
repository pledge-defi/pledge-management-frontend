import type { PoolBaseInfoResponse } from '@/contracts/PledgePool';
import services from '@/services';
import { FORMAT_TIME } from '@/utils/constants';
import { getFieldsLabel, staticOptions } from '@/utils/staticOptions';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Select, Space, Spin, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table/interface.d';
import { size } from 'lodash';
import moment from 'moment';
import numeral from 'numeral';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import ModalForm from './ModalForm';

const FlexDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const SpaceDiv = styled.div`
  height: 20px;
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
  {
    title: 'supply rate %',
    dataIndex: 'interestRate',
    render: (t) => numeral(t / Math.pow(10, 8)).format('0%'),
  },
  {
    title: 'borrow rate %',
    dataIndex: 'interestRate',
    render: (t) => numeral(t / Math.pow(10, 8)).format('0%'),
  },
  {
    title: 'Total financing',
    dataIndex: 'maxSupply',
  },
  {
    title: 'Settlement date',
    dataIndex: 'settleTime',
    render: (t) => moment.unix(t).format(FORMAT_TIME),
  },
  {
    title: 'length',
    dataIndex: 'length',
    render: (_, r) => {
      return `${moment.unix(r.endTime).diff(moment.unix(r.settleTime), 'days')} 天`;
    },
  },
  {
    title: 'Collateralization ratio %',
    dataIndex: 'martgageRate',
    // render: (t: string) => {
    //   return +t / Math.pow(10, 8);
    // },
    render: (t) => numeral(t / Math.pow(10, 8)).format('0%'),
  },
  {
    title: 'margin ratio %',
    dataIndex: 'autoLiquidateThreshold',
    render: (t) => numeral(t / Math.pow(10, 8)).format('0%'),
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
        <SpaceDiv />
        <Card>
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            scroll={{ x: 1300 }}
          />
        </Card>
      </Spin>
    </PageContainer>
  );
};
