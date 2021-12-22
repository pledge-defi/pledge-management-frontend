import { getPoolByConditions } from '@/services/pledge/api/pool';
import { FORMAT_TIME } from '@/utils/constants';
import { getFieldsLabel } from '@/utils/staticOptions';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { get } from 'lodash';
import moment from 'moment';
import numeral from 'numeral';
import { useRef } from 'react';
import ModalForm from './ModalForm';

const columns: ProColumns<API.PoolData>[] = [
  { title: 'ID', dataIndex: 'id', renderText: (_: any, __: any, i: number) => i, search: false },
  {
    title: 'pool',
    dataIndex: 'lendToken',
    renderText: (t: string) => getFieldsLabel('lendToken', t),
    valueType: 'select',
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      open: {
        text: '未解决',
        status: 'Error',
      },
      closed: {
        text: '已解决',
        status: 'Success',
        disabled: true,
      },
      processing: {
        text: '解决中',
        status: 'Processing',
      },
    },
  },
  {
    title: 'Underlying Asset',
    dataIndex: 'borrowToken',
    renderText: (t: string) => getFieldsLabel('borrowToken', t),
    search: false,
  },
  {
    title: 'supply rate %',
    dataIndex: 'interestRate',
    renderText: (t) => numeral(t / Math.pow(10, 8)).format('0%'),
    search: false,
  },
  {
    title: 'borrow rate %',
    dataIndex: 'interestRate',
    renderText: (t) => numeral(t / Math.pow(10, 8)).format('0%'),
    search: false,
  },
  {
    title: 'Total financing',
    dataIndex: 'maxSupply',
    search: false,
    renderText: (t) => t / Math.pow(10, 8),
  },
  {
    title: 'Settlement date',
    dataIndex: 'settleTime',
    renderText: (t) => moment.unix(t).format(FORMAT_TIME),
    search: false,
  },
  {
    title: 'length',
    dataIndex: 'length',
    renderText: (_, r) => {
      return `${moment
        .unix(r.endTime as unknown as number)
        .diff(moment.unix(r.settleTime as unknown as number), 'days')} 天`;
    },
    search: false,
  },
  {
    title: 'Collateralization ratio %',
    dataIndex: 'martgageRate',
    renderText: (t) => numeral(t / Math.pow(10, 8)).format('0%'),
    search: false,
  },
  {
    title: 'margin ratio %',
    dataIndex: 'autoLiquidateThreshold',
    renderText: (t) => numeral(t / Math.pow(10, 8)).format('0%'),
    search: false,
  },
  {
    title: 'state',
    dataIndex: 'state',
    renderText: (t: string) => getFieldsLabel('state', t),
  },
  { title: 'maturity time', dataIndex: '', search: false },
];

export default () => {
  const actionRef = useRef<ActionType>();
  const handleClickSearch = () => {
    actionRef.current?.reload();
  };
  return (
    <ProTable<API.PoolData>
      columns={columns}
      actionRef={actionRef}
      scroll={{ x: 1300 }}
      request={async (params = {}) => {
        const p: API.getPoolByConditionsParams = {
          poolID: get(params, 'lendToken'),
          poolStatus: get(params, 'state'),
          page: get(params, 'current'),
          pageSize: get(params, 'pageSize'),
        };
        return getPoolByConditions(p).then(({ totalNum, poolList }) => {
          return {
            data: poolList,
            success: true,
            total: totalNum as unknown as number,
          };
        });
      }}
      toolBarRender={() => [<ModalForm callback={handleClickSearch} />]}
    />
  );
};
