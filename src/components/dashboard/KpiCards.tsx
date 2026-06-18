import { useStore } from '../../store/useStore'
import { computeKpis } from '../../lib/dashboardMetrics'
import { Icon } from '../../icons/Icon'
import { c, MONO } from '../../theme/tokens'

/** Four headline KPI cards (DAU / 신규 / 일 매출 / 전환율). */
export function KpiCards() {
  const selectedDate = useStore((s) => s.selectedDate)
  const kpis = computeKpis(selectedDate)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 15, marginBottom: 16 }}>
      {kpis.map((k) => (
        <div key={k.label} title={k.tip} style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 15, padding: '18px 19px', boxShadow: '0 1px 2px rgba(20,30,55,.04)', cursor: 'help' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 11 }}>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: c.muted2 }}>{k.label}</span>
            <span style={{ width: 30, height: 30, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: k.iconBg, color: k.iconCol }}>
              <Icon name={k.icon} />
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <span style={{ fontSize: 25, fontWeight: 800, color: c.ink, letterSpacing: '-.5px', fontFeatureSettings: "'tnum'" }}>{k.value}</span>
            <span style={{ fontSize: 12.5, color: c.muted4, fontWeight: 600 }}>{k.unit}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 9 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2, fontSize: 12, fontWeight: 700, color: k.up ? '#1DA85B' : '#E5484D', fontFamily: MONO }}>
              {k.up ? '▲' : '▼'} {k.delta}
            </span>
            <span style={{ fontSize: 11.5, color: c.muted5 }}>vs 전일</span>
          </div>
        </div>
      ))}
    </div>
  )
}
