import { useStore } from '../../store/useStore'
import { SEV_META } from '../../data/intel'
import { HoverBox } from '../ui/HoverBox'
import { c, MONO } from '../../theme/tokens'

const th = { padding: '9px 8px', fontSize: 11, fontWeight: 700, color: '#8A95AC' } as const

/** Threshold alert rules with per-rule active/paused toggle. */
export function AlertRules() {
  const rules = useStore((s) => s.alertRules)
  const toggle = useStore((s) => s.toggleAlertRule)
  const activeCount = rules.filter((r) => r.on).length

  return (
    <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 15, padding: '20px 22px', marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 14.5, fontWeight: 800, color: c.ink }}>지표 임계값 알림 룰</div>
          <div style={{ fontSize: 11.5, color: c.muted3, marginTop: 2 }}>조건 충족 시 자동 알림·액션 실행</div>
        </div>
        <span style={{ fontSize: 12, fontWeight: 700, color: c.brand, background: '#F1EDFF', padding: '4px 11px', borderRadius: 20 }}>{activeCount} / {rules.length} 활성</span>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 680 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${c.borderSoft}` }}>
              <th style={{ ...th, textAlign: 'left', padding: '9px 4px' }}>지표</th>
              <th style={{ ...th, textAlign: 'left' }}>트리거 조건</th>
              <th style={{ ...th, textAlign: 'left' }}>자동 액션</th>
              <th style={{ ...th, textAlign: 'center' }}>심각도</th>
              <th style={{ ...th, textAlign: 'center', padding: '9px 4px' }}>상태</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((r) => {
              const sev = SEV_META[r.sev]
              return (
                <HoverBox as="tr" key={r.id} base={{ borderBottom: '1px solid #F6F7FB' }} hover={{ background: '#F8F9FD' }}>
                  <td style={{ padding: '12px 4px', fontWeight: 800, color: '#1B2233' }}>{r.metric}</td>
                  <td style={{ padding: '12px 8px', fontFamily: MONO, color: c.muted, fontSize: 12 }}>{r.cond}</td>
                  <td style={{ padding: '12px 8px', color: c.ink3 }}>{r.action}</td>
                  <td style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: sev.col, background: sev.bg, padding: '2px 9px', borderRadius: 6 }}>{sev.label}</span>
                  </td>
                  <td style={{ textAlign: 'center', padding: '12px 4px' }}>
                    <span
                      onClick={() => toggle(r.id)}
                      title="활성/중지 토글"
                      style={{ fontSize: 11, fontWeight: 800, fontFamily: MONO, color: r.on ? '#15803D' : '#94A0B2', background: r.on ? '#E6F7EE' : '#F1F3F8', padding: '3px 11px', borderRadius: 20, cursor: 'pointer' }}
                    >
                      {r.on ? '활성' : '중지'}
                    </span>
                  </td>
                </HoverBox>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
