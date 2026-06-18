import { useStore } from '../store/useStore'
import { PAYMENT_LOG } from '../data/payments'
import { computePaySummary } from '../lib/payments'
import { downloadCsv } from '../lib/format'
import { PageHeader } from '../components/ui/PageHeader'
import { HoverBox } from '../components/ui/HoverBox'
import { PayGraph } from '../components/payments/PayGraph'
import { PayTable } from '../components/payments/PayTable'
import { c, MONO } from '../theme/tokens'

function ExportButton() {
  const selectedDate = useStore((s) => s.selectedDate)
  const showToast = useStore((s) => s.showToast)
  const onExport = () => {
    const rows = PAYMENT_LOG.map(([name, cat, price, qty]) => [name, cat, price, qty, price * qty])
    downloadCsv('결제로그_' + selectedDate, ['상품', '카테고리', '단가', '판매수', '매출'], rows)
    showToast('결제로그_' + selectedDate + '.csv 다운로드 완료')
  }
  return (
    <HoverBox as="button" base={{ display: 'inline-flex', alignItems: 'center', gap: 7, height: 38, padding: '0 15px', borderRadius: 9, border: '1px solid #DBE1EB', background: '#fff', color: c.ink3, fontSize: 13, fontWeight: 700, cursor: 'pointer' }} hover={{ background: c.canvas }} onClick={onExport}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
      CSV 내보내기
    </HoverBox>
  )
}

/** 결제 로그 — sales summary, revenue-over-time graph, per-product table. */
export function PaymentsPage() {
  const summary = computePaySummary()
  return (
    <div>
      <PageHeader title="결제 로그" subtitle="상품별 판매 수량 · 매출 · 매출 비중 (최근 30일)" marginBottom={20} actions={<ExportButton />} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 13, marginBottom: 16 }}>
        {summary.map((s) => (
          <div key={s.label} style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 15, padding: '18px 19px' }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: c.muted2 }}>{s.label}</div>
            <div style={{ fontSize: 23, fontWeight: 800, color: c.ink, letterSpacing: '-.5px', fontFamily: MONO, marginTop: 8 }}>{s.value}</div>
            <div style={{ fontSize: 11.5, color: c.muted4, marginTop: 6 }}>{s.sub}</div>
          </div>
        ))}
      </div>
      <PayGraph />
      <PayTable />
    </div>
  )
}
