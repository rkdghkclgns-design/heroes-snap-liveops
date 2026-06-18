import { AB_TESTS, INTEGRATIONS } from '../../data/intel'
import { c, MONO } from '../../theme/tokens'

/** Bottom row: A/B test board + external integrations status. */
export function AbIntegrations() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 15, marginTop: 16 }}>
      <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 15, padding: '20px 22px' }}>
        <div style={{ fontSize: 14.5, fontWeight: 800, color: c.ink, marginBottom: 4 }}>A/B 테스트 보드</div>
        <div style={{ fontSize: 11.5, color: c.muted3, marginBottom: 14 }}>실험군 대비 지표 · 통계적 우세 판정</div>
        {AB_TESTS.map((t) => (
          <div key={t.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 0', borderBottom: `1px solid ${c.hairline}` }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1B2233' }}>{t.name}</div>
              <div style={{ fontSize: 11, color: c.muted4, marginTop: 2 }}>{t.metric} · A/B {t.ab}</div>
            </div>
            <span style={{ fontSize: 13, fontWeight: 800, fontFamily: MONO, color: '#15A35B' }}>{t.lift}</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: t.col, background: t.bg, padding: '3px 10px', borderRadius: 20, whiteSpace: 'nowrap' }}>{t.st}</span>
          </div>
        ))}
      </div>

      <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 15, padding: '20px 22px' }}>
        <div style={{ fontSize: 14.5, fontWeight: 800, color: c.ink, marginBottom: 14 }}>연동 · Integrations</div>
        {INTEGRATIONS.map((i) => (
          <div key={i.name} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '9px 0', borderBottom: `1px solid ${c.hairline}` }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: c.ink2 }}>{i.name}</div>
              <div style={{ fontSize: 10.5, color: c.muted4, marginTop: 1 }}>{i.desc}</div>
            </div>
            <span style={{ fontSize: 10.5, fontWeight: 700, color: i.col, background: i.bg, padding: '3px 10px', borderRadius: 20, whiteSpace: 'nowrap' }}>{i.st}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
