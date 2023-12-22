import { atom } from "recoil";

export const prizes = [
  {
    name: "아이맥",
    img: "https://www.apple.com/v/imac/p/images/overview/color_front_purple__bxvrajaaheeu_medium_2x.jpg",
    amount: 1,
  },
  {
    name: "아이패드 프로 11인치",
    img: "https://www.apple.com/v/ipad/home/ch/images/overview/compare_ipad_pro__erf9x8mw04sy_large_2x.png",
    amount: 1,
  },
  {
    name: "다이슨 에어랩",
    img: "https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/leap-petite-global/dynamic-media/personal-care/618/primary/AW_PDP_BLKGLD.png?scl=1&fmt=png-alpha",
    amount: 1,
  },
  {
    name: "애플워치 9",
    img: "https://www.apple.com/kr/apple-watch-series-9/b/images/watch-shared-compare/compare_s9__gihaivdnzdme_large_2x.jpg",
    amount: 2,
  },
  {
    name: "키보드 ~20만원",
    img: "https://leopoldadmin01.cafe24.com/web/upload/NNEditor/20230825/b86d3bf4b0b3752af92c217959bffea6.jpg",
    amount: 2,
  },
  {
    name: "트랙패드",
    img: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MK2D3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1626390718000",
    amount: 3,
  },
  {
    name: "배민 5만원 상품권",
    img: "https://biz.giftishow.com/Resource/goods/2023/G00002331009/G00002331009.jpg",
    amount: 10,
  },
  {
    name: "고라파덕",
    img: "http://thumbnail.10x10.co.kr/webimage/image/basic600/479/B004798374.jpg?cmd=thumb&w=500&h=500&fit=true&ws=false",
    amount: 60,
  },
];

const initData = () => {
  const cards = localStorage.getItem("cards");

  if (cards) {
    return JSON.parse(cards);
  }

  return createDefault();
};

export const createDefault = () => {
  const result = [];
  let id_factory = 1;
  prizes.forEach((p) => {
    for (let i = 0; i < p.amount; i++) {
      result.push({
        ...p,
        id: id_factory++,
      });
    }
  });

  return result;
};

export const cardsAtom = atom({
  key: "cards",
  default: initData(),
});

export const spotlightAtom = atom({
  key: "spotlight",
  default: 0,
});
