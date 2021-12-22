// @ts-ignore
import { Request, Response } from 'express';

export default {
  'POST /pool/debtTokenList': (req: Request, res: Response) => {
    res.status(200).send({
      code: 94,
      message: '近其展单引采你之行却量华问。',
      data: {
        count: 73,
        rows: [
          { symbol: '置专社究节当与过化样件将集。', address: '河南省 开封市 开封县' },
          { symbol: '断把却有交毛广调开位们比争意革制易。', address: '安徽省 淮北市 烈山区' },
          { symbol: '共低种方里想连了却单角王府二了研。', address: '安徽省 巢湖市 和县' },
          { symbol: '压路气民速现格府实使力于品属养。', address: '吉林省 长春市 其它区' },
          { symbol: '相须型院和便型然支或存上色理近。', address: '西藏自治区 日喀则地区 聂拉木县' },
          { symbol: '是容变构相酸当时位细了只率业除给。', address: '山西省 吕梁市 其它区' },
          { symbol: '强应进三研活美方权件低们称动教连。', address: '山西省 晋城市 阳城县' },
          { symbol: '则真走办命规用也战出被量学军积者清。', address: '福建省 龙岩市 上杭县' },
          { symbol: '山查是构业们与身实证取团。', address: '云南省 怒江傈僳族自治州 泸水县' },
          { symbol: '事处利厂入些即直共圆业命。', address: '云南省 昭通市 大关县' },
          { symbol: '省况说着光影合式打表解而不通其阶斗化。', address: '江苏省 无锡市 江阴市' },
          { symbol: '局精何亲引何里容也很习百人又石把。', address: '陕西省 铜川市 宜君县' },
          { symbol: '又难被达头低业气东数变类政铁分类。', address: '天津 天津市 河东区' },
        ],
      },
    });
  },
};
