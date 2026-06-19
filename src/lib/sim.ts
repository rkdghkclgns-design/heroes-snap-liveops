import { fmt } from './format'
import { wonCompact } from '../data/payments'
import { METRICS_TARGETS, type KpiTargets, type ScenarioName, type Sim } from '../data/sim'

/** 12-month cumulative operating-profit series + break-even month. */
export function buildSeries(p: Sim) {
  const months = 12
  const laborW = p.laborCost * 10000
  const fixedW = p.fixedCost * 10000
  let mau = p.startMau
  let cumProfit = 0
  let cumGross = 0
  let prevRev = 0
  let bep = -1
  const data: { m: number; mau: number; gross: number; cumProfit: number }[] = []
  for (let m = 0; m < months; m++) {
    const mkt = m === 0 ? 1_500_000 : prevRev * (p.marketingRate / 100)
    const dau = Math.round((mau * p.stickiness) / 100)
    const iap = mau * (p.pur / 100) * p.arppu
    const ad = dau * 30 * p.adArpdau
    const gross = iap + ad
    const net = iap * (1 - p.platform / 100) + ad
    const profit = net - laborW - fixedW - mkt
    cumProfit += profit
    cumGross += gross
    prevRev = gross
    if (cumProfit >= 0 && bep === -1) bep = m + 1
    data.push({ m: m + 1, mau, gross, cumProfit })
    mau = Math.round(mau * (1 + p.growthRate / 100))
  }
  return { data, bep, cumGross }
}

export interface SimBar {
  m: string
  h: string
  fill: string
  tip: string
}

export function computeSimBars(sim: Sim): SimBar[] {
  const series = buildSeries(sim)
  const max = Math.max(...series.data.map((d) => Math.abs(d.cumProfit)), 1)
  return series.data.map((d) => ({
    m: 'M' + d.m,
    h: (Math.abs(d.cumProfit) / max) * 92 + 4 + '%',
    fill: d.m === series.bep ? '#15A35B' : d.cumProfit < 0 ? '#E8826B' : '#9D86FF',
    tip: `M${d.m} · 누적 ${wonCompact(d.cumProfit)} · MAU ${fmt(d.mau)}`,
  }))
}

export interface SimTile {
  label: string
  value: string
  col: string
  sub: string
}

export function computeSimTiles(sim: Sim, scenario: ScenarioName): SimTile[] {
  const series = buildSeries(sim)
  const bep = series.bep
  const final = series.data[11].cumProfit
  return [
    { label: 'BEP 달성 시기', value: bep > 0 ? `M${bep} 흑자전환` : '12개월 내 미도달', col: bep > 0 ? '#15A35B' : '#E5484D', sub: bep > 0 ? '누적 영업이익 > 0' : 'MAU 성장·재투자 조정 필요' },
    { label: '12개월 누적 영업이익', value: wonCompact(final), col: final < 0 ? '#E5484D' : '#15A35B', sub: `${scenario} 시나리오` },
    { label: '12개월 누적 매출', value: wonCompact(series.cumGross), col: '#6C4DF6', sub: `시작 MAU ${fmt(sim.startMau)} → M12 ${fmt(series.data[11].mau)}` },
  ]
}

/** BEP month for report aggregation. */
export function bepMonth(sim: Sim): number {
  return buildSeries(sim).bep
}

export interface KpiTargetRow {
  label: string
  key: string
  step: number
  tgtVal: number
  cur: string
  achieved: boolean
  col: string
  bg: string
  stLabel: string
}

const fmtM = (v: number, pct: boolean) => (pct ? v.toFixed(1) + '%' : '$' + v.toFixed(2))

export function computeKpiTargetRows(targets: KpiTargets): { rows: KpiTargetRow[]; achieved: number } {
  const rows = METRICS_TARGETS.map(([label, key, cur, pct, step]) => {
    const tgt = targets[key]
    const ok = cur >= tgt
    return {
      label,
      key,
      step,
      tgtVal: tgt,
      cur: fmtM(cur, pct),
      achieved: ok,
      col: ok ? '#15803D' : '#E5484D',
      bg: ok ? '#E6F7EE' : '#FDECEC',
      stLabel: ok ? '달성' : '미달성',
    }
  })
  return { rows, achieved: rows.filter((r) => r.achieved).length }
}

/** Revenue simulator outputs from DAU / ARPDAU / conversion. */
export function computeRevenueSim(dau: number, arpdau: number, conv: number) {
  const daily = dau * arpdau
  const monthly = daily * 30
  const payU = Math.round((dau * conv) / 100)
  return {
    daily: '$' + fmt(Math.round(daily)),
    monthly: '$' + fmt(Math.round(monthly)),
    yearly: '$' + fmt(Math.round(monthly * 12)),
    krw: '₩' + fmt(Math.round(monthly * 1350)),
    krwYear: '₩' + fmt(Math.round(monthly * 12 * 1350)),
    payU: fmt(payU),
  }
}
