// @ts-ignore
import { Request, Response } from 'express';

export default {
  'POST /user/login': (req: Request, res: Response) => {
    res.status(200).send({
      code: 89,
      message: '县二管青便心标安世管九二式权。',
      data: { token_id: '14b7b8bA-3D73-BCBa-B6A0-F18DCC19FFEa' },
    });
  },
};
