// @ts-ignore
import { Request, Response } from 'express';

export default {
  'POST /pool/debtTokenList': (req: Request, res: Response) => {
    res.status(200).send({
      code: 64,
      message: '门于划儿下需育来品物导社话。',
      data: [
        {
          symbol: '其真起件我音通极需类业干全构界。',
          token: '百教容飞片利规做为化样验好样近。',
          chain_id: 98,
        },
        {
          symbol: '已象用较达容你数党半太义周。',
          token: '数证常各容建头提间作身西据总完划。',
          chain_id: 84,
        },
        {
          symbol: '候青相设流严引划阶除先学工且目革这。',
          token: '适问天风发按眼将第主位为派候新组。',
          chain_id: 92,
        },
        {
          symbol: '就须量门现机低管准治看片团律第。',
          token: '王图劳口个是构则位问务样为存保。',
          chain_id: 78,
        },
        {
          symbol: '存美元期离重中论见组了其适更看圆价。',
          token: '当式统军和作装商同定心器金流技识。',
          chain_id: 64,
        },
        {
          symbol: '道被众向响用识然际常个议子应广但万四。',
          token: '青发识习律大路由说亲省引生。',
          chain_id: 76,
        },
      ],
    });
  },
};
