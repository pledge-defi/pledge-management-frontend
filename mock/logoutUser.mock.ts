// @ts-ignore
import { Request, Response } from 'express';

export default {
  'POST /user/logout': (req: Request, res: Response) => {
    res.status(200).send({ code: 90, message: '年年以形各住打积马切着斗存需。' });
  },
};
