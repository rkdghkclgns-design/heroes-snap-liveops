import { SEGMENTS, COHORT } from '../../data/intel'
import { c, MONO } from '../../theme/tokens'

const th = { padding: '8px 6px', fontSize: 11, fontWeight: 700, color: '#8A95AC' } as const

/** Mid row: behaviour-based auto segments + cohort retention table. */
export function SegmentsCohort() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 15 }}>
      <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 15, padding: '20px 22px' }}>
        <div style={{ fontSize: 14.5, fontWeight: 800, color: c.ink, marginBottom: 4 }}>세그먼트 자동 분류</div>
        <div style={{ fontSize: 11.5, color: c.muted3, marginBottom: 14 }}>행동 기반 자동 분류 · 클릭 시 맞춤 캠페인 대상</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {SEGMENTS.map((s) => (
            <div key={s.label} style={{ border: `1px solid ${c.borderSoft}`, borderLeft: `3px solid ${s.col}`, borderRadius: 11, padding: '14px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: c.ink2 }}>{s.label}</span>
                <span style={{ fontSize: 16, fontWeight: 800, color: s.col, fontFamily: MONO }}>{s.value}</span>
              </div>
              <div style={{ fontSize: 11, color: c.muted4, marginTop: 5, lineHeight: 1.5 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 15, padding: '20px 22px' }}>
        <div style={{ fontSize: 14.5, fontWeight: 800, color: c.ink, marginBottom: 14 }}>코호트 리텐션</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${c.borderSoft}` }}>
              <th style={{ ...th, textAlign: 'left', padding: '8px 4px' }}>코호트</th>
              <th style={{ ...th, textAlign: 'right' }}>D1</th>
              <th style={{ ...th, textAlign: 'right' }}>D7</th>
              <th style={{ ...th, textAlign: 'right', padding: '8px 4px' }}>D30</th>
            </tr>
          </thead>
          <tbody>
            {COHORT.map((co) => (
              <tr key={co.name} style={{ borderBottom: '1px solid #F6F7FB' }}>
                <td style={{ padding: '11px 4px', fontWeight: 600, color: c.ink2 }}>{co.name}</td>
                <td style={{ padding: '11px 6px', textAlign: 'right', fontFamily: MONO, fontWeight: 700, color: '#15A35B' }}>{co.d1}</td>
                <td style={{ padding: '11px 6px', textAlign: 'right', fontFamily: MONO, fontWeight: 700, color: '#6C4DF6' }}>{co.d7}</td>
                <td style={{ padding: '11px 4px', textAlign: 'right', fontFamily: MONO, fontWeight: 700, color: '#E8920C' }}>{co.d30}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
