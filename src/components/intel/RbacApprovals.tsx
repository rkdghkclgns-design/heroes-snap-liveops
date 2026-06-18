import { useStore } from '../../store/useStore'
import { ROLE_META, APPROVALS } from '../../data/intel'
import { c } from '../../theme/tokens'

/** Top row: RBAC role card (reflects the topbar role switcher) + Maker-Checker approval queue. */
export function RbacApprovals() {
  const role = useStore((s) => s.role)
  const meta = ROLE_META[role]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 15, marginBottom: 16 }}>
      <div style={{ background: c.drawerGrad, borderRadius: 15, padding: '22px 24px', color: '#fff' }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1, color: '#B6A6FF' }}>RBAC · 권한 등급</div>
        <div style={{ fontSize: 21, fontWeight: 800, marginTop: 8 }}>{meta.label}</div>
        <div style={{ fontSize: 12.5, color: '#C6BFE6', marginTop: 6, lineHeight: 1.6 }}>{meta.desc}</div>
        <div style={{ fontSize: 11, color: '#9A93C0', marginTop: 14, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,.12)' }}>
          상단 우측에서 역할을 전환하면 메뉴·실행 권한이 분리됩니다 (Maker-Checker 승인 연동)
        </div>
      </div>

      <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 15, padding: '20px 22px' }}>
        <div style={{ fontSize: 14.5, fontWeight: 800, color: c.ink, marginBottom: 14 }}>승인 대기 큐 · Maker-Checker</div>
        {APPROVALS.map((a) => (
          <div key={a.title} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '10px 0', borderBottom: `1px solid ${c.hairline}` }}>
            <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: c.ink2 }}>{a.title}</span>
            <span style={{ fontSize: 11.5, color: c.muted4 }}>{a.maker}</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: a.col, background: a.bg, padding: '3px 11px', borderRadius: 20 }}>{a.st}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
