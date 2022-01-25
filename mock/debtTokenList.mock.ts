// @ts-ignore
import { Request, Response } from 'express';

export default {
  'POST /pool/debtTokenList': (req: Request, res: Response) => {
    res.status(200).send({
      code: 85,
      message: '大美来强当消受派门周易美备米。',
      data: {
        count: 94,
        rows: [
          { symbol: '传确市往我心何就克受且已国约。', address: '山东省 威海市 乳山市' },
          {
            symbol: '研按除使那出问强之成青府美素。',
            address: '新疆维吾尔自治区 喀什地区 麦盖提县',
          },
          { symbol: '包片原连算上常以很类标集治。', address: '海外 海外 -' },
          { symbol: '广加统活者往情话为百引做。', address: '湖南省 益阳市 桃江县' },
        ],
      },
    });
  },
};
