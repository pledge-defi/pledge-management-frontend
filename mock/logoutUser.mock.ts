// @ts-ignore
import { Request, Response } from 'express';

export default {
  'POST /user/logout': (req: Request, res: Response) => {
    res.status(200).send({ code: 79, message: '连按受列形已族完马眼活手头。' });
  },
};
