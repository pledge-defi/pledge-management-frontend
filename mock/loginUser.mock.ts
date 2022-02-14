// @ts-ignore
import { Request, Response } from 'express';

export default {
  'POST /user/login': (req: Request, res: Response) => {
    res.status(200).send({
      code: 96,
      message: '通商听以我证须极物声海十备采值。',
      data: { token_id: '8eEed41c-3eC9-FBd5-A9A0-665dDd5BBf89' },
    });
  },
};
