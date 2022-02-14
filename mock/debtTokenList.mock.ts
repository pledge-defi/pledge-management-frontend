// @ts-ignore
import { Request, Response } from 'express';

export default {
  'POST /pool/debtTokenList': (req: Request, res: Response) => {
    res.status(200).send({
      code: 80,
      message: '证什群传题值海被江今许建整点民员查号。',
      data: {
        count: 65,
        rows: [
          { symbol: '众然状较性万受现品手确斯效证。', address: '福建省 莆田市 仙游县' },
          { symbol: '比重意当年论般验看头满老保样平。', address: '吉林省 松原市 乾安县' },
          { symbol: '立度层第外流平难问走可不建。', address: '澳门特别行政区 澳门半岛 -' },
          {
            symbol: '总人数存你题己反区备发走济见业权来。',
            address: '广西壮族自治区 贺州市 其它区',
          },
          { symbol: '其教民受结加来受何备铁被边眼量。', address: '湖北省 荆门市 东宝区' },
          { symbol: '线已其见马放出议干议高集及活联战。', address: '吉林省 吉林市 桦甸市' },
          { symbol: '状水风专成用件就此江共作是。', address: '青海省 玉树藏族自治州 其它区' },
          { symbol: '结军生局出算水切话平名布知据精。', address: '青海省 黄南藏族自治州 同仁县' },
          { symbol: '且科安思火验交但们治学段住产圆意老。', address: '河北省 秦皇岛市 卢龙县' },
          { symbol: '则人务般而温自政意打在人何志增。', address: '甘肃省 平凉市 华亭县' },
          { symbol: '带感类处革度确写法这劳千结也使。', address: '青海省 玉树藏族自治州 曲麻莱县' },
          { symbol: '将强都张千结光相能王导金记手。', address: '山东省 滨州市 无棣县' },
          { symbol: '清外厂族花量步单第维深场主证。', address: '内蒙古自治区 包头市 白云鄂博矿区' },
        ],
      },
    });
  },
};
