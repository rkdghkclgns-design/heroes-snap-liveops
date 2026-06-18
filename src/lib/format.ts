/* ===========================================================
   Number / reward formatting helpers (ko-KR).
   =========================================================== */

/** Group-separated Korean number, e.g. 1234567 → "1,234,567". */
export function fmt(n: number | string): string {
  return Number(n).toLocaleString('ko-KR')
}

/** Won-prefixed amount, e.g. 1842000 → "₩1,842,000". */
export function won(n: number | string): string {
  return '₩' + fmt(n)
}

export interface Reward {
  key: string
  name: string
  qty: number
}

/** One-line reward summary, e.g. [다이아×300, …] → "다이아 300 외 2종". */
export function rewardsSummary(arr: Reward[] | undefined): string {
  if (!arr || arr.length === 0) return '보상 없음'
  const first = `${arr[0].name} ${fmt(arr[0].qty)}`
  return arr.length > 1 ? `${first} 외 ${arr.length - 1}종` : first
}

/** "2026-06-01" + "2026-06-30" → "06.01~06.30". */
export function fmtPeriod(start: string, end: string): string {
  const f = (d: string) => (d || '').replace(/^\d{4}-/, '').replace('-', '.')
  return `${f(start)}~${f(end)}`
}

/** "2026-06-17" → "2026년 06월 17일". */
export function dateLabel(iso: string): string {
  return iso.replace(/^(\d{4})-(\d{2})-(\d{2})$/, '$1년 $2월 $3일')
}

/** Map of known reward ids → Korean labels (used by the reward builder). */
export const KNOWN_REWARD_NAMES: Record<string, string> = {
  gold: '골드',
  dia: '다이아',
  ticket: '소환권',
  relic: '유물상자',
  stone: '강화석',
}

/** Trigger a client-side CSV download with a UTF-8 BOM (Excel-friendly). */
export function downloadCsv(filename: string, header: string[], rows: (string | number)[][]): void {
  const esc = (v: string | number | null) => '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"'
  const csv = '﻿' + [header, ...rows].map((r) => r.map(esc).join(',')).join('\r\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${filename}.csv`
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
