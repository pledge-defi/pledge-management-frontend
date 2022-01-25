// @ts-ignore
import { Request, Response } from 'express';

export default {
  'POST /user/login': (req: Request, res: Response) => {
    res.status(200).send({
      code: 70,
      message: '龙入法众又今花例华对圆事物确得利族。',
      data: { token_id: 'Bd0b6489-0C9F-9E3B-A25d-C24eC0F4943E' },
    });
  },
};
