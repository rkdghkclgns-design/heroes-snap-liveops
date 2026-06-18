import { fmt } from '../../lib/format'
import { ELEM_LABEL, MAX_LEVEL, type ProjectUnit } from '../../data/projectUnits'
import { HoverBox } from '../ui/HoverBox'
import { c, ELEM, RAR, MONO } from '../../theme/tokens'

const statTile = { background: '#fff', border: `1px solid ${c.border}`, borderRadius: 12, padding: 14, textAlign: 'center' as const }
const statLabel = { fontSize: 11, color: '#8A95AC', fontWeight: 600 } as const
const statVal = { fontSize: 17, fontWeight: 800, fontFamily: MONO, marginTop: 4 } as const

/** Detail drawer for a ProjectA unit — real base stats from UnitMaster. */
export function UnitDetailDrawer({ unit, onClose }: { unit: ProjectUnit | null; onClose: () => void }) {
  if (!unit) return null
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(16,21,31,.42)', zIndex: 40, animation: 'overlayIn .16s ease' }} />
      <div className="dk" style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 420, maxWidth: '94vw', background: c.surfaceAlt, zIndex: 41, overflowY: 'auto', boxShadow: '-12px 0 40px rgba(16,21,31,.18)', animation: 'drawerIn .22s cubic-bezier(.2,.8,.2,1)' }}>
        <div style={{ background: c.drawerGrad, padding: 24, color: '#fff', position: 'relative' }}>
          <HoverBox base={{ position: 'absolute', top: 18, right: 18, cursor: 'pointer', color: '#9A93C0', width: 28, height: 28, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }} hover={{ background: 'rgba(255,255,255,.1)', color: '#fff' }} onClick={onClose}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </HoverBox>
          <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
            <div style={{ width: 64, height: 64, borderRadius: 16, border: `2px solid ${RAR[unit.rarity]}`, background: ELEM[unit.element].bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30 }}>{ELEM[unit.element].icon}</div>
            <div>
              <div style={{ fontSize: 11.5, fontWeight: 800, color: RAR[unit.rarity], fontFamily: MONO }}>{unit.rarity}</div>
              <div style={{ fontSize: 19, fontWeight: 800, marginTop: 2 }}>{unit.name}</div>
              <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 700, background: 'rgba(255,255,255,.12)', padding: '3px 10px', borderRadius: 6 }}>{ELEM_LABEL[unit.element]}</span>
                <span style={{ fontSize: 11, fontWeight: 700, background: 'rgba(255,255,255,.12)', padding: '3px 10px', borderRadius: 6 }}>{unit.line}</span>
                <span style={{ fontSize: 11, fontWeight: 700, background: 'rgba(124,92,255,.3)', padding: '3px 10px', borderRadius: 6 }}>Lv.MAX {MAX_LEVEL[unit.rarity]}</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: '20px 22px' }}>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: c.ink3, marginBottom: 10 }}>기본 스탯 (UnitMaster · Base)</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 11, marginBottom: 18 }}>
            <div style={statTile}><div style={statLabel}>HP</div><div style={{ ...statVal, color: '#15A35B' }}>{fmt(unit.hp)}</div></div>
            <div style={statTile}><div style={statLabel}>ATK</div><div style={{ ...statVal, color: '#E5484D' }}>{fmt(unit.atk)}</div></div>
            <div style={statTile}><div style={statLabel}>DEF</div><div style={{ ...statVal, color: '#2D7FF9' }}>{fmt(unit.def)}</div></div>
            <div style={statTile}><div style={statLabel}>SPEED</div><div style={{ ...statVal, color: '#E8920C' }}>{fmt(unit.speed)}</div></div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${c.border}`, borderRadius: 12, padding: 16 }}>
            {[
              ['유닛 ID', '#' + unit.id],
              ['속성', ELEM_LABEL[unit.element]],
              ['진영', unit.line],
              ['레벨 상한', 'Lv.' + MAX_LEVEL[unit.rarity]],
            ].map(([k, v], i, arr) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: i < arr.length - 1 ? `1px solid ${c.hairline}` : 'none' }}>
                <span style={{ fontSize: 12.5, color: c.muted2 }}>{k}</span>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: c.ink2, fontFamily: MONO }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
