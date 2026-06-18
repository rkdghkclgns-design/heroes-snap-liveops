export type PayGran = 'hour' | 'day' | 'week' | 'month'

/** Product sales ledger: [name, category, unit price, units sold]. */
export const PAYMENT_LOG: [string, string, number, number][] = [
  ['신규 성장 패키지', '스타터', 9900, 8420],
  ['주간 가성비 상자', '한정', 4400, 12900],
  ['월간 다이아 패스', '구독', 14900, 6210],
  ['SSR 천장 번들', '확률', 129000, 980],
  ['강화 지원 패키지', '번들', 19900, 3140],
  ['다이아 대용량', '재화', 99000, 1520],
  ['배틀패스 시즌12', '패스', 13000, 9870],
  ['전설 장비 확정 팩', '번들', 99000, 640],
]

export const PAY_GRAN_TABS: [PayGran, string][] = [
  ['hour', '시간'],
  ['day', '일'],
  ['week', '주'],
  ['month', '월'],
]

export const PAY_GRAN_CONF: Record<PayGran, { n: number; base: number; label: (i: number) => string; title: string }> = {
  hour: { n: 24, base: 2_000_000, label: (i) => i + '시', title: '최근 24시간 · 시간별 매출' },
  day: { n: 30, base: 48_000_000, label: (i) => `${i + 1}`, title: '최근 30일 · 일별 매출' },
  week: { n: 12, base: 330_000_000, label: (i) => 'W' + (i + 1), title: '최근 12주 · 주별 매출' },
  month: { n: 12, base: 1_400_000_000, label: (i) => i + 1 + '월', title: '최근 12개월 · 월별 매출' },
}

/** Deterministic wave used to shape the revenue bars. */
export const PAY_WAVE = [
  0.72, 0.68, 0.81, 0.9, 1, 0.86, 0.79, 0.94, 0.88, 0.76, 0.83, 0.97, 0.91, 0.8, 0.85, 0.93, 1, 0.87, 0.78, 0.9, 0.95,
  0.82, 0.88, 0.99, 0.84, 0.77, 0.91, 0.86, 0.8, 0.96,
]

/** Compact won formatting: 억 / 만 / 원 with sign. */
export function wonCompact(v: number): string {
  const a = Math.abs(v)
  const s = v < 0 ? '-' : ''
  if (a >= 1e8) return s + '₩' + (a / 1e8).toFixed(2) + '억'
  if (a >= 1e4) return s + '₩' + Math.round(a / 1e4).toLocaleString('ko-KR') + '만'
  return s + '₩' + Math.round(a).toLocaleString('ko-KR')
}
