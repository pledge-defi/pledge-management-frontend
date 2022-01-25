// @ts-ignore
import { Request, Response } from 'express';

export default {
  'POST /user/logout': (req: Request, res: Response) => {
    res.status(200).send({ code: 72, message: '打我万百包而公飞目条万火按。' });
  },
};
