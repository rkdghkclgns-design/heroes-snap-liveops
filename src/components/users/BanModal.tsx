import { useStore } from '../../store/useStore'
import { HoverBox } from '../ui/HoverBox'
import { useTargetLabel } from './GrantModal'
import { c } from '../../theme/tokens'

const BAN_PERIODS: [string, string][] = [
  ['1d', '1일'],
  ['7d', '7일'],
  ['30d', '30일'],
  ['perm', '영구'],
]

/** Account sanction modal (bulk or single target). */
export function BanModal() {
  const banOpen = useStore((s) => s.banOpen)
  const banPeriod = useStore((s) => s.banPeriod)
  const banReason = useStore((s) => s.banReason)
  const setBanPeriod = useStore((s) => s.setBanPeriod)
  const setBanReason = useStore((s) => s.setBanReason)
  const doBan = useStore((s) => s.doBan)
  const closeModals = useStore((s) => s.closeModals)
  const targetLabel = useTargetLabel()
  if (!banOpen) return null

  return (
    <div onClick={closeModals} style={{ position: 'fixed', inset: 0, background: 'rgba(16,21,31,.5)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'overlayIn .16s ease' }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 420, maxWidth: '92vw', background: '#fff', borderRadius: 18, overflow: 'hidden', animation: 'modalIn .2s cubic-bezier(.2,.8,.2,1)', boxShadow: '0 30px 80px rgba(16,21,31,.35)' }}>
        <div style={{ padding: '22px 24px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 34, height: 34, borderRadius: 9, background: '#FDECEC', color: '#E5484D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="9" /><path d="M5.6 5.6l12.8 12.8" strokeLinecap="round" /></svg>
            </span>
            <div style={{ fontSize: 17, fontWeight: 800, color: c.ink }}>계정 제재</div>
          </div>
          <div style={{ fontSize: 12.5, color: c.muted3, marginTop: 8 }}>{targetLabel}</div>
        </div>
        <div style={{ padding: '18px 24px' }}>
          <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: c.ink3, marginBottom: 9 }}>제재 기간</label>
          <div style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
            {BAN_PERIODS.map(([id, label]) => {
              const on = banPeriod === id
              return (
                <div key={id} onClick={() => setBanPeriod(id)} style={{ padding: '9px 14px', borderRadius: 9, cursor: 'pointer', fontSize: 12.5, fontWeight: 700, border: `1.5px solid ${on ? '#E5484D' : c.border3}`, background: on ? '#FFF5F5' : '#fff', color: on ? '#E5484D' : c.muted }}>
                  {label}
                </div>
              )
            })}
          </div>
          <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: c.ink3, marginBottom: 7 }}>제재 사유</label>
          <input value={banReason} onChange={(e) => setBanReason(e.target.value)} placeholder="예: 비정상 결제 · 어뷰징 탐지" style={{ width: '100%', height: 44, padding: '0 14px', borderRadius: 11, border: `1px solid ${c.border3}`, fontSize: 13.5, outline: 'none' }} />
        </div>
        <div style={{ display: 'flex', gap: 10, padding: '0 24px 24px' }}>
          <button onClick={closeModals} style={{ flex: 1, height: 46, borderRadius: 11, border: '1px solid #DBE1EB', background: '#fff', color: c.ink3, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>취소</button>
          <HoverBox as="button" base={{ flex: 1.5, height: 46, borderRadius: 11, border: 'none', background: '#E5484D', color: '#fff', fontSize: 14, fontWeight: 800, cursor: 'pointer' }} hover={{ background: '#CC3A3F' }} onClick={doBan}>제재 적용</HoverBox>
        </div>
      </div>
    </div>
  )
}
