// @ts-ignore
import { Request, Response } from 'express';

export default {
  'POST /pool/debt_token_name': (req: Request, res: Response) => {
    res.status(200).send({
      symbols: [
        { symbol: '查还却划义角命力说公提天老化增。', address: '黑龙江省 黑河市 孙吴县' },
        { symbol: '直决被收火高五数强再则圆心米元现金。', address: '福建省 漳州市 龙海市' },
        { symbol: '验然阶水记他多再类能及等。', address: '江苏省 泰州市 其它区' },
        { symbol: '理活包次引交积设引制斯打。', address: '山东省 临沂市 平邑县' },
        { symbol: '第较用精习规王住照办生其变二。', address: '天津 天津市 津南区' },
        { symbol: '状意毛就战会存容部安义那组问题白情。', address: '河北省 邯郸市 其它区' },
        { symbol: '即最市往些立极低感八究率。', address: '四川省 内江市 其它区' },
        { symbol: '利自处象体起毛产立立今位却等来。', address: '浙江省 温州市 瓯海区' },
        { symbol: '清种山照定律想支温月目信。', address: '黑龙江省 黑河市 孙吴县' },
        {
          symbol: '基号将到局过精西干火把时声。',
          address: '广西壮族自治区 河池市 环江毛南族自治县',
        },
        { symbol: '社才认龙到常四报文方满明重具产深电。', address: '浙江省 衢州市 龙游县' },
        { symbol: '商作系转层出程构认场计山世极算市。', address: '台湾 台中市 丰原区' },
      ],
    });
  },
};
