import { useStore } from '../../store/useStore'
import { PAY_GRAN_TABS } from '../../data/payments'
import { computePayGraph } from '../../lib/payments'
import { c, MONO } from '../../theme/tokens'

/** Revenue graph with hour / day / week / month granularity toggle. */
export function PayGraph() {
  const payGran = useStore((s) => s.payGran)
  const setPayGran = useStore((s) => s.setPayGran)
  const { bars, title, totalFmt } = computePayGraph(payGran)

  return (
    <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 15, padding: '20px 22px', marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 16, gap: 14, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontSize: 14.5, fontWeight: 800, color: c.ink }}>{title}</div>
          <div style={{ fontSize: 11.5, color: c.muted3, marginTop: 2 }}>합계 {totalFmt} · 막대에 마우스를 올리면 금액 표시</div>
        </div>
        <div style={{ display: 'flex', gap: 6, background: c.canvas, border: `1px solid ${c.border}`, borderRadius: 9, padding: 3 }}>
          {PAY_GRAN_TABS.map(([id, label]) => {
            const on = payGran === id
            return (
              <div key={id} onClick={() => setPayGran(id)} style={{ padding: '7px 16px', borderRadius: 7, cursor: 'pointer', fontSize: 12.5, fontWeight: 700, border: `1px solid ${on ? c.brand : c.border3}`, background: on ? c.brand : '#fff', color: on ? '#fff' : c.muted }}>
                {label}
              </div>
            )
          })}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 190, paddingTop: 8 }}>
        {bars.map((b, i) => (
          <div key={i} title={b.tip} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%', gap: 6, cursor: 'help' }}>
            <div style={{ width: '100%', borderRadius: '4px 4px 2px 2px', background: 'linear-gradient(180deg,#9D86FF,#6C4DF6)', height: b.h }} />
            <span style={{ fontSize: 8.5, color: c.muted5, fontFamily: MONO, whiteSpace: 'nowrap' }}>{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
