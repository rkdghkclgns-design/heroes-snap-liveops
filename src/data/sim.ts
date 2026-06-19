/* ===========================================================
   KPI — revenue simulator inputs, BEP scenarios, KPI targets.
   =========================================================== */

export interface Sim {
  startMau: number
  growthRate: number
  stickiness: number
  pur: number
  arppu: number
  adArpdau: number
  laborCost: number
  fixedCost: number
  marketingRate: number
  platform: number
}

export type ScenarioName = 'WebGL 평균' | '보수적' | '기본' | '목표' | '위챗 성공작' | '커스텀'

export const SIM_PRESETS: Record<Exclude<ScenarioName, '커스텀'>, Sim> = {
  'WebGL 평균': { startMau: 20000, growthRate: 10, stickiness: 12, pur: 0.8, arppu: 15000, adArpdau: 25, laborCost: 1000, fixedCost: 200, marketingRate: 20, platform: 30 },
  보수적: { startMau: 33333, growthRate: 15, stickiness: 15, pur: 1.0, arppu: 25000, adArpdau: 39, laborCost: 1000, fixedCost: 200, marketingRate: 30, platform: 30 },
  기본: { startMau: 40000, growthRate: 18, stickiness: 17, pur: 1.5, arppu: 35000, adArpdau: 60, laborCost: 1000, fixedCost: 200, marketingRate: 35, platform: 30 },
  목표: { startMau: 40000, growthRate: 12, stickiness: 20, pur: 2.5, arppu: 45000, adArpdau: 90, laborCost: 1000, fixedCost: 200, marketingRate: 30, platform: 30 },
  '위챗 성공작': { startMau: 80000, growthRate: 25, stickiness: 22, pur: 3.5, arppu: 46000, adArpdau: 100, laborCost: 1000, fixedCost: 200, marketingRate: 40, platform: 30 },
}

export const DEFAULT_SIM: Sim = { ...SIM_PRESETS['보수적'] }
export const DEFAULT_SCENARIO: ScenarioName = '보수적'

export const SCENARIO_ORDER: Exclude<ScenarioName, '커스텀'>[] = ['WebGL 평균', '보수적', '기본', '목표', '위챗 성공작']

export const SCENARIO_COLORS: Record<ScenarioName, string> = {
  'WebGL 평균': '#64748B',
  보수적: '#E8826B',
  기본: '#E8920C',
  목표: '#15A35B',
  '위챗 성공작': '#2D7FF9',
  커스텀: '#6C4DF6',
}

/** Adjustable slider keys: [key, label, unit, min, max, step, accent]. */
export type SimSliderKey = 'startMau' | 'growthRate' | 'stickiness' | 'pur' | 'arppu' | 'adArpdau' | 'laborCost' | 'marketingRate'
export const SIM_KEYS: [SimSliderKey, string, string, number, number, number, string][] = [
  ['startMau', '시작 MAU', '', 5000, 200000, 1000, '#6C4DF6'],
  ['growthRate', '월 성장률', '%', 0, 50, 1, '#6C4DF6'],
  ['stickiness', '고착도', '%', 5, 30, 1, '#2D7FF9'],
  ['pur', '결제율 PUR', '%', 0.1, 5, 0.1, '#15A35B'],
  ['arppu', 'ARPPU', '원', 5000, 60000, 1000, '#15A35B'],
  ['adArpdau', '광고 ARPDAU', '원', 10, 150, 1, '#15A35B'],
  ['laborCost', '월 인력비(만원)', '', 0, 20000, 100, '#E8826B'],
  ['marketingRate', '마케팅 재투자', '%', 0, 60, 5, '#E8826B'],
]

/** KPI target keys + comparison. */
export type KpiKey = 'ltv' | 'arpu' | 'conv' | 'd1' | 'd7' | 'd30'
export type KpiTargets = Record<KpiKey, number>
export const DEFAULT_KPI_TARGETS: KpiTargets = { ltv: 12.0, arpu: 0.18, conv: 6.5, d1: 38, d7: 20, d30: 10 }

/** [label, key, current value, isPercent, step]. */
export const METRICS_TARGETS: [string, KpiKey, number, boolean, number][] = [
  ['LTV', 'ltv', 8.0, false, 0.5],
  ['ARPU (ARPDAU)', 'arpu', 0.18, false, 0.01],
  ['과금 전환율', 'conv', 5.0, true, 0.1],
  ['D1 리텐션', 'd1', 35, true, 1],
  ['D7 리텐션', 'd7', 18, true, 1],
  ['D30 리텐션', 'd30', 8, true, 1],
]

/** Revenue simulator slider defaults (DAU / ARPDAU / conversion). */
export const DEFAULT_METRIC_DAU = 120000
export const DEFAULT_METRIC_ARPDAU = 0.18
export const DEFAULT_METRIC_CONV = 6.5
