// @ts-ignore
import { Request, Response } from 'express';

export default {
  'POST /user/logout': (req: Request, res: Response) => {
    res.status(200).send({});
  },
};
