// @ts-ignore
import { Request, Response } from 'express';

export default {
  'POST /user/login': (req: Request, res: Response) => {
    res.status(200).send({ token_id: '75C4dCbc-9Eb4-6CCB-96A8-BDb7e93F4833' });
  },
};
