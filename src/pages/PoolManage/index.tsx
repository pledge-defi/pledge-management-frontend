import { debtTokenName, getPoolByConditions } from '@/services/pledge/api/pool';
import { FORMAT_TIME } from '@/utils/constants';
import { getFieldsLabel } from '@/utils/staticOptions';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { forEach, get, set } from 'lodash';
import moment from 'moment';
import numeral from 'numeral';
import { useEffect, useMemo, useRef, useState } from 'react';
import ModalForm from './ModalForm';

export default () => {
  const actionRef = useRef<ActionType>();
  const [poolValueEnum, setPoolValueEnum] = useState();

  const fetchPoolList = async () => {
    const { symbols } = await debtTokenName();
    const newPoolValueEnum = {};
    forEach(symbols, (s) => {
      set(newPoolValueEnum, s.address!, { text: s.symbol });
    });
    setPoolValueEnum(newPoolValueEnum);
  };

  const handleClickSearch = () => {
    actionRef.current?.reload();
  };

  const currentColumns: ProColumns<API.PoolData>[] = useMemo(() => {
    return [
      {
        title: 'ID',
        dataIndex: 'id',
        renderText: (_: any, __: any, i: number) => i,
        search: false,
      },
      {
        title: 'pool',
        dataIndex: 'lendToken',
        renderText: (t: string) => getFieldsLabel('lendToken', t),
        valueType: 'select',
        valueEnum: poolValueEnum,
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
        valueType: 'select',
        valueEnum: {
          '0': { text: 'MATCH' },
          '2': { text: 'EXECUTION' },
          '3': { text: 'FINISH' },
          '4': { text: 'LIQUIDATION' },
          '5': { text: 'UNDONE' },
        },
      },
      { title: 'maturity time', dataIndex: '', search: false },
    ];
  }, [poolValueEnum]);

  useEffect(() => {
    fetchPoolList();
  }, []);

  return (
    <ProTable<API.PoolData>
      columns={currentColumns}
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
