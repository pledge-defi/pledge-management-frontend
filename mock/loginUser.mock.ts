// @ts-ignore
import { Request, Response } from 'express';

export default {
  'POST /user/login': (req: Request, res: Response) => {
    res.status(200).send({ token_id: '5d3cec3D-bB76-3518-0bFd-cFEdA4EDEc79' });
  },
};
