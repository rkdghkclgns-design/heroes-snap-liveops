import { fmt, type Reward } from '../../lib/format'
import { HoverBox } from './HoverBox'
import { c, CUR, MONO, type CurrencyKey } from '../../theme/tokens'

const FALLBACK = { col: '#6C4DF6', bg: '#EFEBFF', g: '?' }

interface RewardBuilderProps {
  rewards: Reward[]
  rewardId: string
  rewardQty: string
  onId: (v: string) => void
  onQty: (v: string) => void
  onAdd: () => void
  onRemove: (i: number) => void
}

/** Reward list + "item ID + quantity → add" row, shared by coupons and mail. */
export function RewardBuilder({ rewards, rewardId, rewardQty, onId, onQty, onAdd, onRemove }: RewardBuilderProps) {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 14 }}>
        {rewards.map((r, i) => {
          const meta = CUR[r.key as CurrencyKey] ?? FALLBACK
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '10px 12px', borderRadius: 10, background: c.surfaceAlt2, border: `1px solid ${c.borderSoft}` }}>
              <span style={{ width: 30, height: 30, borderRadius: 8, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: meta.bg, color: meta.col, fontWeight: 700 }}>{meta.g}</span>
              <span style={{ flex: 1, fontSize: 13, fontWeight: 700, color: c.ink2 }}>{r.name}</span>
              <span style={{ fontFamily: MONO, fontWeight: 700, color: c.ink2 }}>×{fmt(r.qty)}</span>
              <HoverBox base={{ cursor: 'pointer', color: '#C2CAD6', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }} hover={{ color: '#E5484D' }} onClick={() => onRemove(i)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </HoverBox>
            </div>
          )
        })}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input value={rewardId} onChange={(e) => onId(e.target.value)} placeholder="아이템 ID / 이름" style={{ flex: 1.5, height: 40, padding: '0 12px', borderRadius: 9, border: `1px solid ${c.border3}`, fontSize: 13, fontFamily: MONO, outline: 'none' }} />
        <input value={rewardQty} onChange={(e) => onQty(e.target.value)} type="number" placeholder="수량" style={{ flex: 1, minWidth: 0, height: 40, padding: '0 12px', borderRadius: 9, border: `1px solid ${c.border3}`, fontSize: 13, fontFamily: MONO, outline: 'none' }} />
        <HoverBox as="button" base={{ width: 46, height: 40, flexShrink: 0, borderRadius: 9, border: 'none', background: c.brand, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} hover={{ background: c.brandHover }} onClick={onAdd} title="보상 추가">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
        </HoverBox>
      </div>
    </>
  )
}
