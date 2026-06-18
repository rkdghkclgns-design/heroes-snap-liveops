export type BannerKey = 'pickup' | 'unit' | 'mix'

export interface RateRow {
  rar: string
  rate: string
  col: string
}

export interface BannerConf {
  label: string
  rows: RateRow[]
}

/** Per-banner rate tables (pity / soft / pickup come from store state). */
export const GACHA_CONF: Record<BannerKey, BannerConf> = {
  pickup: {
    label: '캐릭터 픽업',
    rows: [
      { rar: 'SSR 픽업', rate: '0.700%', col: '#E8920C' },
      { rar: 'SSR', rate: '2.300%', col: '#E8920C' },
      { rar: 'SR', rate: '12.000%', col: '#9333EA' },
      { rar: 'R', rate: '85.000%', col: '#2D7FF9' },
    ],
  },
  unit: {
    label: '유닛 소환',
    rows: [
      { rar: 'SSR', rate: '3.000%', col: '#E8920C' },
      { rar: 'SR', rate: '15.000%', col: '#9333EA' },
      { rar: 'R', rate: '50.000%', col: '#2D7FF9' },
      { rar: 'N', rate: '32.000%', col: '#94A0B2' },
    ],
  },
  mix: {
    label: '통합 소환',
    rows: [
      { rar: 'SSR (캐릭터+유닛)', rate: '2.800%', col: '#E8920C' },
      { rar: 'SR', rate: '13.500%', col: '#9333EA' },
      { rar: 'R', rate: '83.700%', col: '#2D7FF9' },
    ],
  },
}

export const BANNER_ORDER: BannerKey[] = ['pickup', 'unit', 'mix']

export const DEFAULT_PITY: Record<BannerKey, number> = { pickup: 90, unit: 60, mix: 100 }
export const DEFAULT_SOFT: Record<BannerKey, number> = { pickup: 75, unit: 50, mix: 80 }
export const DEFAULT_PICKUP: Record<BannerKey, string> = {
  pickup: '용살자 카인',
  unit: '심연의 유물',
  mix: '용살자 카인',
}
