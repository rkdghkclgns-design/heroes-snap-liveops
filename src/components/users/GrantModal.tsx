import { useStore } from '../../store/useStore'
import { ALL_USERS } from '../../data/users'
import { HoverBox } from '../ui/HoverBox'
import { c, CUR, type CurrencyKey } from '../../theme/tokens'

const GRANT_CURRENCIES: CurrencyKey[] = ['dia', 'gold', 'ticket', 'stone']
const input = { width: '100%', height: 44, padding: '0 14px', borderRadius: 11, border: `1px solid ${c.border3}`, outline: 'none' } as const

/** Compute the grant/ban target label from scope + selection / detail user. */
export function useTargetLabel(): string {
  const scope = useStore((s) => s.grantScope)
  const selectedCount = useStore((s) => s.selected.length)
  const detailId = useStore((s) => s.detailId)
  if (scope === 'bulk') return `선택한 ${selectedCount}명`
  const du = ALL_USERS.find((u) => u.id === detailId)
  return du ? `${du.nick} (${du.id})` : ''
}

/** Currency grant modal (bulk or single target). */
export function GrantModal() {
  const grantOpen = useStore((s) => s.grantOpen)
  const grantCurrency = useStore((s) => s.grantCurrency)
  const grantAmount = useStore((s) => s.grantAmount)
  const grantReason = useStore((s) => s.grantReason)
  const setGrantCurrency = useStore((s) => s.setGrantCurrency)
  const setGrantAmount = useStore((s) => s.setGrantAmount)
  const setGrantReason = useStore((s) => s.setGrantReason)
  const doGrant = useStore((s) => s.doGrant)
  const closeModals = useStore((s) => s.closeModals)
  const targetLabel = useTargetLabel()
  if (!grantOpen) return null

  return (
    <div onClick={closeModals} style={{ position: 'fixed', inset: 0, background: 'rgba(16,21,31,.5)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'overlayIn .16s ease' }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 440, maxWidth: '92vw', background: '#fff', borderRadius: 18, overflow: 'hidden', animation: 'modalIn .2s cubic-bezier(.2,.8,.2,1)', boxShadow: '0 30px 80px rgba(16,21,31,.35)' }}>
        <div style={{ padding: '22px 24px 0' }}>
          <div style={{ fontSize: 17, fontWeight: 800, color: c.ink }}>재화 지급</div>
          <div style={{ fontSize: 12.5, color: c.muted3, marginTop: 4 }}>{targetLabel} · 우편으로 발송됩니다</div>
        </div>
        <div style={{ padding: '20px 24px' }}>
          <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: c.ink3, marginBottom: 9 }}>재화 종류</label>
          <div style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
            {GRANT_CURRENCIES.map((k) => {
              const meta = CUR[k]
              const on = grantCurrency === k
              return (
                <div key={k} onClick={() => setGrantCurrency(k)} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 13px', borderRadius: 10, cursor: 'pointer', border: `1.5px solid ${on ? c.brand : c.border3}`, background: on ? '#FAF9FF' : '#fff' }}>
                  <span style={{ width: 22, height: 22, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', background: meta.bg, color: meta.col, fontSize: 12, fontWeight: 700 }}>{meta.g}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: on ? c.ink : c.muted }}>{meta.label}</span>
                </div>
              )
            })}
          </div>
          <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: c.ink3, marginBottom: 7 }}>수량</label>
          <input value={grantAmount} onChange={(e) => setGrantAmount(e.target.value)} style={{ ...input, fontSize: 15, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", marginBottom: 16 }} />
          <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: c.ink3, marginBottom: 7 }}>지급 사유 (로그 기록)</label>
          <input value={grantReason} onChange={(e) => setGrantReason(e.target.value)} placeholder="예: CS 보상 처리 #20260617-014" style={{ ...input, fontSize: 13.5 }} />
        </div>
        <div style={{ display: 'flex', gap: 10, padding: '0 24px 24px' }}>
          <button onClick={closeModals} style={{ flex: 1, height: 46, borderRadius: 11, border: '1px solid #DBE1EB', background: '#fff', color: c.ink3, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>취소</button>
          <HoverBox as="button" base={{ flex: 1.5, height: 46, borderRadius: 11, border: 'none', background: c.brand, color: '#fff', fontSize: 14, fontWeight: 800, cursor: 'pointer' }} hover={{ background: c.brandHover }} onClick={doGrant}>지급 실행</HoverBox>
        </div>
      </div>
    </div>
  )
}
