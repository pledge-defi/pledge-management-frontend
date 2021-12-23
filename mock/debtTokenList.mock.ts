// @ts-ignore
import { Request, Response } from 'express';

export default {
  'POST /pool/debtTokenList': (req: Request, res: Response) => {
    res.status(200).send({
      code: 61,
      message: '较历东西局意经较头红型事产。',
      data: {
        count: 63,
        rows: [
          { symbol: '声此声时问准组构维到济织社被报然除养。', address: '山东省 烟台市 莱阳市' },
          { symbol: '解率义无住命立京决全志题最江离部。', address: '福建省 龙岩市 永定县' },
        ],
      },
    });
  },
};
