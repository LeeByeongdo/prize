import { atom } from "recoil";

export const prizes = [
  {
    name: "아이맥",
    img: "https://www.apple.com/v/imac-24/e/images/overview/color_front_green__eb8qbnemmre6_large.jpg",
    amount: 1
  },
  {
    name: "아이패드 프로 11인치",
    img: "https://www.apple.com/kr/ipad-pro/al/images/overview/keyboard-pencil/accessories_1__f688jyg47vm2_large.png",
    amount: 1
  },
  {
    name: "에어팟 맥스",
    img: "https://www.apple.com/v/airpods-max/e/images/overview/hero__gnfk5g59t0qe_xlarge.png",
    amount: 1
  },
  {
    name: "애플워치 8",
    img: "https://www.apple.com/kr/apple-watch-series-8/b/images/overview/health/health_hero__dvilvmsurp26_large.jpg",
    amount: 2
  },
  {
    name: "애플워치 SE",
    img: "https://www.apple.com/kr/apple-watch-se/j/images/overview/swim/swim__ddzj93lmlrcm_large.jpg",
    amount: 2
  },
  {
    name: "다이슨 에어랩",
    img: "https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/leap-petite-global/dynamic-media/personal-care/308c/lifestyle/400720-01.jpg?$responsive$&cropPathE=desktop&fit=stretch,1&wid=576",
    amount: 1
  },
  {
    name: "Cherry 키보드",
    img: "https://www.cherry.kr/media/catalog/product/cache/bdaa8dd0c1e9fa34d65dc722722aba34/g/8/g80-3836-2_aufs_eu_75462__de_de.jpg",
    amount: 5
  },
  {
    name: "시타 - 베스트 화장품",
    img: "https://siitatr1563.cdn-nhncommerce.com/data/goods/22/12/50/1000000046/1000000046_detail_092.jpg",
    amount: 5
  },
  {
    name: "러시 - 더티보디스프레이",
    img: "https://www.lush.co.kr/upload/item/246/20220926132010L.png",
    amount: 5
  },
  {
    name: "이솝 - 핸드워시",
    img: "https://www.aesop.com/u1nb1km7t5q7/51ZCmlHyLQ4wRwef2i14DM/5edaabc31618bccf83bae76398354db7/Aesop_Hand_Resurrection_Aromatique_Hand_Wash_Refill_500mL_B500BT13RFS_Web_Large_888x1100px.png",
    amount: 5
  },
  {
    name: "위글위글 - 노트북 가방",
    img: "https://wiggle-wiggle.com/web/product/big/202212/d1b08e5974e78c071dedbe551114fe04.jpg",
    amount: 5
  },
  {
    name: "희녹 - 탈취제",
    img: "https://hinok.life/web/product/medium/202211/ac924c28a45ca46cea3fc8cf48571461.jpg",
    amount: 5
  },
  {
    name: "샤넬 - 크림",
    img: "https://www.chanel.com/images//t_one//w_0.43,h_0.43,c_crop/q_auto:good,f_auto,fl_lossy,dpr_1.2/w_1240/la-creme-main-nourish-soften-brighten-1-7fl-oz--packshot-default-140350-8810632282142.jpg",
    amount: 5
  },
  {
    name: "동구밭 - 설거지워싱바",
    img: "https://cdn-pro-web-241-113-godomall.spdycdn.net/donggubat1_godomall_com/data/goods/21/10/41/1000000098/1000000098_detail_062.png",
    amount: 13
  },
  {
    name: "안타티카 롱",
    img: "https://images.kolonmall.com/Prod_Img/KS/2022/LM1/JWJDW22227BLK_LM1.jpg",
    amount: 1
  },
  {
    name: "안타티카 숏",
    img: "https://images.kolonmall.com/Prod_Img/KS/2022/LM1/JWJDW22221DSE_LM1.jpg",
    amount: 2
  },
];

const initData = () => {
  const cards = localStorage.getItem('cards');

  if (cards) {
    return JSON.parse(cards);
  }

  return createDefault();
}


export const createDefault = () => {
  const result = [];
  let id_factory = 1;
  prizes.forEach(p => {
    for (let i = 0; i < p.amount; i++) {
      result.push({
        ...p,
        id: id_factory++
      });
    }
  });

  return result;
}

export const cardsAtom = atom({
  key: "cards",
  default: initData(),
});

export const spotlightAtom = atom({
  key: "spotlight",
  default: 0,
});
