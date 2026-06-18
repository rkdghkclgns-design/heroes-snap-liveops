import { useStore } from '../../store/useStore'
import { ALERTS, SERVERS, RECENT_ISSUES, ISSUE_COLOR } from '../../data/dashboard'
import { Icon } from '../../icons/Icon'
import { c, MONO } from '../../theme/tokens'

const card = { background: c.surface, border: `1px solid ${c.border}`, borderRadius: 15, padding: '18px 20px' } as const

/** Bottom row: live alerts · server board · recent reward issues. */
export function DashboardBottomRow() {
  const navigate = useStore((s) => s.navigate)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.1fr', gap: 15 }}>
      {/* live alerts */}
      <div style={card}>
        <div style={{ fontSize: 14, fontWeight: 800, color: c.ink, marginBottom: 14 }}>실시간 운영 알림</div>
        {ALERTS.map((a, i) => (
          <div key={i} style={{ display: 'flex', gap: 11, padding: '10px 0', borderBottom: `1px solid ${c.hairline}` }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', marginTop: 6, flexShrink: 0, background: a.dot }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: c.ink2 }}>{a.text}</div>
              <div style={{ fontSize: 11, color: c.muted4, marginTop: 2 }}>{a.time}</div>
            </div>
          </div>
        ))}
      </div>

      {/* server status */}
      <div style={card}>
        <div style={{ fontSize: 14, fontWeight: 800, color: c.ink, marginBottom: 14 }}>서버 상태</div>
        {SERVERS.map((s) => (
          <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderBottom: `1px solid ${c.hairline}` }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', flexShrink: 0, background: s.dot }} />
            <span style={{ flex: 1, fontSize: 12.5, fontWeight: 600, color: c.ink2 }}>{s.name}</span>
            <span style={{ fontSize: 11.5, fontFamily: MONO, color: c.muted2 }}>{s.ccu}</span>
            <span style={{ fontSize: 10.5, fontWeight: 700, color: s.col, background: s.bg, padding: '2px 8px', borderRadius: 5 }}>{s.status}</span>
          </div>
        ))}
      </div>

      {/* recent issues */}
      <div style={card}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: c.ink }}>최근 발급 내역</div>
          <span onClick={() => navigate('mail')} style={{ fontSize: 11.5, fontWeight: 700, color: c.brand, cursor: 'pointer' }}>전체보기</span>
        </div>
        {RECENT_ISSUES.map((r, i) => {
          const [bg, col, iconName] = ISSUE_COLOR[r.kind]
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: `1px solid ${c.hairline}` }}>
              <span style={{ width: 26, height: 26, borderRadius: 7, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: bg, color: col }}>
                <Icon name={iconName} size={15} />
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: c.ink2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.title}</div>
                <div style={{ fontSize: 10.5, color: c.muted4 }}>{r.meta}</div>
              </div>
              <span style={{ fontSize: 10.5, color: c.muted4, whiteSpace: 'nowrap' }}>{r.time}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
