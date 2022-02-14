// @ts-ignore
import { Request, Response } from 'express';

export default {
  'POST /pool/setMultiSign': (req: Request, res: Response) => {
    res.status(200).send({ code: 84, message: '此口济难还者非集年日务论同从什年。' });
  },
  'POST /pool/getMultiSign': (req: Request, res: Response) => {
    res.status(200).send({
      code: 88,
      message: '龙即说建很市工可报组把什究群现多。',
      data: {
        chain_id: 'cB3291de-6F6b-7AA2-6231-583AefeCcceC',
        p_name: '石可目传验报较务命共格日。',
        _spToken: '但斗府严断劳很气样林其流须斗分意有得。',
        jp_name: '干须被清林铁角确认目需在入。',
        _jpToken: '九从思权百如得们斯任党合常图能电。',
        sp_address: '斯打须红而原就传口强行拉。',
        jp_address: '农太青持光现分也文设率证好完。',
        spHash: '办百第间江感百二花们力本消革可。',
        jpHash: '应论个重作车利号常使采实水展进先党。',
        multi_sign_account: [null, null, null, null, null, null, null],
      },
    });
  },
};
