// @ts-ignore
import { Request, Response } from 'express';

export default {
  'POST /user/logout': (req: Request, res: Response) => {
    res.status(200).send({ code: 66, message: '次去复节回开号族铁影日打会。' });
  },
};
