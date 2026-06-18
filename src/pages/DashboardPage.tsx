import { useStore } from '../store/useStore'
import { dateLabel } from '../lib/format'
import { PERIODS } from '../data/dashboard'
import { PageHeader } from '../components/ui/PageHeader'
import { ServerControlCard } from '../components/dashboard/ServerControlCard'
import { NoticeComposerCard } from '../components/dashboard/NoticeComposerCard'
import { KpiCards } from '../components/dashboard/KpiCards'
import { RevenueChart, CcuChart } from '../components/dashboard/Charts'
import { MonetizationMetrics } from '../components/dashboard/MonetizationMetrics'
import { DashboardBottomRow } from '../components/dashboard/DashboardBottomRow'
import { c } from '../theme/tokens'

function PeriodToggle() {
  const period = useStore((s) => s.period)
  const setPeriod = useStore((s) => s.setPeriod)
  return (
    <div style={{ display: 'flex', gap: 3, background: c.surface, border: `1px solid ${c.border2}`, borderRadius: 9, padding: 3 }}>
      {PERIODS.map(([id, label]) => {
        const on = period === id
        return (
          <div key={id} onClick={() => setPeriod(id)} style={{ padding: '7px 15px', borderRadius: 7, cursor: 'pointer', fontSize: 12.5, fontWeight: 700, transition: 'all .14s', background: on ? c.brand : 'transparent', color: on ? '#fff' : c.muted2 }}>
            {label}
          </div>
        )
      })}
    </div>
  )
}

/** 대시보드 — real-time operations command center. */
export function DashboardPage() {
  const selectedDate = useStore((s) => s.selectedDate)

  return (
    <div>
      <PageHeader title="대시보드" subtitle={`${dateLabel(selectedDate)} 기준 · 실시간 운영 지표 · LIVE 서버`} actions={<PeriodToggle />} />

      <div style={{ display: 'flex', gap: 14, marginBottom: 16, flexWrap: 'wrap' }}>
        <ServerControlCard />
        <NoticeComposerCard />
      </div>

      <KpiCards />

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 15, marginBottom: 16 }}>
        <RevenueChart />
        <CcuChart />
      </div>

      <MonetizationMetrics />

      <DashboardBottomRow />
    </div>
  )
}
