// @ts-ignore
import { Request, Response } from 'express';

export default {
  'POST /user/login': (req: Request, res: Response) => {
    res.status(200).send({ token_id: '4FD48419-93fe-eDAd-3857-f5B96B1C1Ab7' });
  },
};
