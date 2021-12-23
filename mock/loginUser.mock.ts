// @ts-ignore
import { Request, Response } from 'express';

export default {
  'POST /user/login': (req: Request, res: Response) => {
    res.status(200).send({
      code: 86,
      message: '定传示面市商年山委质很把回低。',
      data: { token_id: '7BDdEf94-2712-3EDC-309D-bA8d653bfEb1' },
    });
  },
};
