// @ts-ignore
import { Request, Response } from 'express';

export default {
  'POST /user/login': (req: Request, res: Response) => {
    res.status(200).send({
      code: 82,
      message: '划真具眼光形保别战白器新之思程。',
      data: { token_id: '281A1D14-DbE4-E1BA-4A61-f8EbbEBc0c98' },
    });
  },
};
