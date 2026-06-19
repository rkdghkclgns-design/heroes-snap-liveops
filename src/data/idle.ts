/* ===========================================================
   일차 · 누적 보상 (idle / 방치 보상) tiers.
   =========================================================== */

export interface IdleTier {
  key: string
  name: string
  rate: string
  col: string
  bg: string
  g: string
}

export const IDLE_TIERS: IdleTier[] = [
  { key: 'gold', name: '골드', rate: '2,000 / 분', col: '#E8920C', bg: '#FDF3E1', g: 'G' },
  { key: 'dia', name: '다이아', rate: '1 / 30분', col: '#14A6C4', bg: '#E2F6FA', g: 'D' },
  { key: 'stone', name: '강화석 (유닛 정수)', rate: '1 / 10분', col: '#15A35B', bg: '#E6F7EE', g: 'S' },
  { key: 'relic', name: '유물 상자', rate: '4시간마다 1개', col: '#2D7FF9', bg: '#E8F1FE', g: 'R' },
]

export const IDLE_DEFAULT_HOURS = 12
