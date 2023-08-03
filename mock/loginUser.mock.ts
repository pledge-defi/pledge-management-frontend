// @ts-ignore
import { Request, Response } from 'express';

export default {
  'POST /user/login': (req: Request, res: Response) => {
    res.status(200).send({
      code: 94,
      message: '还路重系题空是光安界热却按常马。',
      data: { token_id: '48B901DE-9fb7-fDD1-7670-dAF8ea62Eb5F' },
    });
  },
};
