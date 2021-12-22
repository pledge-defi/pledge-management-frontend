// @ts-ignore
import { Request, Response } from 'express';

export default {
  'POST /pool/debtTokenList': (req: Request, res: Response) => {
    res.status(200).send({
      code: 72,
      message: '压生区火再约效接音水者目。',
      data: {
        count: 75,
        rows: [
          { symbol: '难很里养工院达小千名议越识热半。', address: '河南省 濮阳市 范县' },
          { symbol: '现北可音间商万史验论却认感。', address: '青海省 海北藏族自治州 海晏县' },
          { symbol: '但系成间始传音保响马属解及文价革第。', address: '甘肃省 白银市 靖远县' },
        ],
      },
    });
  },
};
