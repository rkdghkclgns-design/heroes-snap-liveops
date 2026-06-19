/* ===========================================================
   상점 / 패키지 — shop packages with forced-sales control.
   =========================================================== */

export interface ShopPackage {
  id: string
  name: string
  price: number
  tag: string
  tagBg: string
  tagCol: string
  contents: string
  sales: number
  /** 0 = 무제한, else 한정 수량. */
  cap: number
  active: boolean
}

export const INITIAL_SHOP: ShopPackage[] = [
  { id: 'p1', name: '신규 성장 패키지', price: 9900, tag: 'BEST', tagBg: '#FDF3E1', tagCol: '#E8920C', contents: '다이아 1,200 · 소환권 10 · 골드 100만', sales: 8420, cap: 0, active: true },
  { id: 'p2', name: '주간 가성비 상자', price: 4400, tag: '인기', tagBg: '#EFEBFF', tagCol: '#6C4DF6', contents: '다이아 440 · 강화석 50', sales: 12900, cap: 0, active: true },
  { id: 'p3', name: '월간 다이아 패스', price: 14900, tag: '구독', tagBg: '#E8F1FE', tagCol: '#2563EB', contents: '매일 다이아 100 × 30일', sales: 6210, cap: 0, active: true },
  { id: 'p4', name: '한정 영웅 픽업 팩', price: 49000, tag: '한정', tagBg: '#FDECEC', tagCol: '#E5484D', contents: '픽업 확정 소환권 1 · 다이아 2,000', sales: 980, cap: 5000, active: false },
  { id: 'p5', name: '강화 지원 패키지', price: 19900, tag: 'NEW', tagBg: '#E6F7EE', tagCol: '#15A35B', contents: '강화석 300 · 유물상자 10', sales: 3140, cap: 0, active: true },
  { id: 'p6', name: '다이아 대용량', price: 99000, tag: '', tagBg: '', tagCol: '', contents: '다이아 12,000 (+30% 보너스)', sales: 1520, cap: 0, active: true },
]
