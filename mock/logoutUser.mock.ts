// @ts-ignore
import { Request, Response } from 'express';

export default {
  'POST /user/logout': (req: Request, res: Response) => {
    res.status(200).send({ code: 92, message: '至方料月酸少矿前与会果持上速。' });
  },
};
