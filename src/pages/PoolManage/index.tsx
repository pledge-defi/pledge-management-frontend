import { globalTokenState } from '@/model/global';
import services from '@/services';
import { debtTokenList, getPoolByConditions, PoolList } from '@/services/pledge/api/pool';
import { FORMAT_TIME } from '@/utils/constants';
import { dealNumber_18, dealNumber_8 } from '@/utils/public';
import { getFieldsLabel } from '@/utils/staticOptions';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { find, forEach, get, set, size } from 'lodash';
import moment from 'moment';
import numeral from 'numeral';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import ModalForm from './ModalForm';

export default () => {
  const actionRef = useRef<ActionType>();
  const [poolValueEnum, setPoolValueEnum] = useState<Record<string, any>>();
  const [globalToken, setGlobalToken] = useRecoilState(globalTokenState);
  console.log(globalToken);

  const fetchPoolList = async () => {
    const response = await debtTokenList();
    const rows = get(response, ['data', 'rows']);
    const newPoolValueEnum = {};
    forEach(rows, (s) => {
      set(newPoolValueEnum, s.address!, { text: s.symbol });
    });
    setPoolValueEnum(newPoolValueEnum);
  };

  const handleClickSearch = async () => {
    await PoolList();
    actionRef.current?.reload();
  };

  const currentColumns: ProColumns<API.PoolInfo>[] = useMemo(() => {
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
        renderText: (t: string) => find(globalToken, { value: t })?.label,
        valueType: 'select',
        valueEnum: poolValueEnum,
      },
      {
        title: 'Underlying Asset',
        dataIndex: 'borrowToken',
        renderText: (t: string) => find(globalToken, { value: t })?.label,
        search: false,
      },
      {
        title: 'supply rate %',
        dataIndex: 'interestRate',
        renderText: (t) => numeral(dealNumber_8(t)).format('0%'),
        search: false,
      },
      {
        title: 'borrow rate %',
        dataIndex: 'interestRate',
        renderText: (t) => numeral(dealNumber_8(t)).format('0%'),
        search: false,
      },
      {
        title: 'Total financing',
        dataIndex: 'maxSupply',
        search: false,
        renderText: (t) => dealNumber_18(t),
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
            .diff(moment.unix(r.settleTime as unknown as number), 'days')} days`;
        },
        search: false,
      },
      {
        title: 'Collateralization ratio %',
        dataIndex: 'martgageRate',
        renderText: (t) => numeral(dealNumber_8(t)).format('0%'),
        search: false,
      },
      {
        title: 'margin ratio %',
        dataIndex: 'autoLiquidateThreshold',
        renderText: (t) => numeral(dealNumber_8(t)).format('0%'),
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
  }, [globalToken, poolValueEnum]);

  const getTokens = (data: API.PoolInfo[] | undefined) => {
    if (!size(data)) return;
    const tokens: (string | undefined)[] = [];
    forEach(data, (d) => {
      tokens.push(d.lendToken);
      tokens.push(d.borrowToken);
    });
    const uniqueTokens = Array.from(new Set(tokens));
    const promiseAll: any[] = [];
    forEach(uniqueTokens, (u) => {
      promiseAll.push(services.evmServer.getSymbol(u!));
    });
    Promise.all(promiseAll).then((res) => {
      const tokenOptions: Global.Option[] = [];
      forEach(uniqueTokens, (u, index) => {
        tokenOptions.push({ label: get(res, [index]), value: u });
      });
      setGlobalToken(tokenOptions);
    });
  };

  useEffect(() => {
    fetchPoolList();
  }, []);

  return (
    <ProTable<API.PoolInfo>
      columns={currentColumns}
      actionRef={actionRef}
      scroll={{ x: 1300 }}
      request={async (params = {}) => {
        const p: API.SearchRequest = {
          poolID: get(params, 'lendToken'),
          state: get(params, 'state'),
          page: get(params, 'current'),
          pageSize: get(params, 'pageSize'),
        };
        return getPoolByConditions(p).then((response) => {
          const data = get(response, 'data');
          getTokens(data?.rows);
          return {
            data: data?.rows,
            success: true,
            total: data?.count as unknown as number,
          };
        });
      }}
      toolBarRender={() => [<ModalForm callback={handleClickSearch} />]}
    />
  );
};
