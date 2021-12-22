// @ts-ignore
import { Request, Response } from 'express';

export default {
  'POST /user/login': (req: Request, res: Response) => {
    res.status(200).send({ token_id: '4bEEca15-A8EE-D16a-6F84-F09Be26294cB' });
  },
};
