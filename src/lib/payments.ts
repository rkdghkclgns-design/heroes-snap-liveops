import { fmt } from './format'
import { PAYMENT_LOG, PAY_GRAN_CONF, PAY_WAVE, wonCompact, type PayGran } from '../data/payments'

interface PayItem {
  name: string
  cat: string
  price: number
  qty: number
  rev: number
}

function aggregate(): { raw: PayItem[]; total: number; qty: number; max: number } {
  const raw = PAYMENT_LOG.map(([name, cat, price, qty]) => ({ name, cat, price, qty, rev: price * qty }))
  const total = raw.reduce((a, b) => a + b.rev, 0)
  const qty = raw.reduce((a, b) => a + b.qty, 0)
  const max = Math.max(...raw.map((p) => p.rev))
  return { raw, total, qty, max }
}

export interface PaySummaryCard {
  label: string
  value: string
  sub: string
}

export function computePaySummary(): PaySummaryCard[] {
  const { raw, total, qty } = aggregate()
  return [
    { label: '총 결제 매출', value: '₩' + fmt(total), sub: '최근 30일' },
    { label: '총 결제 건수', value: fmt(qty) + '건', sub: 'PU 9,681명' },
    { label: '결제 ARPDAU', value: '₩' + fmt(Math.round(total / 30 / 142380)), sub: 'DAU 142,380 기준' },
    { label: '건당 객단가', value: '₩' + fmt(Math.round(total / qty)), sub: 'ARPPU ₩83,700' },
    { label: '결제 상품 수', value: raw.length + '종', sub: '활성 판매 상품' },
  ]
}

export interface PayRow {
  name: string
  cat: string
  priceFmt: string
  qtyFmt: string
  revFmt: string
  pct: string
  w: string
  tip: string
}

export function computePayRows(): PayRow[] {
  const { raw, total, max } = aggregate()
  return raw
    .slice()
    .sort((a, b) => b.rev - a.rev)
    .map((p) => ({
      name: p.name,
      cat: p.cat,
      priceFmt: '₩' + fmt(p.price),
      qtyFmt: fmt(p.qty),
      revFmt: '₩' + fmt(p.rev),
      pct: ((p.rev / total) * 100).toFixed(1) + '%',
      w: (p.rev / max) * 100 + '%',
      tip: `${p.name} · 단가 ₩${fmt(p.price)} × ${fmt(p.qty)}건 = ₩${fmt(p.rev)}`,
    }))
}

export interface PayBar {
  h: string
  label: string
  tip: string
}

export function computePayGraph(gran: PayGran): { bars: PayBar[]; title: string; totalFmt: string } {
  const conf = PAY_GRAN_CONF[gran]
  const raw: number[] = []
  for (let i = 0; i < conf.n; i++) {
    const w = PAY_WAVE[i % PAY_WAVE.length] * (0.85 + ((i * 37) % 30) / 100)
    raw.push(Math.round(conf.base * w))
  }
  const max = Math.max(...raw)
  const total = raw.reduce((a, b) => a + b, 0)
  const bars = raw.map((v, i) => ({ h: (v / max) * 92 + 4 + '%', label: conf.label(i), tip: `${conf.label(i)} · ${wonCompact(v)}` }))
  return { bars, title: conf.title, totalFmt: wonCompact(total) }
}
