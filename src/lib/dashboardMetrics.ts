import { fmt } from './format'
import { REV_CFG } from '../data/dashboard'
import type { IconName } from '../icons/Icon'
import type { RevVals } from '../store/useStore'

/** Deterministic per-date jitter so the dashboard "moves" when the date changes. */
function seededDelta(selectedDate: string) {
  const seed = parseInt(selectedDate.replace(/-/g, ''), 10) || 20260617
  return (offset: number, amp: number) => Math.sin(((seed % 100000) + offset) * 0.9) * amp
}

export interface KpiCard {
  label: string
  value: string
  unit: string
  delta: string
  up: boolean
  icon: IconName
  iconBg: string
  iconCol: string
  tip: string
}

const KPI_ICON_BG: Record<string, [string, string]> = {
  users: ['#EFEBFF', '#6C4DF6'],
  character: ['#E2F6FA', '#14A6C4'],
  shop: ['#FDF3E1', '#E8920C'],
  coupon: ['#FDECEC', '#E5484D'],
}

/** Top KPI cards (DAU / 신규 / 일 매출 / 전환율) seeded by the selected date. */
export function computeKpis(selectedDate: string): KpiCard[] {
  const dv = seededDelta(selectedDate)
  const dauD = dv(1, 0.16)
  const newD = dv(2, 0.3)
  const revD = dv(3, 0.2)
  const convD = dv(4, 0.12)
  const pf = (n: number) => Math.round(n).toLocaleString('ko-KR')

  const raw: Omit<KpiCard, 'iconBg' | 'iconCol'>[] = [
    { label: 'DAU', value: pf(142380 * (1 + dauD)), unit: '명', delta: (Math.abs(dauD) * 100).toFixed(1) + '%', up: dauD >= 0, icon: 'users', tip: `일일 활성 유저 · ${selectedDate} 기준 · 고착율 22%` },
    { label: '신규 가입', value: pf(8210 * (1 + newD)), unit: '명', delta: (Math.abs(newD) * 100).toFixed(1) + '%', up: newD >= 0, icon: 'character', tip: 'iOS/AOS 신규 유입 · CPI $1.82' },
    { label: '일 매출', value: '₩' + pf(5234 * (1 + revD)), unit: '만', delta: (Math.abs(revD) * 100).toFixed(1) + '%', up: revD >= 0, icon: 'shop', tip: '인앱결제 + 광고 매출 합산' },
    { label: '결제 전환율', value: (6.8 * (1 + convD)).toFixed(1), unit: '%', delta: (Math.abs(convD) * 6.8).toFixed(1) + '%p', up: convD >= 0, icon: 'coupon', tip: '과금 유저 / DAU · ARPPU $62' },
  ]
  return raw.map((k) => {
    const [bg, col] = KPI_ICON_BG[k.icon] ?? ['#EFEBFF', '#6C4DF6']
    return { ...k, iconBg: bg, iconCol: col }
  })
}

export interface RevMetric {
  key: string
  term: string
  ko: string
  val: number
  step: number
  cur: string
  krw: string
  hasKrw: boolean
  med: string
  tip: string
  arrow: string
  col: string
  stLabel: string
  stBg: string
  valCol: string
}

/** Editable monetization metrics vs. knowledge-base benchmarks. */
export function computeRevMetrics(revVals: RevVals): RevMetric[] {
  return REV_CFG.map(([key, term, ko, med, unit, type, step]) => {
    const v = revVals[key]
    const above = v >= med
    const cur = type === '$' ? '$' + v : v + '%'
    const krw = type === '$' ? '₩' + fmt(Math.round(v * 1350)) : ''
    return {
      key,
      term,
      ko,
      val: v,
      step,
      cur,
      krw,
      hasKrw: !!krw,
      med: '업계 중앙값 ' + (type === '$' ? '$' + med : med + '%') + unit,
      tip: `${term} 현재 ${cur} · 업계 중앙값 대비 ${above ? '상회' : '하회'}`,
      arrow: above ? '▲' : '▼',
      col: above ? '#15A35B' : '#E5484D',
      stLabel: above ? '상회' : '하회',
      stBg: above ? '#E6F7EE' : '#FDECEC',
      valCol: above ? '#10151F' : '#C2410C',
    }
  })
}
