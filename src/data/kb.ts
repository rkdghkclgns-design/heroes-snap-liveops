/* ===========================================================
   지식베이스 — monetization glossary (80 terms, 10 categories)
   with definitions, formulas, and industry benchmarks.
   =========================================================== */

export type KbCategory =
  | 'revenue'
  | 'retention'
  | 'segment'
  | 'monetization'
  | 'funnel'
  | 'pricing'
  | 'shop'
  | 'market'
  | 'blueprint'

export interface KbTerm {
  term: string
  ko: string
  cat: KbCategory
  def: string
  formula: string
  low: number
  med: number
  high: number
  unit: string
  tags: string[]
}

export const KB_CATS: [KbCategory | 'all', string][] = [
  ['all', '전체'],
  ['revenue', '매출 지표'],
  ['retention', '리텐션'],
  ['segment', '유저 세분화'],
  ['monetization', '수익화 기법'],
  ['funnel', '퍼널'],
  ['pricing', '가격 전략'],
  ['shop', '캐시샵'],
  ['market', '시장별'],
  ['blueprint', '장르 설계도'],
]

export const KB_CAT_LABEL: Record<KbCategory, string> = {
  revenue: '매출 지표',
  retention: '리텐션',
  segment: '유저 세분화',
  monetization: '수익화 기법',
  funnel: '퍼널',
  pricing: '가격 전략',
  shop: '캐시샵',
  market: '시장별',
  blueprint: '장르 설계도',
}

export const KB_TERMS: KbTerm[] = [
  { term: 'ARPU', ko: '유저당 평균 매출', cat: 'revenue', def: '전체 유저(비과금 포함) 대비 평균 매출. 수익화 효율의 기본 지표. 전환율 × ARPPU로 분해 가능.', formula: '총 매출 / 총 유저 수', low: 0.02, med: 0.08, high: 0.25, unit: '$/일', tags: ['매출', 'KPI', '기본지표'] },
  { term: 'ARPPU', ko: '과금 유저당 평균 매출', cat: 'revenue', def: '결제 유저(PU)만 대상으로 한 평균 매출. 과금 유저의 지출 깊이를 측정. 가격·번들 전략 효과를 반영.', formula: '총 매출 / 과금 유저 수', low: 5, med: 15, high: 45, unit: '$/월', tags: ['매출', '객단가'] },
  { term: 'ARPDAU', ko: 'DAU당 평균 매출', cat: 'revenue', def: '일일 활성 유저 기준 평균 매출. 이벤트·업데이트의 즉각적 매출 영향을 실시간 모니터링.', formula: '일일 매출 / DAU', low: 0.03, med: 0.1, high: 0.35, unit: '$', tags: ['매출', '실시간'] },
  { term: 'LTV', ko: '생애 가치', cat: 'revenue', def: '유저가 생애주기 동안 발생시킬 총 매출 추정치. CPI 대비 비교로 마케팅 ROI 판단. LTV/CPI > 1.5가 손익 기준.', formula: 'ARPDAU × 평균 생애일수', low: 0.5, med: 2.5, high: 10, unit: '$', tags: ['유저가치', 'UA', '마케팅'] },
  { term: 'Conversion Rate', ko: '과금 전환율', cat: 'revenue', def: '전체 유저 중 1회 이상 결제한 유저 비율. 모바일 게임 평균 2~5%. 첫 구매 장벽을 낮추는 스타터 팩이 핵심.', formula: '과금 유저 수 / 총 유저 수', low: 1.0, med: 3.0, high: 8.0, unit: '%', tags: ['전환', 'NPU'] },
  { term: 'RPI', ko: '설치당 매출', cat: 'revenue', def: '설치 1건당 누적 매출. UA 효율과 직결되며 CPI와 비교해 마케팅 손익을 판단.', formula: '총 매출 / 설치 수', low: 0.3, med: 1.2, high: 4.0, unit: '$', tags: ['매출', 'UA'] },
  { term: 'Revenue', ko: '매출', cat: 'revenue', def: '인앱 결제와 광고를 합산한 총 수익. 순매출은 플랫폼 수수료(15~30%) 차감 후 금액.', formula: 'IAP + 광고 매출', low: 0, med: 0, high: 0, unit: '', tags: ['매출'] },
  { term: 'CPI', ko: '설치당 비용', cat: 'revenue', def: '광고로 1명 설치를 유도하는 데 드는 비용. LTV가 CPI를 넘어야 UA가 수익이 됨.', formula: '광고비 / 설치 수', low: 0.5, med: 1.5, high: 4.0, unit: '$', tags: ['마케팅', 'UA'] },
  { term: 'ROAS', ko: '광고비 대비 수익률', cat: 'revenue', def: '광고 지출 대비 매출 비율. D7 ROAS 20% 이상이 지속 가능선, 100%면 본전.', formula: '광고 매출 / 광고비 × 100', low: 20, med: 80, high: 180, unit: '%', tags: ['마케팅', 'ROI'] },
  { term: 'D1 Retention', ko: 'D1 리텐션', cat: 'retention', def: '설치 다음 날 재접속한 유저 비율. 온보딩·첫인상 품질의 핵심 지표. 35% 이상이면 건강한 수준.', formula: 'D1 재방문 유저 / 설치 유저', low: 25, med: 35, high: 48, unit: '%', tags: ['리텐션', '온보딩'] },
  { term: 'D7 Retention', ko: 'D7 리텐션', cat: 'retention', def: '설치 7일째 재접속 비율. 중기 인게이지먼트 지표, 18% 내외가 양호.', formula: 'D7 재방문 / 설치', low: 8, med: 18, high: 28, unit: '%', tags: ['리텐션'] },
  { term: 'D30 Retention', ko: 'D30 리텐션', cat: 'retention', def: '설치 30일째 재접속 비율. 장기 유지·LTV의 핵심, 8% 내외가 양호.', formula: 'D30 재방문 / 설치', low: 3.5, med: 8, high: 15, unit: '%', tags: ['리텐션', 'LTV'] },
  { term: 'Stickiness', ko: '유저 고착율', cat: 'retention', def: '일일 활성 유저를 월간 활성 유저로 나눈 값(DAU/MAU). 유저가 얼마나 자주 돌아오는지를 나타내는 인게이지먼트 지표. 중앙값 15% 기준.', formula: 'DAU / MAU × 100', low: 10, med: 15, high: 25, unit: '%', tags: ['리텐션', '인게이지먼트', 'DAU/MAU'] },
  { term: 'Churn Rate', ko: '이탈률', cat: 'retention', def: '일정 기간 내 접속을 멈춘 유저 비율. 리텐션의 반대 지표로 낮을수록 좋음.', formula: '이탈 유저 / 전체', low: 0, med: 0, high: 0, unit: '', tags: ['리텐션', '이탈'] },
  { term: 'Session Length', ko: '세션 길이', cat: 'retention', def: '1회 접속당 평균 플레이 시간. 콘텐츠 몰입도를 반영.', formula: '총 플레이 / 세션 수', low: 5, med: 15, high: 30, unit: '분', tags: ['인게이지먼트'] },
  { term: 'Session Frequency', ko: '세션 빈도', cat: 'retention', def: '하루 평균 접속 횟수. 방치형은 높고(5~6회) 코어는 낮은(2~3회) 경향.', formula: '일 세션 수 / DAU', low: 2, med: 3.5, high: 6, unit: '회', tags: ['인게이지먼트'] },
  { term: 'DAU', ko: '일일 활성 유저', cat: 'retention', def: '하루 1회 이상 접속한 순 유저 수. 실시간 운영 건강도의 1차 지표.', formula: '일 순 접속 유저', low: 0, med: 0, high: 0, unit: '', tags: ['활성', '실시간'] },
  { term: 'MAU', ko: '월간 활성 유저', cat: 'retention', def: '한 달 1회 이상 접속한 순 유저 수. 매출 모델의 가장 근본 입력값.', formula: '월 순 접속 유저', low: 0, med: 0, high: 0, unit: '', tags: ['활성'] },
  { term: 'Whale', ko: '고래 (고액 과금자)', cat: 'segment', def: '매출의 다수를 차지하는 극소수 초고액 과금 유저. 상위 1%가 매출 40~50% 초과 시 지속성 위험.', formula: '월 $100+ 과금 세그먼트', low: 0, med: 0, high: 0, unit: '', tags: ['세분화', 'VIP'] },
  { term: 'NPU', ko: '무과금 유저', cat: 'segment', def: '결제 이력이 없는 유저. 전체의 95% 이상을 차지하며 광고 매출·바이럴의 핵심 기반.', formula: '비결제 유저', low: 0, med: 0, high: 0, unit: '', tags: ['세분화', '전환'] },
  { term: 'PU', ko: '과금 유저', cat: 'segment', def: '1회 이상 결제한 유저. ARPPU·전환율 분석의 기준 집단.', formula: '결제 유저', low: 0, med: 0, high: 0, unit: '', tags: ['세분화'] },
  { term: 'Minnow', ko: '소과금 유저 (미노우)', cat: 'segment', def: '월 $5 미만 소액 결제층. 패스·소액 딜로 결제 습관을 형성하는 대상.', formula: '월 ~$5 결제', low: 0, med: 0, high: 0, unit: '', tags: ['세분화'] },
  { term: 'Dolphin', ko: '중과금 유저 (돌핀)', cat: 'segment', def: '월 $5~50 결제층. 배틀패스·월정액의 핵심 매출 동력.', formula: '월 $5~50 결제', low: 0, med: 0, high: 0, unit: '', tags: ['세분화'] },
  { term: 'Super Whale', ko: '초고과금 유저 (슈퍼 고래)', cat: 'segment', def: '월 $500 이상 최상위 결제층. 극소수지만 매출 비중이 매우 큼.', formula: '월 $500+ 결제', low: 0, med: 0, high: 0, unit: '', tags: ['세분화', 'VIP'] },
  { term: 'Lapsed Payer', ko: '이탈 과금 유저', cat: 'segment', def: '과거 결제했으나 최근 결제·접속이 끊긴 유저. 복귀 패키지의 타깃.', formula: '과거 PU · 현재 비활성', low: 0, med: 0, high: 0, unit: '', tags: ['세분화', '복귀'] },
  { term: 'First-Time Buyer', ko: '첫 구매 유저', cat: 'segment', def: '생애 첫 결제를 한 유저. 첫 구매 전환은 이후 LTV를 크게 끌어올림.', formula: '최초 결제 유저', low: 0, med: 0, high: 0, unit: '', tags: ['전환', 'NPU'] },
  { term: 'VIP', ko: 'VIP 유저', cat: 'segment', def: '누적 결제·등급 기준 우대 유저. VIP 전용 혜택으로 충성도와 추가 결제를 유도.', formula: '누적 결제 등급', low: 0, med: 0, high: 0, unit: '', tags: ['세분화', 'VIP'] },
  { term: 'Pity System', ko: '천장 시스템', cat: 'monetization', def: 'N회 시도 시 확정 획득을 보장하는 가챠 안전장치. 신뢰 구축·전환 범위 확대. 한·일 시장에서 사실상 필수.', formula: '누적 N회 → 확정 지급', low: 60, med: 80, high: 90, unit: '회', tags: ['가챠', '신뢰'] },
  { term: 'Battle Pass', ko: '배틀패스', cat: 'monetization', def: '시즌제 단계별 보상 트랙. 무료/유료 트랙 분리. 반복 인게이지먼트와 예측 가능한 시즌 매출을 동시 확보.', formula: '시즌 단가 $9.99 내외', low: 5, med: 10, high: 15, unit: '$', tags: ['시즌', '구독형'] },
  { term: 'FOMO', ko: '놓침에 대한 두려움', cat: 'monetization', def: '기간 한정·재고 한정으로 즉시 구매를 유도하는 심리 기법. 한정 배너·카운트다운으로 과금 긴급성 생성.', formula: '한정성 × 시간 압박', low: 0, med: 0, high: 0, unit: '', tags: ['심리', '한정'] },
  { term: 'IAP', ko: '인앱 결제', cat: 'monetization', def: '앱 내 직접 결제. 재화·패키지·구독 등. 플랫폼 수수료 15~30% 차감.', formula: '인앱 직접 결제', low: 0, med: 0, high: 0, unit: '', tags: ['결제'] },
  { term: 'Gacha', ko: '가챠 (뽑기)', cat: 'monetization', def: '확률 기반 아이템 획득. 한국 상위 RPG의 92%가 채택, 천장 시스템과 결합.', formula: '확률 추첨 + 천장', low: 0, med: 0, high: 0, unit: '', tags: ['확률', 'RPG'] },
  { term: 'Subscription', ko: '구독 모델', cat: 'monetization', def: '월정액으로 일일 보상·혜택 제공. 예측 가능한 반복 매출과 리텐션 확보.', formula: '월 $4.99~14.99', low: 5, med: 10, high: 15, unit: '$', tags: ['구독', '반복매출'] },
  { term: 'Rewarded Ad', ko: '보상형 광고', cat: 'monetization', def: '시청 시 보상을 주는 광고. 방치형 핵심 수익원(유저당 평균 70+회 시청).', formula: '시청 × 광고 단가', low: 0, med: 0, high: 0, unit: '', tags: ['광고'] },
  { term: 'Interstitial Ad', ko: '전면 광고', cat: 'monetization', def: '화면 전환 시 노출되는 전면 광고. 빈도 과도 시 리텐션을 해침.', formula: '노출 × 단가', low: 0, med: 0, high: 0, unit: '', tags: ['광고'] },
  { term: 'Energy System', ko: '에너지 시스템', cat: 'monetization', def: '행동력으로 플레이를 제한하고 충전·구매를 유도. 과도하면 초기 이탈 위험.', formula: '행동력 소모/충전', low: 0, med: 0, high: 0, unit: '', tags: ['페이싱'] },
  { term: 'Piggy Bank', ko: '돼지 저금통', cat: 'monetization', def: '플레이로 재화가 쌓이고 결제 시 일괄 수령. 누적 가치로 첫 결제를 유도.', formula: '누적 적립 → 결제 해제', low: 0, med: 0, high: 0, unit: '', tags: ['전환'] },
  { term: 'Growth Fund', ko: '성장 펀드', cat: 'monetization', def: '선결제 후 레벨 달성마다 보상을 분할 지급. 장기 접속·LTV를 끌어올림.', formula: '선결제 + 단계 보상', low: 0, med: 0, high: 0, unit: '', tags: ['성장', 'LTV'] },
  { term: 'Hybrid Monetization', ko: '하이브리드 수익화', cat: 'monetization', def: 'IAP와 광고를 결합한 모델. 비결제층은 광고로, 결제층은 IAP로 수익화.', formula: 'IAP + 광고', low: 0, med: 0, high: 0, unit: '', tags: ['모델'] },
  { term: 'Awareness', ko: '인지 단계', cat: 'funnel', def: '잠재 유저가 게임을 인지하는 단계. UA·바이럴·스토어 추천이 핵심.', formula: '노출·CTR·CPI', low: 0, med: 0, high: 0, unit: '', tags: ['퍼널', 'UA'] },
  { term: 'Install', ko: '설치 단계', cat: 'funnel', def: '스토어에서 앱을 설치하는 단계. 스토어 페이지 전환율이 좌우.', formula: '설치 / 페이지 방문', low: 0, med: 0, high: 0, unit: '', tags: ['퍼널'] },
  { term: 'Tutorial Completion', ko: '튜토리얼 완료', cat: 'funnel', def: '튜토리얼을 끝내고 코어 루프에 진입. 3~5분·첫 성공 경험이 완료율을 결정.', formula: '완료 / 시작', low: 60, med: 80, high: 92, unit: '%', tags: ['퍼널', '온보딩'] },
  { term: 'First Session', ko: '첫 세션', cat: 'funnel', def: '설치 후 첫 실행. 로딩·첫인상·온보딩 UX가 D1 리텐션을 좌우.', formula: '첫 실행 경험', low: 0, med: 0, high: 0, unit: '', tags: ['퍼널'] },
  { term: 'Retention Stage', ko: '리텐션 정착 단계', cat: 'funnel', def: '코어 루프에 익숙해져 습관적으로 복귀하는 단계. 일일 보상·미션이 핵심.', formula: 'D1~D7 정착', low: 0, med: 0, high: 0, unit: '', tags: ['퍼널', '리텐션'] },
  { term: 'Whale Stage', ko: '고래 단계', cat: 'funnel', def: '고과금으로 전환되는 단계. 경쟁·한정 콘텐츠로 상위 결제를 유도.', formula: '고액 결제 전환', low: 0, med: 0, high: 0, unit: '', tags: ['퍼널', 'VIP'] },
  { term: 'FTUE', ko: '최초 유저 경험', cat: 'funnel', def: '설치 직후 첫 경험 전체(First Time User Experience). 초기 이탈을 좌우.', formula: '온보딩 흐름', low: 0, med: 0, high: 0, unit: '', tags: ['퍼널', '온보딩'] },
  { term: 'Price Anchoring', ko: '가격 앵커링', cat: 'pricing', def: '고가 상품을 먼저 보여 다른 상품을 저렴하게 느끼게 하는 기법. 가치 비교 표시가 핵심.', formula: '기준가 대비 체감', low: 0, med: 0, high: 0, unit: '', tags: ['심리', '가격'] },
  { term: 'Bundle Strategy', ko: '번들 전략', cat: 'pricing', def: '여러 아이템을 묶어 개별 합보다 싸게 제공. 객단가와 체감 가치를 동시에 높임.', formula: '묶음 < 개별 합', low: 0, med: 0, high: 0, unit: '', tags: ['가격', '번들'] },
  { term: 'Dynamic Pricing', ko: '동적 가격 책정', cat: 'pricing', def: '유저 행동·세그먼트별로 가격·오퍼를 맞춤 제시. 전환율을 개인화로 극대화.', formula: '세그먼트별 가격', low: 0, med: 0, high: 0, unit: '', tags: ['가격', '개인화'] },
  { term: 'Flash Sale', ko: '한정 시간 세일', cat: 'pricing', def: '짧은 기간 한정 할인으로 즉시 구매를 유도. FOMO를 활용한 매출 피크 생성.', formula: '기간 한정 할인', low: 0, med: 0, high: 0, unit: '', tags: ['가격', '한정'] },
  { term: 'Content Gating', ko: '콘텐츠 게이팅', cat: 'pricing', def: '특정 콘텐츠를 결제·진척으로 잠금. 페이월 강도 조절이 리텐션과 직결.', formula: '잠금 → 해제 조건', low: 0, med: 0, high: 0, unit: '', tags: ['가격', '페이월'] },
  { term: 'First Purchase Discount', ko: '첫 구매 할인', cat: 'pricing', def: '생애 첫 결제에 큰 혜택을 제공해 결제 장벽을 낮춤. 가장 효과적인 전환 도구.', formula: '첫 결제 한정 혜택', low: 0, med: 0, high: 0, unit: '', tags: ['전환', '가격'] },
  { term: 'Hard Currency', ko: '유료 재화', cat: 'shop', def: '주로 결제로 획득하는 프리미엄 재화(다이아·보석). 경제 균형의 핵심.', formula: '결제 기반 재화', low: 0, med: 0, high: 0, unit: '', tags: ['재화'] },
  { term: 'Soft Currency', ko: '무료 재화', cat: 'shop', def: '플레이로 획득하는 기본 재화(골드). 성장 페이싱과 싱크(소모) 설계가 중요.', formula: '플레이 기반 재화', low: 0, med: 0, high: 0, unit: '', tags: ['재화'] },
  { term: 'Consumable', ko: '소모성 아이템', cat: 'shop', def: '사용 시 소진되는 아이템(물약·부스트). 반복 구매를 유도.', formula: '사용 → 소진', low: 0, med: 0, high: 0, unit: '', tags: ['상품'] },
  { term: 'Durable', ko: '영구 아이템', cat: 'shop', def: '한 번 구매로 영구 보유하는 아이템(캐릭터·장비). 1회성 큰 결제를 유도.', formula: '영구 보유', low: 0, med: 0, high: 0, unit: '', tags: ['상품'] },
  { term: 'Cosmetic', ko: '코스메틱', cat: 'shop', def: '전투력과 무관한 외형 아이템(스킨). P2W 논란 없이 매출을 올리는 수단.', formula: '외형 전용', low: 0, med: 0, high: 0, unit: '', tags: ['상품', '스킨'] },
  { term: 'Functional Item', ko: '기능성 아이템', cat: 'shop', def: '성능·진척에 영향을 주는 아이템. 밸런스·P2W 수위 관리가 필요.', formula: '성능 영향', low: 0, med: 0, high: 0, unit: '', tags: ['상품', '밸런스'] },
  { term: 'Shop Rotation', ko: '상점 로테이션', cat: 'shop', def: '주기적으로 상품을 교체 노출. 신선도와 재방문, 한정성을 유지.', formula: '주기적 상품 교체', low: 0, med: 0, high: 0, unit: '', tags: ['상점', '한정'] },
  { term: 'Currency Pack', ko: '재화 팩', cat: 'shop', def: '유료 재화를 묶음으로 판매. 대용량일수록 보너스를 늘려 객단가를 높임.', formula: '재화 묶음 판매', low: 0, med: 0, high: 0, unit: '', tags: ['상품', '재화'] },
  { term: 'Limited Offer', ko: '한정 오퍼', cat: 'shop', def: '기간·횟수 한정 특가 패키지. 팝업으로 노출해 즉시 전환을 유도.', formula: '한정 패키지', low: 0, med: 0, high: 0, unit: '', tags: ['상품', '한정'] },
  { term: 'Season Pass', ko: '시즌 패스', cat: 'shop', def: '시즌 단위 보상 트랙 상품. 시즌 기간 동안 반복 접속·결제를 유도.', formula: '시즌 단가 $12 내외', low: 8, med: 12, high: 20, unit: '$', tags: ['시즌', '패스'] },
  { term: 'Korean Market', ko: '한국 시장', cat: 'market', def: '경쟁 랭킹·길드·강화 중심, 높은 ARPPU. 첫 결제 시점이 늦은(D5~14) 패턴.', formula: '경쟁·강화 BM', low: 0, med: 0, high: 0, unit: '', tags: ['시장', 'KR'] },
  { term: 'Chinese Market', ko: '중국 시장', cat: 'market', def: '확률 공시 규제·서버 경쟁 모델 표준. 질 중심으로 전환 중.', formula: '서버 경쟁 BM', low: 0, med: 0, high: 0, unit: '', tags: ['시장', 'CN'] },
  { term: 'Japanese Market', ko: '일본 시장', cat: 'market', def: '글로벌 최고 수준 ARPU. 가챠 문화·스토리·캐릭터 IP가 핵심 과금 동력.', formula: '가챠·IP BM', low: 0, med: 0, high: 0, unit: '', tags: ['시장', 'JP'] },
  { term: 'VIP System (CN)', ko: 'VIP 시스템 (중국형)', cat: 'market', def: '누적 결제 등급별 혜택을 노골적으로 제공. 고래 과금을 가속.', formula: '누적 결제 등급', low: 0, med: 0, high: 0, unit: '', tags: ['시장', 'VIP'] },
  { term: 'Enhancement System (KR)', ko: '강화 시스템 (한국형)', cat: 'market', def: '확률적 장비 강화(+1~+15)와 실패. 보호권 등 프리미엄 IAP의 핵심.', formula: '확률 강화 + 보호권', low: 0, med: 0, high: 0, unit: '', tags: ['시장', '강화'] },
  { term: 'Gacha (JP)', ko: '가챠 (일본형)', cat: 'market', def: '넉넉한 천장과 픽업 보장 기대가 표준. 신뢰가 곧 매출로 연결.', formula: '천장 + 픽업', low: 0, med: 0, high: 0, unit: '', tags: ['시장', '가챠'] },
  { term: 'RPG', ko: 'RPG 설계도', cat: 'blueprint', def: '가챠 30%·재화 20%·배틀패스 15% 믹스. 천장 가챠+한정 배너+월정액이 핵심. 매출의 60%+가 라이브옵스에서 발생.', formula: 'ARPU 중앙값 $6.5/월', low: 1.5, med: 6.5, high: 15, unit: '$/월', tags: ['장르', '가챠'] },
  { term: 'MMORPG', ko: 'MMORPG 설계도', cat: 'blueprint', def: '장비 가챠 25%·재화 20%·구독 15%. 서버 경쟁·길드·강화가 과금 엔진. 고래 의존 높음.', formula: 'ARPU 중앙값 $10/월', low: 3, med: 10, high: 25, unit: '$/월', tags: ['장르', '경쟁'] },
  { term: '방치형 / Idle', ko: '방치형 설계도', cat: 'blueprint', def: '보상형 광고 35%·재화 18% 믹스. 광고 우선(60~70%)+맥락형 IAP+오프라인 진행 후킹.', formula: 'ARPU 중앙값 $0.8/월', low: 0.2, med: 0.8, high: 2.5, unit: '$/월', tags: ['장르', '광고'] },
  { term: '퍼즐 / Puzzle', ko: '퍼즐 설계도', cat: 'blueprint', def: '생명(에너지) 충전·부스터·코인 팩 중심. 광고 하이브리드. 난이도 게이트로 결제를 유도.', formula: 'ARPU 중앙값 $1.5/월', low: 0.3, med: 1.5, high: 5, unit: '$/월', tags: ['장르', '캐주얼'] },
  { term: '전략 / Strategy', ko: '전략 설계도', cat: 'blueprint', def: '건설 가속·자원 팩·실드·연맹 BM. 4X/SLG는 ARPPU가 매우 높고 고래 비중이 큼.', formula: 'ARPU 중앙값 $8/월', low: 2, med: 8, high: 22, unit: '$/월', tags: ['장르', 'SLG'] },
  { term: '캐주얼 / Casual', ko: '캐주얼 설계도', cat: 'blueprint', def: '광고 중심 + 소액 IAP·광고 제거. 짧은 세션·넓은 유저층, 인당 과금은 낮음.', formula: 'ARPU 중앙값 $0.5/월', low: 0.1, med: 0.5, high: 2, unit: '$/월', tags: ['장르', '광고'] },
  { term: '시뮬레이션 / Simulation', ko: '시뮬레이션 설계도', cat: 'blueprint', def: '꾸미기·가속·시즌 콘텐츠 BM. 코스메틱과 수집 욕구를 활용한 장기 과금.', formula: 'ARPU 중앙값 $2/월', low: 0.5, med: 2, high: 7, unit: '$/월', tags: ['장르', '코스메틱'] },
  { term: '액션 / Action', ko: '액션 설계도', cat: 'blueprint', def: '캐릭터·스킨 가챠 + 배틀패스. 실력 기반이라 P2W 수위 관리가 중요.', formula: 'ARPU 중앙값 $3/월', low: 0.8, med: 3, high: 9, unit: '$/월', tags: ['장르', '스킨'] },
  { term: '슈팅 / Shooter', ko: '슈팅 설계도', cat: 'blueprint', def: '배틀패스·스킨·무기 코스메틱 중심. 경쟁 무결성을 위해 비P2W 코스메틱이 표준.', formula: 'ARPU 중앙값 $4/월', low: 1, med: 4, high: 12, unit: '$/월', tags: ['장르', '배틀패스'] },
  { term: 'MOBA', ko: 'MOBA 설계도', cat: 'blueprint', def: '챔피언·스킨 코스메틱 중심, 공정성 우선. 넓은 유저층 기반 코스메틱 매출.', formula: 'ARPU 중앙값 $2.5/월', low: 0.6, med: 2.5, high: 8, unit: '$/월', tags: ['장르', '코스메틱'] },
  { term: '카드 / 보드', ko: '카드·보드 설계도', cat: 'blueprint', def: '카드팩(확률)·시즌 패스·코스메틱. 메타 밸런스와 신규 카드 출시 주기가 매출을 좌우.', formula: 'ARPU 중앙값 $5/월', low: 1, med: 5, high: 16, unit: '$/월', tags: ['장르', '카드팩'] },
  { term: '스포츠 / 레이싱', ko: '스포츠·레이싱 설계도', cat: 'blueprint', def: '선수팩 가챠·시즌 업데이트·라이선스 IP. 실제 시즌과 연동한 라이브옵스가 핵심.', formula: 'ARPU 중앙값 $3.5/월', low: 0.8, med: 3.5, high: 11, unit: '$/월', tags: ['장르', 'IP'] },
]
