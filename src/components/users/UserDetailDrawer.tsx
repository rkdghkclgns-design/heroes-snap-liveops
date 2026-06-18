import { useStore } from '../../store/useStore'
import { ALL_USERS, USER_HEROES } from '../../data/users'
import { fmt, won } from '../../lib/format'
import { STATUS_META } from '../../lib/userMeta'
import { HoverBox } from '../ui/HoverBox'
import { c, ELEM, RAR, MONO } from '../../theme/tokens'

const statCard = { background: '#fff', border: `1px solid ${c.border}`, borderRadius: 12, padding: 14 } as const
const statLabel = { fontSize: 11.5, color: '#8A95AC', fontWeight: 600, marginBottom: 5 } as const

/** Slide-in drawer with a user's wallet, roster, and quick actions. */
export function UserDetailDrawer() {
  const detailId = useStore((s) => s.detailId)
  const closeDetail = useStore((s) => s.closeDetail)
  const openGrantOne = useStore((s) => s.openGrantOne)
  const openBanOne = useStore((s) => s.openBanOne)
  const navigate = useStore((s) => s.navigate)

  const u = ALL_USERS.find((x) => x.id === detailId)
  if (!u) return null
  const m = STATUS_META[u.status]

  return (
    <>
      <div onClick={closeDetail} style={{ position: 'fixed', inset: 0, background: 'rgba(16,21,31,.42)', zIndex: 40, animation: 'overlayIn .16s ease' }} />
      <div className="dk" style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 440, maxWidth: '94vw', background: c.surfaceAlt, zIndex: 41, overflowY: 'auto', boxShadow: '-12px 0 40px rgba(16,21,31,.18)', animation: 'drawerIn .22s cubic-bezier(.2,.8,.2,1)' }}>
        <div style={{ background: c.drawerGrad, padding: '22px 24px', color: '#fff', position: 'relative' }}>
          <HoverBox base={{ position: 'absolute', top: 18, right: 18, cursor: 'pointer', color: '#9A93C0', width: 28, height: 28, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }} hover={{ background: 'rgba(255,255,255,.1)', color: '#fff' }} onClick={closeDetail}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </HoverBox>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 54, height: 54, borderRadius: 14, background: u.av, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 21, color: '#fff' }}>{u.nick.slice(0, 1)}</div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800 }}>{u.nick}</div>
              <div style={{ fontSize: 12, color: '#B0A9D6', fontFamily: MONO, marginTop: 2 }}>{u.id}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <span style={{ fontSize: 11.5, fontWeight: 700, background: 'rgba(255,255,255,.12)', padding: '4px 11px', borderRadius: 7 }}>Lv {u.lv}</span>
            <span style={{ fontSize: 11.5, fontWeight: 700, background: 'rgba(232,146,12,.22)', color: '#FFD089', padding: '4px 11px', borderRadius: 7 }}>VIP {u.vip}</span>
            <span style={{ fontSize: 11.5, fontWeight: 700, background: m.bgDark, color: m.colDark, padding: '4px 11px', borderRadius: 7 }}>{m.label}</span>
          </div>
        </div>

        <div style={{ padding: '20px 22px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 11, marginBottom: 18 }}>
            <div style={statCard}>
              <div style={statLabel}>보유 골드</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#E8920C', fontFamily: MONO }}>{fmt(u.gold)}</div>
            </div>
            <div style={statCard}>
              <div style={statLabel}>보유 다이아</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#14A6C4', fontFamily: MONO }}>{fmt(u.dia)}</div>
            </div>
            <div style={statCard}>
              <div style={statLabel}>누적 결제</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: c.ink2, fontFamily: MONO }}>{won(u.spend)}</div>
            </div>
            <div style={statCard}>
              <div style={statLabel}>가입일</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: c.ink2, fontFamily: MONO, marginTop: 3 }}>{u.joined}</div>
            </div>
          </div>

          <div style={{ fontSize: 12.5, fontWeight: 800, color: c.ink3, marginBottom: 10 }}>보유 캐릭터 (대표)</div>
          <div style={{ display: 'flex', gap: 9, marginBottom: 20 }}>
            {USER_HEROES.map((h) => (
              <div key={h.name} style={{ flex: 1, background: '#fff', border: `1px solid ${c.border}`, borderTop: `3px solid ${RAR[h.rarity]}`, borderRadius: 11, padding: '11px 8px', textAlign: 'center' }}>
                <div style={{ width: 38, height: 38, borderRadius: 9, margin: '0 auto 7px', background: ELEM[h.elem].bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{ELEM[h.elem].icon}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: c.ink2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{h.name}</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: RAR[h.rarity], marginTop: 2 }}>{h.rarity}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <HoverBox as="button" base={{ height: 44, borderRadius: 11, border: 'none', background: c.brand, color: '#fff', fontSize: 13.5, fontWeight: 700, cursor: 'pointer' }} hover={{ background: c.brandHover }} onClick={openGrantOne}>재화 지급</HoverBox>
            <HoverBox as="button" base={{ height: 44, borderRadius: 11, border: '1px solid #DBE1EB', background: '#fff', color: c.ink3, fontSize: 13.5, fontWeight: 700, cursor: 'pointer' }} hover={{ background: c.canvas }} onClick={() => navigate('mail')}>우편 발송</HoverBox>
            <HoverBox as="button" base={{ gridColumn: '1/3', height: 44, borderRadius: 11, border: '1px solid #F5C9CB', background: '#FFF5F5', color: '#E5484D', fontSize: 13.5, fontWeight: 700, cursor: 'pointer' }} hover={{ background: '#FDECEC' }} onClick={openBanOne}>계정 제재</HoverBox>
          </div>
        </div>
      </div>
    </>
  )
}
