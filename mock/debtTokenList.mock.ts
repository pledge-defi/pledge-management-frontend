// @ts-ignore
import { Request, Response } from 'express';

export default {
  'POST /pool/debtTokenList': (req: Request, res: Response) => {
    res.status(200).send({
      code: 96,
      message: '求状回人头边照原报且提到。',
      data: {
        count: 67,
        rows: [
          { symbol: '型各少受效合斯完点东图习。', address: '湖北省 黄冈市 团风县' },
          {
            symbol: '信候体研青于科人下眼京西用性更同音必。',
            address: '新疆维吾尔自治区 博尔塔拉蒙古自治州 博乐市',
          },
          { symbol: '整产易感治精子九只先因信式一特部目。', address: '辽宁省 盘锦市 盘山县' },
          { symbol: '科维速应表及老选回军比做头约除文标。', address: '湖南省 湘潭市 湘乡市' },
        ],
      },
    });
  },
};
